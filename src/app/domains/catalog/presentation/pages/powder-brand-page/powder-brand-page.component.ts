import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { flavorCountLabel, uniqueFlavors } from '../../components/flavors-modal/flavor-count';
import { FlavorsModalComponent } from '../../components/flavors-modal/flavors-modal.component';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { SITE_ORIGIN, siteUrl } from '../../../../../shared/kernel/config/site-url';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import { storeProductUrl } from '../../services/store-links';
import {
  PB_BIZ,
  PB_BRANDS,
  PB_CALC_PATH,
  PB_WHATSAPP,
  type PbBrand,
  type PbLine,
  type PbProduct
} from '../../powder-brands.data';

/**
 * Página de marca de Bases en polvo (Hollander, Cappuccine, Don Gustavo). Una sola plantilla; los datos y textos
 * de cada marca viven en powder-brands.data.ts (briefs SEO 2026-11-26). Modelo visual: Cool Capps / Mocafe / ChillOut.
 * Sin precios, promos ni existencias; sin enlaces a /Producto/Detalle/. "Comprar" reutiliza el modal global (con SKU).
 */
@Component({
  selector: 'app-powder-brand-page',
  standalone: true,
  imports: [RouterLink, FlavorsModalComponent, InsumosNavComponent, ScrollWaveComponent],
  templateUrl: './powder-brand-page.component.html',
  styleUrls: [
    '../../insumos-theme.scss',
    '../../jarabes-theme.scss',
    '../chillout-page/chillout-page.component.scss',
    '../mocafe-page/mocafe-page.component.scss',
    '../cool-capps-page/cool-capps-page.component.scss',
    './powder-brand-page.component.scss'
  ]
})
export class PowderBrandPageComponent {
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  private buyModal = inject(BuyModalService);

  readonly brand: PbBrand = PB_BRANDS[String(inject(ActivatedRoute).snapshot.data['brand'] || '')] ?? PB_BRANDS['hollander'];
  /** Categoría padre (migas de pan, JSON-LD y enlaces de regreso). */
  readonly cat = this.brand.category ?? { name: 'Bases en polvo', path: '/insumos-para-cafeterias/bases-en-polvo', backLabel: 'Ver todas las bases en polvo' };
  readonly calcPath = PB_CALC_PATH;
  readonly waUrl = PB_WHATSAPP;
  readonly bizUrl = PB_BIZ;
  readonly heroBags = this.brand.heroCodes.map((code, i, all) => ({
    code,
    src: this.image(code),
    alt: this.altFor(code),
    cls: all.length === 1 ? 'b-center' : ['b-left', 'b-center', 'b-right'][i]
  }));

  flavorLine: PbLine | null = null;

  constructor() {
    const b = this.brand;
    this.seo.set({
      title: b.title,
      description: b.description,
      keywords: b.keywords,
      image: SITE_ORIGIN + b.ogPhoto,
      path: b.path,
      jsonLd: ({ url }) => [this.pageLd(url), ...this.brandLd(url), ...this.productLd(url), this.faqLd(url), this.breadcrumbLd()]
    });
  }

  image(code: string): string { return this.byCode(code)?.photo || ''; }
  altFor(code: string): string { return this.byCode(code)?.photoAlt || ''; }
  private byCode(code: string): PbProduct | undefined { return this.brand.products.find((p) => p.code === code); }
  productsOf(line: PbLine): PbProduct[] { return this.brand.products.filter((p) => p.line === line.anchor); }
  sectionTitle(line: PbLine): string { return line.sub.charAt(0) + line.sub.slice(1).toLowerCase(); }
  tone(i: number): string { return (['coral', 'yellow'] as const)[i % 2]; }
  icons(tone: string) {
    const jar = `${ASSETS_BASE_URL}/images/insumos/jarabes`;
    return { sabor: `${jar}/icon-sabor-${tone}.webp`, pres: `${jar}/icon-pres-${tone}.webp`, rend: `${jar}/icon-rend-${tone}.webp`, blob: `${jar}/blob-${tone}.webp` };
  }
  flavorsFor(line: PbLine): string[] { return uniqueFlavors(this.productsOf(line).map((p) => p.name)); }
  flavorCount(line: PbLine): string { return flavorCountLabel(this.flavorsFor(line).length); }
  presentations(line: PbLine): string {
    if (line.presentationLabel) return line.presentationLabel;
    return [...new Set(this.productsOf(line).map((p) => p.presentation.replace(/^Bolsa /, '')))].join(' y ');
  }
  productCount(line: PbLine): string {
    const n = this.productsOf(line).length;
    return `${n} ${n === 1 ? 'producto' : 'productos'}`;
  }
  yieldOf(line: PbLine): string {
    if (line.yieldLabel !== undefined) return line.yieldLabel;
    const ys = [...new Set(this.productsOf(line).map((p) => p.yield).filter((y) => !!y))];
    return ys.length === 1 ? ys[0]! : 'Según preparación';
  }
  yieldLabel(): string {
    const ys = [...new Set(this.brand.products.map((p) => p.yield).filter((y) => !!y))];
    return ys.length === 1 ? ys[0]! : 'según preparación';
  }
  dietLabel(p: PbProduct): string {
    if (p.vegetarian && p.vegan) return 'vegetariano y vegano';
    if (p.vegan) return 'vegano';
    if (p.vegetarian) return 'vegetariano';
    return '';
  }
  openFlavors(line: PbLine): void { this.flavorLine = line; }
  /** Nombre del botón / modal: «Hollander Velvet Dark (Bolsa 1.13 kg)». */
  title(p: PbProduct): string {
    return p.name.startsWith(this.brand.brandName) || p.name.includes(this.brand.brandName)
      ? `${p.name} (${p.presentation})`
      : `${this.brand.brandName} ${p.name} (${p.presentation})`;
  }

