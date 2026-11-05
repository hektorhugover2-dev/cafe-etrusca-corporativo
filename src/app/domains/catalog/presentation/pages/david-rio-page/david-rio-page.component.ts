import { ProductFactsComponent } from '../../components/product-facts/product-facts.component';
import { Component, inject, makeStateKey, signal, TransferState } from '@angular/core';
import { CatalogNamePipe } from '../../../../../shared/ui/catalog-name.pipe';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { siteUrl } from '../../../../../shared/kernel/config/site-url';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import { publishedRecipes, type Recipe } from '../recipes-page/recetas.data';
import { storeProductUrl } from '../../services/store-links';
import {
  DAVID_RIO_ANIMALS,
  DAVID_RIO_ANIMAL_ART,
  DAVID_RIO_CODES,
  DAVID_RIO_EXTRAS,
  DAVID_RIO_FAQ,
  DAVID_RIO_PHOTOS,
  DAVID_RIO_STORE_URL,
  type DavidRioAnimal,
  type DavidRioSku
} from '../../david-rio.data';

/** Página de marca David Rio (bases en polvo). Modelo: páginas Torani / ChillOut. Sin liga desde menú, home ni footer. */
export const DAVID_RIO_PAGE_PATH = '/insumos-para-cafeterias/bases-en-polvo/david-rio';

const API = 'https://cafeetrusca.com/api/product';
const API_HOST = 'https://cafeetrusca.com';
/** Solo el mapa saneado (solo imagen) viaja en el HTML; la respuesta cruda de la API NO (trae campos de oferta). */
const DR_STATE = makeStateKey<Record<string, ApiInfo>>('david-rio-api');

/** Solo campos permitidos: código e imagen. NO leer precios, ofertas, descuentos ni stock. */
interface ApiRow { codigo?: string; image_thumbnail?: string | null }
/** Solo imagen: Héctor pidió no mostrar precios (ni en HTML ni en JSON-LD ni en el estado transferido). */
interface ApiInfo { image: string }

/** Recetas del sitio que usan un producto David Rio (por marca o clave SAP). */
function usesDavidRio(r: Recipe): boolean {
  return r.brand === 'David Rio'
    || !!r.sapIngredients?.some((s) => DAVID_RIO_CODES.includes(s.sap))
    || !!r.alternatives?.some((a) => DAVID_RIO_CODES.includes(a.sap));
}

@Component({
  selector: 'app-david-rio-page',
  standalone: true,
  imports: [CatalogNamePipe, ProductFactsComponent, RouterLink, InsumosNavComponent, ScrollWaveComponent],
  templateUrl: './david-rio-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', '../chillout-page/chillout-page.component.scss', './david-rio-page.component.scss']
})
export class DavidRioPageComponent {
  /** FAQ públicas: las pending (por confirmar) se conservan en datos pero no se muestran. */
  get publicFaq() { return this.faq.filter((f) => !f.pending); }

  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  private http = inject(HttpClient);
  private buyModal = inject(BuyModalService);
  private ts = inject(TransferState);

  readonly path = DAVID_RIO_PAGE_PATH;
  readonly storeUrl = DAVID_RIO_STORE_URL;
  readonly animals = DAVID_RIO_ANIMALS;
  readonly extras = DAVID_RIO_EXTRAS;
  readonly faq = DAVID_RIO_FAQ;
  readonly recipes = publishedRecipes().filter(usesDavidRio);
  readonly calcPath = '/calculadora-de-precios';
  /** Tarjeta → índice del tamaño elegido */
  readonly picked = signal<Record<string, number>>({});
  /** Datos de la API por clave SAP (solo imagen). Se llenan en el prerender y se refrescan en el navegador. */
  readonly api = signal<Record<string, ApiInfo>>({});

