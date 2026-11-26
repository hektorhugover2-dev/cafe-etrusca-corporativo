/**
 * Ficha de producto /Producto/Detalle/<CÓDIGO>/<SLUG>/ (URL del sitio anterior). Datos de la lista de precios
 * (scripts/snapshot-product-sheets.mjs → product-sheets.data.ts), sin precios ni promociones.
 */
export interface ProductSheet {
  /** Código (SKU), p. ej. IJA-002. */
  c: string;
  /** Slug del nombre (mismo formato que las URLs del sitio anterior / la tienda). */
  s: string;
  /** Nombre del producto tal como lo trae la API (entidades HTML decodificadas). */
  n: string;
  /** Marca (campo linea de la API). */
  b: string;
  /** Categoría del sitio (por prefijo del código) y su página. */
  cl: string;
  cp: string;
  /** Foto: /img/thumbnail/<CÓDIGO>.webp (API) o la foto oficial de la marca del sitio; medidas reales. */
  img: string;
  w: number;
  h: number;
  /** Landing de la marca en el sitio (si existe). */
  bp?: string;
  /** GTIN (CodeBears de la API con dígito verificador válido). */
  g?: string;
  /** Ingredientes (sólo si la API los trae). */
  i?: string;
  /** Alérgenos (sólo si la API los trae, p. ej. ["Lácteos", "Soya"]). */
  a?: string[];
}

export const PRODUCT_SHEET_BASE = '/Producto/Detalle';

/** /Producto/Detalle/<CÓDIGO>/<SLUG> (sin "/" final; canonicalPath la agrega). */
export function productSheetPath(p: Pick<ProductSheet, 'c' | 's'>): string {
  return `${PRODUCT_SHEET_BASE}/${p.c}/${p.s}`;
}