  /** «Comprar» → modal global de compra, con el SKU del producto (mismo patrón que Mocafe / David Rio). */
  buy(p: PbProduct, ev: Event): void {
    this.buyModal.open(
      {
        title: this.title(p),
        brand: this.brand.brandName,
        sku: p.code,
        onlineUrl: storeProductUrl(p.code, p.apiName),
        fallbackUrl: this.brand.storeUrl,
        theme: { btn: '#192966', ink: '#ffffff' }
      },
      ev
    );
  }

  private pageLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': url + '#webpage',
      url,
      name: this.brand.title.split(' | ')[0],
      inLanguage: 'es-MX',
      datePublished: this.brand.datePublished,
      dateModified: this.brand.datePublished
    };
  }

  /** Nodo Brand (solo marcas con ldBrand, p. ej. Tea Zone). */
  private brandLd(url: string) {
    const lb = this.brand.ldBrand;
    if (!lb) return [];
    return [{ '@context': 'https://schema.org', '@type': 'Brand', '@id': url + '#brand', name: this.brand.brandName, description: lb.description, logo: lb.logo, url }];
  }

  /** Product sin offers/precio, sin Review ni AggregateRating (regla de los briefs). */
  private productLd(url: string) {
    const b = this.brand;
    const one = (p: PbProduct) => ({
      '@type': 'Product',
      '@id': url + '#' + p.code,
      name: p.ldName,
      sku: p.code,
      ...(p.gtin && /^\d{12,13}$/.test(p.gtin) ? { [p.gtin.length === 13 ? 'gtin13' : 'gtin12']: p.gtin } : {}),
      description: p.ldDescription,
      brand: { '@type': 'Brand', name: b.brandName },
      image: SITE_ORIGIN + p.photo,
      url,
      ...(this.productProps(p).length ? { additionalProperty: this.productProps(p) } : {})
    });
    if (b.single) return [{ '@context': 'https://schema.org', ...one(b.products[0]), category: 'Chocolate en polvo' }];
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': url + '#productos',
        name: `Productos ${b.brandName}`,
        numberOfItems: b.products.length,
        itemListElement: b.products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: one(p) }))
      }
    ];
  }

  private productProps(p: PbProduct) {
    const props = [];
    if (p.presentation) props.push({ '@type': 'PropertyValue', name: 'Presentación', value: p.presentation });
    if (p.yield) props.push({ '@type': 'PropertyValue', name: 'Rendimiento', value: p.yield });
    if (p.vegetarian) props.push({ '@type': 'PropertyValue', name: 'Vegetariano', value: 'Sí' });
    if (p.vegan) props.push({ '@type': 'PropertyValue', name: 'Vegano', value: 'Sí' });
    return props;
  }

  private faqLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': url + '#faq',
      mainEntity: this.brand.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    };
  }

  private breadcrumbLd() {
    const crumbs: Array<[string, string]> = [
      ['Inicio', '/'],
      ['Insumos para cafeterías', '/insumos-para-cafeterias'],
      [this.cat.name, this.cat.path],
      [this.brand.brandName, this.brand.path]
    ];
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl(path) }))
    };
  }
}
