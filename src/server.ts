import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSitemapXml } from './sitemap';
import { isIndexableHost } from './app/shared/kernel/config/site-url';
import { EVENT_PREFIX_TARGET, eventSlugFromPath, findSeoRedirect, isGonePath, pastEventRedirect } from './seo-redirects';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
// Angular 19.2 SSR validates the Host header; unknown hosts silently fall back to client-side
// rendering (no SSR HTML = bad for SEO). NG_ALLOWED_HOSTS (comma-separated) can extend this list.
const angularApp = new AngularNodeAppEngine({
  allowedHosts: ['cafeetrusca.com', 'www.cafeetrusca.com', 'desarrollo.cafeetrusca.com', 'localhost', '127.0.0.1'],
});

/**
 * Host-based indexing control. Only cafeetrusca.com / www.cafeetrusca.com may be indexed.
 * desarrollo.cafeetrusca.com (or any other host/IP) gets X-Robots-Tag + a disallow-all robots.txt.
 * NOTE: this only applies when the site is served by this Node server. The current dev host
 * serves static files from IIS; the equivalent rules live in deploy/iis/web.config.
 */
const requestHost = (req: express.Request): string =>
  String(req.headers['x-forwarded-host'] || req.headers.host || '').split(',')[0].trim();

app.use((req, res, next) => {
  if (!isIndexableHost(requestHost(req))) {
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  }
  next();
});

app.get('/robots.txt', (req, res, next) => {
  if (isIndexableHost(requestHost(req))) return next(); // production: static public/robots.txt
  res.status(200).type('text/plain').send('User-agent: *\nDisallow: /\n');
});

/**
 * Permanent (301) redirects for old cafeetrusca.com URLs. Map: src/seo-redirects.ts.
 */
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  // D6: aditivos/gomas blog posts are gone for good (410, no redirect to an unrelated page).
  if (isGonePath(req.path)) {
    res.status(410).type('text/plain').send('410 Gone');
    return;
  }
  const target = findSeoRedirect(req.path);
  if (!target) return next();
  // Never shadow a prerendered event page with a 301 of the map.
  if (isPrerenderedEvent(req.path)) return next();
  const qs = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
  // Keep a #fragment after the query string (e.g. /sucursales/#merida).
  const hash = target.indexOf('#');
  res.redirect(301, hash < 0 ? target + qs : target.slice(0, hash) + qs + target.slice(hash));
});

function isPrerenderedEvent(path: string): boolean {
  const slug = eventSlugFromPath(path);
  return !!slug && existsSync(join(browserDistFolder, 'cursos-y-talleres', slug, 'index.html'));
}

/**
 * Past or unknown course dates: /cursos-y-talleres/<slug>/ without a prerendered page in this build
 * and not in the 301 map above (map = reviewed + archived past events, by categoryId + sucursal)
 * → 301 to the course page parsed from the slug, else to the "solicitar información" form on the
 * cursos page (#solicitar-informacion). Same rules as deploy/iis/web.config. /cursos-y-talleres/
 * itself → cursos page. Rebuild to publish dates created after the build.
 */
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  const slug = eventSlugFromPath(req.path);
  if (slug === null || isPrerenderedEvent(req.path)) return next();
  const qs = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
  const target = slug ? pastEventRedirect(slug) : EVENT_PREFIX_TARGET;
  const hash = target.indexOf('#');
  res.redirect(301, hash < 0 ? target + qs : target.slice(0, hash) + qs + target.slice(hash));
});

app.get('/sitemap.xml', async (_req, res) => {
  try {
    const xml = await buildSitemapXml({ includeEvents: true });
    res.status(200).type('application/xml').send(xml);
  } catch {
    res.status(503).type('text/plain').send('sitemap unavailable');
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the PORT environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
