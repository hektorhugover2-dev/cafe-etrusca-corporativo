import { HeroCrumbsComponent, HeroCrumb, breadcrumbJsonLd } from '../../../../../shared/ui/hero-crumbs/hero-crumbs.component';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { RecipeCardComponent } from '../../../../../shared/ui/recipe-card/recipe-card.component';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { MARCAS_DESTACADAS, INSUMOS_BRAND_LOGOS, INSUMOS_BRAND_STRIP } from '../../insumos.data';
import { ACC_ALL_BRANDS_LINK } from '../../accesorios.data';
import { inspiraRecipes } from '../../insumos-inspira';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-insumos-page',
  standalone: true,
  imports: [HeroCrumbsComponent, RouterLink, RecipeCardComponent, InsumosNavComponent, InsumosCtaComponent, ScrollWaveComponent],
  templateUrl: './insumos-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', './insumos-page.component.scss']
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

  brands = MARCAS_DESTACADAS;
  /** Sección "Marcas" (mismo diseño que /accesorios-para-poner-una-cafeteria/). */
  readonly logos = INSUMOS_BRAND_LOGOS;
  readonly strip = INSUMOS_BRAND_STRIP;
  readonly allBrands = ACC_ALL_BRANDS_LINK;
  menu = inspiraRecipes('general');
}
