import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { EventService } from '../../../../../shared/kernel/services/event.service';
import { EtruscaLocation, locationById } from '../../../../../shared/kernel/data/locations.data';
import { EduNavComponent } from '../../components/edu-nav/edu-nav.component';
import { CourseInterestModalComponent } from '../../components/course-interest-modal/course-interest-modal.component';
import { Course, CourseDate, COURSES } from '../../education.data';
import { coursePublicPath } from '../../course-public-paths';
import { absoluteAsset, eventSeoForCategory } from './event-seo';
import { EduCrumb, EDUCATION_HUB_PATH, breadcrumbJsonLd } from '../../edu-breadcrumb';
import { CITY_COURSES, CITY_COURSE_BY_CATEGORY } from '../../legacy-city-matrix';
import { LegacySection, legacyCoursePage } from '../../legacy-course-pages.data';
import { PAST_EVENT_FORM_TARGET, cityPageForEvent, eventDetailPath } from '../../event-paths';
import { EMPRENDE_PATH } from '../course-branch-page/course-branch.data';

/** Sede shown on the page: static snapshot (locations.data.ts) or, if missing, the event's own location. */
interface EventSede {
  name: string;
  label: string;
  address: string;
  city: string;
  postalCode: string;
  telephone: string;
  email: string;
  mapsUrl: string;
  mapsEmbed: string;
  latitude: string;
  longitude: string;
}

/**
 * /cursos-y-talleres/<slug>: one page per event of /api/Event (prerendered at build time,
 * client-rendered for events created after the build). Course info from the legacy course data,
 * date/schedule/price from the event, sucursal from the static locations snapshot.
 */
@Component({
  selector: 'app-event-detail-page',
  standalone: true,
  imports: [RouterLink, EduNavComponent, CourseInterestModalComponent],
  templateUrl: './event-detail-page.component.html',
  styleUrls: ['../../edu-theme.scss', './event-detail-page.component.scss']
})
export class EventDetailPageComponent implements OnInit {
  event: any = null;
  slug = '';
  sede: EventSede | null = null;
  imageUrl = '';
  mapSrc: SafeResourceUrl | null = null;
  interestOpen = false;
  interestDate: CourseDate | null = null;
  /** Date already passed (page built before the event; the API no longer lists it after that). */
  past = false;
  /** "¿Qué aprenderás?" / temario sections of the course's legacy page. */
  courseSections: LegacySection[] = [];
  coursePath: string | null = null;
  courseLabel = '';
  cityPath: string | null = null;
  /** Catalog workshop of the event's category (same content as /educacion/<kind>/<slug>/). */
  course: Course | null = null;
  /** Public page of that workshop (all its dates). */
  courseLink: string | null = null;
  related: Course[] = [];

