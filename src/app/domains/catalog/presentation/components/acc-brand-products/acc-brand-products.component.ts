import { Component, DestroyRef, PLATFORM_ID, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ACC_SECTIONS, AccSectionSlug } from '../../accesorios-secciones.config';
import { BrandCard, BrandProduct, BrandSubcat, sectionView } from '../../services/acc-brand-products';
import { AccBrandProductsService } from '../../services/acc-brand-products.service';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';

type LoadState = 'idle' | 'loading' | 'ready' | 'error';
/** Tarjetas visibles por tanda ("Ver más productos" agrega otra tanda). */
const PAGE = 12;

/**
 * Bloque "Productos" de una sección de Accesorios: píldoras de marca, píldoras de subcategoría (PDF) y
 * tarjetas desde /api/Product. Filtra por marca y/o subcategoría:
 * - marca → productos de esa marca en la sección; las subcategorías se arman con lo que regresó.
 * - subcategoría sin marca → productos de esa subcategoría de todas las marcas de la sección.
 * - marca + subcategoría → la intersección.
 * - píldora TODOS → quita la marca: todas las marcas de la sección (luego se filtra por subcategoría).
 *   Sólo una píldora de marca (TODOS o una marca) está activa a la vez.
 * Con TODOS (allBrandsLink), TODOS es la selección por defecto: al cargar la página en el navegador se piden
 * los productos de todas las marcas de la sección y las subcategorías se arman con ellos. Mientras llega esa
 * primera carga (y en el HTML prerenderizado) se muestra el contenido proyectado (tarjetas del diseño) o
 * `idleHint`. La API sólo se llama en el navegador, nunca en SSR/prerender.
 */
@Component({
  selector: 'app-acc-brand-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './acc-brand-products.component.html',
  styleUrls: ['./acc-brand-products.component.scss']
})
export class AccBrandProductsComponent {
  readonly section = input.required<AccSectionSlug>();
  readonly brands = input.required<string[]>();
  readonly catalogUrl = input.required<string>();
  /**
   * Muestra la píldora TODOS (primera de la fila de marcas): quita el filtro de marca y muestra los productos de
   * TODAS las marcas de la sección, para buscar directo por subcategoría. (Antes era el enlace "Ver todos las
   * marcas" → Nosotros; se mantiene el nombre del input por compatibilidad: cualquier valor no nulo la muestra.)
   */
  readonly allBrandsLink = input<unknown>(null);
  /** Texto cuando no hay selección y no hay tarjetas estáticas proyectadas. */
  readonly idleHint = input<string | null>(null);
  /** Prefijo de ids (accesibilidad). */
  readonly idPrefix = input('acc');

