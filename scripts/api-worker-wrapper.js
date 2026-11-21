/* __etruscaApiProxy: intercepta /api/* antes del SSR de Angular (advanced mode). */
import { proxyApiRequest } from './functions/_lib/api-proxy.js';
import * as ssr from './_ssr_worker.js';

export default {
  async fetch(request, env, ctx) {
    const path = new URL(request.url).pathname;
    if (path === '/api' || path.startsWith('/api/')) {
      return proxyApiRequest(request, env);
    }
    if (ssr.default && typeof ssr.default.fetch === 'function') {
      return ssr.default.fetch(request, env, ctx);
    }
    const handler = ssr.fetch || ssr.default;
    if (typeof handler === 'function') {
      return handler(request, env, ctx);
    }
    return new Response('SSR worker export not supported', { status: 500 });
  }
};
