import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import {
  ACCESORIOS_HUB,
  ACC_ALL_BRANDS_LINK,
  ACC_BRAND_LOGOS,
  ACC_BRAND_STRIP,
  ACC_CATEGORIES,
  ACC_HERO_IMAGES,
  ACC_HUB_SEO,
  ACC_SUBCAT_SEO,
  ACC_WHATSAPP,
  AccCategory
} from '../../accesorios.data';

/** Catálogo externo de equipos y accesorios (misma convención que MAQ_CATALOG_HUB en maquinas.data). */
export const ACC_CATALOG_URL = 'https://equipos-accesorios.cafeetrusca.com/#page/2';

/**
 * Hub de Accesorios (/accesorios-para-poner-una-cafeteria/ y /:slug/).
 * Maquetado 1:1 con el diseño PDF "Accesorios" (frame de 1440 px).
 */
@Component({
  selector: 'app-accesorios-page',
  standalone: true,
  imports: [RouterLink, ScrollWaveComponent],
  templateUrl: './accesorios-page.component.html',
  styleUrls: ['./accesorios-page.component.scss']
})
export class AccesoriosPageComponent {
  /** Botón del hero (hub y subcategorías): abre el catálogo en una pestaña nueva. */
  readonly catalogUrl = ACC_CATALOG_URL;

  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);

  readonly hub = ACCESORIOS_HUB;
  readonly hero = ACC_HERO_IMAGES;
  /** Foto de fondo del hero (cubre todo el hero; versión ligera para móvil). */
  readonly heroBg = {
    desktop: '/assets/images/accesorios/hub/hero-fondo-accesorios.webp',
    mobile: '/assets/images/accesorios/hub/hero-fondo-accesorios-960.webp'
  };
  readonly categories = ACC_CATEGORIES;
  readonly logos = ACC_BRAND_LOGOS;
  readonly strip = ACC_BRAND_STRIP;
  readonly allBrands = ACC_ALL_BRANDS_LINK;
  readonly whatsapp = ACC_WHATSAPP;

  /** Subcategoría activa (/:slug) o null en el hub. */
  active: AccCategory | null = null;

  constructor() {
    const sub = this.route.paramMap.subscribe((params) => this.apply(params.get('slug')));
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }

  link(c: AccCategory): string {
    return `${this.hub}/${c.slug}`;
  }

  srcset(i: { src: string; src2x: string }): string {
    return `${i.src} 1x, ${i.src2x} 2x`;
  }

  titleOf(c: AccCategory): string {
    return c.titleLines.join(' ');
  }

  private apply(slug: string | null) {
    const cat = slug ? this.categories.find((c) => c.slug === slug) ?? null : null;
    this.active = cat;
    const meta = (cat && ACC_SUBCAT_SEO[cat.slug]) || ACC_HUB_SEO;
    this.seo.set({
      ...meta,
      image: this.heroBg.desktop,
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': url + '#accesorios',
          name: cat ? this.titleOf(cat) : 'Accesorios para cafetería',
          description: meta.description,
          url,
          isPartOf: { '@id': origin + '/#website' }
        }
      ]
    });
  }
}
