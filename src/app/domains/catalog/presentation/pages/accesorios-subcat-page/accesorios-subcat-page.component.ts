import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import {
  ACCESORIOS_HUB,
  ACC_CATEGORIES,
  ACC_HUB_SEO,
  ACC_SUBCAT_SEO,
  ACC_ALL_BRANDS_LINK,
  ACC_WHATSAPP,
  AccCategory
} from '../../accesorios.data';
import { ACC_SECTIONS, AccSectionConfig, isAccSection } from '../../accesorios-secciones.config';
import { AccBrandProductsComponent } from '../../components/acc-brand-products/acc-brand-products.component';
import { ACC_CATALOG_URL } from '../accesorios-page/accesorios-page.component';
import { ACC_SUBCAT_HEROES, AccSubcatHero } from '../../accesorios-subcat.data';

/**
 * Subcategorías de Accesorios (/accesorios-para-poner-una-cafeteria/<slug>/): misma estructura y estilos
 * que Métodos de extracción (hero con foto a pantalla completa + ola blanca, "Productos", asesoría).
 * Métodos de extracción tiene su propia ruta/página; esta atiende el resto de subcategorías.
 * Productos: app-acc-brand-products (marca y/o subcategoría → /api/Product), igual que Métodos.
 */
@Component({
  selector: 'app-accesorios-subcat-page',
  standalone: true,
  imports: [RouterLink, ScrollWaveComponent, AccBrandProductsComponent],
  templateUrl: './accesorios-subcat-page.component.html',
  styleUrls: [
    '../metodos-extraccion-page/metodos-extraccion-page.component.scss',
    './accesorios-subcat-page.component.scss'
  ]
})
export class AccesoriosSubcatPageComponent {
  readonly catalogUrl = ACC_CATALOG_URL;
  readonly hub = ACCESORIOS_HUB;
  readonly whatsapp = ACC_WHATSAPP;
  readonly allBrands = ACC_ALL_BRANDS_LINK;

  cat: AccCategory | null = null;
  hero: AccSubcatHero | null = null;
  others: AccCategory[] = [];
  /** Marcas y subcategorías de la sección (accesorios-secciones.config.ts, PDF de secciones). */
  section: AccSectionConfig | null = null;

  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    const sub = this.route.paramMap.subscribe((p) => this.apply(p.get('slug')));
    inject(DestroyRef).onDestroy(() => sub.unsubscribe());
  }

  link(c: AccCategory): string {
    return `${this.hub}/${c.slug}`;
  }

  private apply(slug: string | null) {
    const cat = ACC_CATEGORIES.find((c) => c.slug === slug) ?? null;
    if (!cat) {
      this.router.navigateByUrl(this.hub, { replaceUrl: true });
      return;
    }
    this.cat = cat;
    this.hero = ACC_SUBCAT_HEROES[cat.slug] ?? null;
    this.section = isAccSection(cat.slug) ? ACC_SECTIONS[cat.slug] : null;
    this.others = ACC_CATEGORIES.filter((c) => c.slug !== cat.slug);
    const name = cat.titleLines.join(' ');
    const meta = ACC_SUBCAT_SEO[cat.slug] || ACC_HUB_SEO;
    this.seo.set({
      ...meta,
      image: this.hero?.desktop,
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': url + '#accesorios-' + cat.slug,
          name,
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
            { '@type': 'ListItem', position: 3, name, item: url }
          ]
        }
      ]
    });
  }
}