  readonly hubPath = EDUCATION_HUB_PATH;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private events = inject(EventService);
  private seoService = inject(SeoService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const slug = this.route.snapshot.paramMap.get('slug') || '';
      const found = data['event'];
      if (!found) {
        // Unknown or past event. In the browser the resolver already redirected (course page or
        // info form); on the server (prerender) keep the URL out of the index.
        if (isPlatformBrowser(this.platformId)) {
          this.router.navigateByUrl(PAST_EVENT_FORM_TARGET, { replaceUrl: true });
        } else {
          this.seoService.set({ title: 'Cursos y talleres | Café Etrusca', description: '', robots: 'noindex,follow' });
        }
        return;
      }
      this.hydrate(found, slug);
    });
  }

  get categoryName(): string {
    return titleCase(this.event?.category?.name || '') || 'Curso Café Etrusca';
  }

  get dateLabel(): string {
    const ds = String(this.event?.dateString || '').split('/')[0].trim();
    if (ds) return ds.charAt(0).toUpperCase() + ds.slice(1);
    const start = new Date(this.event?.start);
    return isNaN(start.getTime())
      ? ''
      : start.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  get priceLabel(): string {
    const price = this.event?.category?.price;
    if (price == null || price === '') return '';
    const n = Number(price);
    if (!isFinite(n) || n <= 0) return '';
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);
  }

  get crumbs(): EduCrumb[] {
    const out: EduCrumb[] = [
      { label: 'Inicio', path: '/' },
      { label: 'Cursos', path: EDUCATION_HUB_PATH }
    ];
    if (this.courseLabel) out.push({ label: this.courseLabel, path: this.coursePath || undefined });
    if (this.sede && this.cityPath) out.push({ label: this.sede.label, path: this.cityPath });
    out.push({ label: this.event?.title || this.categoryName });
    return out;
  }

  phones(t: string): Array<{ label: string; href: string }> {
    return String(t || '')
      .split('/')
      .map((x) => x.trim())
      .filter(Boolean)
      .map((label) => {
        const d = label.replace(/\D/g, '');
        return { label, href: `tel:+52${d.length > 10 ? d.slice(-10) : d}` };
      });
  }

  openInterest() {
    this.interestOpen = true;
  }

  closeInterest() {
    this.interestOpen = false;
  }

  relatedLink(c: Course): string {
    return coursePublicPath(c);
  }

  /** Hero image: the workshop banner (same as its /educacion page); the event image otherwise. */
  get heroImage(): string {
    return this.course?.banner || this.imageUrl;
  }

  private hydrate(found: any, slug: string) {
    this.event = found;
    this.slug = slug;
    const categoryId = Number(found.categoryId) || null;
    const locationId = Number(found.locationId ?? found.location?.id) || null;
    this.sede = toSede(locationById(locationId), found.location);
    this.imageUrl = absoluteAsset(found.image || found.category?.image);
    this.interestDate = this.events.mapEventToDate(found);
    this.mapSrc = this.sede?.mapsEmbed
      ? this.sanitizer.bypassSecurityTrustResourceUrl('https://www.google.com/maps/embed?pb=' + this.sede.mapsEmbed)
      : null;
    const end = new Date(found.end || found.start);
    this.past = !isNaN(end.getTime()) && end.getTime() < Date.now();

    // Course info: base legacy page of the category (old cafeetrusca.com course page).
    const base = categoryId ? CITY_COURSE_BY_CATEGORY[categoryId] : undefined;
    const course = base ? CITY_COURSES.find((c) => c.base === base) : undefined;
    const basePage = course?.basePage ? legacyCoursePage(course.basePage) : undefined;
    if (categoryId === 10) {
      this.courseLabel = 'Emprendiendo mi negocio de barra de café y cafetería';
      this.coursePath = `/${EMPRENDE_PATH}`;
    } else {
      this.courseLabel = course?.crumb || this.categoryName;
      this.coursePath = course?.basePage ? `/${course.basePage}` : null;
    }
    this.courseSections = (basePage?.sections || [])
      .filter((s) => !s.calendar && !s.card && /aprender|temario|objetivo|temas/i.test(s.heading))
      .filter((s) => s.blocks.some((b) => b.type === 'p' || b.type === 'ul'))
      .slice(0, 3);
    // Workshop design/content: catalog course whose id is the event's categoryId.
    this.course = (categoryId && COURSES.find((c) => c.id === categoryId)) || null;
    this.courseLink = this.course ? coursePublicPath(this.course) : null;
    this.related = COURSES.filter((c) => c.slug !== this.course?.slug).slice(0, 3);
    this.cityPath = cityPageForEvent(slug, categoryId, locationId);
    if (this.cityPath === this.coursePath) this.cityPath = null;

    // A past date (page prerendered before it happened) stays reachable; the notice links to
    // the next dates of the same course at the same sucursal (cityPath).
    this.applySeo(found, slug);
  }

  private applySeo(event: any, slug: string) {
    const kw = eventSeoForCategory(Number(event.categoryId));
    const sedeName = this.sede?.name || 'Café Etrusca';
    const intro = `${this.courseLabel || this.categoryName} en ${sedeName}: ${this.dateLabel}${
      this.interestDate?.hours && this.interestDate.hours !== 'Consultar horario' ? `, ${this.interestDate.hours}` : ''
    }.`;
    const about = String(event.category?.description || kw.description).trim();
    const description = clip(`${intro} ${about}`, 300);
    const sede = this.sede;
    const offset = (iso: string) => withOffset(iso, sede?.city === 'Tijuana' ? 'America/Tijuana' : 'America/Mexico_City');
    const place = sede
      ? {
          '@type': 'Place',
          name: `Café Etrusca ${sede.name}`,
          ...(sede.telephone ? { telephone: sede.telephone } : {}),
          address: {
            '@type': 'PostalAddress',
            streetAddress: sede.address,
            addressLocality: sede.city,
            ...(sede.postalCode ? { postalCode: sede.postalCode } : {}),
            addressCountry: 'MX'
          },
          ...(sede.latitude && sede.longitude
            ? { geo: { '@type': 'GeoCoordinates', latitude: Number(sede.latitude), longitude: Number(sede.longitude) } }
            : {})
        }
      : undefined;
    const price = Number(event.category?.price);
    this.seoService.set({
      title: `${event.title || this.categoryName} | Café Etrusca`,
      description,
      keywords: kw.keywords,
      image: this.imageUrl || undefined,
      ogType: 'website',
      path: eventDetailPath(slug),
      jsonLd: ({ origin, url }) => {
        const org = { '@type': 'Organization', '@id': origin + '/#organization', name: 'Café Etrusca', url: origin + '/' };
        const startDate = offset(event.start);
        const endDate = event.end ? offset(event.end) : undefined;
        return [
          {
            '@context': 'https://schema.org',
            '@type': 'Event',
            '@id': url + '#event',
            name: event.title,
            description,
            url,
            ...(this.imageUrl ? { image: this.imageUrl } : {}),
            startDate,
            ...(endDate ? { endDate } : {}),
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            ...(place ? { location: place } : {}),
            organizer: org,
            ...(isFinite(price) && price > 0
              ? { offers: { '@type': 'Offer', url, price, priceCurrency: 'MXN', availability: 'https://schema.org/InStock' } }
              : {})
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Course',
            '@id': url + '#course',
            name: this.courseLabel || this.categoryName,
            description: about,
            provider: org,
            inLanguage: 'es-MX',
            hasCourseInstance: {
              '@type': 'CourseInstance',
              courseMode: 'Onsite',
              startDate,
              ...(endDate ? { endDate } : {}),
              ...(place ? { location: place } : {})
            }
          },
          breadcrumbJsonLd(origin, this.crumbs, url)
        ];
      }
    });
  }
}

