import { Pipe, PipeTransform } from '@angular/core';

/**
 * Acentúa nombres de catálogo en MAYÚSCULAS solo para mostrarlos (texto visible, alt, aria).
 * No modifica los datos: los nombres originales se siguen usando como claves/needles del catálogo.
 */
const ACCENTS: Record<string, string> = {
  CLASICO: 'CLÁSICO', CLASICOS: 'CLÁSICOS', FUSION: 'FUSIÓN', PASION: 'PASIÓN', MARACUYA: 'MARACUYÁ',
  ARANDANO: 'ARÁNDANO', ARANDANOS: 'ARÁNDANOS', CHAMPIÑON: 'CHAMPIÑÓN', BROCOLI: 'BRÓCOLI', AZUCAR: 'AZÚCAR',
  LIMON: 'LIMÓN', MELON: 'MELÓN', PLATANO: 'PLÁTANO', CAFE: 'CAFÉ', JAMAICA: 'JAMAICA',
};

export function accentCatalogName(name: string | null | undefined): string {
  if (!name) return '';
  return String(name).replace(/[A-ZÑ]{2,}/g, (w) => ACCENTS[w] ?? w);
}

@Pipe({ name: 'catalogName', standalone: true, pure: true })
export class CatalogNamePipe implements PipeTransform {
  transform(name: string | null | undefined): string {
    return accentCatalogName(name);
  }
}
