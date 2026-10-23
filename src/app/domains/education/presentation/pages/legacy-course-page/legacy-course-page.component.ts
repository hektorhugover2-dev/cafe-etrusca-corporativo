import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { EventService } from '../../../../../shared/kernel/services/event.service';
import { CourseInterestModalComponent } from '../../components/course-interest-modal/course-interest-modal.component';
import { CourseDate, courseBySlug } from '../../education.data';
import { COURSE_PUBLIC_PATH_BY_SLUG } from '../../course-public-paths';
import { EduCrumb, EDUCATION_HUB_PATH, educationCrumbs, breadcrumbJsonLd } from '../../edu-breadcrumb';
import { LegacyCoursePage, LegacySection } from '../../legacy-course-pages.data';
import { ResolvedLegacyPage, resolveLegacyPage } from '../../legacy-city-pages';
import { canonicalOverride, primaryPath } from '../../primary-urls';
import { cityPageIndexing, upcomingEvents } from '../../page-indexing';
import {
  CatalogCourse,
  catalogByCategory,
  catalogByCourseSlug,
  catalogDuration,
  catalogOffer,
  comboFor,
  comboNote,
  daysLabel,
  formatMXN,
  hoursLabel
} from '../../../../../shared/kernel/data/course-catalog.data';
import {
  COURSE_VENUES,
  EtruscaLocation,
  locationById
} from '../../../../../shared/kernel/data/locations.data';

/** One upcoming event of the calendar (API event mapped to a date card + its sucursal). */
interface CalendarEvent {
  date: CourseDate;
  locationId: number | null;
  month: string;
  /** Course name (only shown on pages that list every category, e.g. /curso-de-cafe). */
  course: string;
}

/** Dates shown before "Ver más fechas" (the all-courses pages can have 100+ events). */
const PAGE_SIZE = 12;

/** Sucursal option of the calendar selector. value: 'all' | 'cdmx' | '<locationId>'. */
interface BranchOption {
  value: string;
  label: string;
  /** null until /api/Event answered. */
  count: number | null;
}

/** Phone string of the API ("(55) 5533 9402 / (55) 5533 9405") → display + tel: links. */
interface PhoneLink {
  label: string;
  href: string;
}

type RenderItem =
  | { kind: 'section'; section: LegacySection }
  | { kind: 'cards'; sections: LegacySection[] };

/**
 * Old cafeetrusca.com course/taller URLs (CursoController) kept alive at the same path.
 * One data-driven component for all of them; content lives in legacy-course-pages.data.ts.
 * Not linked from the menu. SEO = exact old ViewBag values + self-canonical.
 */
