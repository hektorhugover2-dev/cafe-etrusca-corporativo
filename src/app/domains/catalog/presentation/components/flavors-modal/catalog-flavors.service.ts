import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { uniqueFlavors } from './flavor-count';

type Row = Record<string, string>;

const norm = (s: string) =>
  (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/\s+/g, ' ').trim();

/** "TORANI JARABE CLASICO SABOR CARAMEL BOTELLA PET 750ml" → "Caramel". Misma regla que usan las páginas de categoría. */
export function flavorFromName(nombre: string, prefix: string): string {
  let n = (nombre || '').replace(/\s+/g, ' ').trim();
  const up = n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  const i = up.indexOf(' SABOR ');
  if (i >= 0) n = n.slice(i + 7);
  else if (prefix && up.startsWith(prefix)) n = n.slice(prefix.length);
  n = n.replace(/\s(BOTELLA|BOTE|BOLSA|GAL[OÓ]N|GARRAFA|CAJA|FRASCO|LATA|SOBRES?|PET|DOYPACK|PAQUETE|CUBETA|PIEZA|C\/|CON \d|\d).*$/i, '').trim();
  if (!n) return '';
  n = n.toLowerCase();
  return n.charAt(0).toUpperCase() + n.slice(1);
}

/**
 * Sabores únicos de una línea tomados del catálogo (cafeetrusca.com/api/product), con el mismo
 * filtro, extracción y deduplicación que insumos-category-page. Comparte su caché de localStorage.
 * Devuelve [] si el catálogo falla (la página usa entonces su lista local).
 */
@Injectable({ providedIn: 'root' })
export class CatalogFlavorsService {
  private http = inject(HttpClient);
  private readonly ttlMs = 12 * 60 * 60 * 1000;
  private readonly memory = new Map<string, Promise<Row[]>>();

  private fetchAll(q: string): Promise<Row[]> {
    const key = 'etrusca.product.v3:' + q + ':T1:all';
    const hit = this.memory.get(key);
    if (hit) return hit;
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
      const parsed = raw ? (JSON.parse(raw) as { at: number; rows: Row[] }) : null;
      if (parsed?.at && Array.isArray(parsed.rows) && Date.now() - parsed.at <= this.ttlMs) {
        const p = Promise.resolve(parsed.rows);
        this.memory.set(key, p);
        return p;
      }
    } catch {}
    const params = new HttpParams().set('q', q).set('Type', '1');
    const req = new Promise<Row[]>((resolve) => {
      this.http.get<Row[]>('https://cafeetrusca.com/api/product', { params }).subscribe({
        next: (rows) => {
          const list = Array.isArray(rows) ? rows : [];
          try { localStorage.setItem(key, JSON.stringify({ at: Date.now(), rows: list })); } catch {}
          resolve(list);
        },
        error: () => { this.memory.delete(key); resolve([]); }
      });
    });
    this.memory.set(key, req);
    return req;
  }

  /** needle = prefijo exacto del nombre en catálogo (ej. 'TORANI JARABE CLASICO SABOR'). */
  async lineFlavors(needle: string, opts: { dropSalsa?: boolean } = {}): Promise<string[]> {
    const rows = await this.fetchAll(needle);
    const needleN = norm(needle);
    const keys = new Set<string>();
    const flv = new Set<string>();
    for (const row of rows) {
      const alt = row['nombre'] || row['Title'] || row['title'] || '';
      const name = norm(alt);
      if (!(name === needleN || name.startsWith(needleN + ' '))) continue;
      if (opts.dropSalsa && name.includes('SALSA')) continue;
      const key = norm(String(row['codigo'] || row['Codigo'] || alt));
      if (!key || keys.has(key)) continue;
      keys.add(key);
      const f = flavorFromName(alt, needleN);
      if (f) flv.add((/ SABOR /i.test(alt) ? '~' : '') + f);
    }
    const sab = [...flv].filter((f) => f.startsWith('~'));
    const list = sab.length ? sab.map((f) => f.slice(1)) : [...flv];
    return uniqueFlavors(list).sort((a, b) => a.localeCompare(b, 'es'));
  }
}
