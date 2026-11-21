import { environment } from '../../../../environments/environment';

/**
 * Base de la API corporativa (sin "/" final).
 * - Navegador (producción y desarrollo en Pages): /api
 *   (el navegador pega al mismo host; la Pages Function / el worker proxifican a API_ORIGIN).
 *
 * En SSR/prerender una base relativa se absolutiza con apiSsrOrigin (o siteOrigin),
 * para no ir a localhost. El prerender usa https://cafeetrusca.com.
 */
export const API_BASE_URL: string = String(environment.apiBaseUrl || 'https://cafeetrusca.com/api').replace(/\/+$/, '');

const API_SSR_ORIGIN: string = String(
  environment.apiSsrOrigin || environment.siteOrigin || 'https://cafeetrusca.com'
).replace(/\/+$/, '');

function resolveApiBase(): string {
  if (/^https?:\/\//i.test(API_BASE_URL)) return API_BASE_URL;
  const isServer = typeof window === 'undefined';
  if (isServer) {
    const path = API_BASE_URL.startsWith('/') ? API_BASE_URL : '/' + API_BASE_URL;
    return API_SSR_ORIGIN + path;
  }
  return API_BASE_URL;
}

/** Une la base de API con un path (p. ej. 'Product' o '/newsletter'). */
export function apiUrl(path: string): string {
  const p = '/' + String(path || '').replace(/^\/+/, '');
  return resolveApiBase() + p;
}
