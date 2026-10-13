/**
 * D2 (SEO review 2026-09-25, approved): course × sede pages WITHOUT upcoming dates get
 * `noindex,follow` and leave the sitemap; they come back automatically on the next build (and in the
 * browser as soon as /api/Event lists a date). Exception: city pages with GSC clicks stay indexable.
 * The same rule is used by the legacy/emprende pages (robots meta), scripts/write-sitemap.mjs and the
 * past-event 301s (never redirect to a noindex page) → one source of truth.
 */
import { cityPageRef } from './legacy-city-matrix';
import { resolveLegacyPage } from './legacy-city-pages';
import { EMPRENDE_BRANCHES, EMPRENDE_PATH } from './pages/course-branch-page/course-branch.data';
import { COURSE_VENUE_LIST } from '../../../shared/kernel/data/course-venues.data';
import { canonicalOverride } from './primary-urls';

/** Old city pages with GSC clicks (24 jun – 23 sep 2026): always indexable (A2/D2 exception). */
export const CITY_PAGES_WITH_CLICKS: Readonly<Record<string, number>> = {
  'taller-de-arte-latte-nivel-basico-en-guadalajara': 43,
  'taller-de-arte-latte-nivel-basico-en-monterrey': 37,
  'taller-de-arte-latte-nivel-basico-en-queretaro': 32,
  'taller-de-arte-latte-nivel-basico-en-puebla': 25,
  'taller-de-bubble-tea-&-iced-coffee-en-zona-rosa-cdmx': 22,
  'taller-de-arte-latte-nivel-basico-en-tijuana': 12,
  'taller-de-arte-latte-nivel-basico-en-toluca': 11,
  'taller-de-arte-latte-nivel-basico-en-zona-rosa-cdmx': 11,
  'taller-de-bubble-tea-&-iced-coffee-en-xalapa': 11,
  'taller-de-arte-latte-nivel-basico-en-leon': 4,
  'taller-de-arte-latte-nivel-basico-en-xalapa': 3
};

/** National primary of each city-page course (fallback of past-event 301s when the city page is noindex). */
const NATIONAL_BY_BASE: Readonly<Record<string, string>> = {
  'taller-basico-para-baristas': '/educacion/talleres/formacion-barista',
  'taller-de-arte-latte-nivel-basico': '/taller-de-arte-latte-nivel-basico',
  'taller-de-bubble-tea-&-iced-coffee': '/taller-de-bubble-tea-&-iced-coffee',
  'taller-de-catacion-de-cafes-mexicanos': '/educacion/experiencias/catacion-de-cafe',
  'taller-para-baristas-especializados': '/taller-para-baristas-especializados',
  'taller-de-arte-latte-especializados': '/taller-de-arte-latte-especializados',
  'taller-de-bubble-tea-especializado': '/taller-de-bubble-tea-especializado',
  'taller-de-bebidas-frias': '/educacion/talleres/bebidas-frias',
  'taller-de-cold-brew': '/taller-de-cold-brew',
  'taller-de-brew-bar': '/taller-de-brew-bar',
  'taller-de-mixologia-con-cafe-sin-alcohol': '/taller-de-mixologia-con-cafe-sin-alcohol',
  'taller-basico-de-tostado-de-cafe': '/taller-basico-de-tostado-de-cafe'
};

export interface PageIndexing {
  index: boolean;
  /** Canonical to another (primary) page; never set together with index=false. */
  canonical: string | null;
  inSitemap: boolean;
  reason: string;
}

const EMPRENDE_CATEGORY = 10;

function eventCategory(e: any): number {
  return Number(e?.categoryId ?? e?.category?.id);
}

function eventLocation(e: any): number {
  return Number(e?.locationId ?? e?.location?.id);
}

/**
 * Events not finished yet (end, or start when there is no end, >= now): the SAME rule as the prerender
 * (EventService snapshot filter) and the event pages/sitemap (isUpcomingEvent), so a page is indexable
 * exactly when the dates it lists are there.
 */
