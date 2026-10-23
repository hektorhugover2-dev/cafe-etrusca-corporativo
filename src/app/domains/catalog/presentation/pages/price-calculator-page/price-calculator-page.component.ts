import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import { Recipe, publishedRecipes, recipeBySlug } from '../recipes-page/recetas.data';
import { PriceListService, PriceListType, PriceProduct, costOf } from './price-list.service';

interface IngRow {
  name: string;
  sap: string | null;
  qty: number;
  unit: string;
  /** Costo manual cuando el insumo no tiene código SAP (agua, leche, hielo…). */
  manualCost: number;
  /** Fila agregada por el usuario (nombre editable + búsqueda en catálogo). */
  custom?: boolean;
  /** Café preparado (cold brew): se muestra en ml y el costo se captura a mano (TODO proporción café/agua). */
  manual?: boolean;
  /** Leyenda de la regla de cálculo (espresso / cold brew). */
  note?: string;
}

/** Regla del cliente: cada espresso (shot de 30 ml) = 16 g de café en grano. */
export const ESPRESSO_G_PER_SHOT = 16;
const ESPRESSO_ML_PER_SHOT = 30;
/** Regla del cliente: cold brew = 60 ml por porción cuando la receta no indica ml. */
export const COLD_BREW_DEFAULT_ML = 60;
/** Regla del cliente: 1 litro de cold brew usa 200 g de café. */
export const COLD_BREW_G_PER_LITER = 200;

const STORAGE_KEY = 'etrusca-calculadora-recetas';

