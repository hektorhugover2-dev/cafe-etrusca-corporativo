import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { absoluteAssetUrl } from '../config/assets-url';

/**
 * Aviso de promociones nov-dic 2026 (notificación del navegador).
 * Edita este objeto para cambiar textos, icono, destino o vigencia.
 * Se muestra una sola vez (localStorage) y deja de salir después del 30 de diciembre de 2026
 * (zona America/Mexico_City).
 */
type AvisoWindow = Window & {
  Notification: {
    permission: NotificationPermission;
    requestPermission: () => Promise<NotificationPermission> | NotificationPermission;
  };
};

export const PROMO_AVISO = {
  storageKey: 'promo-aviso-nov-dic-2026',
  title: 'Promociones de insumos Noviembre - Diciembre',
  body: 'Aprovecha las promociones de insumos del 9 de noviembre al 30 de diciembre. ¡Visítanos en sucursales Etrusca!',
  /** Icono resuelto con absoluteAssetUrl (R2 si environment.useCdnAssets, si no /assets). */
  iconUrl: absoluteAssetUrl('images/home/banners/promociones-nov-dic-2026-1x1.webp'),
  clickUrl: 'https://promos-insumos.cafeetrusca.com/',
  /** Inclusive: se muestra hasta el 30 de diciembre de 2026. */
  expiresOn: '2026-12-30',
  serviceWorkerUrl: '/service-worker.js'
} as const;

@Injectable({ providedIn: 'root' })
export class PromoAvisoService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private started = false;
  private gestureBound = false;

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.started) {
      return;
    }
    this.started = true;
    void this.run().catch(() => {
      /* Sin errores en consola si el navegador no soporta avisos o bloquea el permiso. */
    });
  }

  private async run(): Promise<void> {
    try {
      if (this.isExpired() || this.alreadyShown()) {
        return;
      }

      const win = this.document.defaultView as AvisoWindow | null;
      if (!win || typeof win.Notification === 'undefined' || !win.navigator?.serviceWorker) {
        return;
      }

      await win.navigator.serviceWorker.register(PROMO_AVISO.serviceWorkerUrl);
      const registration = await win.navigator.serviceWorker.ready;

      const permission = win.Notification.permission;
      if (permission === 'denied') {
        return;
      }
      if (permission === 'granted') {
        await this.showOnce(win, registration);
        return;
      }

      // permission === 'default': se intenta al cargar. Chrome puede ignorarlo
      // si no hay un gesto del usuario; en ese caso se reintenta en el primer clic.
      const result = await this.requestPermission(win);
      if (result === 'granted') {
        await this.showOnce(win, registration);
        return;
      }
      if (result === 'denied') {
        return;
      }
      this.bindFirstGesture(win, registration);
    } catch {
      /* no-op */
    }
  }

  private bindFirstGesture(win: AvisoWindow, registration: ServiceWorkerRegistration): void {
    if (this.gestureBound) {
      return;
    }
    this.gestureBound = true;
    const onGesture = () => {
      win.document.removeEventListener('pointerdown', onGesture, true);
      win.document.removeEventListener('keydown', onGesture, true);
      void (async () => {
        try {
          if (this.alreadyShown() || this.isExpired()) {
            return;
          }
          const result = await this.requestPermission(win);
          if (result === 'granted') {
            await this.showOnce(win, registration);
          }
        } catch {
          /* no-op */
        }
      })();
    };
    win.document.addEventListener('pointerdown', onGesture, true);
    win.document.addEventListener('keydown', onGesture, true);
  }

  private async requestPermission(win: AvisoWindow): Promise<NotificationPermission | 'default'> {
    try {
      const NotificationCtor = win.Notification;
      if (!NotificationCtor || typeof NotificationCtor.requestPermission !== 'function') {
        return 'default';
      }
      const result = await NotificationCtor.requestPermission();
      return result || 'default';
    } catch {
      return 'default';
    }
  }

  private async showOnce(win: AvisoWindow, registration: ServiceWorkerRegistration): Promise<void> {
    if (this.alreadyShown()) {
      return;
    }
    const options: NotificationOptions = {
      body: PROMO_AVISO.body,
      icon: PROMO_AVISO.iconUrl,
      lang: 'es-MX',
      tag: PROMO_AVISO.storageKey,
      data: { url: PROMO_AVISO.clickUrl }
    };
    await registration.showNotification(PROMO_AVISO.title, options);
    this.markShown();
  }

  private alreadyShown(): boolean {
    try {
      return this.document.defaultView?.localStorage.getItem(PROMO_AVISO.storageKey) === 'shown';
    } catch {
      return false;
    }
  }

  private markShown(): void {
    try {
      this.document.defaultView?.localStorage.setItem(PROMO_AVISO.storageKey, 'shown');
    } catch {
      /* modo privado u origen opaco */
    }
  }

  /** True a partir del 31 de diciembre de 2026 en America/Mexico_City. */
  private isExpired(now = new Date()): boolean {
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Mexico_City',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(now);
    return today > PROMO_AVISO.expiresOn;
  }
}
