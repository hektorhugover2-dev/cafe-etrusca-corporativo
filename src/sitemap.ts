import { EMPRENDE_BRANCHES, EMPRENDE_PATH } from './app/domains/education/presentation/pages/course-branch-page/course-branch.data';
import { publishedRecipes } from './app/domains/catalog/presentation/pages/recipes-page/recetas.data';
import { INSUMOS_NAV } from './app/domains/catalog/presentation/insumos.data';
import { MAQ_NAV } from './app/domains/catalog/presentation/maquinas.data';
import { COURSES, hasUpcomingCourseDates } from './app/domains/education/presentation/education.data';
import { COURSE_LEGACY_PATH_BY_SLUG, coursePublicPath } from './app/domains/education/presentation/course-public-paths';
import { cityPageIndexing, upcomingEvents } from './app/domains/education/presentation/page-indexing';
import { CANONICAL_OVERRIDES, PRIMARY_REDIRECTS } from './app/domains/education/presentation/primary-urls';
import {
  GENERATED_CITY_COURSE_PATHS,
  MIGRATED_COURSE_PATHS
} from './app/domains/education/presentation/legacy-course-paths';
import { SITE_ORIGIN, canonicalPath } from './app/shared/kernel/config/site-url';
import { eventSlug, isUpcomingEvent, loadEvents } from './events-snapshot.server';

const SITE = SITE_ORIGIN;

