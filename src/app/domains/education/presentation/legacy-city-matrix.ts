import { COURSE_VENUE_LIST, CourseVenue } from '../../../shared/kernel/data/course-venues.data';

/**
 * Course × sucursal city pages (old-site pattern `<course-slug>-en-<venue-slug>`, e.g.
 * taller-basico-para-baristas-en-zona-rosa-cdmx). Every course below gets one page per course
 * venue in course-venues.data.ts (snapshot of /api/Location, "Sucursal …" entries).
 * Pages that already existed on the old site (migrated 1:1 in legacy-course-pages.data.ts) are
 * never overwritten; the rest are generated at runtime by legacy-city-pages.ts from `template`:
 * - template = an old city page (families that had city variants) → same content, city swapped
 *   (`templateCity` → new city), exactly like the old siblings;
 * - template = the base course page → " en <Ciudad>" inserted in title (before " - " / " | "),
 *   description (after `descAnchor`, or prefixed), H1, calendar heading and one keyword.
 * Small on purpose: imported by the eager routes/sitemap code (legacy-course-paths.ts).
 */
export interface CityCourse {
  /** Old-site course slug; city pages are `${base}-en-${venue.slug}`. */
  base: string;
  /** Breadcrumb label of the course (Inicio › Cursos › course › city). */
  crumb: string;
  /** Legacy page (legacy-course-pages.data.ts) the generated pages copy. */
  template: string;
  /** City name used in `template` (sibling mode). Longest variant first. */
  templateCity?: ReadonlyArray<string>;
  /** Base mode: phrase of the description after which " en <Ciudad>" goes. */
  descAnchor?: string;
  /** Base mode: keyword added as "<keyword> en <Ciudad>". */
  keyword?: string;
  /** Base legacy page to link from the breadcrumb (when it exists). */
  basePage?: string;
}

export const CITY_COURSES: ReadonlyArray<CityCourse> = [
  {
    base: 'taller-basico-para-baristas',
    crumb: 'Taller básico para baristas',
    template: 'taller-basico-para-baristas-en-toluca',
    templateCity: ['Toluca'],
    basePage: 'taller-basico-para-baristas'
  },
  {
    base: 'taller-de-arte-latte-nivel-basico',
    crumb: 'Taller básico de arte latte',
    template: 'taller-de-arte-latte-nivel-basico-en-toluca',
    templateCity: ['Toluca'],
    basePage: 'taller-de-arte-latte-nivel-basico'
  },
  {
    base: 'taller-de-bubble-tea-&-iced-coffee',
    crumb: 'Taller de Bubble Tea & Iced Coffee',
    template: 'taller-de-bubble-tea-&-iced-coffee-en-toluca',
    templateCity: ['Toluca'],
    basePage: 'taller-de-bubble-tea-&-iced-coffee'
  },
  {
    base: 'taller-de-catacion-de-cafes-mexicanos',
    crumb: 'Taller de catación de cafés mexicanos',
    template: 'taller-de-catacion-de-cafes-mexicanos-en-zona-rosa-cdmx',
    templateCity: ['Zona Rosa CDMX', 'Zona Rosa']
  },
  {
    base: 'taller-para-baristas-especializados',
    crumb: 'Taller para baristas especializados',
    template: 'taller-para-baristas-especializados',
    descAnchor: 'en nuestro taller para baristas especializados',
    keyword: 'curso barista especializado',
    basePage: 'taller-para-baristas-especializados'
  },
  {
    base: 'taller-de-arte-latte-especializados',
    crumb: 'Taller de arte latte especializado',
    template: 'taller-de-arte-latte-especializados',
    descAnchor: 'Taller de arte latte especializado',
    keyword: 'curso de arte latte especializado',
    basePage: 'taller-de-arte-latte-especializados'
  },
  {
    base: 'taller-de-bubble-tea-especializado',
    crumb: 'Taller de Bubble Tea Especializado',
    template: 'taller-de-bubble-tea-especializado',
    descAnchor: 'Taller de Bubble Tea Especializado',
    keyword: 'Taller de Bubble tea especializado',
    basePage: 'taller-de-bubble-tea-especializado'
  },
  {
    base: 'taller-de-bebidas-frias',
    crumb: 'Taller de bebidas frías',
    template: 'taller-de-bebidas-frias',
    keyword: 'taller de bebidas frías',
    basePage: 'taller-de-bebidas-frias'
  },
  {
    base: 'taller-de-cold-brew',
    crumb: 'Taller de Cold Brew',
    template: 'taller-de-cold-brew',
    descAnchor: 'Taller de brew bar',
    keyword: 'Curso Cold Brew',
    basePage: 'taller-de-cold-brew'
  },
  {
    base: 'taller-de-brew-bar',
    crumb: 'Taller de Brew Bar & Cold Brew',
    template: 'taller-de-brew-bar',
    descAnchor: 'Taller de brew bar',
    keyword: 'Curso Brew Bar',
    basePage: 'taller-de-brew-bar'
  },
  {
    base: 'taller-de-mixologia-con-cafe-sin-alcohol',
    crumb: 'Taller de mixología con café sin alcohol',
    template: 'taller-de-mixologia-con-cafe-sin-alcohol',
    descAnchor: 'Taller de mixología con café sin alcohol',
    keyword: 'Taller de mixología',
    basePage: 'taller-de-mixologia-con-cafe-sin-alcohol'
  },
  {
    base: 'taller-basico-de-tostado-de-cafe',
    crumb: 'Taller básico de tostado de café',
    template: 'taller-basico-de-tostado-de-cafe',
    descAnchor: 'Taller básico de tostado de café',
    keyword: 'curso de tostado de café',
    basePage: 'taller-basico-de-tostado-de-cafe'
  }
];

