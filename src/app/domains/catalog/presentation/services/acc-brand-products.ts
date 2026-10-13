/**
 * Lógica pura (sin Angular) de productos por marca para las secciones de Accesorios.
 * Fuente: https://cafeetrusca.com/api/Product?q=<marca>&Type=1 (Type=1 = una fila por producto, igual que
 * insumos-category-page; sin Type la API repite cada producto por lista de precios).
 *
 * Campos reales usados: codigo (clave/dedupe), nombre (título y clasificación), linea (marca),
 * image_thumbnail (foto de la tarjeta; sólo se muestran productos CON thumbnail).
 * stock: con existencia (> 0) "Comprar en línea" abre la ficha de tienda.cafeetrusca.com/producto/detalle/<codigo>/…
 * (misma forma que Torani); sin existencia la tienda da 404 → se usa el catálogo de Accesorios.
 * TODO(contenido): la API no trae descripción → la tarjeta la omite.
 */
import { ACC_RULE_ORDER, ACC_SECTIONS, AccMatch, AccSectionSlug } from '../accesorios-secciones.config';
import { storeUrlIfInStock } from './store-links';

export const PRODUCT_API = 'https://cafeetrusca.com/api/Product';
export const PRODUCT_API_HOST = 'https://cafeetrusca.com';

export type AccTone = 'yellow' | 'pink' | 'teal' | 'lime' | 'purple' | 'beige';
const TONES: AccTone[] = ['yellow', 'pink', 'teal', 'lime', 'purple', 'beige'];

/** Fila tal como la regresa /api/Product (sólo los campos que usamos). */
export interface ApiProductRow {
  codigo?: string | null;
  nombre?: string | null;
  linea?: string | null;
  image_thumbnail?: string | null;
  stock?: number | string | null;
}

/** Producto de una marca, con su sección/subcategoría según el PDF (null = fuera del PDF). */
export interface BrandProduct {
  id: string;
  brand: string;
  title: string;
  image: string;
  section: AccSectionSlug | null;
  subcat: string | null;
  /** Ficha en la tienda en línea (sólo si hay existencia); null → catálogo. */
  storeUrl: string | null;
}

export interface BrandCard extends BrandProduct {
  tone: AccTone;
}

export interface BrandSubcat {
  key: string;
  label: string;
  count: number;
}

export const normText = (s: string | null | undefined): string =>
  (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim();

/** La API busca por palabras sueltas (q=la fenice trae otras marcas): nos quedamos con la línea de la marca. */
export function matchesBrand(linea: string | null | undefined, brand: string): boolean {
  const l = normText(linea);
  const b = normText(brand);
  return !!b && (l === b || l.startsWith(b + ' '));
}

export function thumbUrl(raw: string | null | undefined): string {
  const t = (raw || '').trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t)) return t;
  return PRODUCT_API_HOST + (t.startsWith('/') ? t : '/' + t);
}

/** Nombre normalizado sin las palabras de la marca/línea al inicio ("BREWISTA, TETERA…" → "TETERA…"). */
export function stripBrand(name: string, brandWords: string[]): string {
  const words = name.split(' ');
  let i = 0;
  while (i < words.length - 1 && brandWords.includes(words[i])) i++;
  return words.slice(i).join(' ');
}

const has = (padded: string, kw: string) => padded.includes(' ' + kw);

export function matchRule(name: string, stripped: string, m: AccMatch): boolean {
  const padded = ' ' + name + ' ';
  if (m.start && !m.start.some((s) => stripped === s || stripped.startsWith(s + ' ') || stripped.startsWith(s))) return false;
  if (m.any && !m.any.some((k) => has(padded, k))) return false;
  if (m.all && !m.all.every((k) => has(padded, k))) return false;
  if (m.not && m.not.some((k) => has(padded, k))) return false;
  return true;
}

const RULES = ACC_RULE_ORDER.map((id) => {
  const [section, key] = id.split('/') as [AccSectionSlug, string];
  const def = ACC_SECTIONS[section].subcats.find((s) => s.key === key);
  if (!def) throw new Error('Regla desconocida: ' + id);
  return { section, key, match: def.match };
});

/** Sección/subcategoría del PDF para un nombre de producto (primera regla del orden global). */
export function classify(nombre: string, linea: string, brand: string): { section: AccSectionSlug; subcat: string } | null {
  const name = normText(nombre);
  const brandWords = [...new Set([...normText(linea).split(' '), ...normText(brand).split(' ')])].filter(Boolean);
  const stripped = stripBrand(name, brandWords);
  for (const r of RULES) {
    if (r.match.some((m) => matchRule(name, stripped, m))) return { section: r.section, subcat: r.key };
  }
  return null;
}

/** Respuesta de la API → productos de la marca con thumbnail, sin duplicados, clasificados. */
export function mapBrandRows(rows: unknown, brand: string): BrandProduct[] {
  const list = Array.isArray(rows) ? (rows as ApiProductRow[]) : [];
  const seen = new Set<string>();
  const out: BrandProduct[] = [];
  for (const r of list) {
    if (!r || !matchesBrand(r.linea, brand)) continue;
    const image = thumbUrl(r.image_thumbnail);
    if (!image) continue;
    const title = (r.nombre || '').replace(/\s+/g, ' ').trim();
    const id = normText(r.codigo) || normText(title);
    if (!id || !title || seen.has(id)) continue;
    seen.add(id);
    const c = classify(title, r.linea || '', brand);
    out.push({
      id,
      brand: (r.linea || brand).trim(),
      title,
      image,
      section: c?.section ?? null,
      subcat: c?.subcat ?? null,
      storeUrl: storeUrlIfInStock(r.codigo, title, r.stock)
    });
  }
  return out;
}

/** Productos de una sección + píldoras de subcategoría (orden y textos del PDF; sólo las que tienen productos). */
export function sectionView(products: BrandProduct[], section: AccSectionSlug): { cards: BrandCard[]; subcats: BrandSubcat[] } {
  const cards = products
    .filter((p) => p.section === section)
    .map((p, i) => ({ ...p, tone: TONES[i % TONES.length] }));
  const counts = new Map<string, number>();
  for (const c of cards) counts.set(c.subcat!, (counts.get(c.subcat!) || 0) + 1);
  const subcats = ACC_SECTIONS[section].subcats
    .filter((s) => counts.has(s.key))
    .map((s) => ({ key: s.key, label: s.label, count: counts.get(s.key)! }));
  return { cards, subcats };
}
