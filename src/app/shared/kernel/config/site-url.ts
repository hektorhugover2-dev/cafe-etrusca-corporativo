import { environment } from '../../../../environments/environment';

/** Origen canónico sin "/" final, p. ej. https://cafeetrusca.com */
export const SITE_ORIGIN = environment.siteOrigin.replace(/\/+$/, '');

/**
 * Normaliza una ruta del sitio para canonical/sitemap: sin query ni fragmento,
 * con "/" inicial y "/" final (el hosting redirige 301 a la versión con "/").
 * Rutas de archivo (p. ej. /sitemap.xml) no reciben "/" final.
 */
export function canonicalPath(path: string | null | undefined): string {
  let p = String(path || '/').split(/[?#]/)[0] || '/';
  if (!p.startsWith('/')) p = '/' + p;
  p = p.replace(/\/{2,}/g, '/');
  if (!p.endsWith('/') && !/\.[a-z0-9]{2,5}$/i.test(p)) p += '/';
  return p;
}

/** URL absoluta canónica para una ruta del sitio. */
export function siteUrl(path: string | null | undefined = '/'): string {
  return SITE_ORIGIN + canonicalPath(path);
}

/** URL absoluta para un recurso (imagen, etc.) sin alterar la ruta. */
export function siteAssetUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return SITE_ORIGIN + (path.startsWith('/') ? path : '/' + path);
}

/** true si el host puede indexarse (producción). */
export function isIndexableHost(host: string | null | undefined): boolean {
  const h = String(host || '').toLowerCase().split(':')[0];
  return environment.indexableHosts.includes(h);
}
