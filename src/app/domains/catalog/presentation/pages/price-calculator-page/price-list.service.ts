import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** Lista de precios: 1 = Público, 5 = Fronterizo (cafeetrusca.com/api/product?type=N). */
export type PriceListType = 1 | 5;

export interface PriceProduct {
  codigo: string;
  nombre: string;
  linea: string;
  precio: number;
  image: string;
  /** Contenido del envase normalizado (ml, g o piezas) leído del nombre SAP. */
  size: number | null;
  sizeUnit: 'ml' | 'g' | 'pza' | null;
}

const API = 'https://cafeetrusca.com/api/product?type=';
const IMG = 'https://cafeetrusca.com';

/** Líneas de insumos (bebidas) que tienen sentido en la calculadora. */
const INSUMO_PREFIX = /^(IJA|ISA|IBP|ICP|IPC|ICT|ITI|ITE|ITB|CPM|CES)-/;

export function parsePackSize(nombre: string): { size: number | null; unit: 'ml' | 'g' | 'pza' | null } {
  const n = nombre.toLowerCase();
  const pcs = n.match(/con\s+(\d+)\s*(piezas|pzas|sobres|bolsas|bolsitas)/);
  const m = n.match(/(\d+(?:\.\d+)?)\s*(ml|l|kg|grs|gr|g|lb|oz)\b/);
  if (m) {
    const v = parseFloat(m[1]);
    const mult = pcs ? parseInt(pcs[1], 10) : 1;
    switch (m[2]) {
      case 'ml': return { size: v * mult, unit: 'ml' };
      case 'l': return { size: v * 1000 * mult, unit: 'ml' };
      case 'kg': return { size: v * 1000 * mult, unit: 'g' };
      case 'lb': return { size: v * 453.6 * mult, unit: 'g' };
      case 'oz': return { size: v * 28.35 * mult, unit: 'g' };
      default: return { size: v * mult, unit: 'g' };
    }
  }
  if (pcs) return { size: parseInt(pcs[1], 10), unit: 'pza' };
  return { size: null, unit: null };
}

/** Costo de `qty` `unit` de un producto (se asume 1 ml ≈ 1 g cuando las unidades difieren). */
export function costOf(p: PriceProduct | undefined, qty: number, unit: string): number | null {
  if (!p || !p.precio || !qty) return p ? 0 : null;
  if (!p.size || !p.sizeUnit) return unit === 'pza' ? p.precio * qty : null;
  if ((unit === 'pza') !== (p.sizeUnit === 'pza')) return null;
  return (p.precio / p.size) * qty;
}

@Injectable({ providedIn: 'root' })
export class PriceListService {
  private platformId = inject(PLATFORM_ID);
  private cache = new Map<PriceListType, Promise<PriceProduct[]>>();

  /** Solo en navegador (la API permite CORS *); en SSR/prerender regresa []. */
  load(type: PriceListType): Promise<PriceProduct[]> {
    if (!isPlatformBrowser(this.platformId)) return Promise.resolve([]);
    let p = this.cache.get(type);
    if (!p) {
      p = fetch(API + type)
        .then((r) => (r.ok ? r.json() : []))
        .then((rows: any[]) =>
          (Array.isArray(rows) ? rows : [])
            .filter((r) => r && r.codigo && Number(r.precioregularc_impuesto) > 0)
            .map((r) => {
              const s = parsePackSize(String(r.nombre || ''));
              return {
                codigo: String(r.codigo),
                nombre: String(r.nombre || '').replace(/\s+/g, ' ').trim(),
                linea: String(r.linea || ''),
                precio: Number(r.precioregularc_impuesto),
                image: r.image_thumbnail ? IMG + r.image_thumbnail : '',
                size: s.size,
                sizeUnit: s.unit
              } as PriceProduct;
            })
        )
        .catch(() => {
          this.cache.delete(type);
          return [];
        });
      this.cache.set(type, p);
    }
    return p;
  }

  isInsumo(p: PriceProduct): boolean {
    return INSUMO_PREFIX.test(p.codigo);
  }

  storeUrl(p: PriceProduct): string {
    const slug = p.nombre.replace(/[^A-Za-z0-9.ÁÉÍÓÚÑáéíóúñ]+/g, '-').replace(/^-|-$/g, '');
    return `https://tienda.cafeetrusca.com/producto/detalle/${p.codigo}/${slug}`;
  }
}
