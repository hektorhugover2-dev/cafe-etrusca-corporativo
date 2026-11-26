import type { ProductSheet } from './product-sheet.model';
import { PRODUCT_SHEETS } from './product-sheets.data';
import { applyProductSheetOverride } from './product-sheets.overrides';

let byCode: Map<string, ProductSheet> | null = null;

/** Ficha por código (servidor / prerender). Aplica overrides documentados (p. ej. ingredientes de ICP-001). */
export function findProductSheet(code: string): ProductSheet | null {
  if (!byCode) byCode = new Map(PRODUCT_SHEETS.map((p) => [p.c, applyProductSheetOverride(p)]));
  return byCode.get(String(code || '').trim().toUpperCase()) ?? null;
}
