import { InjectionToken } from '@angular/core';

/**
 * Server/prerender only (provided in app.config.server.ts): loads the local snapshot
 * public/data/events.json when https://cafeetrusca.com/api/Event is unreachable from the build
 * machine (e.g. Cloudflare answers 403 "Just a moment..." to non-browser clients). The browser
 * never uses it; it calls the live API.
 */
export const EVENTS_SNAPSHOT = new InjectionToken<() => any[]>('EVENTS_SNAPSHOT');
