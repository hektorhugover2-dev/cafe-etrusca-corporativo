import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, forkJoin, map, of, shareReplay, throwError } from 'rxjs';
import { BrandProduct, PRODUCT_API, mapBrandRows } from './acc-brand-products';

/**
 * Productos por marca desde /api/Product?q=<marca>&Type=1, con caché en memoria por marca.
 * Sólo en el navegador: en SSR/prerender regresa un error (los componentes sólo llaman tras un click).
 */
@Injectable({ providedIn: 'root' })
export class AccBrandProductsService {
  private http = inject(HttpClient);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private cache = new Map<string, Observable<BrandProduct[]>>();

  /** Productos de una marca (con thumbnail, sin duplicados, clasificados por sección/subcategoría del PDF). */
  brand(brand: string): Observable<BrandProduct[]> {
    if (!this.isBrowser) return throwError(() => new Error('AccBrandProductsService: sólo en navegador'));
    const key = brand.trim().toLowerCase();
    let req = this.cache.get(key);
    if (!req) {
      const params = new HttpParams().set('q', key).set('Type', '1');
      req = this.http.get<unknown>(PRODUCT_API, { params }).pipe(
        map((rows) => mapBrandRows(rows, brand)),
        catchError((err) => {
          this.cache.delete(key); // permite reintentar
          return throwError(() => err);
        }),
        shareReplay({ bufferSize: 1, refCount: false })
      );
      this.cache.set(key, req);
    }
    return req;
  }

  /**
   * Varias marcas en paralelo (búsqueda sólo por subcategoría). Si alguna falla se muestran las demás;
   * `failed` lista las que no cargaron. Error sólo si fallan todas.
   */
  brands(brands: string[]): Observable<{ products: BrandProduct[]; failed: string[] }> {
    if (!brands.length) return of({ products: [], failed: [] });
    return forkJoin(
      brands.map((b) =>
        this.brand(b).pipe(
          map((products) => ({ b, products, ok: true })),
          catchError(() => of({ b, products: [] as BrandProduct[], ok: false }))
        )
      )
    ).pipe(
      map((res) => {
        const failed = res.filter((r) => !r.ok).map((r) => r.b);
        if (failed.length === res.length) throw new Error('No cargó ninguna marca');
        return { products: res.flatMap((r) => r.products), failed };
      })
    );
  }
}
