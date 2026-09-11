import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const GA_ID = 'G-ZPFQY9ZQPJ';
const GTM_ID = 'GTM-WV4D83TP';
const HOTJAR_ID = 5134442;
const METRICOOL_HASH = '31043b2c6eff14ef38e6418bd31075ad';

@Injectable({ providedIn: 'root' })
export class TrackingService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private loaded = false;

  init() {
    if (!isPlatformBrowser(this.platformId) || this.loaded) {
      return;
    }
    if (this.isLocalhost()) {
      return;
    }
    this.loaded = true;
    this.loadGoogleAnalytics();
    this.loadGoogleTagManager();
    this.loadHotjar();
    this.loadMetricool();
    this.bindTelClicks();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.pageView(e.urlAfterRedirects));
  }

  private isLocalhost() {
    const host = (this.document.location?.hostname || '').toLowerCase();
    return (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host === '[::1]' ||
      host.endsWith('.local')
    );
  }

  private win(): any {
    return this.document.defaultView as any;
  }

  private pageView(url: string) {
    const gtag = this.win()?.gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', { page_path: url });
    }
  }

  private loadGoogleAnalytics() {
    const w = this.win();
    if (!w) return;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
    w.gtag('js', new Date());
    w.gtag('config', GA_ID);
    this.appendScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID, true);
  }

  private loadGoogleTagManager() {
    const w = this.win();
    if (!w) return;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    this.appendScript('https://www.googletagmanager.com/gtm.js?id=' + GTM_ID, true);

    const noscript = this.document.createElement('noscript');
    noscript.innerHTML =
      '<iframe src="https://www.googletagmanager.com/ns.html?id=' +
      GTM_ID +
      '" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
    this.document.body.insertBefore(noscript, this.document.body.firstChild);
  }

  private loadHotjar() {
    const w = this.win();
    if (!w) return;
    w.hj = w.hj || function () {
      (w.hj.q = w.hj.q || []).push(arguments);
    };
    w._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };
    this.appendScript('https://static.hotjar.com/c/hotjar-' + HOTJAR_ID + '.js?sv=6', true);
  }

  private loadMetricool() {
    this.appendScript('https://tracker.metricool.com/resources/be.js', true, () => {
      const tracker = this.win()?.beTracker;
      if (tracker && typeof tracker.t === 'function') {
        tracker.t({ hash: METRICOOL_HASH });
      }
    });
  }

  private bindTelClicks() {
    const handler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;
      const gtag = this.win()?.gtag;
      if (typeof gtag === 'function') {
        gtag('event', 'click_tel', {
          event_category: 'Enlace Telefono',
          event_label: link.href,
          event_target: link.innerText || link.textContent
        });
      }
    };
    this.document.addEventListener('click', handler);
    this.document.addEventListener('touchstart', handler);
  }

  private appendScript(src: string, async: boolean, onload?: () => void) {
    const script = this.document.createElement('script');
    script.src = src;
    script.async = async;
    if (onload) {
      script.onload = onload;
    }
    this.document.head.appendChild(script);
  }
}
