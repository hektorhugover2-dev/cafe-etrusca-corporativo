// Build/server-side helpers for the /api/Event data (prerender params, sitemap, web.config).
// The live API wins; public/data/events.json is the fallback when the build machine is blocked
// (Cloudflare 403 to non-browser clients) or offline. Refresh the snapshot from a machine that
// can reach the API:  curl -s https://cafeetrusca.com/api/Event -o public/data/events.json
import { readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const API = 'https://cafeetrusca.com/api/Event';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

/** Local snapshot (repo public/ during the build, browser/ next to the server bundle at runtime). */
export async function readEventsSnapshot(): Promise<any[]> {
  const candidates = [join(process.cwd(), 'public', 'data', 'events.json')];
  try {
    candidates.push(fileURLToPath(new URL('../browser/data/events.json', import.meta.url)));
  } catch {
    /* import.meta.url unavailable */
  }
  for (const file of candidates) {
    try {
      const list = JSON.parse(await readFile(file, 'utf8'));
      if (Array.isArray(list)) return list;
    } catch {
      /* next candidate */
    }
  }
  return [];
}

/**
 * Same snapshot, read synchronously once and cached (EVENTS_SNAPSHOT provider). Synchronous so
 * Angular's prerender waits for it: an async fs read is not tracked and the page would be
 * serialized before the dates arrive.
 */
let syncCache: any[] | null = null;
export function readEventsSnapshotSync(): any[] {
  if (syncCache) return syncCache;
  const candidates = [join(process.cwd(), 'public', 'data', 'events.json')];
  try {
    candidates.push(fileURLToPath(new URL('../browser/data/events.json', import.meta.url)));
  } catch {
    /* import.meta.url unavailable */
  }
  for (const file of candidates) {
    try {
      const list = JSON.parse(readFileSync(file, 'utf8'));
      if (Array.isArray(list)) return (syncCache = list);
    } catch {
      /* next candidate */
    }
  }
  return (syncCache = []);
}

/** Live /api/Event, else the snapshot. `source` says which one answered. */
export async function loadEvents(timeoutMs = 20000): Promise<{ events: any[]; source: 'api' | 'snapshot' }> {
  try {
    const res = await fetch(API, {
      headers: { Accept: 'application/json', 'User-Agent': UA },
      signal: AbortSignal.timeout(timeoutMs)
    });
    if (res.ok && /json/i.test(res.headers.get('content-type') || '')) {
      const list = await res.json();
      if (Array.isArray(list)) return { events: list, source: 'api' };
    }
  } catch {
    /* fall back */
  }
  return { events: await readEventsSnapshot(), source: 'snapshot' };
}

export function eventSlug(e: { url?: string } | null | undefined): string {
  const clean = String(e?.url || '').split('?')[0].replace(/\/+$/, '');
  if (!clean.includes('/cursos-y-talleres/')) return '';
  const slug = decodeURIComponent(clean.slice(clean.lastIndexOf('/') + 1));
  return slug && !slug.includes('/') ? slug : '';
}

/** Event not finished yet (end, or start when there is no end). */
export function isUpcomingEvent(e: { start?: string; end?: string } | null | undefined, now = Date.now()): boolean {
  const end = new Date(e?.end || e?.start || '');
  return !isNaN(end.getTime()) && end.getTime() >= now;
}

/** Slugs of the upcoming events: the /cursos-y-talleres/:slug pages this build prerenders. */
export async function upcomingEventSlugs(): Promise<string[]> {
  const { events } = await loadEvents();
  return [...new Set(events.filter((e) => isUpcomingEvent(e)).map(eventSlug).filter(Boolean))];
}
