/** Public SEO paths for education catalog courses (cafeetrusca.com). */
import { COURSES, type Course } from './education.data';
import { EMPRENDE_PATH } from './pages/course-branch-page/course-branch.data';
import { LEGACY_COURSE_PATH_SET } from './legacy-course-paths';
import { PRIMARY_REDIRECTS, primaryPath } from './primary-urls';

export const EDUCATION_HUB_PATH = '/cursos-para-baristas-y-talleres-para-cafeterias';

/** "Formación de emprendedores" lives on its own landing family (+12 city pages). */
export const EMPRENDE_COURSE_SLUG = 'formacion-de-emprendedores';

/**
 * Canonical public path of a course:
 * - /educacion/<kind>/<slug>  for every catalog course
 * - /emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria  for Formación de emprendedores
 */
export function courseCanonicalPath(course: Pick<Course, 'slug' | 'kind'>): string {
  if (course.slug === EMPRENDE_COURSE_SLUG) return `/${EMPRENDE_PATH}`;
  return `/educacion/${course.kind}/${course.slug}`;
}

/**
 * Internal course slug → PRIMARY public path (starts with /). Courses whose /educacion/ page 301s to
 * an old page with history (primary-urls.ts) link straight to that page, so every internal link
 * (cards, CTAs, calendars, breadcrumbs) points to the primary URL.
 */
export const COURSE_PUBLIC_PATH_BY_SLUG: Readonly<Record<string, string>> = Object.fromEntries(
  COURSES.map((c) => [c.slug, primaryPath(courseCanonicalPath(c))])
);

/**
 * Legacy flat URLs (old cafeetrusca.com / previous build) → internal course slug.
 * They no longer render a page: they 301/redirect to the canonical path.
 */
export const COURSE_LEGACY_PATH_BY_SLUG: Readonly<Record<string, string>> = {
  'tostado-basico': '/taller-basico-de-tostado-de-cafe',
  'formacion-barista': '/taller-basico-para-baristas',
  'arte-latte': '/taller-de-arte-latte-nivel-basico',
  'bebidas-frias': '/taller-de-bebidas-frias',
  'bubble-tea-iced-coffee': '/taller-de-bubble-tea-e-iced-coffee',
  'formacion-barista-especializado': '/taller-para-baristas-especializados',
  'arte-latte-especializado': '/taller-de-arte-latte-especializados',
  'bubble-tea-especializado': '/taller-de-bubble-tea-especializado',
  'mixologia': '/taller-de-mixologia-con-cafe-sin-alcohol',
  'metodos-de-extraccion': '/taller-de-brew-bar',
  'inmersiona-te': '/experiencia-inmersiona-te',
  'crear-mezcla-de-cafe': '/experiencia-aprende-a-crear-tu-propia-mezcla-de-cafe',
  'oasis-bebidas-frias': '/experiencia-el-oasis-del-sabor-con-bebidas-frias',
  'arte-creatividad-mixologia': '/experiencia-el-arte-y-la-creatividad-de-preparar-mixologia',
  'coffee-lover-en-invierno': '/experiencia-coffee-lover-en-invierno',
  'experiencia-sensorial': '/experiencia-sensorial',
  'catacion-de-cafe': '/experiencia-catacion-de-cafe',
  'verano-chillout': '/sesion-verano-chillout',
  'bubble-power-session': '/sesion-bubble-power-session',
  'tisanas-en-verano': '/sesion-tisanas-en-verano',
  'versatilidad-mezcla-especial-1': '/sesion-versatilidad-mezcla-especial-1',
  'orgullo-mexicano': '/sesion-orgullo-mexicano',
  'bubble-lab': '/sesion-bubble-lab',
  'innovacion-en-jarabes': '/sesion-innovacion-en-jarabes',
  'matchamania': '/sesion-matchamania',
  'elixir-del-terror': '/sesion-elixir-del-terror',
  'pumpkin-vibes': '/sesion-pumpkin-vibes',
  'un-otono-calido': '/sesion-un-otono-calido',
  'sorbos-de-chillout-en-otono': '/sesion-sorbos-de-chillout-en-otono',
  'cafe-de-temporada': '/sesion-cafe-de-temporada',
  'tisanas-para-las-posadas': '/sesion-tisanas-para-las-posadas',
  'nochebuena-calida': '/sesion-nochebuena-calida',
};

/**
 * Legacy flat path → canonical path pairs (used by Angular routes, server.ts and web.config).
 * Paths served again as legacy pages (legacy-course-paths.ts, old CursoController actions)
 * are excluded: they render their own page instead of redirecting.
 */
export const COURSE_LEGACY_REDIRECTS: ReadonlyArray<{ from: string; to: string }> = Object.entries(
  COURSE_LEGACY_PATH_BY_SLUG
)
  .filter(([slug]) => !!COURSE_PUBLIC_PATH_BY_SLUG[slug])
  .filter(([, from]) => !LEGACY_COURSE_PATH_SET.has(from))
  .map(([slug, from]) => ({ from, to: COURSE_PUBLIC_PATH_BY_SLUG[slug] }))
  .filter(({ from, to }) => from !== to);

export function coursePublicPath(course: Pick<Course, 'slug' | 'kind'> & { title?: string }): string {
  return COURSE_PUBLIC_PATH_BY_SLUG[course.slug] || courseCanonicalPath(course);
}

/**
 * Params to prerender /educacion/:kind/:slug: every catalog course except the emprende landing and
 * the /educacion/ pages that 301 to their primary URL (they must have no HTML file, or the static
 * host would serve them instead of the 301).
 */
export const COURSE_DETAIL_PRERENDER_PARAMS: ReadonlyArray<{ kind: string; slug: string }> = COURSES
  .filter((c) => c.slug !== EMPRENDE_COURSE_SLUG)
  .filter((c) => !PRIMARY_REDIRECTS[`/educacion/${c.kind}/${c.slug}`])
  .map((c) => ({ kind: c.kind, slug: c.slug }));