function toSede(l: EtruscaLocation | undefined, raw: any): EventSede | null {
  if (l) {
    return {
      name: l.name,
      label: l.venueLabel,
      address: l.displayAddress,
      city: l.city,
      postalCode: l.postalCode,
      telephone: l.telephone,
      email: l.email,
      mapsUrl: l.mapsUrl,
      mapsEmbed: l.mapsEmbed,
      latitude: l.latitude,
      longitude: l.longitude
    };
  }
  if (!raw?.name) return null;
  const s = (v: unknown) => String(v ?? '').replace(/\s+/g, ' ').trim();
  return {
    name: s(raw.name),
    label: s(raw.name).replace(/^sucursal\s+/i, ''),
    address: s(raw.locationAdress).replace(/[,\s]+$/, ''),
    city: s(raw.city),
    postalCode: s(raw.postalCode),
    telephone: s(raw.telephone),
    email: s(raw.email),
    mapsUrl: s(raw.url),
    mapsEmbed: s(raw.urlEmbed),
    latitude: s(raw.latitude),
    longitude: s(raw.longitude)
  };
}

/** "ARTE LATTE" → "Arte latte". */
function titleCase(v: string): string {
  const t = v.trim().toLocaleLowerCase('es-MX');
  return t ? t.charAt(0).toLocaleUpperCase('es-MX') + t.slice(1) : '';
}

function clip(text: string, max: number): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 40)).replace(/[,;:.\s]+$/, '') + '…';
}

/** API dates are local wall time without offset ("2026-12-18T10:00:00") → add the sucursal's UTC offset. */
function withOffset(iso: string, timeZone: string): string {
  const m = String(iso || '').match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2})?)/);
  if (!m) return iso;
  const local = m[1].length === 16 ? m[1] + ':00' : m[1];
  try {
    // Offset of that zone at (approximately) that instant.
    const probe = new Date(local + 'Z');
    const name = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(probe)
      .find((p) => p.type === 'timeZoneName')?.value || '';
    const off = name.replace('GMT', '') || '+00:00';
    return local + (/^[+-]\d{2}:\d{2}$/.test(off) ? off : '-06:00');
  } catch {
    return local + '-06:00';
  }
}
