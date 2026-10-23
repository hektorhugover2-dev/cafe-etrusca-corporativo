/**
 * 301 redirect map: old cafeetrusca.com URLs → new site.
 *
 * Seeded (SEO fase 1, 25 sep 2026) with:
 *  - the HIGH-confidence rows of mapa-redirecciones.csv whose path actually changes
 *    (rows that only differ by the trailing slash are handled by the host's "/" redirect;
 *    http/www variants belong to a host-level rule);
 *  - the barista-course aliases requested in the brief → /educacion/talleres/formacion-barista/;
 *  - every legacy flat course URL from course-public-paths.ts (COURSE_LEGACY_REDIRECTS).
 * Fase 2 (25 sep 2026) adds:
 *  - REVIEWED_REDIRECTS (seo-redirects.reviewed.ts): medium/low rows reviewed one by one
 *    (accepted/corrected only; see mapa-redirecciones-revisado.csv);
 *  - CATALOG_DUPLICATE_REDIRECTS: /productos/insumos|maquinas|accesorios/* and /Productos/* aliases
 *    → the production URL families (/insumos-para-cafeterias/, /maquinaria-y-equipo-para-cafeterias/,
 *    /accesorios-para-poner-una-cafeteria/). Angular also has redirect routes for them, but those only
 *    work client-side/Node; on the static IIS host they need these 301s.
 *
 * Tarea 6 (25 sep 2026): REVIEWED_REDIRECTS regenerated from the current reviewed CSV; MANUAL_REDIRECTS
 * trimmed to the still-needed "alta" rows; /Sucursales and the Mérida post → /sucursales/.
 *
 * Tarea 7 (25 sep 2026, approved SEO review): PRIMARY_REDIRECTS (one primary URL per intent, A1/D3/D4/D5),
 * Blog (D6: /Blog → /recetas/, "11 cosas" → emprende, 10 aditivos posts → 410 = GONE_PATHS), chain
 * collapse (every target resolved through the map, loops dropped) and seoRedirectsFor(events): past-event
 * and city-page targets that are noindex (no upcoming dates, D2) are replaced by their indexable primary.
 *
 * Consumed by src/server.ts (Node) and scripts/write-iis-webconfig.mjs (static IIS host).
 * Keys are matched EXACTLY (case-sensitive), without trailing slash. Targets are canonical
 * paths with trailing slash.
 */
import { COURSE_LEGACY_REDIRECTS } from './app/domains/education/presentation/course-public-paths';
import { INSUMOS_NAV } from './app/domains/catalog/presentation/insumos.data';
import { MAQ_NAV } from './app/domains/catalog/presentation/maquinas.data';
import { REVIEWED_REDIRECTS } from './seo-redirects.reviewed';
import { canonicalPath } from './app/shared/kernel/config/site-url';
import { LEGACY_COURSE_PATH_SET } from './app/domains/education/presentation/legacy-course-paths';
import { EVENT_DETAIL_PREFIX, PAST_EVENT_FORM_PATH, PAST_EVENT_FORM_TARGET, cityPageForEvent, isPastEvent } from './app/domains/education/presentation/event-paths';
import { pastEventCoursePath } from './app/domains/education/presentation/past-event-target';
import { EVENT_ARCHIVE } from './app/domains/education/presentation/event-archive.data';
import { PRIMARY_REDIRECTS } from './app/domains/education/presentation/primary-urls';
import { indexableTarget } from './app/domains/education/presentation/page-indexing';

export interface SeoRedirect {
  from: string;
  to: string;
  source: string;
  /** GSC clicks (24 jun - 23 sep 2026) of the old URL, for prioritisation only. */
  clicks?: number;
}

/**
 * Still-needed rows of the ORIGINAL map's "alta" set that are not in the reviewed CSV, plus overrides.
 * Old course URLs that are real pages again (e.g. /curso-de-barista-cdmx, /taller-de-brew-bar) were
 * removed from here in tarea 6: they are served as pages (legacy-course-paths.ts) and never 301.
 */
