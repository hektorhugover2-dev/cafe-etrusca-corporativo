import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { EVENTS_SNAPSHOT } from './shared/kernel/services/events-snapshot.token';
import { readEventsSnapshotSync } from '../events-snapshot.server';
import { PRODUCT_SHEET_LOOKUP } from './domains/catalog/presentation/product-sheets/product-sheet.token';
import { findProductSheet } from './domains/catalog/presentation/product-sheets/product-sheets.lookup';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    // /api/Event fallback while prerendering (build machine blocked by Cloudflare / offline).
    { provide: EVENTS_SNAPSHOT, useValue: readEventsSnapshotSync },
    // Fichas /Producto/Detalle/: el snapshot completo sólo vive en el servidor; la página pasa su ficha por TransferState.
    { provide: PRODUCT_SHEET_LOOKUP, useValue: findProductSheet }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
