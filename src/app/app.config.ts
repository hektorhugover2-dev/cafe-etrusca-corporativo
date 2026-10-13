import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, UrlSerializer } from '@angular/router';
import { TrailingSlashUrlSerializer } from './shared/kernel/routing/trailing-slash-url-serializer';
// 1. Importamos el proveedor HTTP y fetch (recomendado para SSR)
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        // Custom scroll in AppComponent: top for menu/CTAs, keep for insumos LÍNEAS nav
        scrollPositionRestoration: 'disabled',
        anchorScrolling: 'enabled'
      })
    ),
    // Internal links (routerLink) render with a trailing slash, matching the canonical URLs and the
    // static host (IIS answers /path with a 301 to /path/). Parsing ignores the slash.
    { provide: UrlSerializer, useClass: TrailingSlashUrlSerializer },
    provideClientHydration(withEventReplay()),
    // 2. Lo agregamos a la lista de proveedores
    provideHttpClient(withFetch())
  ]
};