const MANUAL_REDIRECTS: SeoRedirect[] = [
  { from: "/Contacto", to: "/contacto/", source: "mapa-redirecciones alta", clicks: 405 },
  { from: "/Productos/Cafe", to: "/productos/cafe/", source: "mapa-redirecciones alta", clicks: 280 },
  { from: "/politicas-externas-cursos-talleres", to: "/politicas-externas-cursos/", source: "mapa-redirecciones alta", clicks: 125 },
  { from: "/Nosotros", to: "/nosotros/", source: "mapa-redirecciones alta", clicks: 45 },
  { from: "/insumos-for-cafeterias", to: "/insumos-para-cafeterias/", source: "mapa-redirecciones alta", clicks: 1 },
  { from: "/cursos-para-baristas-y-talleres-for-cafeterias", to: "/cursos-para-baristas-y-talleres-para-cafeterias/", source: "mapa-redirecciones alta", clicks: 1 },
  { from: "/maquinaria-y-equipo-cafeterias", to: "/maquinaria-y-equipo-para-cafeterias/", source: "mapa-redirecciones alta", clicks: 1 },
  { from: "/accesorios-poner-cafeteria", to: "/accesorios-para-poner-una-cafeteria/", source: "mapa-redirecciones alta", clicks: 0 },
  // Tarea 6 (B3): the new /sucursales/ directory replaces /contacto/ as the target of the old
  // sucursales URLs (reviewed CSV said /contacto/). /sucursales itself is a page now (no 301).
  { from: "/Sucursales", to: "/sucursales/", source: "tarea 6: página /sucursales/ (antes /contacto/)", clicks: 1231 },
  { from: "/Blog/Detail/sucursal-etrusca-merida", to: "/sucursales/#merida", source: "tarea 6: página /sucursales/ (antes /contacto/)", clicks: 280 },
];

