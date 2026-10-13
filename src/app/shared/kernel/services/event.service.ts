import { Injectable, PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { catchError, concat, EMPTY, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { EVENTS_SNAPSHOT } from './events-snapshot.token';
import { catalogByCategory, catalogHoursLabel } from '../data/course-catalog.data';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  /** Server/prerender only: local events snapshot when the API is unreachable. */
  private snapshot = inject(EVENTS_SNAPSHOT, { optional: true });
  private transfer = inject(TransferState);
  private apiUrl = 'https://cafeetrusca.com/api/Event';
  private list$?: Observable<any[]>;

  /**
   * Raw API events (keeps locationId) for one category, or every category when omitted,
   * like the old cafeetrusca.com calendars (/api/Event?categoryId=N&_=<timestamp>).
   */
  getRawEvents(categoryId?: number | null): Observable<any[]> {
    const live = () => {
      const params = new URLSearchParams();
      if (categoryId) params.set('categoryId', String(categoryId));
      params.set('_', String(Date.now()));
      return this.http.get<any[]>(`${this.apiUrl}?${params.toString()}`, { headers: this.headers() }).pipe(
        map((list) => (Array.isArray(list) ? list : [])),
        catchError(() =>
          this.getEvents().pipe(
            map((events) => (categoryId ? events.filter((e) => Number(e?.categoryId) === Number(categoryId)) : events))
          )
        )
      );
    };
    return this.withTransfer(`etr-events:${categoryId || 'all'}`, live);
  }

  /**
   * Prerender → browser hand-off of event lists, so the dates painted in the prerendered HTML are
   * the first thing the browser renders too (no hydration mismatch, no "Cargando fechas…" flash).
   * Server: store a trimmed copy in TransferState. Browser: emit that copy, then the live API.
   */
  private withTransfer(key: string, live: () => Observable<any[]>): Observable<any[]> {
    const stateKey = makeStateKey<any[]>(key);
    if (isPlatformServer(this.platformId)) {
      return live().pipe(tap((list) => this.transfer.set(stateKey, (list || []).map(trimEvent))));
    }
    if (this.transfer.hasKey(stateKey)) {
      const cached = this.transfer.get(stateKey, [] as any[]);
      this.transfer.remove(stateKey);
      return concat(of(cached), live().pipe(catchError(() => EMPTY)));
    }
    return live();
  }

  getEvents(): Observable<any[]> {
    if (!this.list$) {
      this.list$ = this.http.get<any[]>(this.apiUrl, { headers: this.headers() }).pipe(
        catchError(() => {
          const snapshot = this.snapshot;
          // Synchronous on purpose: an un-tracked async read would let the prerender finish
          // before the dates arrive (the HTML then showed no dates).
          if (snapshot && isPlatformServer(this.platformId)) return of(snapshot().filter(isUpcoming));
          return this.http.get<any[]>(this.fallbackUrl());
        }),
        catchError(() => of([])),
        shareReplay(1)
      );
    }
    return this.list$;
  }

  /**
   * One event by the slug of its URL (/cursos-y-talleres/<slug>). Uses /api/Event?slug=… (small
   * answer, so the prerendered page's HTTP transfer cache stays light); falls back to the full list.
   */
  getBySlug(slug: string): Observable<any | null> {
    const wanted = (slug || '').toLowerCase();
    if (!wanted) return of(null);
    const fromList = () =>
      this.getEvents().pipe(map((events) => events.find((e) => this.slugOf(e).toLowerCase() === wanted) || null));
    return this.http
      .get<any[]>(`${this.apiUrl}?slug=${encodeURIComponent(slug)}`, { headers: this.headers() })
      .pipe(
        map((list) => (Array.isArray(list) ? list.find((e) => this.slugOf(e).toLowerCase() === wanted) || null : null)),
        switchMap((found) => (found ? of(found) : fromList())),
        catchError(() => fromList())
      );
  }

  slugOf(event: any): string {
    const url = String(event?.url || '');
    const clean = url.split('?')[0].replace(/\/+$/, '');
    const i = clean.lastIndexOf('/');
    return i >= 0 ? decodeURIComponent(clean.slice(i + 1)) : '';
  }

  /**
   * Pide los eventos a la API y los transforma a tarjetas de calendario.
   */
  getMappedDatesByCourse(categoryId: number): Observable<any[]> {
    return this.getRawEvents(categoryId).pipe(
      map((events) => events.filter(isUpcoming).sort((a, b) => String(a?.start).localeCompare(String(b?.start)))),
      map((events) => this.mapApiEventsToDates(events))
    );
  }

  mapEventToDate(event: any) {
    return this.mapApiEventsToDates([event])[0];
  }

  /**
   * Traduce el JSON de Event a CourseDate, conservando datos de sucursal para el modal.
   */
  private mapApiEventsToDates(apiEvents: any[]) {
    return (apiEvents || []).map(event => {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      const startValid = !isNaN(startDate.getTime());
      const endValid = !isNaN(endDate.getTime());

      let days = startValid ? startDate.getDate().toString() : '';
      if (startValid && endValid && startDate.getDate() !== endDate.getDate()) {
        days = `${startDate.getDate()} y ${endDate.getDate()}`;
      }

      const monthStr = startValid
        ? startDate.toLocaleString('es-MX', { month: 'long' })
        : '';
      const monthCapitalized = monthStr
        ? monthStr.charAt(0).toUpperCase() + monthStr.slice(1)
        : '';

      const loc = event.location || {};
      const branchName = loc.name
        ? String(loc.name).replace('Sucursal ', '')
        : 'Por definir';

      return {
        days,
        month: monthCapitalized,
        branch: branchName,
        duration: 'Curso',
        // Official SAP table schedule wins over the API's start/end hours (course-catalog.data.ts).
        hours: this.tableHours(event) || this.formatHours(startDate, endDate, startValid, endValid),
        start: event.start || undefined,
        end: event.end || undefined,
        email: loc.email || undefined,
        telephone: loc.telephone || undefined,
        mapUrl: loc.url || undefined,
        mapEmbed: loc.urlEmbed || undefined,
        locationName: loc.name || undefined,
        categoryName: event.category?.name || undefined,
        emailBarista: loc.emailB || undefined,
        eventPath: this.slugOf(event) ? `/cursos-y-talleres/${this.slugOf(event)}` : undefined
      };
    });
  }

  private tableHours(event: any): string {
    const c = catalogByCategory(event?.categoryId ?? event?.category?.id);
    return c ? catalogHoursLabel(c) : '';
  }

  private formatHours(
    startDate: Date,
    endDate: Date,
    startValid: boolean,
    endValid: boolean
  ): string {
    if (!startValid || !endValid) {
      return 'Consultar horario';
    }
    const startMidnight = startDate.getHours() === 0 && startDate.getMinutes() === 0;
    const endMidnight = endDate.getHours() === 0 && endDate.getMinutes() === 0;
    if (startMidnight && endMidnight) {
      return 'Consultar horario';
    }
    return `${this.formatTime(startDate)} a ${this.formatTime(endDate)}`;
  }

  private formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
    const mm = minutes.toString().padStart(2, '0');
    return `${hours}:${mm} ${suffix}`;
  }

  private headers(): HttpHeaders {
    if (!isPlatformServer(this.platformId)) {
      return new HttpHeaders({ Accept: 'application/json' });
    }
    return new HttpHeaders({
      Accept: 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
    });
  }

  private fallbackUrl(): string {
    const origin = this.document.location?.origin || '';
    return (origin || '') + '/data/events.json';
  }
}

/** Not finished yet (end, or start when there is no end). The API only lists upcoming events; the
 * snapshot can be older than the build, so it is filtered the same way. */
function isUpcoming(e: any): boolean {
  const end = new Date(e?.end || e?.start || '');
  return !isNaN(end.getTime()) && end.getTime() >= Date.now();
}

/** Fields the calendars / event cards use (keeps the TransferState payload small). */
function trimEvent(e: any): any {
  const loc = e?.location || {};
  const cat = e?.category || {};
  return {
    id: e?.id,
    url: e?.url,
    title: e?.title,
    start: e?.start,
    end: e?.end,
    dateString: e?.dateString,
    categoryId: e?.categoryId,
    locationId: e?.locationId,
    image: e?.image,
    category: { id: cat.id, name: cat.name, price: cat.price, image: cat.image },
    location: {
      id: loc.id,
      name: loc.name,
      city: loc.city,
      email: loc.email,
      emailB: loc.emailB,
      telephone: loc.telephone,
      url: loc.url,
      urlEmbed: loc.urlEmbed
    }
  };
}
