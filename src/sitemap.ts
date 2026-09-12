import { slugFromEventUrl } from './app/domains/education/presentation/pages/event-detail-page/event-seo';
import { EMPRENDE_BRANCHES, EMPRENDE_PATH } from './app/domains/education/presentation/pages/course-branch-page/course-branch.data';
import { publishedRecipes } from './app/domains/catalog/presentation/pages/recipes-page/recetas.data';

const SITE = 'https://cafeetrusca.com';

const STATIC_PATHS: Array<{ path: string; changefreq: string; priority: string }> = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/nosotros', changefreq: 'monthly', priority: '0.7' },
  { path: '/productos', changefreq: 'weekly', priority: '0.8' },
  { path: '/productos/cafe', changefreq: 'weekly', priority: '0.7' },
  { path: '/insumos-para-cafeterias', changefreq: 'weekly', priority: '0.7' },
  { path: '/maquinaria-y-equipo-para-cafeterias', changefreq: 'weekly', priority: '0.7' },
  { path: '/cursos-para-baristas-y-talleres-para-cafeterias', changefreq: 'weekly', priority: '0.9' },
  { path: '/educacion/cursos', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/talleres', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/experiencias', changefreq: 'weekly', priority: '0.8' },
  { path: '/educacion/sesiones', changefreq: 'weekly', priority: '0.7' },
  { path: '/contacto', changefreq: 'monthly', priority: '0.6' },
  { path: '/recetas', changefreq: 'weekly', priority: '0.8' },
  { path: '/aviso-de-privacidad', changefreq: 'yearly', priority: '0.3' },
  { path: '/terminos-y-condiciones', changefreq: 'yearly', priority: '0.3' },
  { path: '/politicas-externas-cursos', changefreq: 'yearly', priority: '0.3' }
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
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  for (const item of STATIC_PATHS) {
    parts.push(urlEntry(SITE + item.path, today, item.changefreq, item.priority));
  }

  for (const recipe of publishedRecipes()) {
    parts.push(urlEntry(`${SITE}/recetas/${recipe.slug}`, today, 'weekly', '0.75'));
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
        parts.push(urlEntry(`${SITE}/cursos-y-talleres/${slug}`, lastmod, 'weekly', '0.8'));
      }
    }
  } catch {
    // keep static urls if the events API is unreachable
  }

  parts.push('</urlset>');
  return parts.join('\n') + '\n';
}