/** D6 Blog (approved) + rescate 2026-10-20. Aditivos/gomas still in 410 are in GONE_PATHS. */
const BLOG_REDIRECTS: SeoRedirect[] = [
  { from: '/Blog', to: '/recetas/', source: 'D6 blog → recetas', clicks: 0 },
  { from: '/blog', to: '/recetas/', source: 'D6 blog → recetas', clicks: 0 },
  // 2026-10-20: rescate del blog viejo → guías /blog/<slug>/ ("11 cosas" ya no va a emprende) y aditivos
  // aprobados como 301 (los que siguen en 410 están en GONE_PATHS). Mismo mapa que deploy/iis/web.config.
  { from: '/Blog/Detail/11 cosas que te hacen perder dinero', to: '/blog/errores-al-abrir-una-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/De la tierra a la mesa - conoce el  proceso de producción del buen café', to: '/blog/proceso-del-cafe-de-la-planta-a-la-taza/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/De la tierra a la mesa - conoce el proceso de producción del buen café', to: '/blog/proceso-del-cafe-de-la-planta-a-la-taza/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/matcha', to: '/recetas/matcha/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/por-que-una-cafeteria', to: '/blog/errores-al-abrir-una-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/los-5-errores-mas-comunes-que-podrias-cometer-en-tu-cafeteria', to: '/blog/errores-al-abrir-una-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/Barra de especialidad el modelo más  redituable', to: '/blog/errores-al-abrir-una-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/Barra de especialidad el modelo más redituable', to: '/blog/errores-al-abrir-una-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/salted-caramel-frappe', to: '/blog/frappe-para-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/toffee-nutfrappe', to: '/blog/frappe-para-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/trufa-de-chocolate-frappe', to: '/blog/frappe-para-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/iced-coffee-coconut', to: '/recetas/iced-coffee-coconut/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/Chai-verde-el-producto-mas-vendido', to: '/blog/chai-david-rio-sabores/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/chai-blanco', to: '/blog/chai-david-rio-sabores/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/te-chai-david-rio', to: '/blog/chai-david-rio-sabores/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/la-importancia-de-vender-cafe-de-especialidad', to: '/blog/que-vender-en-una-cafeteria/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/Cómo fijar los precios para tu cafetería', to: '/blog/cuanto-cobrar-por-un-cafe/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/Cómo elegir la ubicación perfecta para  tu cafetería', to: '/blog/como-abrir-una-cafeteria-en-mexico/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/Cómo elegir la ubicación perfecta para tu cafetería', to: '/blog/como-abrir-una-cafeteria-en-mexico/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/blog/detail/soda-rosa-molecular-480ml', to: '/recetas/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/blog/detail/red-velvet-cereza-latte', to: '/recetas/', source: 'rescate blog viejo (redirecciones-final-2026-10-20.csv, OK Héctor)' },
  { from: '/Blog/Detail/Qué-son-y-para-que-se-usan-las-gomas-en-productos-alimenticios', to: '/insumos-para-cafeterias/', source: 'aditivos/gomas → insumos (CSV final 2026-10-20, OK Héctor vía agente SEO)' },
  { from: '/Blog/Detail/que-son-los-adictivos', to: '/insumos-para-cafeterias/', source: 'aditivos/gomas → insumos (CSV final 2026-10-20, OK Héctor vía agente SEO)' },
  { from: '/Blog/Detail/Organismos-nacionales-e-internacionales-que-regulan-su-uso', to: '/insumos-para-cafeterias/', source: 'aditivos/gomas → insumos (CSV final 2026-10-20, OK Héctor vía agente SEO)' },
  { from: '/Blog/Detail/Beneficios-y-propiedades-de-la-gelatina-en-productos-alimenticios', to: '/insumos-para-cafeterias/', source: 'aditivos/gomas → insumos (CSV final 2026-10-20, OK Héctor vía agente SEO)' },
  { from: '/Blog/Detail/Clasificación-según-la-función-que-cumplen', to: '/insumos-para-cafeterias/', source: 'aditivos/gomas → insumos (CSV final 2026-10-20, OK Héctor vía agente SEO)' },
  { from: '/Blog/Detail/Realmente-son-malos-para-la-salud', to: '/insumos-para-cafeterias/', source: 'aditivos/gomas → insumos (CSV final 2026-10-20, OK Héctor vía agente SEO)' },
  { from: '/Blog/Detail/Beneficios-y-propiedades-de-la-goma-guar', to: '/insumos-para-cafeterias/', source: 'aditivos/gomas → insumos (CSV final 2026-10-20, OK Héctor vía agente SEO)' }
];

/**
 * D6: informational aditivos/gomas posts (36 clicks, outside the catalogue): HTTP 410 Gone, never a
 * redirect to an unrelated page (soft 404). Decoded paths, no trailing slash, case-sensitive.
 */
export const GONE_PATHS: ReadonlyArray<string> = [
  // 2026-10-20 (CSV final, OK Héctor): los otros 7 aditivos/gomas pasan a 301 → /insumos-para-cafeterias/ (BLOG_REDIRECTS).
  'Qué-son-y-per-que-se-usan-las-gomas-en-productos-alimenticios',
  'Tipos-de-aditivos-y-su-uso-en-alimentos-ya-producidos',
  'Beneficios-y-propiedades-de-la-goma-xantana'
].map((s) => `/Blog/Detail/${s}`);
const GONE_SET = new Set(GONE_PATHS);

/** Paths that are real pages in the new site: never a redirect key (would shadow the page). */
const LIVE_PAGE_KEYS = new Set<string>(['/sucursales']);

const ACCESORIOS_SLUGS = ['barista-espresso', 'metodo-extraccion', 'te-servicio', 'bebidas-frias', 'catacion-medicion', 'limpieza'];
const CAFE_SLUGS = ['premium', 'especialidad', 'verde'];
const BUBBLE_AVANZADO_PREFIX = '/cursos-y-talleres/curso-bubble-tea-avanzado-en-';
const BUBBLE_ESPECIALIZADO_SEDES = ['zona-rosa-cdmx', 'viaducto-cdmx', 'guadalajara', 'leon', 'merida', 'monterrey', 'queretaro', 'tijuana', 'toluca', 'xalapa'];

