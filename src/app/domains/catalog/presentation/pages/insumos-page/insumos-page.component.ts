import { HeroCrumbsComponent, HeroCrumb, breadcrumbJsonLd } from '../../../../../shared/ui/hero-crumbs/hero-crumbs.component';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { RecipeCardComponent } from '../../../../../shared/ui/recipe-card/recipe-card.component';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import {
  MARCAS_DESTACADAS,
  INSUMOS_BRAND_LOGOS,
  INSUMOS_BRAND_STRIP,
  INSUMOS_HUB_CATEGORY_CARDS,
  SHOW_MARCAS_DESTACADAS,
  InsumosHubCategoryCard
} from '../../insumos.data';
import { ACC_ALL_BRANDS_LINK } from '../../accesorios.data';
import { inspiraRecipes } from '../../insumos-inspira';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-insumos-page',
  standalone: true,
  imports: [HeroCrumbsComponent, RouterLink, RecipeCardComponent, InsumosNavComponent, InsumosCtaComponent, ScrollWaveComponent],
  templateUrl: './insumos-page.component.html',
  styleUrls: [
    '../../insumos-theme.scss',
    '../../jarabes-theme.scss',
    '../../acc-category-cards.scss',
    './insumos-page.component.scss'
  ]
})
export class InsumosPageComponent implements OnInit {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  readonly crumbs: HeroCrumb[] = [{ label: 'Inicio', path: '/' }, { label: 'Insumos', path: '/insumos-para-cafeterias' }];

  ngOnInit() {
    this.seo.set({
      title: "Insumos Para Cafeterías - Café, Bases, Polvos, Jarabes, Salsas, Concentrados",
      description: "Insumos Para Cafeterías como café, bases, polvos, jarabes, salsas, concentrados, tés, tisanas, chai, popotes, popping, perlas explosivas, jaleas y más.",
      keywords: "Insumos Para Cafeterías, café, bases, polvos, jarabes, salsas, concentrados, tés, tisanas, chai, popping, perlas explosivas",
      jsonLd: () => [breadcrumbJsonLd(this.crumbs)]
    });
  }

  /** Datos conservados; la sección se oculta con showMarcasDestacadas. */
  brands = MARCAS_DESTACADAS;
  readonly showMarcasDestacadas = SHOW_MARCAS_DESTACADAS;

  /** Cards de categorías (diseño Accesorios). */
  readonly categories = INSUMOS_HUB_CATEGORY_CARDS;
  readonly insumosHub = '/insumos-para-cafeterias';

  /** Sección "Marcas" (mismo diseño que /accesorios-para-poner-una-cafeteria/). */
  readonly logos = INSUMOS_BRAND_LOGOS;
  readonly strip = INSUMOS_BRAND_STRIP;
  readonly allBrands = ACC_ALL_BRANDS_LINK;
  menu = inspiraRecipes('general');

  catLink(c: InsumosHubCategoryCard): string {
    return `${this.insumosHub}/${c.slug}`;
  }

  srcset(i: { src: string; src2x: string }): string {
    return `${i.src} 1x, ${i.src2x} 2x`;
  }

  titleOf(c: InsumosHubCategoryCard): string {
    return c.titleLines.filter(Boolean).join(' ');
  }
}
