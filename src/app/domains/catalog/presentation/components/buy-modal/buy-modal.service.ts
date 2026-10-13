import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable, catchError, map, of, shareReplay } from 'rxjs';
/** Misma API que las tarjetas de Accesorios (services/acc-brand-products.ts); aquí sin importar su config. */
const PRODUCT_API = 'https://cafeetrusca.com/api/Product';
import { storeUrlIfInStock } from '../../services/store-links';

/** Datos del producto para el modal "Comprar" (en línea o en sucursal). */
export interface BuyRequest {
  /** Nombre del producto (encabezado del modal). */
  title: string;
  brand?: string;
  /** Ficha de la tienda en línea ya conocida (Torani / ChillOut / Accesorios con existencia). */
  onlineUrl?: string | null;
  /**
   * Buscar la ficha en la tienda al abrir (Máquinas: sólo hay SKU). Se consulta /api/Product?q=<query>&Type=1
   * y se usa la ficha si el código existe con stock > 0.
   */
  lookup?: { query: string; code: string } | null;
  /** Destino de "Comprar en línea" cuando no hay ficha en la tienda (catálogo de la sección). */
  fallbackUrl: string;
  /** Texto del destino de respaldo (p. ej. "Catálogo de accesorios"). */
  fallbackLabel?: string;
  /** Colores del botón principal del modal (por página/marca). */
  theme?: { btn: string; ink: string };
}

/**
 * Estado global del modal "Comprar". Las tarjetas llaman open(); el modal vive en AppComponent
 * (carga diferida: sólo se descarga al abrirlo por primera vez; nada en SSR).
 */
@Injectable({ providedIn: 'root' })
export class BuyModalService {
  private http = inject(HttpClient);
  private doc = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private cache = new Map<string, Observable<Map<string, string | null>>>();
  private opener: HTMLElement | null = null;

  readonly request = signal<BuyRequest | null>(null);

  open(req: BuyRequest, ev?: Event): void {
    if (!this.isBrowser) return;
    const target = ev?.currentTarget;
    this.opener = target instanceof HTMLElement ? target : (this.doc.activeElement as HTMLElement | null);
    this.request.set(req);
  }

  close(): void {
    const opener = this.opener;
    this.opener = null;
    this.request.set(null);
    // Devuelve el foco al botón "Comprar" que abrió el modal.
    if (opener && this.isBrowser) setTimeout(() => opener.focus(), 0);
  }

  /** Ficha de la tienda para `code` (null si no existe o no tiene existencia). Caché por consulta. */
  resolve(lookup: { query: string; code: string }): Observable<string | null> {
    if (!this.isBrowser) return of(null);
    const key = lookup.query.trim().toLowerCase();
    let req = this.cache.get(key);
    if (!req) {
      const params = new HttpParams().set('q', key).set('Type', '1');
      req = this.http.get<unknown>(PRODUCT_API, { params }).pipe(
        map((rows) => {
          const out = new Map<string, string | null>();
          for (const r of Array.isArray(rows) ? (rows as { codigo?: string; nombre?: string; stock?: unknown }[]) : []) {
            const code = (r?.codigo || '').trim().toUpperCase();
            if (code && !out.get(code)) out.set(code, storeUrlIfInStock(code, r.nombre || '', r.stock));
          }
          return out;
        }),
        catchError(() => {
          this.cache.delete(key);
          return of(new Map<string, string | null>());
        }),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.cache.set(key, req);
    }
    return req.pipe(map((m) => m.get(lookup.code.trim().toUpperCase()) ?? null));
  }
}
