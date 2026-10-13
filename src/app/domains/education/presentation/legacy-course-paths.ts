import { CITY_PAGE_REFS } from './legacy-city-matrix';
import { PRIMARY_REDIRECTS } from './primary-urls';

/**
 * Legacy course/taller URLs served by the old .NET site (CursoController [HttpGet] actions).
 * They are real pages again (same path, trailing slash, self-canonical), rendered by
 * LegacyCoursePageComponent from legacy-course-pages.data.ts. Not linked from menus;
 * reachable by URL, prerendered and listed in the sitemap. Any 301 whose source is one of
 * these paths is dropped (see course-public-paths.ts and src/seo-redirects.ts).
 * Ordered by Search Console clicks (last 3 months, gsc.xlsx) — number in the comment.
 * GENERATED from the old Razor views; edit the content in legacy-course-pages.data.ts.
 */
export const ALL_MIGRATED_COURSE_PATHS: ReadonlyArray<string> = [
  "curso-de-barista-cdmx", // 584 clics
  "taller-de-bubble-tea-&-iced-coffee", // 174 clics
  "taller-basico-de-tostado-de-cafe", // 92 clics
  "taller-de-bubble-tea-especializado", // 52 clics
  "taller-de-arte-latte-nivel-basico", // 49 clics
  "taller-de-arte-latte-nivel-basico-en-guadalajara", // 43 clics
  "taller-de-arte-latte-nivel-basico-en-monterrey", // 37 clics
  "taller-de-arte-latte-nivel-basico-en-queretaro", // 32 clics
  "taller-de-arte-latte-nivel-basico-en-puebla", // 25 clics
  "taller-de-bubble-tea-&-iced-coffee-en-zona-rosa-cdmx", // 22 clics
  "experiencia-inmersiona-te", // 20 clics
  "taller-basico-para-baristas", // 20 clics
  "curso-de-cafe", // 18 clics
  "taller-de-brew-bar", // 18 clics
  "curso-de-barismo", // 16 clics
  "taller-de-cold-brew", // 15 clics
  "taller-de-arte-latte-nivel-basico-en-tijuana", // 12 clics
  "taller-de-arte-latte-nivel-basico-en-toluca", // 11 clics
  "taller-de-arte-latte-nivel-basico-en-zona-rosa-cdmx", // 11 clics
  "taller-de-bubble-tea-&-iced-coffee-en-xalapa", // 11 clics
  "taller-de-mixologia-con-cafe-sin-alcohol", // 9 clics
  "experiencia-coffee-lovers", // 8 clics
  "curso-de-cafeteria", // 5 clics
  "taller-de-arte-latte-nivel-basico-en-leon", // 4 clics
  "taller-de-arte-latte-nivel-basico-en-xalapa", // 3 clics
  "experiencia-arte-y-creatividad-de-preparar-mixologia", // 2 clics
  "experiencia-el-oasis-del-sabor-con-bebidas-frias", // 2 clics
  "taller-para-baristas-especializados", // 2 clics
  "taller-de-arte-latte-especializados", // 1 clics
  "curso-de-arte-latte", // 0 clics
  "curso-de-barista", // 0 clics
  "experiencia-aprende-a-crear-tu-propia-mezcla-de-cafe", // 0 clics
  "experiencia-servicio-al-cliente-en-barras-de-cafe", // 0 clics
  "taller-basico-para-baristas-en-guadalajara", // 0 clics
  "taller-basico-para-baristas-en-leon", // 0 clics
  "taller-basico-para-baristas-en-monterrey", // 0 clics
  "taller-basico-para-baristas-en-puebla", // 0 clics
  "taller-basico-para-baristas-en-queretaro", // 0 clics
  "taller-basico-para-baristas-en-tijuana", // 0 clics
  "taller-basico-para-baristas-en-toluca", // 0 clics
  "taller-basico-para-baristas-en-viaducto-cdmx", // 0 clics
  "taller-basico-para-baristas-en-xalapa", // 0 clics
  "taller-basico-para-baristas-en-zona-rosa-cdmx", // 0 clics
  "taller-de-arte-latte-nivel-basico-en-viaducto-cdmx", // 0 clics
  "taller-de-bebidas-frias", // 0 clics
  "taller-de-bubble-tea-&-iced-coffee-en-guadalajara", // 0 clics
  "taller-de-bubble-tea-&-iced-coffee-en-leon", // 0 clics
  "taller-de-bubble-tea-&-iced-coffee-en-monterrey", // 0 clics
  "taller-de-bubble-tea-&-iced-coffee-en-puebla", // 0 clics
  "taller-de-bubble-tea-&-iced-coffee-en-queretaro", // 0 clics
  "taller-de-bubble-tea-&-iced-coffee-en-tijuana", // 0 clics
  "taller-de-bubble-tea-&-iced-coffee-en-toluca", // 0 clics
  "taller-de-bubble-tea-&-iced-coffee-en-viaducto-cdmx", // 0 clics
  "taller-de-catacion-de-cafes-mexicanos-en-zona-rosa-cdmx", // 0 clics
];

/**
 * Old pages still served as pages: ALL_MIGRATED_COURSE_PATHS minus the synonyms that now 301 to their
 * primary URL (primary-urls.ts, SEO review A1/D4: /curso-de-barista, /curso-de-barismo,
 * /taller-basico-para-baristas, /curso-de-arte-latte, /taller-de-bebidas-frias, /curso-de-cafe).
 */
export const MIGRATED_COURSE_PATHS: ReadonlyArray<string> = ALL_MIGRATED_COURSE_PATHS.filter(
  (p) => !PRIMARY_REDIRECTS[`/${p}`]
);

const MIGRATED = new Set(ALL_MIGRATED_COURSE_PATHS);

/**
 * Course × sucursal city pages that did not exist on the old site (legacy-city-matrix.ts ×
 * course-venues.data.ts), generated at runtime by legacy-city-pages.ts. Existing pages win.
 */
export const GENERATED_CITY_COURSE_PATHS: ReadonlyArray<string> = CITY_PAGE_REFS.map((r) => r.path).filter(
  (p) => !MIGRATED.has(p)
);

/** Every legacy course URL served as a page (routes, prerender, sitemap, redirect exclusion). */
export const LEGACY_COURSE_PATHS: ReadonlyArray<string> = [...MIGRATED_COURSE_PATHS, ...GENERATED_CITY_COURSE_PATHS];

/** Lookup set with leading slash, e.g. "/curso-de-barista-cdmx". */
export const LEGACY_COURSE_PATH_SET: ReadonlySet<string> = new Set(LEGACY_COURSE_PATHS.map((p) => `/${p}`));
