/**
 * Configuración de sitio compartida por navegador, SSR/prerender y server.ts.
 *
 * - siteOrigin: origen público canónico. Canonical, og:url, JSON-LD @id y sitemap
 *   SIEMPRE usan este valor; nunca el host de la petición (evita 127.0.0.1 del prerender
 *   y que desarrollo.cafeetrusca.com se declare canónico).
 * - indexableHosts: únicos hosts que pueden indexarse. Cualquier otro host
 *   (desarrollo.cafeetrusca.com, localhost, IPs) recibe noindex en server.ts / web.config.
 */
export const environment = {
  siteOrigin: 'https://cafeetrusca.com',
  indexableHosts: ['cafeetrusca.com', 'www.cafeetrusca.com'] as readonly string[],
};
