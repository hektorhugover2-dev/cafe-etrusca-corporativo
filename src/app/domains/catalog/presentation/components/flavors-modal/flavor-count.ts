import { normFlavor } from './flavor-icons';

/** Sabores únicos tal como los muestra el modal (sin repetir por mayúsculas/acentos/espacios). Fuente única para tarjeta y modal. */
export function uniqueFlavors(names: (string | null | undefined)[]): string[] {
  const seen = new Map<string, string>();
  for (const n of names) {
    const t = (n || '').replace(/\s+/g, ' ').trim();
    if (!t) continue;
    const k = normFlavor(t);
    if (!seen.has(k)) seen.set(k, t);
  }
  return [...seen.values()];
}

export function flavorCountLabel(n: number): string {
  return `${n} ${n === 1 ? 'sabor' : 'sabores'}`;
}
