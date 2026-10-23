/**
 * Configuración de sitio compartida por navegador, SSR/prerender y server.ts.
 *
 * - siteOrigin: origen público canónico. Canonical, og:url, JSON-LD @id y sitemap
 *   SIEMPRE usan este valor; nunca el host de la petición (evita 127.0.0.1 del prerender
 *   y que desarrollo.cafeetrusca.com se declare canónico).
 * - indexableHosts: únicos hosts que pueden indexarse. Cualquier otro host
 *   (desarrollo.cafeetrusca.com, localhost, IPs) recibe noindex en server.ts / web.config.
 * - useCdnAssets / assetsCdnBaseUrl: imágenes, videos y PDF de public/assets se sirven
 *   desde el CDN de Cloudflare R2. Para volver a las locales (/assets) pon
 *   useCdnAssets: false. Ver src/app/shared/kernel/config/assets-url.ts.
 *   OJO: los url() de los .scss usan la URL del CDN escrita literal (SCSS no puede leer
 *   esta constante); para revertirlos busca y reemplaza
 *   "https://imagenes.cafeetrusca.com/corporativo/assets/" por "/assets/".
 */
export const environment = {
  siteOrigin: 'https://cafeetrusca.com',
  indexableHosts: ['cafeetrusca.com', 'www.cafeetrusca.com'] as readonly string[],
  useCdnAssets: true,
  assetsCdnBaseUrl: 'https://imagenes.cafeetrusca.com/corporativo/assets',
};
