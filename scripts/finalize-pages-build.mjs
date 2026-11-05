// Post-build para Cloudflare Pages (hosting estático). SEO pre-migración, 5-nov-2026.
// Uso (desde la raíz del repo): node scripts/finalize-pages-build.mjs <carpeta-browser-del-build>
//
// 1) sitemap.xml DEL BUILD: deja solo URLs que tienen página prerenderizada (index.html), con
//    meta robots "index" y canonical igual a la propia URL. public/sitemap.xml se genera antes del
//    build (prebuild) y puede traer fechas de /cursos-y-talleres/ que ya pasaron o páginas noindex.
// 2) _redirects DEL BUILD: Pages no ejecuta server.ts, así que una fecha de curso pasada
//    (/cursos-y-talleres/<slug>/ sin página en este build) daría 404. Se agrega un 301 al curso
//    (misma regla que server.ts / web.config: pastEventRedirect) para cada slug conocido (sitemap
//    previo + eventos de la API o public/data/events.json) que no tenga página ni regla.
// No toca public/: solo los archivos de la carpeta del build que recibe.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { importTs } from './_load-ts.mjs';

const dir = process.argv[2];
if (!dir || !existsSync(join(dir, 'index.html'))) {
  console.error('finalize-pages-build: falta la carpeta browser del build (con index.html).');
  process.exit(1);
}
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;|&#39;/g, "'");
const pathOf = (loc) => {
  try { return decodeURIComponent(new URL(loc).pathname); } catch { return null; }
};
const pageFile = (p) => join(dir, ...p.split('/').filter(Boolean), 'index.html');

// ---- 1) sitemap
const smFile = join(dir, 'sitemap.xml');
const sm = readFileSync(smFile, 'utf8');
const blocks = sm.match(/<url>[\s\S]*?<\/url>/g) || [];
const keep = [];
const removed = [];
for (const b of blocks) {
  const loc = decode((b.match(/<loc>([^<]+)<\/loc>/) || [])[1] || '');
  const p = pathOf(loc);
  const f = p && p.endsWith('/') ? pageFile(p) : null;
  if (!f || !existsSync(f)) { removed.push([loc, 'sin página en el build (404)']); continue; }
  const html = readFileSync(f, 'utf8');
  const robots = (html.match(/<meta name="robots" content="([^"]*)"/) || [])[1] || '';
  const canon = decode((html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '');
  if (/noindex/i.test(robots)) { removed.push([loc, 'noindex']); continue; }
  if (canon !== loc) { removed.push([loc, 'canonical -> ' + canon]); continue; }
  keep.push(b);
}
const head = sm.slice(0, sm.indexOf('<url>') < 0 ? sm.indexOf('</urlset>') : sm.indexOf('<url>'));
writeFileSync(smFile, head + keep.join('\n  ') + '\n</urlset>\n', 'utf8');
console.log(`sitemap: ${keep.length} URLs (quitadas ${removed.length})`);
for (const [l, why] of removed) console.log('  - ' + l + '  [' + why + ']');

// ---- 2) _redirects: fechas pasadas de /cursos-y-talleres/
const rFile = join(dir, '_redirects');
const rTxt = existsSync(rFile) ? readFileSync(rFile, 'utf8') : '';
const sources = new Set(rTxt.split(/\r?\n/).map((l) => l.trim().split(/\s+/)[0]).filter((s) => s && !s.startsWith('#')));
const { seoRedirectsFor, pastEventRedirect } = await importTs('src/seo-redirects.ts');
const { upcomingEvents } = await importTs('src/app/domains/education/presentation/page-indexing.ts');
const { loadEvents, eventSlug } = await importTs('src/events-snapshot.server.ts');
const { events, source } = await loadEvents();
const upcoming = upcomingEvents(events);
const redirects = seoRedirectsFor(upcoming);
const slugs = new Set(events.map(eventSlug).filter(Boolean));
for (const b of blocks) {
  const p = pathOf(decode((b.match(/<loc>([^<]+)<\/loc>/) || [])[1] || ''));
  const m = p && p.match(/^\/cursos-y-talleres\/([^/]+)\/$/);
  if (m) slugs.add(m[1]);
}
const add = [];
for (const slug of [...slugs].sort()) {
  const from = '/cursos-y-talleres/' + slug;
  if (existsSync(pageFile(from + '/'))) continue; // fecha vigente: la página gana
  if (/\s/.test(slug) || sources.has(from) || sources.has(from + '/')) continue;
  const to = pastEventRedirect(slug, redirects, upcoming);
  add.push(`${from} ${to} 301`, `${from}/ ${to} 301`);
}
if (add.length) {
  writeFileSync(rFile, rTxt.replace(/\s*$/, '\n') + '# Fechas pasadas sin página en este build (scripts/finalize-pages-build.mjs)\n' + add.join('\n') + '\n', 'utf8');
}
console.log(`_redirects: +${add.length / 2} fechas pasadas de /cursos-y-talleres/ (eventos: ${source})`);
for (let i = 0; i < add.length; i += 2) console.log('  + ' + add[i]);