@Component({
  selector: 'app-price-calculator-page',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink],
  templateUrl: './price-calculator-page.component.html',
  styleUrl: './price-calculator-page.component.scss'
})
export class PriceCalculatorPageComponent implements OnInit {
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private prices = inject(PriceListService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  mode: 'producto' | 'receta' = 'producto';
  list: PriceListType = 1;
  loading = false;
  error = false;
  products: PriceProduct[] = [];
  private byCode = new Map<string, PriceProduct>();

  // ---- Por producto
  query = '';
  showResults = false;
  selected: PriceProduct | null = null;
  qty = 30;
  qtyUnit: 'ml' | 'g' | 'pza' = 'ml';
  purchasePrice = 0;
  drinkSize = 480;
  readonly ticks = [5, 10, 20, 30, 40, 60];

  // ---- Por receta
  recipes: Recipe[] = publishedRecipes();
  recipesWithSap = this.recipes.filter((r) => r.sapIngredients?.length);
  recipe: Recipe | null = null;
  rows: IngRow[] = [];
  priceMode: 'margen' | 'precio' = 'margen';
  margin = 65;
  salePrice = 65;
  readonly minMargin = 35;
  carouselStart = 0;
  savedMsg = '';
  recipeQuery = '';
  showRecipeResults = false;
  focusRow: number | null = null;

  ngOnInit() {
    this.seo.set({
      title: 'Calculadora de precios para cafetería | Café Etrusca',
      description:
        'Calculadora de precios para cafetería: calcula el rendimiento y costo por porción de tus insumos y el costo de tus recetas con precios de Café Etrusca.',
      keywords: 'calculadora de precios para cafetería, costo por bebida, margen, recetas, Café Etrusca',
      path: '/calculadora-de-precios/',
      // Herramienta pública sin registro ni pago: offers price 0 MXN.
      jsonLd: ({ origin, url }) => ({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: 'Calculadora de precios para cafetería',
            url,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            inLanguage: 'es-MX',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'MXN' },
            provider: { '@type': 'Organization', name: 'Café Etrusca', url: `${origin}/` }
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${origin}/` },
              { '@type': 'ListItem', position: 2, name: 'Calculadora de precios', item: url }
            ]
          }
        ]
      })
    });
    this.route.queryParamMap.subscribe((q) => {
      const slug = q.get('receta');
      const lista = q.get('lista');
      if (lista === 'fronterizo') this.list = 5;
      const r = slug ? recipeBySlug(slug) : null;
      if (r) {
        this.mode = 'receta';
        this.pickRecipe(r, false);
      } else if (q.get('modo') === 'receta') {
        this.mode = 'receta';
        if (!this.recipe) this.pickRecipe(this.recipesWithSap[0] || this.recipes[0], false);
      }
      const sku = q.get('producto');
      if (sku) this.pendingSku = sku;
    });
    this.loadPrices();
  }

  private pendingSku: string | null = null;

  async loadPrices() {
    if (!this.isBrowser) return;
    this.loading = true;
    this.error = false;
    const data = await this.prices.load(this.list);
    this.products = data.filter((p) => this.prices.isInsumo(p));
    this.byCode = new Map(data.map((p) => [p.codigo, p]));
    this.error = !data.length;
    this.loading = false;
    const sku = this.pendingSku || this.selected?.codigo || 'IJA-022';
    this.pendingSku = null;
    const p = this.byCode.get(sku);
    if (p) this.selectProduct(p, !!this.selected);
  }

  setList(t: PriceListType) {
    if (this.list === t) return;
    this.list = t;
    this.loadPrices();
  }

  setMode(m: 'producto' | 'receta') {
    this.mode = m;
    if (m === 'receta' && !this.recipe) this.pickRecipe(this.recipesWithSap[0] || this.recipes[0], false);
  }

  // ---------- Por producto
  get results(): PriceProduct[] {
    const q = this.norm(this.query);
    if (!q) return this.products.slice(0, 40);
    const toks = q.split(' ').filter(Boolean);
    return this.products.filter((p) => {
      const n = this.norm(p.nombre + ' ' + p.codigo);
      return toks.every((t) => n.includes(t));
    }).slice(0, 40);
  }

  selectProduct(p: PriceProduct, keepQty = false) {
    this.selected = p;
    this.query = p.nombre;
    this.showResults = false;
    this.purchasePrice = Math.round(p.precio * 100) / 100;
    if (!keepQty) {
      this.qtyUnit = p.sizeUnit || 'pza';
      this.qty = this.qtyUnit === 'pza' ? 1 : 30;
    }
  }

  hideResultsSoon() {
    setTimeout(() => (this.showResults = false), 200);
  }

  get portions(): number | null {
    const p = this.selected;
    if (!p?.size || !this.qty) return null;
    return Math.floor(p.size / this.qty);
  }

  get costPerPortion(): number | null {
    const p = this.selected;
    if (!p?.size || !this.qty) return null;
    return (this.purchasePrice / p.size) * this.qty;
  }

  get costPerUnit(): number | null {
    const p = this.selected;
    if (!p?.size) return null;
    return this.purchasePrice / p.size;
  }

  storeUrl(p: PriceProduct) {
    return this.prices.storeUrl(p);
  }

  // ---------- Por receta
  pickRecipe(r: Recipe, scroll = true) {
    this.recipe = r;
    this.recipeQuery = this.title(r);
    this.showRecipeResults = false;
    const sap = r.sapIngredients || [];
    const rows: IngRow[] = [];
    for (const ing of r.ingredients || []) {
      const s = sap.find((x) => x.ingredient === ing);
      const parsed = ing.match(/^\s*([\d.,]+)\s*(ml|g|gr|piezas?|pzas?)?\s*(?:de\s+)?(.*)$/i);
      if (s) {
        const name = ing.replace(/^\s*[\d.,]+\s*(ml|g|gr|piezas?|pzas?)?\s*(de\s+)?/i, '');
        // Café en grano: la receta indica ml de bebida (espresso / cold brew), no gramos de café.
        // Se deja en 0 g para que el usuario capture los gramos que usa.
        const coffee = /^CPM-/.test(s.sap) ? this.coffeeRow(ing, s.qty, s.unit) : null;
        if (coffee) rows.push({ ...coffee, sap: s.sap });
        else rows.push({ name, sap: s.sap, qty: s.qty, unit: s.unit, manualCost: 0 });
      }
      else if (parsed && parsed[2]) {
        const u = parsed[2].toLowerCase();
        rows.push({ name: parsed[3], sap: null, qty: parseFloat(parsed[1].replace(',', '.')), unit: u.startsWith('p') ? 'pza' : u === 'gr' ? 'g' : u, manualCost: 0 });
      }
    }
    this.rows = rows;
    if (scroll && this.isBrowser) {
      this.router.navigate([], { queryParams: { receta: r.slug }, replaceUrl: true });
    }
  }

  get recipeResults(): Recipe[] {
    const q = this.norm(this.recipeQuery);
    const list = this.recipes;
    if (!q || (this.recipe && q === this.norm(this.title(this.recipe)))) return list.slice(0, 30);
    return list.filter((r) => this.norm(this.title(r) + ' ' + r.category).includes(q)).slice(0, 30);
  }

  hideRecipeResultsSoon() {
    setTimeout(() => (this.showRecipeResults = false), 200);
  }

  isIce(row: IngRow): boolean {
    return /hielos?\b/i.test(row.name);
  }

  product(row: IngRow): PriceProduct | undefined {
    return row.sap ? this.byCode.get(row.sap) : undefined;
  }

  /**
   * Normaliza café en recetas:
   * - espresso: shots = n explícito ("1 espresso") o ml / 30 ("60 ml de espresso doble" = 2) → 16 g por shot.
   * - cold brew: ml de la receta (o 60 ml) × 200 g/L de café → gramos costeados con el precio de la bolsa.
   */
  private coffeeRow(ing: string, qty: number, unit: string): Omit<IngRow, 'sap'> | null {
    const t = ing.toLowerCase();
    if (t.includes('cold brew')) {
      const ml = unit === 'ml' && qty > 0 ? qty : COLD_BREW_DEFAULT_ML;
      const g = Math.round(ml * COLD_BREW_G_PER_LITER / 1000 * 10) / 10;
      return { name: `Café para ${ml} ml de cold brew (${COLD_BREW_G_PER_LITER} g/L) · Mezcla especial No. 1`, qty: g, unit: 'g', manualCost: 0, note: 'Proporción 1:5 (1000 ml ÷ 5 = 200 g de café por litro)' };
    }
    if (t.includes('espresso')) {
      let shots = unit === 'ml' ? Math.max(1, Math.round(qty / ESPRESSO_ML_PER_SHOT)) : Math.max(1, Math.round(qty));
      if (unit === 'ml' && !qty) shots = /doble/.test(t) ? 2 : 1;
      const label = shots === 1 ? '1 espresso' : `${shots} espressos`;
      return { name: `Café para ${label} (${ESPRESSO_G_PER_SHOT} g c/u) · Mezcla especial No. 1`, qty: shots * ESPRESSO_G_PER_SHOT, unit: 'g', manualCost: 0, note: 'Se calcula con 16 g de café por espresso' };
    }
    return null;
  }

  rowCost(row: IngRow): number | null {
    if (!row.sap || row.manual) return row.manualCost || 0;
    return costOf(this.product(row), row.qty, row.unit);
  }

  get totalCost(): number {
    return this.rows.reduce((s, r) => s + (this.rowCost(r) || 0), 0);
  }

  get suggestedPrice(): number | null {
    const m = Math.min(this.margin, 95) / 100;
    return this.totalCost > 0 ? this.totalCost / (1 - m) : null;
  }

  get grossProfit(): number | null {
    if (this.priceMode === 'margen') return this.suggestedPrice !== null ? this.suggestedPrice - this.totalCost : null;
    return this.salePrice ? this.salePrice - this.totalCost : null;
  }

  get grossMargin(): number | null {
    if (this.priceMode === 'margen') return this.suggestedPrice !== null ? this.margin : null;
    return this.salePrice ? ((this.salePrice - this.totalCost) / this.salePrice) * 100 : null;
  }

  get minPrice(): number {
    return this.totalCost / (1 - this.minMargin / 100);
  }

  removeRow(i: number) {
    this.rows.splice(i, 1);
  }

  addRow() {
    this.rows.push({ name: '', sap: null, qty: 0, unit: 'ml', manualCost: 0, custom: true });
  }

  /** Busca en el catálogo SAP al escribir el nombre de un ingrediente nuevo. */
  rowMatches(row: IngRow): PriceProduct[] {
    if (!row.custom || row.sap || row.name.length < 3) return [];
    const toks = this.norm(row.name).split(' ').filter(Boolean);
    return this.products.filter((p) => toks.every((t) => this.norm(p.nombre).includes(t))).slice(0, 6);
  }

  linkRow(row: IngRow, p: PriceProduct) {
    this.focusRow = null;
    row.sap = p.codigo;
    row.name = p.nombre;
    if (p.sizeUnit) row.unit = p.sizeUnit;
  }

  /** TODO: guardar en cuenta de cliente / backend cuando exista; por ahora localStorage. */
  saveRecipe() {
    if (!this.isBrowser) return;
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      all.unshift({
        savedAt: new Date().toISOString(),
        recipe: this.recipe?.slug ?? null,
        lista: this.list === 5 ? 'fronterizo' : 'publico',
        rows: this.rows,
        totalCost: this.totalCost,
        priceMode: this.priceMode,
        margin: this.margin,
        salePrice: this.salePrice
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all.slice(0, 20)));
      this.savedMsg = 'Receta guardada en este navegador.';
    } catch {
      this.savedMsg = 'No se pudo guardar en este navegador.';
    }
    setTimeout(() => (this.savedMsg = ''), 3500);
  }

  get carousel(): Recipe[] {
    const pool = this.recipesWithSap.length ? this.recipesWithSap : this.recipes;
    const out: Recipe[] = [];
    for (let i = 0; i < Math.min(3, pool.length); i++) out.push(pool[(this.carouselStart + i) % pool.length]);
    return out;
  }

  moveCarousel(d: number) {
    const n = (this.recipesWithSap.length || this.recipes.length) || 1;
    this.carouselStart = (this.carouselStart + d + n) % n;
  }

  get featured(): Recipe[] {
    return this.recipesWithSap.slice(0, 5);
  }

  get heroImages(): string[] {
    const a = recipeBySlug('pumpkin-cold-brew')?.image;
    const b = recipeBySlug('matcha-azul-frio-480ml')?.image;
    return [a, b].filter(Boolean) as string[];
  }

  title(r: Recipe): string {
    return [r.title, r.titleAccent].filter(Boolean).join(' ');
  }

  scrollTo(id: string) {
    if (!this.isBrowser) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private norm(s: string): string {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  }
}