/** Duplicate catalog URL families → the production-matching family (see header). */
function catalogDuplicateRedirects(): SeoRedirect[] {
  const src = 'duplicados de catálogo (fase 2)';
  const out: SeoRedirect[] = [];
  const add = (from: string, to: string) => out.push({ from, to, source: src });
  const INS = '/insumos-para-cafeterias';
  const MAQ = '/maquinaria-y-equipo-para-cafeterias';
  const ACC = '/accesorios-para-poner-una-cafeteria';
  const insumoSlugs = INSUMOS_NAV.map((c) => c.slug);
  const maqSlugs = MAQ_NAV.map((c) => String(c.link).split('/').filter(Boolean).pop() || '').filter(Boolean);

  for (const base of ['/productos/insumos', '/productos/insumos-para-cafeterias', '/Productos/insumos-para-cafeterias']) {
    add(base, INS);
    for (const s of insumoSlugs) add(`${base}/${s}`, `${INS}/${s}`);
  }
  for (const base of ['/productos/maquinas', '/productos/maquinaria-y-equipo-para-cafeterias', '/Productos/maquinaria-y-equipo-para-cafeterias']) {
    add(base, MAQ);
    for (const s of maqSlugs) add(`${base}/${s}`, `${MAQ}/${s}`);
  }
  add('/productos/accesorios', ACC);
  for (const s of ACCESORIOS_SLUGS) add(`/productos/accesorios/${s}`, `${ACC}/${s}`);
  // Case aliases of the café hub (Angular redirect routes that 404 on the static host).
  add('/Productos/cafe', '/productos/cafe');
  for (const s of CAFE_SLUGS) {
    add(`/Productos/Cafe/${s}`, `/productos/cafe/${s}`);
    add(`/Productos/cafe/${s}`, `/productos/cafe/${s}`);
  }
  // Other Angular redirect routes without an HTML file on the static host.
  add('/educacion', '/cursos-para-baristas-y-talleres-para-cafeterias');
  add('/aviso-cursos', '/politicas-externas-cursos');
  return out;
}

function normalizeKey(path: string): string {
  let p = String(path || '/');
  try {
    p = decodeURI(p);
  } catch {
    /* keep raw */
  }
  if (!p.startsWith('/')) p = '/' + p;
  return p.length > 1 ? p.replace(/\/+$/, '') : p;
}

/** canonicalPath() for the path part; keeps a #fragment (e.g. /sucursales/#merida). */
function canonicalTarget(to: string): string {
  const i = to.indexOf('#');
  return i < 0 ? canonicalPath(to) : canonicalPath(to.slice(0, i)) + to.slice(i);
}

function targetKey(to: string): string {
  return normalizeKey(to.split('#')[0]);
}

/**
 * Full list. Priority on conflicts: primary URLs > manual > blog > catalog duplicates > reviewed > legacy
 * course slugs. `upcoming` = upcoming /api/Event events of the build (null = unknown: every city page is
 * assumed indexable). Targets are resolved to the final URL (no chains) and never point to a noindex page.
 */
