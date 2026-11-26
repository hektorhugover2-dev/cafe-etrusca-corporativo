import { InjectionToken } from '@angular/core';
import type { ProductSheet } from './product-sheet.model';

/**
 * Búsqueda de una ficha por código. Sólo se provee en el servidor (app.config.server.ts) para que el
 * snapshot completo no viaje en el JS del navegador; la página pasa su ficha al navegador por TransferState.
 */
export const PRODUCT_SHEET_LOOKUP = new InjectionToken<(code: string) => ProductSheet | null>('PRODUCT_SHEET_LOOKUP');
