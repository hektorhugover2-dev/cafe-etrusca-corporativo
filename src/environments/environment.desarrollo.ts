/**
 * Configuración del build de desarrollo (Cloudflare Pages cafe-etrusca-desarrollo /
 * desarrollo.cafeetrusca.com). Misma CDN y canónico que producción; la API del
 * navegador va a /api (relativo) y la Pages Function la reenvía a
 * https://api-origin.cafeetrusca.com. El prerender/SSR usa apiSsrOrigin porque
 * una URL relativa se resolvería contra localhost.
 */
export const environment = {
  siteOrigin: 'https://cafeetrusca.com',
  indexableHosts: ['cafeetrusca.com', 'www.cafeetrusca.com'] as readonly string[],
  useCdnAssets: true,
  assetsCdnBaseUrl: 'https://imagenes.cafeetrusca.com/corporativo/assets',
  apiBaseUrl: '/api',
  apiSsrOrigin: 'https://cafeetrusca.com',
};