  private api = inject(AccBrandProductsService);
  private buyModal = inject(BuyModalService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private sub?: Subscription;

  readonly activeBrand = signal<string | null>(null);
  readonly activeSubcat = signal<string | null>(null);
  /** Modo "todas las marcas" (píldora TODOS). */
  readonly allBrandsMode = signal(false);
  readonly state = signal<LoadState>('idle');
  readonly failedBrands = signal<string[]>([]);
  private readonly products = signal<BrandProduct[]>([]);
  private readonly failedThumbs = signal<ReadonlySet<string>>(new Set());
  readonly limit = signal(PAGE);
  /** Primera carga automática (TODOS por defecto) en curso: se sigue mostrando el contenido de respaldo. */
  private readonly autoLoad = signal(false);

  /** Subcategorías del PDF para esta sección (píldoras antes de cargar). */
  readonly pdfSubcats = computed(() => ACC_SECTIONS[this.section()].subcats.map((s) => ({ key: s.key, label: s.label })));

  private readonly view = computed(() => {
    const failed = this.failedThumbs();
    return sectionView(this.products().filter((p) => !failed.has(p.id)), this.section());
  });

  /** Píldoras dinámicas: subcategorías del PDF presentes en el resultado (con conteo). */
  readonly subcats = computed<BrandSubcat[]>(() => this.view().subcats);
  readonly filtered = computed<BrandCard[]>(() => {
    const s = this.activeSubcat();
    const cards = this.view().cards;
    return s ? cards.filter((c) => c.subcat === s) : cards;
  });
  readonly visible = computed(() => this.filtered().slice(0, this.limit()));
  readonly activeSubcatLabel = computed(() => this.pdfSubcats().find((s) => s.key === this.activeSubcat())?.label ?? '');
  readonly scopeLabel = computed(() => {
    const b = this.activeBrand();
    const s = this.activeSubcatLabel();
    return [s, b ?? (this.allBrandsMode() ? 'Todas las marcas' : '')].filter(Boolean).join(' · ') || 'la selección';
  });
  readonly isIdle = computed(() => !this.activeBrand() && !this.activeSubcat() && !this.allBrandsMode());
  /** TODOS activa = no hay marca elegida (es la selección por defecto; sólo una píldora de marca activa). */
  readonly allActive = computed(() => !this.activeBrand());
  /** Contenido de respaldo (tarjetas del diseño / idleHint): sin selección, o mientras llega la carga inicial. */
  readonly showFallback = computed(() => this.isIdle() || (this.autoLoad() && this.state() === 'loading'));

  constructor() {
    inject(DestroyRef).onDestroy(() => this.sub?.unsubscribe());
    // TODOS por defecto: sólo en el navegador (en SSR/prerender queda el respaldo). Se repite si cambia la
    // sección (misma instancia al navegar entre subsecciones).
    effect(() => {
      this.section();
      this.brands();
      if (!this.isBrowser || !this.allBrandsLink()) return;
      untracked(() => this.loadDefault());
    });
  }

  /** Vista por defecto: TODOS, sin subcategoría, carga automática de todas las marcas de la sección. */
  private loadDefault(): void {
    this.activeBrand.set(null);
    this.activeSubcat.set(null);
    this.allBrandsMode.set(true);
    this.limit.set(PAGE);
    this.autoLoad.set(true);
    this.load();
  }

  selectBrand(brand: string): void {
    this.autoLoad.set(false);
    // Click en la marca activa la quita (se conserva la subcategoría, si la hay) → vuelve a TODOS.
    if (this.activeBrand() === brand && this.state() !== 'error' && this.allBrandsLink()) {
      this.showAllBrands();
      return;
    }
    this.activeBrand.set(this.activeBrand() === brand && this.state() !== 'error' ? null : brand);
    this.allBrandsMode.set(false);
    this.limit.set(PAGE);
    // Al cambiar de marca se conserva la subcategoría sólo si la nueva marca la tiene (se valida al cargar).
    this.load();
  }

  /** Píldora TODOS: activa todas las marcas (se conserva la subcategoría). Ya activa: no cambia nada. */
  selectAllBrands(): void {
    this.autoLoad.set(false);
    this.showAllBrands();
  }

  /** Quita la marca y carga los productos de todas las marcas de la sección. */
  showAllBrands(): void {
    const wasAll = this.allBrandsMode() && !this.activeBrand();
    this.activeBrand.set(null);
    this.allBrandsMode.set(true);
    this.limit.set(PAGE);
    if (!wasAll || this.state() !== 'ready') this.load();
  }

  selectSubcat(key: string | null): void {
    const next = this.activeSubcat() === key ? null : key;
    this.activeSubcat.set(next);
    this.limit.set(PAGE);
    this.autoLoad.set(false);
    if (!this.activeBrand() && !next && !this.allBrandsMode()) this.reset();
    // Mismo alcance (marca o todas las marcas) ya cargado: sólo se filtra, sin volver a pedir.
    else if (this.state() !== 'ready') this.load();
  }

  /** "Quitar filtros": con TODOS vuelve a la vista por defecto (todas las marcas); si no, a la vista inicial. */
  reset(): void {
    if (this.isBrowser && this.allBrandsLink()) {
      this.loadDefault();
      return;
    }
    this.sub?.unsubscribe();
    this.activeBrand.set(null);
    this.activeSubcat.set(null);
    this.allBrandsMode.set(false);
    this.state.set('idle');
    this.products.set([]);
    this.failedBrands.set([]);
  }

  retry(): void {
    this.load();
  }

  /** "Comprar" → modal (en línea: ficha de la tienda si hay existencia, si no el catálogo; o en sucursal). */
  buy(p: BrandCard, ev: Event): void {
    this.buyModal.open(
      { title: p.title, brand: p.brand, onlineUrl: p.storeUrl, fallbackUrl: this.catalogUrl(), fallbackLabel: 'Catálogo de accesorios' },
      ev
    );
  }

  showMore(): void {
    this.limit.update((n) => n + PAGE);
  }

  /**
   * Thumbnail que no carga: si es .png/.jpg se reintenta una vez con la variante .webp del mismo archivo
   * (el CDN bloquea png/jpg por hotlink fuera de *.cafeetrusca.com, p. ej. localhost). Si falla, se oculta.
   */
  onThumbError(p: BrandCard, img: HTMLImageElement): void {
    const webp = p.image.replace(/\.(png|jpe?g)(?=([?#]|$))/i, '.webp');
    if (webp !== p.image && !img.dataset['webpRetry']) {
      img.dataset['webpRetry'] = '1';
      img.src = webp;
      return;
    }
    this.failedThumbs.update((set) => new Set(set).add(p.id));
  }

  private load(): void {
    this.sub?.unsubscribe();
    const brand = this.activeBrand();
    if (!brand && !this.activeSubcat() && !this.allBrandsMode()) {
      this.reset();
      return;
    }
    const list = brand ? [brand] : this.brands();
    this.state.set('loading');
    this.sub = this.api.brands(list).subscribe({
      next: ({ products, failed }) => {
        this.products.set(products);
        this.failedBrands.set(failed);
        // Si la subcategoría elegida no existe en el nuevo resultado, se vuelve a "Todos".
        const s = this.activeSubcat();
        if (s && !sectionView(products, this.section()).subcats.some((x) => x.key === s)) this.activeSubcat.set(null);
        this.state.set('ready');
        this.autoLoad.set(false);
      },
      error: () => {
        this.state.set('error');
        this.autoLoad.set(false);
      }
    });
  }
}
