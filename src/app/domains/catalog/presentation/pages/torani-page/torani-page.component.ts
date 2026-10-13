import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { SITE_ORIGIN, siteUrl } from '../../../../../shared/kernel/config/site-url';
import { publishedRecipes, type Recipe } from '../recipes-page/recetas.data';
import { COURSE_PUBLIC_PATH_BY_SLUG } from '../../../../education/presentation/course-public-paths';
import {
  TORANI_CLASICO,
  TORANI_FAQ,
  TORANI_LINES,
  TORANI_SALSAS,
  TORANI_SALSA_LINES,
  TORANI_STORE_URL,
  TORANI_SUGAR_FREE,
  type ToraniProduct
} from '../../torani.data';

export const TORANI_PAGE_PATH = '/insumos-para-cafeterias/jarabes/torani';

const TONES = ['coral', 'yellow'] as const;
const DRINK_TONES = ['pink', 'yellow', 'lime'] as const;

function mentionsTorani(r: Recipe): boolean {
  const hay = [r.brand, r.summary, ...(r.ingredients || [])].join(' ').toLowerCase();
  return hay.includes('torani');
}

@Component({
  selector: 'app-torani-page',
  standalone: true,
  imports: [RouterLink, InsumosNavComponent, ScrollWaveComponent],
  templateUrl: './torani-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', './torani-page.component.scss']
})
export class ToraniPageComponent {
  private seo = inject(SeoService);

  readonly path = TORANI_PAGE_PATH;
  readonly storeUrl = TORANI_STORE_URL;
  private buyModal = inject(BuyModalService);

  /** "Comprar" → modal: en línea abre la ficha de la tienda (la URL de "Ver producto"), o en sucursal. */
  buy(p: ToraniProduct, ev: Event): void {
    this.buyModal.open(
      { title: p.name, brand: 'Torani', onlineUrl: p.url, fallbackUrl: this.storeUrl, theme: { btn: '#ff9496', ink: '#070c3b' } },
      ev
    );
  }
  readonly lines = TORANI_LINES;
  readonly clasico = TORANI_CLASICO;
  readonly sugarFree = TORANI_SUGAR_FREE;
  readonly salsas = TORANI_SALSAS;
  readonly salsaLines = TORANI_SALSA_LINES;
  readonly faq = TORANI_FAQ;
  readonly mixologiaPath = COURSE_PUBLIC_PATH_BY_SLUG['mixologia'] || '/cursos-para-baristas-y-talleres-para-cafeterias';
  readonly recipes = publishedRecipes().filter(mentionsTorani).slice(0, 3);
  readonly heroBottles = [
    { src: '/assets/images/insumos/jarabes/bottle-puremade.webp', alt: 'Jarabe Torani Puremade', cls: 'b-left' },
    { src: '/assets/images/insumos/line-defaults/jarabes-clasico.webp', alt: 'Jarabe Torani Clásico', cls: 'b-center' },
    { src: '/assets/images/insumos/line-defaults/jarabes-sugarfree.webp', alt: 'Jarabe Torani Sugar Free', cls: 'b-right' }
  ];

  constructor() {
    this.seo.set({
      title: 'Jarabes Torani en México: sabores, sin azúcar y salsas | Café Etrusca',
      // Sin "envío a todo México" (no confirmado): ver TODO en torani.data.ts
      description:
        'Jarabes y salsas Torani para tu cafetería: caramelo, vainilla, Sugar Free y más en botella de 750 ml. Compra en línea o habla con un asesor.',
      keywords:
        'jarabe torani, jarabes torani, torani sugar free, torani sin azúcar, salsa torani, torani caramelo, torani vainilla, Café Etrusca',
      image: '/assets/images/insumos/line-defaults/jarabes-clasico.webp',
      path: TORANI_PAGE_PATH,
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
    const all: ToraniProduct[] = [...this.clasico, ...this.sugarFree, ...this.salsas];
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': url + '#productos',
      name: 'Jarabes y salsas Torani',
      numberOfItems: all.length,
      itemListElement: all.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Torani ${p.line} ${p.flavor} (${p.presentation})`,
        url: p.url,
        image: p.image.startsWith('http') ? p.image : SITE_ORIGIN + p.image
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
      ['Jarabes', '/insumos-para-cafeterias/jarabes'],
      ['Torani', TORANI_PAGE_PATH]
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