  constructor() {
    this.seo.set({
      title: 'Chai David Rio para cafetería: Tigre, Elefante y más | Etrusca',
      description:
        'Chai David Rio en polvo: Tiger Spice, Elephant Vanilla, Orca y Flamingo sin azúcar, Tortoise té verde y más. Bote para cafetería. Compra en Café Etrusca.',
      keywords: 'chai david rio, david rio chai, te chai david rio, chai tigre, chai elefante, chai tortuga, chai flamingo, chai orca, tiger spice chai, david rio matcha, Café Etrusca',
      image: DAVID_RIO_PHOTOS["IBP-085"],
      path: DAVID_RIO_PAGE_PATH,
      jsonLd: ({ url }) => [this.itemListLd(url), this.faqLd(url), this.breadcrumbLd()]
    });
    const cached = this.ts.get(DR_STATE, null);
    if (cached) this.api.set(cached);
    // transferCache: false → Angular no incrusta la respuesta cruda (con precioofertac_impuestos/descuento) en ng-state.
    this.http.get<ApiRow[]>(API, { params: { type: '1', q: 'david' }, transferCache: false }).subscribe({
      next: (rows) => {
        const map: Record<string, ApiInfo> = {};
        for (const r of Array.isArray(rows) ? rows : []) {
          const code = (r.codigo || '').trim();
          if (!DAVID_RIO_CODES.includes(code)) continue;
          const t = (r.image_thumbnail || '').trim();
          map[code] = { image: t ? (t.startsWith('http') ? t : API_HOST + t) : '' };
        }
        this.api.set(map);
        this.ts.set(DR_STATE, map);
      },
      error: () => {}
    });
  }

  sku(a: DavidRioAnimal): DavidRioSku {
    return a.skus[this.picked()[a.slug] ?? 0] ?? a.skus[0];
  }

  pick(a: DavidRioAnimal, i: number): void {
    this.picked.update((m) => ({ ...m, [a.slug]: i }));
  }

  art(slug: string): string | null {
    return DAVID_RIO_ANIMAL_ART[slug] ?? null;
  }

  image(code: string): string {
    return DAVID_RIO_PHOTOS[code] || this.api()[code]?.image || '';
  }

  url(code: string, apiName: string): string {
    return storeProductUrl(code, apiName);
  }

  /** Stock no se usa (indicación de Héctor): siempre ficha de la tienda, con la búsqueda David Rio como respaldo. */
  buy(title: string, code: string, apiName: string, ev: Event): void {
    this.buyModal.open(
      { title, brand: 'David Rio', onlineUrl: this.url(code, apiName), fallbackUrl: this.storeUrl, theme: { btn: '#192966', ink: '#ffffff' } },
      ev
    );
  }

  /** Nombre para alt/JSON-LD: si ya es el nombre exacto ("DAVID RIO …"), se usa tal cual. */
  extraName(name: string, presentation: string): string {
    return /^DAVID RIO /i.test(name) ? name : `David Rio ${name} (${presentation})`;
  }

  recipeLink(r: Recipe): string {
    return '/recetas/' + r.slug;
  }

  private itemListLd(url: string) {
    const all = [
      ...this.animals.flatMap((a) => a.skus.map((s) => ({ name: `${a.etrusca} David Rio (${s.presentation})`, code: s.code, apiName: s.apiName }))),
      ...this.extras.map((e) => ({ name: this.extraName(e.name, e.presentation), code: e.code, apiName: e.apiName }))
    ];
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': url + '#productos',
      name: 'Productos David Rio',
      numberOfItems: all.length,
      itemListElement: all.map((p, i) => {
        const img = this.image(p.code);
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            sku: p.code,
            brand: { '@type': 'Brand', name: 'David Rio' },
            url: this.url(p.code, p.apiName),
            ...(img ? { image: img } : {})
          }
        };
      })
    };
  }

  private faqLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': url + '#faq',
      mainEntity: this.faq.filter((f) => !f.pending).map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    };
  }

  private breadcrumbLd() {
    const crumbs: Array<[string, string]> = [
      ['Inicio', '/'],
      ['Insumos para cafeterías', '/insumos-para-cafeterias'],
      ['Bases en polvo', '/insumos-para-cafeterias/bases-en-polvo'],
      ['David Rio', DAVID_RIO_PAGE_PATH]
    ];
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl(path) }))
    };
  }
}
