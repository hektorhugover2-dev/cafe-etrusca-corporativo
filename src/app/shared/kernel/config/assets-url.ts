import { environment } from '../../../../environments/environment';

/**
 * Base (sin "/" final) para imágenes, videos y PDF de public/assets.
 * - environment.useCdnAssets = true  -> https://imagenes.cafeetrusca.com/corporativo/assets (Cloudflare R2)
 * - environment.useCdnAssets = false -> /assets (archivos locales de public/assets; siguen en el build)
 *
 * Uso en .ts: `${ASSETS_BASE_URL}/images/x.webp`
 * Uso en plantillas HTML: property `assetsBase` del componente + `{{ assetsBase }}/images/x.webp`
 * Los nombres con espacios van codificados (%20) igual que antes.
 *
 * Los url() de los .scss no pueden leer esta constante: usan la URL del CDN escrita
 * literal. Para revertirlos: busca "https://imagenes.cafeetrusca.com/corporativo/assets/"
 * y reemplaza por "/assets/".
 */
export const ASSETS_BASE_URL: string = environment.useCdnAssets
  ? String(environment.assetsCdnBaseUrl || '').replace(/\/+$/, '')
  : '/assets';

/** URL de un asset: assetUrl('images/x.webp'). Acepta también '/assets/images/x.webp'. */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const p = path.replace(/^\/?(assets\/)?/, '');
  return `${ASSETS_BASE_URL}/${p}`;
}

/** URL absoluta (JSON-LD / og:image): en CDN es https://…; en modo local antepone siteOrigin. */
export function absoluteAssetUrl(path: string): string {
  const u = assetUrl(path);
  if (/^https?:\/\//i.test(u)) return u;
  const origin = String(environment.siteOrigin || '').replace(/\/+$/, '');
  return origin + u;
}
