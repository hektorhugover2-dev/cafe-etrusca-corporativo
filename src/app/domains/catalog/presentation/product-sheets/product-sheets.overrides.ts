/**
 * Overrides documentados sobre el snapshot de lista_precio (product-sheets.data.ts).
 *
 * Se aplican:
 *   1) al leer una ficha (findProductSheet, prerender de /Producto/Detalle/),
 *   2) al regenerar el snapshot (scripts/snapshot-product-sheets.mjs),
 * para que no se pierdan en el siguiente `node scripts/snapshot-product-sheets.mjs`.
 *
 * No poner aquí precios, promociones ni existencias.
 */
import type { ProductSheet } from './product-sheet.model';

type SheetOverride = Partial<Omit<ProductSheet, 'c'>> & { reason: string };

/**
 * ICP-001 (Don Gustavo): la etiqueta de la caja (revisión Café Etrusca, 26 nov 2026)
 * no incluye «aromatizante natural (esencia de canela)», que sí trae la intranet.
 * Ingredientes alineados a la etiqueta. CONTIENE SOYA Y CACAHUATE.
 */
export const PRODUCT_SHEET_OVERRIDES: Record<string, SheetOverride> = {
  'ICP-001': {
    reason:
      'Etiqueta de la caja (26 nov 2026): ingredientes sin «aromatizante natural (esencia de canela)».',
    i: 'Azúcares añadidos (azúcar), pasta de cacao, cacahuate, cocoa, lecitina de soya, canela. Contiene soya y cacahuate.'
  }
};

/** Aplica el override documentado, si existe, y omite el campo `reason`. */
export function applyProductSheetOverride(sheet: ProductSheet): ProductSheet {
  const o = PRODUCT_SHEET_OVERRIDES[sheet.c];
  if (!o) return sheet;
  const { reason: _reason, ...fields } = o;
  return { ...sheet, ...fields };
}
