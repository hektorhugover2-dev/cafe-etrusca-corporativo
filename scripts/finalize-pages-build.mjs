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
// 3) En todos los HTML del build, reescribe /assets/js/lucky-widget.js?v=<primeros 8 del sha256
//    del JS. Ese archivo no lleva hash en el nombre y la regla /*.js de _headers lo deja
//    cacheable 1 año immutable; el ?v= evita que el navegador reutilice un widget viejo.
import { existsSync, readFileSync, writeFileSync, readdirSync, cpSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
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
// ---- 3) cache-bust de lucky-widget.js en HTML prerenderizado
const widgetFile = join(dir, 'assets', 'js', 'lucky-widget.js');
if (!existsSync(widgetFile)) {
  console.error('finalize-pages-build: falta assets/js/lucky-widget.js en el build.');
  process.exit(1);
}
const widgetHash = createHash('sha256').update(readFileSync(widgetFile)).digest('hex').slice(0, 8);
const widgetSrcRe = /src="\/assets\/js\/lucky-widget\.js(?:\?v=[0-9a-fA-F]*)?"/g;
const widgetSrc = 'src="/assets/js/lucky-widget.js?v=' + widgetHash + '"';
const htmlFiles = [];
const stack = [dir];
while (stack.length) {
  const cur = stack.pop();
  for (const ent of readdirSync(cur, { withFileTypes: true })) {
    const p = join(cur, ent.name);
    if (ent.isDirectory()) stack.push(p);
    else if (ent.isFile() && ent.name.endsWith('.html')) htmlFiles.push(p);
  }
}
let widgetChanged = 0;
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  if (!widgetSrcRe.test(html)) continue;
  widgetSrcRe.lastIndex = 0;
  const next = html.replace(widgetSrcRe, widgetSrc);
  if (next !== html) { writeFileSync(f, next, 'utf8'); widgetChanged++; }
}
console.log('lucky-widget.js cache-bust: ?v=' + widgetHash + ' en ' + widgetChanged + ' HTML (de ' + htmlFiles.length + ')');

// ---- 4) Pages Function /api/*  (proxy a API_ORIGIN / api-origin.cafeetrusca.com)
// El deploy de Pages usa la carpeta browser (hosting estático; hoy no hay _worker.js).
// functions/ vive en la raíz del repo, no en public/, y se copia al output del build.
// Si en un build futuro aparece _worker.js (advanced mode), Pages ignora functions/:
// se envuelve el worker para interceptar /api/* antes de delegar al SSR.
const repoRoot = existsSync(join(process.cwd(), 'functions'))
  ? process.cwd()
  : dirname(fileURLToPath(new URL('.', import.meta.url)));
const functionsSrc = join(repoRoot, 'functions');
if (existsSync(functionsSrc)) {
  const functionsDest = join(dir, 'functions');
  cpSync(functionsSrc, functionsDest, { recursive: true });
  console.log('functions/: copiado a ' + functionsDest);
} else {
  console.warn('finalize-pages-build: no hay carpeta functions/ en el repo');
}

const workerFile = join(dir, '_worker.js');
if (existsSync(workerFile)) {
  const original = readFileSync(workerFile);
  if (original.toString('utf8').includes('__etruscaApiProxy')) {
    console.log('_worker.js: el proxy /api/ ya estaba inyectado');
  } else {
    writeFileSync(join(dir, '_ssr_worker.js'), original);
    const wrapperSrc = join(repoRoot, 'scripts', 'api-worker-wrapper.js');
    if (!existsSync(wrapperSrc)) {
      console.error('finalize-pages-build: falta scripts/api-worker-wrapper.js');
      process.exit(1);
    }
    writeFileSync(workerFile, readFileSync(wrapperSrc));
    console.log('_worker.js: advanced mode detectado; proxy /api/ inyectado antes del SSR');
  }
}
