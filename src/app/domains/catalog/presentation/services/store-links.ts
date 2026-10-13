/**
 * Enlaces a la tienda en línea (tienda.cafeetrusca.com), con la misma forma que las fichas de Torani / ChillOut
 * ("Ver producto"): https://tienda.cafeetrusca.com/producto/detalle/<CÓDIGO>/<NOMBRE-EN-SLUG>.
 * La tienda busca la ficha por el código (el slug es decorativo) y sólo publica productos con existencia:
 * con stock 0 la ficha da 404 (verificado el 30-sep-2026), por eso sólo se arma la URL si stock > 0.
 */
export const STORE_BASE = 'https://tienda.cafeetrusca.com';

/** "TORANI SALSA ... BOTE 1.89 l" → "TORANI-SALSA-...-BOTE-1-89-l" (sin acentos; igual que las fichas de Torani). */
export function storeSlug(name: string): string {
  return (name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function storeProductUrl(code: string, name: string): string {
  return `${STORE_BASE}/producto/detalle/${encodeURIComponent(code.trim())}/${storeSlug(name) || 'producto'}`;
}

/** URL de ficha sólo si el producto tiene existencia (si no, la tienda da 404). */
export function storeUrlIfInStock(code: string | null | undefined, name: string, stock: unknown): string | null {
  const c = (code || '').trim();
  return c && Number(stock) > 0 ? storeProductUrl(c, name) : null;
}