@Component({
  selector: 'app-legacy-course-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CourseInterestModalComponent],
  templateUrl: './legacy-course-page.component.html',
  styleUrls: ['../../edu-theme.scss', './legacy-course-page.component.scss']
})
export class LegacyCoursePageComponent implements OnInit {
  page: LegacyCoursePage | null = null;
  /** City page context (course × sucursal) + whether it is a generated one. */
  resolved: ResolvedLegacyPage | null = null;
  items: RenderItem[] = [];
  /** Upcoming events of the page's category (all sucursales). */
  events: CalendarEvent[] = [];
  branches: BranchOption[] = [];
  branch = 'all';
  month = '';
  datesLoaded = false;
  /** Page lists every course category (no categoryId, like the old /curso-de-cafe). */
  allCourses = false;
  visible = PAGE_SIZE;
  private cdmxIds = new Set<number>();
  interestOpen = false;
  interestDate: CourseDate | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);
  private eventService = inject(EventService);

  ngOnInit() {
    const resolved = resolveLegacyPage(this.route.snapshot.data['legacyPath']);
    if (!resolved) {
      this.router.navigateByUrl('/cursos-para-baristas-y-talleres-para-cafeterias');
      return;
    }
    const found = resolved.page;
    this.resolved = resolved;
    this.page = found;
    this.items = this.group(found.sections);
    // Selector + default sucursal come from the static locations snapshot. Dates: prerendered from
    // the events snapshot (TransferState hands them to the browser), then refreshed from the API.
    this.buildBranches();
    this.branch = this.defaultBranch(found);
    this.applySeo(found);
    this.loadDates(found);
  }

  /** Inicio › Cursos › course › city on city pages; Inicio › Cursos › page elsewhere. */
  get crumbs(): EduCrumb[] {
    return this.page ? this.crumbsFor(this.page) : [];
  }

  private crumbsFor(p: LegacyCoursePage): EduCrumb[] {
    const ref = this.resolved?.ref;
    if (!ref) return educationCrumbs(p.h1);
    return [
      { label: 'Inicio', path: '/' },
      { label: 'Cursos', path: EDUCATION_HUB_PATH },
      { label: ref.course.crumb, path: ref.course.basePage ? primaryPath(`/${ref.course.basePage}`) : undefined },
      { label: ref.venue.label }
    ];
  }

  /** Official SAP course of the page (by the old page's categoryId, else its course slug). */
  get catalog(): CatalogCourse | undefined {
    const p = this.page;
    return p ? catalogByCategory(p.categoryId) ?? catalogByCourseSlug(p.courseSlug) : undefined;
  }

  /** Sucursal city of the page (city pages), else the old page's city. */
  get pageCity(): string {
    const p = this.page;
    return this.resolved?.location?.city || locationById(p?.locationId ?? null)?.city || p?.city || '';
  }

  /** Hero facts: official table (days, effective hours, schedule, price) or the old page's values. */
  get metaItems(): ReadonlyArray<{ icon: string; label: string }> {
    const c = this.catalog;
    if (!c) return this.page?.meta ?? [];
    return [
      { icon: 'date', label: daysLabel(c) },
      { icon: 'time', label: hoursLabel(c) },
      { icon: 'time', label: `Horario: ${c.schedule}` },
      { icon: 'price', label: formatMXN(c.price) }
    ];
  }

  /** Combo básico + especializado (hidden on Tijuana pages: it does not apply there). */
  get combo(): string {
    const combo = comboFor(this.catalog, this.pageCity);
    return combo ? comboNote(combo) : '';
  }

  /** Address for the hero sentence (without a trailing period: the sentence adds one). */
  introAddress(l: EtruscaLocation): string {
    return l.displayAddress.replace(/[.\s]+$/, '');
  }

  /** Sucursal of the city page (for the hero intro of generated pages). */
  get cityLocation(): EtruscaLocation | undefined {
    return this.resolved?.location;
  }

  /** Consecutive "card" sections (image + text + link) render as a grid. */
  private group(sections: ReadonlyArray<LegacySection>): RenderItem[] {
    const out: RenderItem[] = [];
    for (const s of sections) {
      const last = out[out.length - 1];
      if (s.card) {
        if (last && last.kind === 'cards') last.sections.push(s);
        else out.push({ kind: 'cards', sections: [s] });
      } else {
        out.push({ kind: 'section', section: s });
      }
    }
    return out;
  }

  ctaLink(b: { href?: string; courseSlug?: string }): string {
    if (b.courseSlug) return COURSE_PUBLIC_PATH_BY_SLUG[b.courseSlug] || '/cursos-para-baristas-y-talleres-para-cafeterias';
    return b.href || '/cursos-para-baristas-y-talleres-para-cafeterias';
  }

  isExternal(b: { href?: string; courseSlug?: string }): boolean {
    return !b.courseSlug && !!b.href && /^(https?:|mailto:|tel:)/.test(b.href);
  }

  /**
   * D2: course × sede page without upcoming dates → noindex,follow (self-canonical); cold brew pages
   * point to the brew bar page of the same sede when that one is indexable (page-indexing.ts). Runs
   * in the prerender (events snapshot) and again in the browser with the live API.
   */
  private applyIndexing(p: LegacyCoursePage, upcoming: ReadonlyArray<any>) {
    const ind = cityPageIndexing(p.path, upcoming);
    if (!ind) return;
    if (ind.canonical) {
      this.seo.setRobots('index,follow');
      this.seo.setCanonicalPath(ind.canonical);
    } else {
      this.seo.setRobots(ind.index ? 'index,follow' : 'noindex,follow');
      this.seo.setCanonicalPath(`/${p.path}`);
    }
  }

  private applySeo(p: LegacyCoursePage) {
    const course = p.courseSlug ? courseBySlug(p.courseSlug) : null;
    const cat = this.catalog;
    this.seo.set({
      title: p.title,
      description: p.description,
      keywords: p.keywords,
      image: p.image,
      ogType: 'article',
      // A1: CDMX barista sedes carry a canonical to /curso-de-barista-cdmx/ (primary-urls.ts).
      path: canonicalOverride(`/${p.path}`) ?? `/${p.path}`,
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'Course',
          '@id': url + '#course',
          name: p.h1,
          description: p.description,
          url,
          image: /^https?:\/\//i.test(p.image) ? p.image : origin + p.image,
          provider: {
            '@type': 'Organization',
            '@id': origin + '/#organization',
            name: 'Café Etrusca',
            url: origin + '/'
          },
          educationalLevel: course?.kind || 'talleres',
          inLanguage: 'es-MX',
          ...(cat ? { courseCode: cat.clave, timeRequired: catalogDuration(cat), offers: catalogOffer(cat, url) } : {}),
          ...(this.resolved?.location ? { hasCourseInstance: courseInstance(this.resolved.location) } : {})
        },
        breadcrumbJsonLd(origin, this.crumbsFor(p), url)
      ]
    });
  }

  /**
   * Calendar like the old site: /api/Event?categoryId=<old page's category> (every category on
   * /curso-de-cafe and /curso-de-cafeteria) + /api/Location for the sucursal selector. Defaults to
   * the old page's locationId, else its city (CDMX → every CDMX sucursal), else all sucursales.
   * Also runs while prerendering: /api/Event, else public/data/events.json (EventService).
   */
  private loadDates(p: LegacyCoursePage) {
    const categoryId = p.categoryId ?? (p.courseSlug ? courseBySlug(p.courseSlug)?.id : null) ?? null;
    this.allCourses = !categoryId;
    this.eventService.getRawEvents(categoryId).subscribe({
      next: (raw) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = (raw || [])
          .filter((e) => {
            const start = new Date(e?.start);
            return !isNaN(start.getTime()) && start >= today;
          })
          .sort((a, b) => String(a.start).localeCompare(String(b.start)));
        this.events = upcoming.map((e) => {
          const date = this.eventService.mapEventToDate(e) as CourseDate;
          return {
            date,
            locationId: toId(e?.locationId ?? e?.location?.id),
            month: date.month,
            course: courseName(String(e?.category?.name || ''))
          };
        });
        this.datesLoaded = true;
        this.buildBranches(upcoming);
        this.applyIndexing(p, upcomingEvents(upcoming));
      },
      error: () => {
        this.datesLoaded = true;
      }
    });
  }

  /**
   * Sucursales from locations.data.ts (snapshot of /api/Location; "Sucursal …" entries), plus any
   * location an event uses that the snapshot lacks. CDMX group first. Counts once events load.
   */
  private buildBranches(raw: any[] = []) {
    const byId = new Map<number, { name: string; city: string }>();
    for (const l of COURSE_VENUES) byId.set(l.id, { name: l.name, city: l.city });
    for (const e of raw) {
      const id = toId(e?.locationId ?? e?.location?.id);
      if (id !== null && !byId.has(id)) byId.set(id, { name: String(e?.location?.name || ''), city: String(e?.location?.city || '') });
    }
    this.cdmxIds = new Set([...byId].filter(([, l]) => norm(l.city) === 'cdmx').map(([id]) => id));
    const loaded = raw.length > 0 || this.datesLoaded;
    const count = (ids: Set<number> | null) =>
      loaded ? this.events.filter((e) => !ids || (e.locationId !== null && ids.has(e.locationId))).length : null;
    const options: BranchOption[] = [{ value: 'all', label: 'Todas las sucursales', count: count(null) }];
    if (this.cdmxIds.size > 1) options.push({ value: 'cdmx', label: 'CDMX (todas las sedes)', count: count(this.cdmxIds) });
    const rest = [...byId]
      .map(([id, l]) => ({ value: String(id), label: branchLabel(l.name), count: count(new Set([id])) }))
      .sort((a, b) => a.label.localeCompare(b.label, 'es'));
    this.branches = [...options, ...rest];
  }

  /** Old page's locationId, else its city (CDMX → every CDMX sucursal), else all sucursales. */
  private defaultBranch(p: LegacyCoursePage): string {
    if (p.locationId && this.branches.some((b) => b.value === String(p.locationId))) return String(p.locationId);
    const city = norm(p.city || '');
    if (!city) return 'all';
    if (city === 'cdmx' || city === 'ciudad de mexico') return this.cdmxIds.size ? 'cdmx' : 'all';
    const venues = COURSE_VENUES.filter((l) => this.branches.some((b) => b.value === String(l.id)));
    const match =
      venues.find((l) => norm(l.venueLabel) === city || norm(branchLabel(l.name)) === city) ||
      venues.find((l) => norm(l.venueLabel).includes(city) || city.includes(norm(branchLabel(l.name)))) ||
      venues.find((l) => norm(l.city) === city);
    return match ? String(match.id) : 'all';
  }

  /** Sucursal(es) shown in the "Sede" block for the current selection. */
  get sedes(): EtruscaLocation[] {
    if (this.branch === 'all') return [];
    if (this.branch === 'cdmx') return COURSE_VENUES.filter((l) => this.cdmxIds.has(l.id));
    const l = locationById(Number(this.branch));
    return l ? [l] : [];
  }

  phones(l: EtruscaLocation): PhoneLink[] {
    return l.telephone
      .split('/')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((label) => {
        const digits = label.replace(/\D/g, '');
        return { label, href: `tel:+52${digits.length > 10 ? digits.slice(-10) : digits}` };
      });
  }

  private inBranch(e: CalendarEvent, branch = this.branch): boolean {
    if (branch === 'all') return true;
    if (branch === 'cdmx') return e.locationId !== null && this.cdmxIds.has(e.locationId);
    return String(e.locationId) === branch;
  }

  get selectedBranchLabel(): string {
    return this.branches.find((b) => b.value === this.branch)?.label || 'esta sucursal';
  }

  /** Months available for the selected sucursal. */
  get months(): string[] {
    return [...new Set(this.events.filter((e) => this.inBranch(e)).map((e) => e.month))];
  }

  get filteredEvents(): CalendarEvent[] {
    return this.events.filter((e) => this.inBranch(e) && (!this.month || e.month === this.month));
  }

  onBranchChange() {
    if (this.month && !this.months.includes(this.month)) this.month = '';
    this.visible = PAGE_SIZE;
  }

  onMonthChange() {
    this.visible = PAGE_SIZE;
  }

  showMore() {
    this.visible += PAGE_SIZE;
  }

  showAllBranches() {
    this.branch = 'all';
    this.month = '';
    this.visible = PAGE_SIZE;
  }

  openInterest(date?: CourseDate) {
    this.interestDate = date || {
      days: '',
      month: '',
      branch: this.branch !== 'all' ? this.selectedBranchLabel : '',
      duration: '',
      hours: 'Consultar horario',
      email: 'educacion@cafeetrusca.com',
      telephone: '(55) 4166 8777'
    };
    this.interestOpen = true;
  }

  closeInterest() {
    this.interestOpen = false;
  }
}

function norm(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

/** Course JSON-LD instance at the city page's sucursal (API address fields only). */
function courseInstance(l: EtruscaLocation) {
  return {
    '@type': 'CourseInstance',
    courseMode: 'Onsite',
    location: {
      '@type': 'Place',
      name: `Café Etrusca ${l.name}`,
      ...(l.telephone ? { telephone: l.telephone } : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: l.address,
        addressLocality: l.city,
        ...(l.postalCode ? { postalCode: l.postalCode } : {}),
        addressCountry: 'MX'
      },
      ...(l.latitude && l.longitude
        ? { geo: { '@type': 'GeoCoordinates', latitude: Number(l.latitude), longitude: Number(l.longitude) } }
        : {})
    }
  };
}

function toId(v: unknown): number | null {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** "FORMACIÓN PARA UN BARISTA" → "Formación para un barista" (API category names are upper case). */
function courseName(name: string): string {
  const t = name.trim().toLocaleLowerCase('es-MX');
  return t ? t.charAt(0).toLocaleUpperCase('es-MX') + t.slice(1) : '';
}

/** "Sucursal Zona Rosa" → "Zona Rosa". */
function branchLabel(name: string): string {
  return name.replace(/^\s*sucursal\s+/i, '').trim() || name;
}
