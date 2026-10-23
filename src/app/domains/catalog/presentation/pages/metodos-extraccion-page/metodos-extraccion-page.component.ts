import { HeroCrumbsComponent, HeroCrumb } from '../../../../../shared/ui/hero-crumbs/hero-crumbs.component';
import { Component, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { ACC_ALL_BRANDS_LINK, ACC_SUBCAT_SEO, ACC_WHATSAPP, ACCESORIOS_HUB } from '../../accesorios.data';
import { ACC_CATALOG_URL } from '../accesorios-page/accesorios-page.component';
import {
  MET_BRANDS,
  MET_COURSES,
  MET_HERO,
  MET_PRODUCTS,
  MET_TOP_IDS,
  METODOS_SLUG,
  MetCourse,
  MetProduct
} from '../../metodos-extraccion.data';
import { coursePublicPath } from '../../../../education/presentation/course-public-paths';
import { COURSES } from '../../../../education/presentation/education.data';
import { AccBrandProductsComponent } from '../../components/acc-brand-products/acc-brand-products.component';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';

/**
 * Accesorios › Métodos de extracción (/accesorios-para-poner-una-cafeteria/metodo-extraccion/).
 * Estructura, componentes y estilos copiados de la página de Accesorios (hero tipo Jarabes con ola
 * dinámica, encabezados .jar-head, bloque "Asesoría especializada"); contenido del PDF "Métodos de extracción".
 * Bloque de productos (marcas/subcategorías desde la API): app-acc-brand-products, sección 'metodo-extraccion'.
 */
@Component({
  selector: 'app-metodos-extraccion-page',
  standalone: true,
  imports: [HeroCrumbsComponent, RouterLink, NgTemplateOutlet, ScrollWaveComponent, AccBrandProductsComponent],
  templateUrl: './metodos-extraccion-page.component.html',
  styleUrls: ['./metodos-extraccion-page.component.scss']
})
export class MetodosExtraccionPageComponent {
  readonly catalogUrl = ACC_CATALOG_URL;
  private buyModal = inject(BuyModalService);

  /**
   * Tarjetas del diseño (antes de que carguen las de la API): sin código de producto → "Comprar en línea" abre el
   * catálogo. TODO(contenido): código/URL de tienda por tarjeta.
   */
  buy(p: MetProduct, ev: Event): void {
    this.buyModal.open({ title: p.title, brand: p.brand, fallbackUrl: this.catalogUrl, fallbackLabel: 'Catálogo de accesorios' }, ev);
  }
  readonly hub = ACCESORIOS_HUB;
  readonly crumbs: HeroCrumb[] = [{ label: 'Inicio', path: '/' }, { label: 'Accesorios', path: ACCESORIOS_HUB }, { label: 'Métodos de extracción', path: ACCESORIOS_HUB + '/metodo-extraccion' }];
  readonly hero = MET_HERO;
  readonly brands = MET_BRANDS;
  readonly products = MET_PRODUCTS;
  readonly top: MetProduct[] = MET_TOP_IDS.map((id) => MET_PRODUCTS.find((p) => p.id === id)).filter(
    (p): p is MetProduct => !!p
  );
  readonly courses = MET_COURSES.filter((c) => COURSES.some((x) => x.slug === c.slug));
  readonly allBrands = ACC_ALL_BRANDS_LINK;
  readonly whatsapp = ACC_WHATSAPP;

  private seo = inject(SeoService);

  constructor() {
    const meta = ACC_SUBCAT_SEO[METODOS_SLUG];
    this.seo.set({
      ...meta,
      image: this.hero.bg,
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': url + '#metodos-extraccion',
          name: 'Métodos de extracción',
          description: meta.description,
          url,
          isPartOf: { '@id': origin + '/#website' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: origin + '/' },
            { '@type': 'ListItem', position: 2, name: 'Accesorios', item: origin + this.hub + '/' },
            { '@type': 'ListItem', position: 3, name: 'Métodos de extracción', item: url }
          ]
        }
      ]
    });
  }

  srcset(i: { src: string; src2x: string }): string {
    return `${i.src} 1x, ${i.src2x} 2x`;
  }

  courseLink(c: MetCourse): string {
    const course = COURSES.find((x) => x.slug === c.slug);
    return course ? coursePublicPath(course) : '/cursos-para-baristas-y-talleres-para-cafeterias';
  }
}
