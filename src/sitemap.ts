import { slugFromEventUrl } from './app/domains/education/presentation/pages/event-detail-page/event-seo';
import { EMPRENDE_BRANCHES, EMPRENDE_PATH } from './app/domains/education/presentation/pages/course-branch-page/course-branch.data';
import { publishedRecipes } from './app/domains/catalog/presentation/pages/recipes-page/recetas.data';
import { INSUMOS_NAV } from './app/domains/catalog/presentation/insumos.data';
import { MAQ_NAV } from './app/domains/catalog/presentation/maquinas.data';
import { COURSES } from './app/domains/education/presentation/education.data';

const SITE = 'https://cafeetrusca.com';

const STATIC_PATHS: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/nosotros', changefreq: 'monthly', priority: '0.7' },
  { path: '/productos', changefreq: 'weekly', priority: '0.8' },
  { path: '/productos/cafe', changefreq: 'weekly', priority: '0.7' },
  { path: '/productos/cafe/premium', changefreq: 'weekly', priority: '0.7' },
  { path: '/productos/cafe/verde', changefreq: 'weekly', priority: '0.7' },
  { path: '/insumos-para-cafeterias', changefreq: 'weekly', priority: '0.8' },
  { path: '/productos/accesorios', changefreq: 'weekly', priority: '0.6' },
  { path: '/maquinaria-y-equipo-para-cafeterias', changefreq: 'weekly', priority: '0.7' },
  { path: '/cursos-para-baristas-y-talleres-para-cafeterias', changefreq: 'weekly', priority: '0.9' },
  { path: '/educacion/cursos', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/talleres', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/experiencias', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/sesiones', changefreq: 'weekly', priority: '0.7' },
  { path: `/${EMPRENDE_PATH}`, changefreq: 'weekly', priority: '0.8' },
  { path: '/contacto', changefreq: 'monthly', priority: '0.6' },
  { path: '/recetas', changefreq: 'weekly', priority: '0.8' },
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

export async function buildSitemapXml(): Promise<string> {
  const today = new Date().toISOString().slice(0, 10);
  const seen = new Set<string>();
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  const push = (path: string, changefreq: string, priority: string, lastmod = today) => {
    const loc = path.startsWith('http') ? path : SITE + path;
    if (seen.has(loc)) return;
    seen.add(loc);
    parts.push(urlEntry(loc, lastmod, changefreq, priority));
  };

  for (const item of STATIC_PATHS) {
    push(item.path, item.changefreq, item.priority);
  }

  for (const cat of INSUMOS_NAV) {
    push(`/productos/insumos/${cat.slug}`, 'weekly', '0.7');
  }

  for (const cat of MAQ_NAV) {
    push(cat.link, 'weekly', '0.7');
  }

  for (const branch of EMPRENDE_BRANCHES) {
    push(`/${EMPRENDE_PATH}-en-${branch.citySlug}`, 'weekly', '0.7');
  }

  for (const course of COURSES) {
    if (!course.kind || !course.slug) continue;
    push(`/educacion/${course.kind}/${course.slug}`, 'weekly', '0.7');
  }

  for (const recipe of publishedRecipes()) {
    push(`/recetas/${recipe.slug}`, 'weekly', '0.75');
  }

  try {
    const res = await fetch('https://cafeetrusca.com/api/Event', {
      headers: {
        Accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
      }
    });
    if (res.ok) {
      const events = (await res.json()) as any[];
      const year = new Date().getFullYear();
      for (const event of events || []) {
        const end = event?.end ? new Date(event.end) : null;
        if (end && !isNaN(end.getTime()) && end.getFullYear() < year) continue;
        const slug = slugFromEventUrl(event?.url);
        if (!slug) continue;
        let lastmod = today;
        if (event?.start) {
          const start = new Date(event.start);
          if (!isNaN(start.getTime())) lastmod = start.toISOString().slice(0, 10);
        }
        push(`/cursos-y-talleres/${slug}`, 'weekly', '0.8', lastmod);
      }
    }
  } catch {
    // keep static urls if the events API is unreachable
  }

  parts.push('</urlset>');
  return parts.join('\n') + '\n';
}
