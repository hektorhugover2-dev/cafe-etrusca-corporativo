import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
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
    provideClientHydration(withEventReplay()),
    // 2. Lo agregamos a la lista de proveedores
    provideHttpClient(withFetch())
  ]
};
