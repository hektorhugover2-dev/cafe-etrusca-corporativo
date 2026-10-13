import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { SITE_ORIGIN, siteUrl } from '../../../../../shared/kernel/config/site-url';
import { publishedRecipes, type Recipe } from '../recipes-page/recetas.data';
import {
  TISANAS_CATEGORY_PATH,
  TISANAS_COUNT_WORD,
  TISANAS_CHILLOUT,
  TISANAS_CHILLOUT_FAQ,
  TISANAS_CHILLOUT_PATH,
  TISANAS_CHILLOUT_STORE_URL,
  TISANAS_IDEAS,
  TISANAS_MENU_POINTS,
  TISANA_RECIPE_SLUG,
  type TisanaProduct
} from '../../tisanas-chillout.data';

export { TISANAS_CHILLOUT_PATH };

const TONES = ['coral', 'yellow'] as const;

/**
 * Tisanas ChillOut para cafetería (bolsa 250 g). Misma estructura que la página Torani
 * (/insumos-para-cafeterias/jarabes/torani/) con los colores de la categoría Tisanas.
 * No es la página de bases en polvo ChillOut (/insumos-para-cafeterias/bases-en-polvo/chillout/).
 */
@Component({
  selector: 'app-tisanas-chillout-page',
  standalone: true,
  imports: [RouterLink, InsumosNavComponent, ScrollWaveComponent],
  templateUrl: './tisanas-chillout-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', './tisanas-chillout-page.component.scss']
})
export class TisanasChilloutPageComponent {
  private seo = inject(SeoService);
  private buyModal = inject(BuyModalService);

  readonly path = TISANAS_CHILLOUT_PATH;
  readonly categoryPath = TISANAS_CATEGORY_PATH;
  readonly storeUrl = TISANAS_CHILLOUT_STORE_URL;
  readonly products = TISANAS_CHILLOUT;
  readonly countWordCap = TISANAS_COUNT_WORD.charAt(0).toUpperCase() + TISANAS_COUNT_WORD.slice(1);
  readonly menuPoints = TISANAS_MENU_POINTS;
  readonly ideas = TISANAS_IDEAS;
  readonly faq = TISANAS_CHILLOUT_FAQ;
  readonly tallerPath = '/educacion/talleres/bebidas-frias';
  readonly recipe: Recipe | undefined = publishedRecipes().find((r) => r.slug === TISANA_RECIPE_SLUG);

  /** "Comprar" → modal: en línea abre la ficha de la tienda (ficha directa o, si no existe, búsqueda en la tienda), en sucursal o asesoría. */
  buy(p: TisanaProduct, ev: Event): void {
    this.buyModal.open(
      { title: p.name, brand: 'ChillOut', onlineUrl: p.url, fallbackUrl: this.storeUrl, fallbackLabel: 'la tienda en línea', theme: { btn: '#ff9496', ink: '#070c3b' } },
      ev
    );
  }

  constructor() {
    this.seo.set({
      title: 'Tisanas ChillOut para cafetería: sabores | Café Etrusca',
      // Sin precio, envío, mayoreo ni dosis (no confirmados): ver TODO en tisanas-chillout.data.ts
      description:
        'Qué es una tisana, cómo ponerla en el menú de tu cafetería y qué sabores ChillOut hay: mango fresa, fresa kiwi, moras y más. Compra en línea.',
      keywords:
        'tisana chillout, tisanas chillout, chillout tisana, tisana para cafetería, tisana fresa kiwi, tisana de moras, tisanas frutales, Café Etrusca',
      image: '/assets/images/insumos/tisanas/hero-drinks.webp',
      path: TISANAS_CHILLOUT_PATH,
      jsonLd: ({ url }) => [this.itemListLd(url), this.faqLd(url), this.breadcrumbLd()]
    });
  }

  tone(i: number): string {
    return TONES[i % TONES.length];
  }

  recipeLink(r: Recipe): string {
    return '/recetas/' + r.slug;
  }

  // Sin `offers`: el precio no está confirmado (ver TODO en la data).
  private itemListLd(url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': url + '#productos',
      name: 'Tisanas ChillOut',
      numberOfItems: this.products.length,
      itemListElement: this.products.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `ChillOut ${p.line} ${p.flavor} (${p.presentation})`,
        // Solo fichas verificadas; la búsqueda de la tienda no es una página de producto
        ...(p.direct ? { url: p.url } : {}),
        ...(p.image ? { image: p.image.startsWith('http') ? p.image : SITE_ORIGIN + p.image } : {})
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
      ['Insumos para cafeterías', '/insumos-para-cafeterias'],
      ['Tisanas', TISANAS_CATEGORY_PATH],
      ['ChillOut', TISANAS_CHILLOUT_PATH]
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