export function seoRedirectsFor(upcoming: ReadonlyArray<any> | null): SeoRedirect[] {
  const out = new Map<string, SeoRedirect>();
  for (const [from, to] of Object.entries(PRIMARY_REDIRECTS)) {
    out.set(normalizeKey(from), { from: normalizeKey(from), to: canonicalPath(to), source: 'tarea 7: URL principal por intención (A1/D3/D4/D5)' });
  }
  for (const r of [...MANUAL_REDIRECTS, ...BLOG_REDIRECTS]) out.set(normalizeKey(r.from), { ...r, from: normalizeKey(r.from), to: canonicalTarget(r.to) });
  for (const r of catalogDuplicateRedirects()) {
    const key = normalizeKey(r.from);
    if (!out.has(key)) out.set(key, { ...r, from: key, to: canonicalPath(r.to) });
  }
  for (const r of REVIEWED_REDIRECTS) {
    const key = normalizeKey(r.from);
    if (!out.has(key)) {
      // Past events (no longer in /api/Event, so no prerendered page): send them to the course
      // city page of the same course + sucursal when it exists (legacy-city-matrix.ts).
      const eventCity = key.startsWith(EVENT_DETAIL_PREFIX) ? cityPageForEvent(key.slice(EVENT_DETAIL_PREFIX.length)) : null;
      out.set(key, {
        from: key,
        to: canonicalPath(eventCity ?? r.to),
        source: eventCity ? 'evento pasado → página del curso en la sucursal' : `mapa-redirecciones revisado (${r.decision})`,
        clicks: r.clicks
      });
    }
  }
  // Events seen by earlier builds (event-archive.data.ts, kept by scripts/update-event-archive.mjs)
  // whose date already passed: their course page by categoryId + sucursal (past-event-target.ts);
  // without a course page, the "solicitar información" form on the cursos page.
  const now = Date.now();
  for (const e of EVENT_ARCHIVE) {
    if (!isPastEvent(e, now)) continue;
    const key = normalizeKey(EVENT_DETAIL_PREFIX + e.slug);
    if (out.has(key)) continue;
    const course = pastEventCoursePath(e.slug, e.categoryId, e.locationId);
    out.set(key, {
      from: key,
      to: course ? canonicalPath(course) : canonicalTarget(PAST_EVENT_FORM_TARGET),
      source: course ? 'evento pasado (archivo) → página del curso' : 'evento pasado sin curso → formulario de información'
    });
  }
  // 2026-10-20 (tanda 3, OK Héctor): past "curso-bubble-tea-avanzado-*" events → Bubble Tea Especializado
  // (its sede page when it exists), not the Bubble Tea & Iced Coffee course. Same as deploy/iis/web.config.
  for (const [key, r] of out) {
    if (!key.startsWith(BUBBLE_AVANZADO_PREFIX)) continue;
    const sede = BUBBLE_ESPECIALIZADO_SEDES.find((s) => key.startsWith(`${BUBBLE_AVANZADO_PREFIX}${s}-`));
    out.set(key, { ...r, to: canonicalPath(sede ? `/taller-de-bubble-tea-especializado-en-${sede}` : '/taller-de-bubble-tea-especializado'), source: 'evento pasado bubble tea avanzado → especializado' });
  }
  for (const r of COURSE_LEGACY_REDIRECTS) {
    const key = normalizeKey(r.from);
    if (!out.has(key)) out.set(key, { from: key, to: canonicalPath(r.to), source: 'course-public-paths (legacy flat slug)' });
  }
  // Drop self-redirects (would loop), keys with a fragment (never sent to the server), live pages
  // and old course URLs that are real pages again (legacy-course-paths.ts: CursoController
  // actions migrated 1:1, same path). write-iis-webconfig.mjs also drops any key that is a
  // folder with index.html in the build.
  const base = [...out.values()]
    .filter((r) => normalizeKey(r.to.split('#')[0]) !== r.from)
    .filter((r) => !r.from.includes('#'))
    .filter((r) => !LIVE_PAGE_KEYS.has(r.from))
    .filter((r) => !GONE_SET.has(r.from))
    .filter((r) => !LEGACY_COURSE_PATH_SET.has(r.from));

  // 1) Targets: a noindex course × sede page (no upcoming dates) is replaced by its indexable primary.
  // 2) Chain collapse: a target that is itself a redirect key is resolved to the final URL; loops dropped.
  const byKey = new Map(base.map((r) => [r.from, r]));
  const fixTarget = (to: string): string => {
    const hash = to.indexOf('#');
    const frag = hash < 0 ? '' : to.slice(hash);
    const path = canonicalPath(indexableTarget(to.split('#')[0], upcoming));
    return path + frag;
  };
  const resolved: SeoRedirect[] = [];
  for (const r of base) {
    let to = fixTarget(r.to);
    const seen = new Set<string>([r.from]);
    let loop = false;
    for (let i = 0; i < 10; i++) {
      const next = byKey.get(targetKey(to));
      if (!next) break;
      if (seen.has(next.from)) {
        loop = true;
        break;
      }
      seen.add(next.from);
      to = fixTarget(next.to);
    }
    if (loop || targetKey(to) === r.from) continue;
    resolved.push({ ...r, to });
  }
  return resolved;
}

