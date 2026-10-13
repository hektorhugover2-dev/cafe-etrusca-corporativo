import { COURSE_VENUE_LIST, CourseVenue } from '../../../shared/kernel/data/course-venues.data';
import { CITY_COURSE_BY_CATEGORY, cityPagePathForEventSlug, venueInEventSlug } from './legacy-city-matrix';
import { LEGACY_COURSE_PATH_SET } from './legacy-course-paths';
import { EMPRENDE_BRANCHES, EMPRENDE_PATH } from './pages/course-branch-page/course-branch.data';

/** /cursos-y-talleres/<slug> event detail pages (prerendered from /api/Event at build time). */
export const EVENT_DETAIL_PREFIX = '/cursos-y-talleres/';

export function eventDetailPath(slug: string): string {
  return EVENT_DETAIL_PREFIX + slug;
}

/**
 * Past or unknown /cursos-y-talleres/<slug> WITHOUT a matching course page (past-event-target.ts):
 * the cursos section with the "solicitar información" form open (#solicitar-informacion opens the
 * same CourseInterestModal, without course date). A fragment, not a query: Google only sees the real
 * page /cursos-para-baristas-y-talleres-para-cafeterias/ (one URL, no duplicates).
 * Used by the IIS web.config 301, server.ts and the in-app redirect (event-detail.resolver.ts).
 */
export const PAST_EVENT_FORM_PATH = '/cursos-para-baristas-y-talleres-para-cafeterias';
export const PAST_EVENT_FORM_FRAGMENT = 'solicitar-informacion';
export const PAST_EVENT_FORM_TARGET = `${PAST_EVENT_FORM_PATH}/#${PAST_EVENT_FORM_FRAGMENT}`;

/** Event already finished (end, or start when there is no end). API dates are local wall time. */
export function isPastEvent(e: { start?: string; end?: string } | null | undefined, now = Date.now()): boolean {
  const end = new Date(e?.end || e?.start || '');
  return !isNaN(end.getTime()) && end.getTime() < now;
}

/**
 * Course city page for an event (by categoryId + locationId when known, else parsed from the
 * slug): e.g. arte latte @ Zona Rosa → /taller-de-arte-latte-nivel-basico-en-zona-rosa-cdmx;
 * emprendedores → /emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-<ciudad>.
 * Used by the event page ("more dates"), the 301 of past event URLs and the fallback of
 * unknown slugs. null when there is no matching page.
 */
export function cityPageForEvent(slug: string, categoryId?: number | null, locationId?: number | null): string | null {
  const s = String(slug || '').toLowerCase();
  const venue: CourseVenue | undefined =
    (locationId ? COURSE_VENUE_LIST.find((v) => v.id === Number(locationId)) : undefined) ?? venueInEventSlug(s);
  if (Number(categoryId) === 10 || s.startsWith('emprendiendo')) {
    if (!venue) return `/${EMPRENDE_PATH}`;
    const short = venue.slug.replace(/-cdmx$/, '');
    const branch = EMPRENDE_BRANCHES.find((b) => b.citySlug === venue.slug || b.citySlug === short);
    return branch ? `/${EMPRENDE_PATH}-en-${branch.citySlug}` : `/${EMPRENDE_PATH}`;
  }
  const base = categoryId ? CITY_COURSE_BY_CATEGORY[Number(categoryId)] : undefined;
  const path = base && venue ? `${base}-en-${venue.slug}` : cityPagePathForEventSlug(s);
  return path && LEGACY_COURSE_PATH_SET.has(`/${path}`) ? `/${path}` : null;
}
