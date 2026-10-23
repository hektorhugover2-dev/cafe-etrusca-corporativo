import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { siteUrl } from '../../../../../shared/kernel/config/site-url';
import { publishedRecipes, type Recipe } from '../recipes-page/recetas.data';
import { COURSE_PUBLIC_PATH_BY_SLUG } from '../../../../education/presentation/course-public-paths';
import {
  CHILLOUT_FAQ,
  CHILLOUT_JUST_FRUIT,
  CHILLOUT_LINES,
  CHILLOUT_MIX,
  CHILLOUT_SIN_AZUCAR,
  CHILLOUT_STORE_URL,
  type ChilloutProduct
} from '../../chillout.data';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

/** Página de marca ChillOut (bases en polvo). Clon de la página Torani (/insumos-para-cafeterias/jarabes/torani/). */
export const CHILLOUT_PAGE_PATH = '/insumos-para-cafeterias/bases-en-polvo/chillout';

const TONES = ['coral', 'yellow'] as const;
const DRINK_TONES = ['pink', 'yellow', 'lime'] as const;

/** Recetas del sitio que usan una base en polvo ChillOut (Mix / Just Fruit), no otros productos ChillOut. */
function usesChilloutPowder(r: Recipe): boolean {
  const hay = [r.summary, ...(r.ingredients || [])].join(' ').toLowerCase();
  return /chillout (mix|just fruit)/.test(hay);
}

@Component({
  selector: 'app-chillout-page',
  standalone: true,
  imports: [RouterLink, InsumosNavComponent, ScrollWaveComponent],
  templateUrl: './chillout-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', './chillout-page.component.scss']
})
export class ChilloutPageComponent {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);

  readonly path = CHILLOUT_PAGE_PATH;
  readonly storeUrl = CHILLOUT_STORE_URL;
  private buyModal = inject(BuyModalService);

  /** "Comprar" → modal: en línea abre la ficha de la tienda (la URL de "Ver producto"), o en sucursal. */
  buy(p: ChilloutProduct, ev: Event): void {
    this.buyModal.open(
      { title: p.name, brand: 'ChillOut', onlineUrl: p.url, fallbackUrl: this.storeUrl, theme: { btn: '#ff9496', ink: '#070c3b' } },
      ev
    );
  }
  readonly lines = CHILLOUT_LINES;
  readonly mix = CHILLOUT_MIX;
  readonly sinAzucar = CHILLOUT_SIN_AZUCAR;
  readonly justFruit = CHILLOUT_JUST_FRUIT;
  readonly faq = CHILLOUT_FAQ;
  readonly tallerPath = COURSE_PUBLIC_PATH_BY_SLUG['bebidas-frias'] || '/cursos-para-baristas-y-talleres-para-cafeterias';
  readonly recipes = publishedRecipes().filter(usesChilloutPowder).slice(0, 3);
  readonly heroBottles = [
    { src: `${ASSETS_BASE_URL}/images/insumos/chillout/hero-chillout-mix-matcha.webp`, alt: 'ChillOut Mix base en polvo sabor matcha, bote 700 g', cls: 'b-left' },
    { src: `${ASSETS_BASE_URL}/images/insumos/chillout/hero-chillout-mix-taro.webp`, alt: 'ChillOut Mix base en polvo sabor taro, bolsa 2 kg', cls: 'b-center' },
    { src: `${ASSETS_BASE_URL}/images/insumos/chillout/hero-chillout-base-neutra-sin-azucar.webp`, alt: 'ChillOut Mix base neutra sin azúcar, bolsa 1.6 kg', cls: 'b-right' }
  ];

  constructor() {
    this.seo.set({
      title: 'Bases en polvo ChillOut: sabores y sin azúcar | Café Etrusca',
      // Sin precios, rendimientos ni "envío a todo México" (no confirmados): ver TODO en chillout.data.ts
      description:
        'Bases en polvo ChillOut Mix y Just Fruit para bebidas frías y calientes: taro, matcha, chai, horchata y opciones sin azúcar. Compra en línea.',
      keywords:
        'chillout, base en polvo chillout, chillout mix, chillout just fruit, chillout sin azúcar, chillout taro, chillout matcha, Café Etrusca',
      image: `${ASSETS_BASE_URL}/images/insumos/chillout/hero-chillout-mix-taro.webp`,
      path: CHILLOUT_PAGE_PATH,
      jsonLd: ({ url }) => [this.itemListLd(url), this.faqLd(url), this.breadcrumbLd()]
    });
  }

  tone(i: number): string {
    return TONES[i % TONES.length];
  }

  drinkTone(i: number): string {
    return DRINK_TONES[i % DRINK_TONES.length];
  }

  recipeLink(r: Recipe): string {
    return '/recetas/' + r.slug;
  }

  private itemListLd(url: string) {
    const all: ChilloutProduct[] = [...this.mix, ...this.sinAzucar, ...this.justFruit];
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': url + '#productos',
      name: 'Bases en polvo ChillOut',
      numberOfItems: all.length,
      itemListElement: all.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `ChillOut ${p.line} ${p.flavor} (${p.presentation})`,
        url: p.url,
        image: p.image
      }))
    };
  }

  private faqLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': url + '#faq',
      mainEntity: this.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    };
  }

  private breadcrumbLd() {
    const crumbs: Array<[string, string]> = [
      ['Inicio', '/'],
      ['Insumos', '/insumos-para-cafeterias'],
      ['Bases en polvo', '/insumos-para-cafeterias/bases-en-polvo'],
      ['ChillOut', CHILLOUT_PAGE_PATH]
    ];
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map(([name, path], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name,
        item: siteUrl(path)
      }))
    };
  }
}
