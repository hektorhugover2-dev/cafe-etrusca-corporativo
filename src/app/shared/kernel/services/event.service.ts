import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = 'https://cafeetrusca.com/api/Event';
  private list$?: Observable<any[]>;

  getEvents(): Observable<any[]> {
    if (!this.list$) {
      this.list$ = this.http.get<any[]>(this.apiUrl, { headers: this.headers() }).pipe(
        catchError(() => this.http.get<any[]>(this.fallbackUrl())),
        catchError(() => of([])),
        shareReplay(1)
      );
    }
    return this.list$;
  }

  getBySlug(slug: string): Observable<any | null> {
    const wanted = (slug || '').toLowerCase();
    return this.getEvents().pipe(
      map((events) => events.find((e) => this.slugOf(e).toLowerCase() === wanted) || null)
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
    return this.http.get<any[]>(`${this.apiUrl}?categoryId=${categoryId}`, { headers: this.headers() }).pipe(
      catchError(() => this.getEvents().pipe(
        map((events) => events.filter((e) => Number(e?.categoryId) === Number(categoryId)))
      )),
      map(events => this.mapApiEventsToDates(events))
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
        hours: this.formatHours(startDate, endDate, startValid, endValid),
        start: event.start || undefined,
        end: event.end || undefined,
        email: loc.email || undefined,
        telephone: loc.telephone || undefined,
        mapUrl: loc.url || undefined,
        mapEmbed: loc.urlEmbed || undefined,
        locationName: loc.name || undefined,
        categoryName: event.category?.name || undefined,
        emailBarista: loc.emailB || undefined
      };
    });
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
