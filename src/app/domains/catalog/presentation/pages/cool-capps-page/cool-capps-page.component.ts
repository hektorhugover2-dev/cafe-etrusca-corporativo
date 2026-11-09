import { ProductFactsComponent } from '../../components/product-facts/product-facts.component';
import { PRODUCT_FACTS } from '../../components/product-facts/product-facts.data';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { flavorCountLabel, uniqueFlavors } from '../../components/flavors-modal/flavor-count';
import { FlavorsModalComponent } from '../../components/flavors-modal/flavors-modal.component';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { siteUrl } from '../../../../../shared/kernel/config/site-url';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import {
  COOL_CAPPS_CODES,
  COOL_CAPPS_FAQ,
  COOL_CAPPS_LINES,
  COOL_CAPPS_LINE_ICONS,
  COOL_CAPPS_PHOTOS,
  COOL_CAPPS_PRODUCTS,
  COOL_CAPPS_STORAGE,
  COOL_CAPPS_STORE_URL,
  type CoolCappsLine,
  type CoolCappsProduct
} from '../../cool-capps.data';

/** Página de marca Cool Capps (bases en polvo). Modelo: Mocafe / Torani. LOCAL / brief 2026-11-09. */
export const COOL_CAPPS_PAGE_PATH = '/insumos-para-cafeterias/bases-en-polvo/cool-capps';

const CALC_CODES = new Set(COOL_CAPPS_CODES);
const TONES = ['coral', 'yellow'] as const;

@Component({
  selector: 'app-cool-capps-page',
  standalone: true,
  imports: [ProductFactsComponent, RouterLink, FlavorsModalComponent, InsumosNavComponent, ScrollWaveComponent],
  templateUrl: './cool-capps-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', '../chillout-page/chillout-page.component.scss', '../mocafe-page/mocafe-page.component.scss', './cool-capps-page.component.scss']
})
export class CoolCappsPageComponent {
  get publicFaq() { return this.faq.filter((f) => !f.pending); }

  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  readonly path = COOL_CAPPS_PAGE_PATH;
  readonly storeUrl = COOL_CAPPS_STORE_URL;
  readonly lines = COOL_CAPPS_LINES;
  readonly faq = COOL_CAPPS_FAQ;
  readonly storage = COOL_CAPPS_STORAGE;
  readonly calcPath = '/calculadora-de-precios';
  readonly waUrl = 'https://wa.me/525541668777';
  readonly bizUrl = 'https://etrusca.biz/';
  /** Sin recetas Cool Capps en preview (brief): no inventar fichas. */
  readonly recipes: never[] = [];
  readonly heroBags = [
    { code: 'IBP-084', alt: 'Cool Capps Chai vainilla en bolsa de 1.58 kg', cls: 'b-left', src: COOL_CAPPS_PHOTOS['IBP-084'] },
    { code: 'IBP-074', alt: 'Cool Capps Moka en bolsa de 1.58 kg', cls: 'b-center', src: COOL_CAPPS_PHOTOS['IBP-074'] },
    { code: 'IBP-081', alt: 'Cool Capps Té verde matcha en bolsa de 1.58 kg', cls: 'b-right', src: COOL_CAPPS_PHOTOS['IBP-081'] }
  ];

  flavorLine: CoolCappsLine | null = null;
  openFlavors(line: CoolCappsLine) { this.flavorLine = line; }
  flavorsFor(line: CoolCappsLine): string[] {
    return uniqueFlavors(line.products.map((p) => p.name));
  }
  flavorCount(line: CoolCappsLine): string {
    return flavorCountLabel(this.flavorsFor(line).length);
  }
  presentations(line: CoolCappsLine): string {
    return [...new Set(line.products.map((p) => p.presentation.replace(/^Bolsa /, '')))].join(' y ');
  }
  icons(tone: string) { return COOL_CAPPS_LINE_ICONS(tone); }

  constructor() {
    this.seo.set({
      title: 'Cool Capps para cafetería: frappé, chai y matcha | Etrusca',
      description:
        'Bases en polvo Cool Capps: frappés de moka y vainilla, chai, matcha, fresa y smoothie. Bolsas de 1.58 kg y 1.36 kg en Café Etrusca.',
      keywords: 'cool capp, cool capps, coolcapp, base cool capps, frappé cool capps, chai vainilla cool capps, matcha cool capps, Café Etrusca',
      image: COOL_CAPPS_PHOTOS['IBP-084'],
      path: COOL_CAPPS_PAGE_PATH,
      jsonLd: ({ url }) => [this.pageLd(url), this.itemListLd(url), this.faqLd(url), this.breadcrumbLd()]
    });
  }

  hasFacts(code: string): boolean { return !!PRODUCT_FACTS[code]; }
  tone(i: number): string { return TONES[i % TONES.length]; }
  image(code: string): string { return COOL_CAPPS_PHOTOS[code] || ''; }
  calcQuery(code: string): Record<string, string> | null { return CALC_CODES.has(code) ? { producto: code } : null; }
  alt(p: CoolCappsProduct): string {
    return `Cool Capps ${p.name} en ${p.presentation.toLowerCase().replace('bolsa', 'bolsa de')}`;
  }


  private pageLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': url + '#webpage',
      url,
      name: 'Cool Capps para cafetería',
      inLanguage: 'es-MX',
      datePublished: '2026-11-09',
      dateModified: '2026-11-09'
    };
  }

  /** Product JSON-LD sin offers (regla del brief). */
  private itemListLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': url + '#productos',
      name: 'Productos Cool Capps',
      numberOfItems: COOL_CAPPS_PRODUCTS.length,
      itemListElement: COOL_CAPPS_PRODUCTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: `Cool Capps ${p.name} (${p.presentation})`,
          sku: p.code,
          brand: { '@type': 'Brand', name: 'Cool Capps' },
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
      ['Cool Capps', COOL_CAPPS_PAGE_PATH]
    ];
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl(path) }))
    };
  }
}