/** Static map (events unknown → every city page indexable): server.ts and the Node runtime. */
export const SEO_REDIRECTS: ReadonlyArray<SeoRedirect> = seoRedirectsFor(null);

/** true for the aditivos posts that answer 410 Gone. */
export function isGonePath(path: string): boolean {
  return GONE_SET.has(normalizeKey(path));
}

const BY_PATH = new Map(SEO_REDIRECTS.map((r) => [r.from, r.to]));

/** Target path for an incoming request path, or null. */
export function findSeoRedirect(path: string): string | null {
  return BY_PATH.get(normalizeKey(path)) ?? null;
}

/**
 * /cursos-y-talleres and /cursos-y-talleres/<slug>[/]: the slug ('' for the bare prefix), else null.
 * Exact-case prefix like the map keys. Used by server.ts with the build folder to 301 past/unknown events.
 */
export function eventSlugFromPath(path: string): string | null {
  const p = normalizeKey(path);
  const base = EVENT_DETAIL_PREFIX.replace(/\/+$/, '');
  if (p === base) return '';
  if (!p.startsWith(EVENT_DETAIL_PREFIX)) return null;
  const slug = p.slice(EVENT_DETAIL_PREFIX.length);
  return slug && !slug.includes('/') ? slug : null;
}

/** /cursos-y-talleres/ itself (no page): the cursos section. */
export const EVENT_PREFIX_TARGET = canonicalPath(PAST_EVENT_FORM_PATH);

/** Info form on the cursos page (canonical path + #solicitar-informacion). */
export const PAST_EVENT_FORM_URL = canonicalTarget(PAST_EVENT_FORM_TARGET);

/**
 * Final target of a site path through a redirect list (noindex city page → primary, chains collapsed),
 * the same resolution seoRedirectsFor() applies to its own targets.
 */
export function resolveRedirectTarget(
  to: string,
  redirects: ReadonlyArray<SeoRedirect> = SEO_REDIRECTS,
  upcoming: ReadonlyArray<any> | null = null
): string {
  const byKey = new Map(redirects.map((r) => [r.from, r.to]));
  const fix = (t: string) => {
    const hash = t.indexOf('#');
    return canonicalPath(indexableTarget(t.split('#')[0], upcoming)) + (hash < 0 ? '' : t.slice(hash));
  };
  let out = fix(to);
  const seen = new Set<string>();
  for (let i = 0; i < 10; i++) {
    const k = targetKey(out);
    const next = byKey.get(k);
    if (!next || seen.has(k)) break;
    seen.add(k);
    out = fix(next);
  }
  return out;
}

/**
 * 301 target for a past or unknown event slug that is NOT in the map (no archive/review data): its
 * course page parsed from the slug (past-event-target.ts), else the info form. Used by server.ts;
 * write-iis-webconfig.mjs generates the same mapping as IIS rules.
 */
export function pastEventRedirect(slug: string, redirects: ReadonlyArray<SeoRedirect> = SEO_REDIRECTS, upcoming: ReadonlyArray<any> | null = null): string {
  const course = pastEventCoursePath(slug);
  return course ? resolveRedirectTarget(course, redirects, upcoming) : PAST_EVENT_FORM_URL;
}
