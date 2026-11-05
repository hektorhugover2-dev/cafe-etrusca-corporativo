import { ProductFactsComponent } from '../../components/product-facts/product-facts.component';
import { PRODUCT_FACTS } from '../../components/product-facts/product-facts.data';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';
import { flavorCountLabel, uniqueFlavors } from '../../components/flavors-modal/flavor-count';
import { FlavorsModalComponent } from '../../components/flavors-modal/flavors-modal.component';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { siteUrl } from '../../../../../shared/kernel/config/site-url';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import { publishedRecipes, type Recipe } from '../recipes-page/recetas.data';
import { storeProductUrl } from '../../services/store-links';
import {
  MOCAFE_CODES,
  MOCAFE_FAQ,
  MOCAFE_LINES,
  MOCAFE_LINE_ICONS,
  MOCAFE_PHOTOS,
  MOCAFE_PRODUCTS,
  MOCAFE_STORE_URL,
  type MocafeLine,
  type MocafeProduct
} from '../../mocafe.data';

/** Página de marca Mocafe (bases en polvo). Modelo: David Rio / ChillOut / Torani. Sin liga desde menú, home ni footer. */
export const MOCAFE_PAGE_PATH = '/insumos-para-cafeterias/bases-en-polvo/mocafe';

/** Claves que existen en la calculadora (lee la API type=1; las 25 Mocafe están ahí al 30-oct-2026). Si una no está, el botón va sin ?producto. */
const CALC_CODES = new Set(MOCAFE_CODES);
const TONES = ['coral', 'yellow'] as const;

function usesMocafe(r: Recipe): boolean {
  return r.brand === 'Mocafe'
    || !!r.sapIngredients?.some((s) => MOCAFE_CODES.includes(s.sap))
    || !!r.alternatives?.some((a) => MOCAFE_CODES.includes(a.sap));
}

@Component({
  selector: 'app-mocafe-page',
  standalone: true,
  imports: [ProductFactsComponent, RouterLink, FlavorsModalComponent, InsumosNavComponent, ScrollWaveComponent],
  templateUrl: './mocafe-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', '../chillout-page/chillout-page.component.scss', './mocafe-page.component.scss']
})
export class MocafePageComponent {
  /** FAQ públicas: las pending (por confirmar) se conservan en datos pero no se muestran. */
  get publicFaq() { return this.faq.filter((f) => !f.pending); }

  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  private buyModal = inject(BuyModalService);

  readonly path = MOCAFE_PAGE_PATH;
  readonly storeUrl = MOCAFE_STORE_URL;
  readonly lines = MOCAFE_LINES;
  readonly faq = MOCAFE_FAQ;
  readonly calcPath = '/calculadora-de-precios';
  readonly recipes = publishedRecipes().filter(usesMocafe).slice(0, 3);
  readonly heroBags = [
    { code: 'IBP-135', alt: 'Mocafe Green tea matcha latte en bolsa de 1.36 kg', cls: 'b-left', src: 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/mocafe/IBP-135-transparente.webp' },
    { code: 'IBP-250', alt: 'Mocafe Chocolate pistache Dubai en bolsa de 1.36 kg', cls: 'b-center', src: 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/mocafe/IBP-250-transparente.webp' },
    { code: 'IBP-132', alt: 'Mocafe Chai spiced Precious Divinity en bolsa de 1.36 kg', cls: 'b-right', src: 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/mocafe/IBP-132-transparente.webp' }
  ];

  flavorLine: MocafeLine | null = null;
  openFlavors(line: MocafeLine) { this.flavorLine = line; }
  /** Sabores únicos (Caffe latte 1.36 kg y 11.33 kg cuentan como uno). " latte" se quita solo para elegir el ícono. */
  flavorsFor(line: MocafeLine): string[] {
    return uniqueFlavors(line.products.filter((p) => p.code !== 'IBP-147').map((p) => p.name.replace(/ latte$/i, '').replace(/^Caffe$/, 'Caffe latte')));
  }
  flavorCount(line: MocafeLine): string {
    return flavorCountLabel(this.flavorsFor(line).length);
  }
  presentations(line: MocafeLine): string {
    return [...new Set(line.products.map((p) => p.presentation.replace(/^(Bolsa|Caja) /, '')))].join(' y ');
  }
  icons(tone: string) { return MOCAFE_LINE_ICONS(tone); }

  constructor() {
    this.seo.set({
      title: 'Mocafe para cafetería: frappés, chai y matcha | Etrusca',
      description:
        'Bases en polvo Mocafe: frappés de moka, caramelo y java chip, chai Precious Divinity, matcha, taro y bases para smoothie. Bolsa de 1.36 kg en Café Etrusca.',
      keywords: 'mocafe, mocafe frappé, base mocafe, mocafe matcha, matcha mocafe, mocafe chai, chai precious divinity, base taro, chocolate azteca, frappé cookies and cream, Café Etrusca',
      image: MOCAFE_PHOTOS['IBP-123'],
      path: MOCAFE_PAGE_PATH,
      jsonLd: ({ url }) => [this.pageLd(url), this.itemListLd(url), this.faqLd(url), this.breadcrumbLd()]
    });
  }

  /** Si la clave no viene en la data de ingredientes, se conserva la línea de alérgenos del brief. */
  hasFacts(code: string): boolean { return !!PRODUCT_FACTS[code]; }
  tone(i: number): string { return TONES[i % TONES.length]; }
  image(code: string): string { return MOCAFE_PHOTOS[code] || ''; }
  url(p: MocafeProduct): string { return storeProductUrl(p.code, p.apiName); }
  calcQuery(code: string): Record<string, string> | null { return CALC_CODES.has(code) ? { producto: code } : null; }
  alt(p: MocafeProduct): string { return `Mocafe ${p.name} en ${p.presentation.toLowerCase().replace('bolsa', 'bolsa de').replace('caja', 'caja de')}`; }

  buy(p: MocafeProduct, ev: Event): void {
    this.buyModal.open(
      { title: `Mocafe ${p.name} (${p.presentation})`, brand: 'Mocafe', onlineUrl: this.url(p), fallbackUrl: this.storeUrl, theme: { btn: '#192966', ink: '#ffffff' } },
      ev
    );
  }

  recipeLink(r: Recipe): string { return '/recetas/' + r.slug; }

  private pageLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': url + '#webpage',
      url,
      name: 'Mocafe para cafetería',
      inLanguage: 'es-MX',
      datePublished: '2026-10-30',
      dateModified: '2026-10-30'
    };
  }

  /** Sin offers/precio, sin Review ni AggregateRating (regla del brief). */
  private itemListLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': url + '#productos',
      name: 'Productos Mocafe',
      numberOfItems: MOCAFE_PRODUCTS.length,
      itemListElement: MOCAFE_PRODUCTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `Mocafe ${p.name} (${p.presentation})`,
          sku: p.code,
          brand: { '@type': 'Brand', name: 'Mocafe' },
          url: this.url(p),
          image: this.image(p.code)
        }
      }))
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
      ['Mocafe', MOCAFE_PAGE_PATH]
    ];
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl(path) }))
    };
  }
}
