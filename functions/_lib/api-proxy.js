/**
 * Proxy /api/* -> API_ORIGIN (default https://api-origin.cafeetrusca.com) + same path/query.
 * Shared by the Pages Function and, if the deploy uses _worker.js advanced mode, by the
 * wrapper that finalize-pages-build.mjs injects in front of Angular SSR.
 */
export const DEFAULT_API_ORIGIN = 'https://api-origin.cafeetrusca.com';

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host',
]);

const PROXY_FLAG = 'x-etrusca-api-proxy';

function hopByHopFrom(headers) {
  const extra = new Set();
  const connection = headers.get('connection');
  if (connection) {
    for (const part of connection.split(',')) {
      const name = part.trim().toLowerCase();
      if (name) extra.add(name);
    }
  }
  return extra;
}

function copyHeaders(source, { skip } = {}) {
  const out = new Headers();
  const extraHop = hopByHopFrom(source);
  source.forEach((value, key) => {
    const k = key.toLowerCase();
    if (HOP_BY_HOP.has(k) || extraHop.has(k)) return;
    if (skip && skip.has(k)) return;
    out.append(key, value);
  });
  return out;
}

/**
 * @param {Request} request
 * @param {{ API_ORIGIN?: string }} [env]
 * @returns {Promise<Response>}
 */
export async function proxyApiRequest(request, env = {}) {
  const raw = String(env.API_ORIGIN || DEFAULT_API_ORIGIN).trim().replace(/\/+$/, '');
  let origin;
  try {
    origin = new URL(raw);
  } catch {
    return new Response('Invalid API_ORIGIN', { status: 500 });
  }

  if (request.headers.get(PROXY_FLAG)) {
    return new Response('API proxy loop detected', { status: 508 });
  }

  const incoming = new URL(request.url);
  if (incoming.origin === origin.origin) {
    return new Response('API proxy loop detected', { status: 508 });
  }

  const target = origin.origin + incoming.pathname + incoming.search;
  const headers = copyHeaders(request.headers, { skip: new Set(['content-length']) });
  headers.set('Host', origin.host);
  headers.set(PROXY_FLAG, '1');
  if (!headers.has('x-forwarded-host')) {
    headers.set('X-Forwarded-Host', incoming.host);
  }
  if (!headers.has('x-forwarded-proto')) {
    headers.set('X-Forwarded-Proto', incoming.protocol.replace(':', ''));
  }

  const method = request.method.toUpperCase();
  /** @type {RequestInit} */
  const init = {
    method: request.method,
    headers,
    redirect: 'manual',
  };
  if (method !== 'GET' && method !== 'HEAD') {
    init.body = request.body;
    // Required by the Fetch spec when forwarding a streamed body.
    init.duplex = 'half';
  }

  let upstream;
  try {
    upstream = await fetch(target, init);
  } catch {
    return new Response('Bad gateway', { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }

  const outHeaders = copyHeaders(upstream.headers);
  if (method !== 'GET' && method !== 'HEAD') {
    outHeaders.set('Cache-Control', 'no-store');
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: outHeaders,
  });
}
