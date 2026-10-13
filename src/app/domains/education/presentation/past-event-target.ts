/**
 * Course page for a past or unknown event URL /cursos-y-talleres/<slug> (the API only lists upcoming
 * dates, so such a URL has no page). Same mapping as the SEO review (tarea 7):
 *  1. course × sede page by categoryId + locationId (else parsed from the slug), e.g.
 *     curso-basico-barista-tijuana-julio-2026 → /taller-basico-para-baristas-en-tijuana;
 *     emprendedores → /emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria[-en-<ciudad>];
 *  2. no page for that sede (or no sede in the slug): the national page of the course;
 *  3. catalog course of the event's categoryId (e.g. experiencias);
 *  4. null → no course: the caller sends the visitor to PAST_EVENT_FORM_TARGET (info form).
 * Targets are site paths without trailing slash; seo-redirects.ts resolves them to the final
 * canonical URL (noindex city page → primary, no chains).
 * Kept out of event-paths.ts on purpose: it pulls the course catalog (education.data.ts), so the
 * browser only loads it lazily when a past/unknown event is opened.
 */
import { COURSES } from './education.data';
import { coursePublicPath } from './course-public-paths';
import { cityPageForEvent } from './event-paths';
import { CITY_COURSE_BY_CATEGORY, courseBaseInEventSlug } from './legacy-city-matrix';
import { nationalCoursePath } from './page-indexing';

export function pastEventCoursePath(slug: string, categoryId?: number | null, locationId?: number | null): string | null {
  const cat = Number(categoryId) || null;
  const loc = Number(locationId) || null;
  const city = cityPageForEvent(slug, cat, loc);
  if (city) return city;
  const base = (cat && CITY_COURSE_BY_CATEGORY[cat]) || courseBaseInEventSlug(slug);
  const national = nationalCoursePath(base);
  if (national) return national;
  const course = cat ? COURSES.find((c) => c.id === cat) : undefined;
  return course ? coursePublicPath(course) : null;
}