const STATIC_PATHS: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/nosotros', changefreq: 'monthly', priority: '0.7' },
  { path: '/productos', changefreq: 'weekly', priority: '0.8' },
  { path: '/productos/cafe', changefreq: 'weekly', priority: '0.7' },
  { path: '/productos/cafe/premium', changefreq: 'weekly', priority: '0.7' },
  { path: '/productos/cafe/especialidad', changefreq: 'weekly', priority: '0.7' },
  { path: '/productos/cafe/verde', changefreq: 'weekly', priority: '0.7' },
  { path: '/insumos-para-cafeterias', changefreq: 'weekly', priority: '0.8' },
  { path: '/accesorios-para-poner-una-cafeteria', changefreq: 'weekly', priority: '0.6' },
  { path: '/maquinaria-y-equipo-para-cafeterias', changefreq: 'weekly', priority: '0.7' },
  { path: '/maquinaria-y-equipo-para-cafeterias/espresso', changefreq: 'weekly', priority: '0.7' },
  { path: '/maquinaria-y-equipo-para-cafeterias/autoservicio', changefreq: 'weekly', priority: '0.7' },
  { path: '/maquinaria-y-equipo-para-cafeterias/licuadoras', changefreq: 'weekly', priority: '0.7' },
  { path: '/maquinaria-y-equipo-para-cafeterias/molinos', changefreq: 'weekly', priority: '0.7' },
  { path: '/maquinaria-y-equipo-para-cafeterias/tostadores', changefreq: 'weekly', priority: '0.7' },
  { path: '/cursos-para-baristas-y-talleres-para-cafeterias', changefreq: 'weekly', priority: '0.9' },
  { path: '/educacion/cursos', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/talleres', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/experiencias', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/sesiones', changefreq: 'weekly', priority: '0.7' },
  { path: `/${EMPRENDE_PATH}`, changefreq: 'weekly', priority: '0.8' },
  { path: '/contacto', changefreq: 'monthly', priority: '0.6' },
  { path: '/sucursales', changefreq: 'monthly', priority: '0.7' },
  { path: '/recetas', changefreq: 'weekly', priority: '0.8' },
  { path: '/videoteca', changefreq: 'monthly', priority: '0.5' },
  { path: '/aviso-de-privacidad', changefreq: 'yearly', priority: '0.3' },
  { path: '/aviso-de-privacidad-simplificado', changefreq: 'yearly', priority: '0.3' },
  { path: '/terminos-y-condiciones', changefreq: 'yearly', priority: '0.3' },
  { path: '/politicas-externas-cursos', changefreq: 'yearly', priority: '0.3' },
  { path: '/politica-de-productos-perecederos', changefreq: 'yearly', priority: '0.3' }
];

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: string): string {
  return [
    '  <url>',
    `    <loc>${xmlEscape(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>'
  ].join('\n');
}

export interface SitemapOptions {
  /**
   * Include /cursos-y-talleres/<slug> event pages from the live API (upcoming dates only).
   * They are prerendered at build time (app.routes.server.ts), so regenerate the static
   * public/sitemap.xml together with the build (node scripts/write-sitemap.mjs).
   */
  includeEvents?: boolean;
}

export async function buildSitemapXml(options: SitemapOptions = {}): Promise<string> {
  const includeEvents = options.includeEvents ?? false;
  const today = new Date().toISOString().slice(0, 10);
  const seen = new Set<string>();
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  const push = (path: string, changefreq: string, priority: string, lastmod = today) => {
    // Same shape as the canonical tag: configured origin + trailing slash.
    const loc = path.startsWith('http') ? path : SITE + canonicalPath(path);
    if (seen.has(loc)) return;
    seen.add(loc);
    parts.push(urlEntry(loc, lastmod, changefreq, priority));
  };

  for (const item of STATIC_PATHS) {
    push(item.path, item.changefreq, item.priority);
  }

  for (const cat of INSUMOS_NAV) {
    push(`/insumos-para-cafeterias/${cat.slug}`, 'weekly', '0.7');
  }
  // Brand landing (not in the menu; linked from /insumos-para-cafeterias/jarabes/ and the Insumos home).
  push('/insumos-para-cafeterias/jarabes/torani', 'weekly', '0.8');
  // Brand landing ChillOut (linked from /insumos-para-cafeterias/bases-en-polvo/ and the Insumos home).
  push('/insumos-para-cafeterias/bases-en-polvo/chillout', 'weekly', '0.8');
  // Tisanas ChillOut (no está en el menú; enlazada desde /insumos-para-cafeterias/tisanas/).
  push('/insumos-para-cafeterias/tisanas/chillout', 'weekly', '0.8');
  // Accesorios › Métodos de extracción (página propia; enlazada desde el hub y el menú de Accesorios).
  push('/accesorios-para-poner-una-cafeteria/metodo-extraccion', 'weekly', '0.6');
  // Resto de subcategorías de Accesorios (páginas propias).
  for (const slug of ['barista-espresso', 'te-servicio', 'bebidas-frias', 'catacion-medicion', 'limpieza']) {
    push(`/accesorios-para-poner-una-cafeteria/${slug}`, 'weekly', '0.6');
  }

  for (const cat of MAQ_NAV) {
    push(cat.link, 'weekly', '0.7');
  }

  // D2 (approved): course × sede pages WITHOUT upcoming dates are noindex,follow and leave the sitemap;
  // they come back on the next build as soon as /api/Event lists a date (page-indexing.ts).
  // Primary-URL rule (A1): canonicalized and redirected synonyms never appear.
  let upcoming: any[] | null = null;
  try {
    upcoming = upcomingEvents((await loadEvents()).events);
  } catch {
    upcoming = null; // no events data: keep every page (unknown = indexable)
  }
  const listable = (path: string) => {
    const p = '/' + path.replace(/^\/+/, '');
    if (hiddenLegacy.has(p)) return false;
    if (PRIMARY_REDIRECTS[p] || CANONICAL_OVERRIDES[p]) return false;
    return cityPageIndexing(p, upcoming)?.inSitemap !== false;
  };

  // Seasonal sesiones/experiencias without a real upcoming date (placeholders) stay out of the hub and the
  // sitemap, also under their OLD flat URL (tarea 7, punto 2).
  const hiddenLegacy = new Set<string>();
  for (const course of COURSES) {
    if ((course.kind === 'sesiones' || course.kind === 'experiencias') && !hasUpcomingCourseDates(course)) {
      const legacy = COURSE_LEGACY_PATH_BY_SLUG[course.slug];
      if (legacy) hiddenLegacy.add(legacy);
    }
  }

  for (const branch of EMPRENDE_BRANCHES) {
    const p = `/${EMPRENDE_PATH}-en-${branch.citySlug}`;
    if (listable(p)) push(p, 'weekly', '0.7');
  }

  for (const course of COURSES) {
    if (!course.kind || !course.slug) continue;
    // Seasonal sesiones/experiencias whose dates already passed are hidden from the hub
    // (coursesByKind) — keep them out of the sitemap too; the page still renders.
    if ((course.kind === 'sesiones' || course.kind === 'experiencias') && !hasUpcomingCourseDates(course)) {
      continue;
    }
    // Canonical path: /educacion/<kind>/<slug> (emprende → its landing, already listed above).
    // Primary-URL rule: a course whose primary is another URL is listed once, under that URL.
    const pub = coursePublicPath(course);
    if (listable(pub)) push(pub, 'weekly', '0.7');
  }

  // Old course/taller URLs kept as pages (CursoController migration; not linked from menus).
  for (const path of MIGRATED_COURSE_PATHS) {
    if (listable(path)) push(`/${path}`, 'weekly', '0.7');
  }
  // Course × sucursal city pages generated from legacy-city-matrix.ts (no old-site equivalent).
  for (const path of GENERATED_CITY_COURSE_PATHS) {
    if (listable(path)) push(`/${path}`, 'weekly', '0.5');
  }

  for (const recipe of publishedRecipes()) {
    push(`/recetas/${recipe.slug}`, 'weekly', '0.75');
  }

  if (includeEvents) {
    // Upcoming events only (live API, else public/data/events.json): the same set the build
    // prerenders (app.routes.server.ts). Past dates stay reachable but leave the sitemap.
    try {
      const { events } = await loadEvents();
      for (const event of events) {
        if (!isUpcomingEvent(event)) continue;
        const slug = eventSlug(event);
        if (!slug) continue;
        let lastmod = today;
        const start = new Date(event?.start);
        if (!isNaN(start.getTime()) && start.getTime() < Date.now()) lastmod = start.toISOString().slice(0, 10);
        push(`/cursos-y-talleres/${slug}`, 'weekly', '0.8', lastmod);
      }
    } catch {
      // keep static urls if no events data is available
    }
  }

  parts.push('</urlset>');
  return parts.join('\n') + '\n';
}
