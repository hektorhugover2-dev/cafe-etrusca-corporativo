import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { EVENTS_SNAPSHOT } from './shared/kernel/services/events-snapshot.token';
import { readEventsSnapshotSync } from '../events-snapshot.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    // /api/Event fallback while prerendering (build machine blocked by Cloudflare / offline).
    { provide: EVENTS_SNAPSHOT, useValue: readEventsSnapshotSync }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
