import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { COURSE_DETAIL_PRERENDER_PARAMS } from './domains/education/presentation/course-public-paths';
import { publishedRecipes } from './domains/catalog/presentation/pages/recipes-page/recetas.data';
import { LEGACY_COURSE_PATHS } from './domains/education/presentation/legacy-course-paths';
import { upcomingEventSlugs } from '../events-snapshot.server';
import { BLOG_ARTICLES } from './domains/blog/presentation/pages/blog-article-page/blog-articles.data';

/**
 * Slugs of the upcoming events (/api/Event, all categories; public/data/events.json if the API is
 * unreachable from the build machine) for the /cursos-y-talleres/:slug prerender. Never breaks the
 * build: no data → no event pages (they are then served by the client-side fallback).
 */
async function eventSlugsForPrerender(): Promise<Array<{ slug: string }>> {
  try {
    return (await upcomingEventSlugs()).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

/**
 * IMPORTANT: desarrollo.cafeetrusca.com is served as STATIC files (dist/.../browser on IIS
 * behind Cloudflare), not by the Node server. Any route left as RenderMode.Server has no
 * HTML file in the build and answers 404 there. Every page with real content must be
 * RenderMode.Prerender (default via '**', or with getPrerenderParams for :params).
 */
export const serverRoutes: ServerRoute[] = [
  {
    path: 'productos/cafe/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'premium' },
        { slug: 'verde' },
        { slug: 'especialidad' }
      ];
    }
  },
  {
    path: 'insumos-para-cafeterias/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'jarabes' },
        { slug: 'salsas' },
        { slug: 'pures' },
        { slug: 'te' },
        { slug: 'tisanas' },
        { slug: 'bases-en-polvo' },
        { slug: 'toppings' }
      ];
    }
  },
  {
    // Torani brand landing (static path; explicit for clarity, '**' would also prerender it).
    path: 'insumos-para-cafeterias/jarabes/torani',
    renderMode: RenderMode.Prerender
  },
  {
    // Tisanas ChillOut (bolsa 250 g), landing aparte de la de bases en polvo; no está en el menú.
    path: 'insumos-para-cafeterias/tisanas/chillout',
    renderMode: RenderMode.Prerender
  },
  {
    // ChillOut brand landing (bases en polvo), clon de la de Torani.
    path: 'insumos-para-cafeterias/bases-en-polvo/chillout',
    renderMode: RenderMode.Prerender
  },
  // Old course/taller URLs kept as pages (legacy-course-paths.ts): explicit prerender list.
  ...LEGACY_COURSE_PATHS.map((path): ServerRoute => ({ path, renderMode: RenderMode.Prerender })),
  {
    path: 'maquinaria-y-equipo-para-cafeterias/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'espresso' },
        { slug: 'autoservicio' },
        { slug: 'licuadoras' },
        { slug: 'molinos' },
        { slug: 'tostadores' }
      ];
    }
  },
  {
    path: 'accesorios-para-poner-una-cafeteria/metodo-extraccion',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'accesorios-para-poner-una-cafeteria/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'barista-espresso' },
        { slug: 'te-servicio' },
        { slug: 'bebidas-frias' },
        { slug: 'catacion-medicion' },
        { slug: 'limpieza' }
      ];
    }
  },
  {
    path: 'educacion/:kind',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { kind: 'cursos' },
        { kind: 'experiencias' },
        { kind: 'talleres' },
        { kind: 'sesiones' }
      ];
    }
  },
  {
    // Canonical course pages: every course in education.data.ts (except the emprende landing).
    path: 'educacion/:kind/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return COURSE_DETAIL_PRERENDER_PARAMS.map((p) => ({ kind: p.kind, slug: p.slug }));
    }
  },
  {
    path: 'recetas/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return publishedRecipes().map((r) => ({ slug: r.slug }));
    }
  },
  {
    // Event detail pages: one static page per UPCOMING event in /api/Event at build time. A slug
    // without a prerendered page (past date, unknown, or created after the build) answers a 301 on
    // the hosting (deploy/iis/web.config, server.ts) to its course page, or to the "solicitar
    // información" form on the cursos page when no course matches; in-app links to a new event still
    // render it in the browser (PrerenderFallback.Client / resolver) until the next build.
    path: 'cursos-y-talleres/:slug',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Client,
    getPrerenderParams: eventSlugsForPrerender
  },
  // Alias/redirect routes with :slug — Server so prerender does not require params.
  // On the static host these must be handled by hosting-level 301s (deploy/iis/web.config).
  {
    path: 'Productos/Cafe/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'Productos/cafe/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'productos/maquinas/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'Productos/maquinaria-y-equipo-para-cafeterias/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'productos/maquinaria-y-equipo-para-cafeterias/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'productos/accesorios/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'productos/insumos/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'Productos/insumos-para-cafeterias/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'productos/insumos-para-cafeterias/:slug',
    renderMode: RenderMode.Server
  },
  // Everything else (home, /recetas, /videoteca, /emprendiendo-... + 12 cities, static pages)
  // is prerendered to HTML.
  {
    // Guías /blog/<slug>/ (blog-articles.data.ts). No hay página índice /blog/.
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return BLOG_ARTICLES.map((a) => ({ slug: a.slug }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
