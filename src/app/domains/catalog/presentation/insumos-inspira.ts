import { publishedRecipes, type Recipe } from './pages/recipes-page/recetas.data';
import { filtrosDeReceta, type RecetaTipo } from './pages/recipes-page/recetas-listado.config';

/**
 * "Inspira tu menú" de las páginas de insumos: 3 recetas reales por sección.
 * Selección determinista (sin random) para que SSR/prerender y navegador coincidan:
 * primero las marcadas como popular en recetas-listado.config.ts, después en el
 * orden de RECIPES (recetas.data.ts). Si una sección tiene menos de 3 coincidencias
 * se completa con el fallback (populares del recetario).
 */
export type InspiraSection =
  | 'jarabes' | 'salsas' | 'pures' | 'te' | 'tisanas' | 'bases' | 'toppings' | 'torani' | 'general';

export interface InspiraCard {
  title: string;
  image: string;
  tone: string;
  link: string;
  /** Receta completa para <app-recipe-card> (mismo diseño que el home). */
  recipe: Recipe;
}

const TONES = ['yellow', 'lime', 'pink'];

const text = (r: Recipe) => [r.brand, r.summary, ...(r.ingredients || [])].join(' ').toLowerCase();
const ingredients = (r: Recipe) => (r.ingredients || []).map((i) => i.toLowerCase());
const hasTipo = (t: RecetaTipo) => (r: Recipe) => filtrosDeReceta(r.slug).tipos.includes(t);

/** Sección de insumos → criterio sobre datos reales del recetario. */
const MATCHERS: Record<InspiraSection, ((r: Recipe) => boolean) | null> = {
  // Toppings (pestaña "Bubble tea") → filtro de tipo bubble-tea del recetario.
  toppings: hasTipo('bubble-tea'),
  // Té → filtro de tipo té.
  te: hasTipo('te'),
  // Tisanas → recetas cuyo insumo incluye tisana.
  tisanas: (r) => ingredients(r).some((i) => i.includes('tisana')),
  // Jarabes → recetas con jarabe (Torani, ChillOut Jarabes…), sin contar salsas.
  jarabes: (r) => ingredients(r).some((i) => /jarabe|torani/.test(i) && !i.includes('salsa')),
  // Página Torani → recetas cuyo insumo menciona Torani (jarabe o salsa).
  torani: (r) => ingredients(r).some((i) => i.includes('torani')),
  // Salsas → recetas con salsa (Torani, Hollander…).
  salsas: (r) => ingredients(r).some((i) => i.includes('salsa')),
  // Purés y concentrados → ChillOut Fruit / Jam / Just Fruit o puré.
  pures: (r) => /chillout (fruit|jam|just fruit)|pur[eé]/.test(text(r)),
  // Bases en polvo → ChillOut Mix, Cappuccine, David Rio o Prana Chai.
  bases: (r) => /chillout mix|cappuccine|david rio|prana chai/.test(text(r)),
  // Landing de insumos y secciones sin mapeo: populares del recetario.
  general: null
};

function ordered(): Recipe[] {
  const all = publishedRecipes();
  const popular = all.filter((r) => filtrosDeReceta(r.slug).popular);
  return [...popular, ...all.filter((r) => !popular.includes(r))];
}

function toCard(r: Recipe, i: number): InspiraCard {
  return {
    title: `${r.title} ${r.titleAccent || ''}`.trim(),
    image: r.image,
    tone: TONES[i % TONES.length],
    link: '/recetas/' + r.slug,
    recipe: r
  };
}

export function inspiraRecipes(section: InspiraSection, limit = 3): InspiraCard[] {
  const pool = ordered();
  const match = MATCHERS[section];
  const picked = match ? pool.filter(match).slice(0, limit) : [];
  for (const r of pool) {
    if (picked.length >= limit) break;
    if (!picked.includes(r)) picked.push(r);
  }
  return picked.map(toCard);
}
