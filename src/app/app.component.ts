import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TrackingService } from './shared/kernel/services/tracking.service';
import { BuyModalComponent } from './domains/catalog/presentation/components/buy-modal/buy-modal.component';
import { BuyModalService } from './domains/catalog/presentation/components/buy-modal/buy-modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BuyModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cafe-etrusca-corporativo';
  /** Modal "Comprar" (en línea / en sucursal): se monta sólo al abrirlo; su código se carga diferido. */
  readonly buy = inject(BuyModalService);

  constructor() {
    inject(TrackingService).init();
    this.setupSmartScroll();
  }

  /** Scroll to top on most navigations; keep position when switching insumos categories. */
  private setupSmartScroll() {
    const platformId = inject(PLATFORM_ID);
    if (!isPlatformBrowser(platformId)) return;

    const router = inject(Router);
    const viewport = inject(ViewportScroller);
    // Category pages only (e.g. /insumos-para-cafeterias/jarabes/), not deeper pages like /jarabes/torani/.
    const insumosCat = /^\/insumos-para-cafeterias\/[^\/#?]+\/?$/;
    let prevPath = router.url.split('?')[0].split('#')[0];

    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        const nextPath = e.urlAfterRedirects.split('?')[0].split('#')[0];
        const from = prevPath;
        prevPath = nextPath;

        // Same-page fragment: let anchorScrolling handle it
        if (e.urlAfterRedirects.includes('#')) return;

        // Switching jarabes ↔ bases ↔ té…: stay where you were (LÍNEAS)
        if (insumosCat.test(from) && insumosCat.test(nextPath) && from !== nextPath) {
          return;
        }

        viewport.scrollToPosition([0, 0]);
      });
  }
}