export function upcomingEvents<T = any>(events: ReadonlyArray<T> | null | undefined, ref: Date = new Date()): T[] {
  return (events || []).filter((e: any) => {
    const d = new Date(e?.end || e?.start || '');
    return !isNaN(d.getTime()) && d.getTime() >= ref.getTime();
  });
}

function hasDates(events: ReadonlyArray<any>, categoryId: number | undefined, locationId: number): boolean {
  if (!categoryId) return false;
  return events.some((e) => eventCategory(e) === categoryId && eventLocation(e) === locationId);
}

function clean(path: string): string {
  return String(path || '').split(/[?#]/)[0].replace(/^\/+|\/+$/g, '');
}

function emprendeVenueId(citySlug: string): number | null {
  const v = COURSE_VENUE_LIST.find((x) => x.slug === citySlug || x.slug === `${citySlug}-cdmx`);
  return v ? v.id : null;
}

/**
 * Indexing of a course × sede page (legacy/generated city pages and the 12 emprende city pages).
 * `events`: UPCOMING events of any category, or null when unknown (then the page stays indexable).
 * Returns null for pages that are not course × sede pages (they are always indexable).
 */
export function cityPageIndexing(path: string, events: ReadonlyArray<any> | null): PageIndexing | null {
  const p = clean(path);
  const canon = canonicalOverride('/' + p);
  if (canon) return { index: true, canonical: canon, inSitemap: false, reason: 'canonical a la URL principal (A1)' };

  if (p.startsWith(`${EMPRENDE_PATH}-en-`)) {
    const citySlug = p.slice(EMPRENDE_PATH.length + 4);
    if (!EMPRENDE_BRANCHES.some((b) => b.citySlug === citySlug)) return null;
    const venueId = emprendeVenueId(citySlug);
    if (events === null || (venueId !== null && hasDates(events, EMPRENDE_CATEGORY, venueId))) {
      return { index: true, canonical: null, inSitemap: true, reason: 'con fechas' };
    }
    return { index: false, canonical: null, inSitemap: false, reason: 'sin fechas' };
  }

  const ref = cityPageRef(p);
  if (!ref) return null;
  const categoryId = resolveLegacyPage(p)?.page?.categoryId;

  if (ref.course.base === 'taller-de-cold-brew') {
    // Same course as brew bar (TYC-009): canonical to the brew bar page of the same sede when that one
    // is indexable; otherwise noindex (no canonical to a noindex page).
    const brew = `taller-de-brew-bar-en-${ref.venue.slug}`;
    const b = cityPageIndexing(brew, events);
    if (b && b.index && !b.canonical) {
      return { index: true, canonical: '/' + brew, inSitemap: false, reason: 'cold brew = brew bar (canonical)' };
    }
    return { index: false, canonical: null, inSitemap: false, reason: 'sin fechas (cold brew = brew bar)' };
  }

  if (events === null || hasDates(events, categoryId, ref.venue.id)) {
    return { index: true, canonical: null, inSitemap: true, reason: 'con fechas' };
  }
  if (CITY_PAGES_WITH_CLICKS[p]) {
    return { index: true, canonical: null, inSitemap: true, reason: 'sin fechas, con clics en GSC' };
  }
  return { index: false, canonical: null, inSitemap: false, reason: 'sin fechas' };
}

/**
 * Target to use for a 301 that points to `path` (past events): the city page when indexable, its
 * canonical primary when canonicalized, else the course's national primary. Non city pages unchanged.
 */
/** National primary page of a city-page course base (e.g. taller-de-arte-latte-nivel-basico), or null. */
export function nationalCoursePath(base: string | null | undefined): string | null {
  return (base && NATIONAL_BY_BASE[base]) || null;
}

export function indexableTarget(path: string, events: ReadonlyArray<any> | null): string {
  const ind = cityPageIndexing(path, events);
  if (!ind) return path;
  if (ind.canonical) return ind.canonical;
  if (ind.index) return path;
  const p = clean(path);
  if (p.startsWith(`${EMPRENDE_PATH}-en-`)) return `/${EMPRENDE_PATH}`;
  const ref = cityPageRef(p);
  return (ref && NATIONAL_BY_BASE[ref.course.base]) || '/cursos-para-baristas-y-talleres-para-cafeterias';
}
