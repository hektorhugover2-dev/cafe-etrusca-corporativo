/**
 * ONE primary URL per search intent (SEO review 2026-09-25, A1 / D3 / D4 / D5, approved by Héctor).
 * Rule: the old page with GSC clicks is the primary; synonyms 301 to it (or carry a canonical to it
 * when the page must stay, see CANONICAL_OVERRIDES). Internal links (coursePublicPath, breadcrumbs,
 * CTAs) and the sitemap only use primaries. Pure data: no imports, safe for every bundle/script.
 *
 * Keys and values: leading slash, NO trailing slash (canonicalPath() adds it).
 */
export const PRIMARY_REDIRECTS: Readonly<Record<string, string>> = {
  // Formación barista (national): /educacion/ is the national page; near-copies 301 to it.
  '/curso-de-barista': '/educacion/talleres/formacion-barista', // 0 clics
  '/curso-de-barismo': '/educacion/talleres/formacion-barista', // 16 clics
  '/taller-basico-para-baristas': '/educacion/talleres/formacion-barista', // 20 clics
  // Course types whose old page has GSC history: the old page is the primary.
  '/educacion/talleres/arte-latte': '/taller-de-arte-latte-nivel-basico', // legacy 49 clics
  '/curso-de-arte-latte': '/taller-de-arte-latte-nivel-basico', // 0 clics, synonym
  '/educacion/talleres/bubble-tea-iced-coffee': '/taller-de-bubble-tea-&-iced-coffee', // legacy 174
  '/educacion/talleres/bubble-tea-especializado': '/taller-de-bubble-tea-especializado', // legacy 52
  '/educacion/cursos/tostado-basico': '/taller-basico-de-tostado-de-cafe', // legacy 92
  '/educacion/talleres/metodos-de-extraccion': '/taller-de-brew-bar', // legacy 18 (Brew & Cold Brew)
  '/educacion/talleres/mixologia': '/taller-de-mixologia-con-cafe-sin-alcohol', // legacy 9
  '/educacion/talleres/formacion-barista-especializado': '/taller-para-baristas-especializados', // legacy 2
  '/educacion/talleres/arte-latte-especializado': '/taller-de-arte-latte-especializados', // legacy 1
  // Old page WITHOUT clicks → the /educacion/ page is the primary.
  '/taller-de-bebidas-frias': '/educacion/talleres/bebidas-frias', // legacy 0 clics
  // D5: emprende landing (URL with history, target of 54 redirects).
  '/educacion/cursos/formacion-de-emprendedores': '/emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria',
  // D4: /curso-de-cafe has no equivalent course → course hub.
  '/curso-de-cafe': '/cursos-para-baristas-y-talleres-para-cafeterias'
};

/**
 * Pages that stay (users reach them from the sede selector / old links) but point their canonical
 * to the primary and are left out of the sitemap. Never combined with noindex.
 */
export const CANONICAL_OVERRIDES: Readonly<Record<string, string>> = {
  // A1: CDMX barista sedes → the CDMX page with history (584 clics; it already filters by sede).
  '/taller-basico-para-baristas-en-zona-rosa-cdmx': '/curso-de-barista-cdmx',
  '/taller-basico-para-baristas-en-viaducto-cdmx': '/curso-de-barista-cdmx',
  '/taller-basico-para-baristas-en-iztapalapa-cdmx': '/curso-de-barista-cdmx',
  // M2: /educacion/ duplicates of an old experiencia page (both out of the hub and sitemap until
  // they have real dates; the old page is the primary and the target of their event redirects).
  '/educacion/experiencias/crear-mezcla-de-cafe': '/experiencia-aprende-a-crear-tu-propia-mezcla-de-cafe',
  '/educacion/experiencias/oasis-bebidas-frias': '/experiencia-el-oasis-del-sabor-con-bebidas-frias'
};

function key(path: string): string {
  let p = String(path || '/').split(/[?#]/)[0];
  if (!p.startsWith('/')) p = '/' + p;
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
}

/** Primary URL for a path (301 target or canonical override), same trailing-slash style as input. */
export function primaryPath(path: string): string {
  const k = key(path);
  const target = PRIMARY_REDIRECTS[k] ?? CANONICAL_OVERRIDES[k];
  if (!target) return path;
  return /\/$/.test(path) ? target + '/' : target;
}

/** 301 target of a synonym (null when the path is not redirected). */
export function primaryRedirect(path: string): string | null {
  return PRIMARY_REDIRECTS[key(path)] ?? null;
}

/** Canonical override of a page that stays live (null = self-canonical). */
export function canonicalOverride(path: string): string | null {
  return CANONICAL_OVERRIDES[key(path)] ?? null;
}
