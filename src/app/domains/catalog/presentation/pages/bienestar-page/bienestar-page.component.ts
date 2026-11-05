import { Component, HostListener, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductFactsComponent } from '../../components/product-facts/product-facts.component';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { siteUrl } from '../../../../../shared/kernel/config/site-url';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import { BN_CODES, BN_FAQ, BN_HERO, BN_LINES, BN_PRODUCTS, BN_STORE_URL, bnPhoto, type BnLine, type BnProduct } from '../../bienestar.data';

/** Página "Bienestar": opciones sin azúcar (Torani SF, David Rio, ChillOut). Ligada desde el mega menú de Insumos. */
export const BIENESTAR_PAGE_PATH = '/insumos-para-cafeterias/bienestar';

/** Las 37 claves están en la API de la calculadora (cafeetrusca.com/api/product?type=1, revisado 30-oct-2026). */
const CALC_CODES = new Set(BN_CODES);
const JAR = `${ASSETS_BASE_URL}/images/insumos/jarabes`;

export interface BnGroup { name: string; image: string; variants: BnProduct[] }

@Component({
  selector: 'app-bienestar-page',
  standalone: true,
  imports: [ProductFactsComponent, RouterLink, InsumosNavComponent, ScrollWaveComponent],
  templateUrl: './bienestar-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', '../chillout-page/chillout-page.component.scss', './bienestar-page.component.scss']
})
export class BienestarPageComponent {
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);

  readonly path = BIENESTAR_PAGE_PATH;
  readonly storeUrl = BN_STORE_URL;
  readonly lines = BN_LINES;
  readonly faq = BN_FAQ;
  readonly total = BN_PRODUCTS.length;
  readonly calcPath = '/calculadora-de-precios';
  readonly tone = 'lime';
  readonly warn = 'CONTIENE EDULCORANTES, NO RECOMENDABLE EN NIÑOS';
  readonly icons = { sabor: `${JAR}/icon-sabor-lime.png`, pres: `${JAR}/icon-pres-lime.png`, blob: `${JAR}/blob-lime.png` };
  readonly heroItems = [
    { code: 'IBP-102', cls: 'b-left', alt: 'David Rio Orca chai sin azúcar, lata de 337 g', src: BN_HERO('IBP-102') },
    { code: 'IJA-197', cls: 'b-center', alt: 'Jarabe Torani Sugar Free fresa, botella PET de 750 ml', src: BN_HERO('IJA-197') },
    { code: 'IBP-240', cls: 'b-right', alt: 'ChillOut cappuccino sin azúcar, bote de 1.6 kg', src: BN_HERO('IBP-240') }
  ];

  /** Video HyperFrames del hero (mismo movimiento que Torani). Solo en cliente y sin prefers-reduced-motion; en SSR quedan las imágenes estáticas. */
  readonly heroVideo = {
    webm: '/assets/videos/bienestar/bienestar-hero.webm',
    mp4: '/assets/videos/bienestar/bienestar-hero.mp4',
    poster: '/assets/videos/bienestar/bienestar-hero-poster.webp'
  };
  readonly heroVideoOn = signal(false);
  private platformId = inject(PLATFORM_ID);
  private _heroVideoInit = afterNextRender(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) return;
    this.heroVideoOn.set(true);
  });
  /** Angular no refleja `muted` como atributo; se fuerza para que el autoplay no se bloquee. */
  playHeroVideo(ev: Event): void {
    const v = ev.target as HTMLVideoElement;
    v.muted = true;
    v.play?.().catch(() => {});
  }

  activeLine: BnLine | null = null;
  openLine(l: BnLine) { this.activeLine = l; if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'; }
  closeLine() { this.activeLine = null; if (typeof document !== 'undefined') document.body.style.overflow = ''; }
  @HostListener('document:keydown.escape') onEsc() { if (this.activeLine) this.closeLine(); }

  groups(l: BnLine): BnGroup[] {
    const m = new Map<string, BnGroup>();
    for (const p of l.products) {
      const g = m.get(p.name) || { name: p.name, image: bnPhoto(p.code), variants: [] };
      g.variants.push(p);
      m.set(p.name, g);
    }
    return [...m.values()];
  }
  flavorCount(l: BnLine): string {
    const n = this.groups(l).length;
    return `${n} ${n === 1 ? 'sabor' : 'sabores'} · ${l.products.length} ${l.products.length === 1 ? 'producto' : 'productos'}`;
  }
  presentations(l: BnLine): string { return [...new Set(l.products.map((p) => p.pres))].join(' · '); }
  image(code: string): string { return bnPhoto(code); }
  calcQuery(code: string): Record<string, string> | null { return CALC_CODES.has(code) ? { producto: code } : null; }

  constructor() {
    this.seo.set({
      title: 'Jarabes y bases sin azúcar para cafetería | Café Etrusca',
      description:
        'Jarabes y salsas Torani Sugar Free, chai David Rio y bases ChillOut sin azúcar para ofrecer opciones sin azúcar en tu menú. En Café Etrusca.',
      keywords: 'jarabes sugar free, jarabes sin azúcar, torani sugar free, caramelo sugar free, chai sin azúcar, chai david rio sin azúcar, bases sin azúcar, Café Etrusca',
      image: bnPhoto('IJA-197'),
      path: BIENESTAR_PAGE_PATH,
      jsonLd: ({ url }) => [this.pageLd(url), this.itemListLd(url), this.faqLd(url), this.breadcrumbLd()]
    });
  }

  private brandOf(p: BnProduct): string { return this.lines.find((l) => l.products.includes(p))?.brand || ''; }

  private pageLd(url: string) {
    return {
      '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': url + '#webpage', url,
      name: 'Bienestar: opciones sin azúcar para tu cafetería', inLanguage: 'es-MX', datePublished: '2026-10-30', dateModified: '2026-10-30'
    };
  }
  /** Sin offers ni price (regla del brief). */
  private itemListLd(url: string) {
    return {
      '@context': 'https://schema.org', '@type': 'ItemList', '@id': url + '#productos', name: 'Insumos sin azúcar', numberOfItems: BN_PRODUCTS.length,
      itemListElement: BN_PRODUCTS.map((p, i) => {
        const line = this.lines.find((l) => l.products.includes(p))!;
        return {
          '@type': 'ListItem', position: i + 1,
          item: { '@type': 'Product', name: `${line.name} ${line.sub.toLowerCase()} ${p.name} (${p.pres})`, sku: p.code, image: bnPhoto(p.code), brand: { '@type': 'Brand', name: this.brandOf(p) } }
        };
      })
    };
  }
  private faqLd(url: string) {
    return {
      '@context': 'https://schema.org', '@type': 'FAQPage', '@id': url + '#faq',
      mainEntity: this.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    };
  }
  private breadcrumbLd() {
    const crumbs: Array<[string, string]> = [['Inicio', '/'], ['Insumos para cafeterías', '/insumos-para-cafeterias'], ['Bienestar', BIENESTAR_PAGE_PATH]];
    return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map(([name, p], i) => ({ '@type': 'ListItem', position: i + 1, name, item: siteUrl(p) })) };
  }
}
