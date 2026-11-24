/**
 * Proxy de las fotos históricas en cafeetrusca.com/e-commerce/* (y el alias
 * /ecommerce/*, sin guion) hacia el mismo origen IIS que /img/ y /api/:
 * API_ORIGIN (por defecto https://api-origin.cafeetrusca.com), reutilizando
 * proxyApiRequest de ./api-proxy.js.
 *
 * En el IIS no existe el árbol /ecommerce/ (sin guion): esa ruta se reescribe
 * a /e-commerce/ antes del fetch. Las rutas exactas /e-commerce/ y /ecommerce/
 * no son una página Angular ni el enlace «Ecommerce» del menú (ese va a
 * tienda.cafeetrusca.com); se deja pasar al 404 del sitio.
 */
import { proxyApiRequest } from './api-proxy.js';

/** /ecommerce(/...) → /e-commerce(/...) para el origen IIS. */
export function originPath(pathname) {
  const raw = String(pathname || '/');
  if (raw === '/ecommerce' || raw.startsWith('/ecommerce/')) {
    return '/e-commerce' + raw.slice('/ecommerce'.length);
  }
  return raw;
}

function isBareDirectory(pathname) {
  const p = originPath(pathname);
  return p === '/e-commerce' || p === '/e-commerce/';
}

/**
 * @param {{ request: Request, env?: { API_ORIGIN?: string }, next?: () => Promise<Response> }} context
 * @returns {Promise<Response>}
 */
export async function onEcommercePhotoRequest(context) {
  const request = context.request;
  const incoming = new URL(request.url);
  if (isBareDirectory(incoming.pathname)) {
    if (typeof context.next === 'function') return context.next();
    return new Response('Not found', {
      status: 404,
      headers: { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  const rewritten = originPath(incoming.pathname);
  let fwd = request;
  if (rewritten !== incoming.pathname) {
    const target = new URL(request.url);
    target.pathname = rewritten;
    fwd = new Request(target, request);
  }
  return proxyApiRequest(fwd, context.env);
}