export interface CityPageRef {
  path: string;
  course: CityCourse;
  venue: CourseVenue;
}

/** Every course × venue combination (existing + to generate). */
export const CITY_PAGE_REFS: ReadonlyArray<CityPageRef> = CITY_COURSES.flatMap((course) =>
  COURSE_VENUE_LIST.map((venue) => ({ path: `${course.base}-en-${venue.slug}`, course, venue }))
);

export function cityPageRef(path: string): CityPageRef | undefined {
  return CITY_PAGE_REFS.find((r) => r.path === path);
}

/** Course base slug by API event categoryId (/api/Event → category.id). */
export const CITY_COURSE_BY_CATEGORY: Readonly<Record<number, string>> = {
  1: 'taller-basico-para-baristas',
  2: 'taller-de-arte-latte-nivel-basico',
  3: 'taller-de-catacion-de-cafes-mexicanos',
  4: 'taller-de-brew-bar',
  5: 'taller-basico-de-tostado-de-cafe',
  7: 'taller-de-bubble-tea-&-iced-coffee',
  9: 'taller-de-mixologia-con-cafe-sin-alcohol',
  12: 'taller-de-bubble-tea-especializado',
  16: 'taller-para-baristas-especializados',
  26: 'taller-de-arte-latte-especializados',
  38: 'taller-de-bebidas-frias'
};

/** Course keywords in /cursos-y-talleres/<slug> event slugs → course base slug (most specific first). */
export const EVENT_SLUG_COURSES: ReadonlyArray<[RegExp, string]> = [
  [/bubble-tea-especializado/, 'taller-de-bubble-tea-especializado'],
  [/bubble/, 'taller-de-bubble-tea-&-iced-coffee'],
  [/arte-latte-especializado/, 'taller-de-arte-latte-especializados'],
  [/latte/, 'taller-de-arte-latte-nivel-basico'],
  [/baristas?-especializados?/, 'taller-para-baristas-especializados'],
  [/barista|barismo/, 'taller-basico-para-baristas'],
  [/mixologia/, 'taller-de-mixologia-con-cafe-sin-alcohol'],
  [/bebidas-frias/, 'taller-de-bebidas-frias'],
  [/cold-brew/, 'taller-de-cold-brew'],
  [/brew-bar|metodos/, 'taller-de-brew-bar'],
  [/tostado/, 'taller-basico-de-tostado-de-cafe'],
  [/catacion/, 'taller-de-catacion-de-cafes-mexicanos']
];

/** Venue whose slug (or slug without "-cdmx") appears in an event slug, longest first. */
export function venueInEventSlug(slug: string): CourseVenue | undefined {
  const s = `-${slug.toLowerCase()}-`;
  const keys = COURSE_VENUE_LIST.flatMap((v) => [
    { v, k: v.slug },
    ...(v.slug.endsWith('-cdmx') ? [{ v, k: v.slug.replace(/-cdmx$/, '') }] : [])
  ]).sort((a, b) => b.k.length - a.k.length);
  return keys.find(({ k }) => s.includes(`-${k}-`))?.v;
}

/**
 * Course city page for an event slug (e.g. curso-basico-barista-tijuana-julio-2026 →
 * taller-basico-para-baristas-en-tijuana). Used for past events that left the API: the 301
 * of the old event URL and the client-side fallback of unknown /cursos-y-talleres/* slugs.
 */
export function cityPagePathForEventSlug(slug: string): string | null {
  const s = slug.toLowerCase();
  const course = courseBaseInEventSlug(s);
  const venue = venueInEventSlug(s);
  return course && venue ? `${course}-en-${venue.slug}` : null;
}

/** Course base slug whose keyword appears in an event slug (first match of EVENT_SLUG_COURSES), or null. */
export function courseBaseInEventSlug(slug: string): string | null {
  const s = String(slug || '').toLowerCase();
  return EVENT_SLUG_COURSES.find(([re]) => re.test(s))?.[1] ?? null;
}
