import { HeroCrumbsComponent, HeroCrumb, breadcrumbJsonLd } from '../../../../../shared/ui/hero-crumbs/hero-crumbs.component';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { GrinderSliderComponent } from '../../components/grinder-slider/grinder-slider.component';
import { MAQ_CATALOG_HUB, MAQ_HUB, MAQ_HERO_FALLBACK, MAQ_NAV, MAQ_SECTIONS, MaqSection, findMaqNav, firstMaqProductImage } from '../../maquinas.data';
import { GRINDER_BRANDS, GrinderBrand, sliderFromBlock } from '../../grinders.data';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-maquinas-page',
  standalone: true,
  imports: [HeroCrumbsComponent, RouterLink, RouterLinkActive, InsumosCtaComponent, ScrollWaveComponent, GrinderSliderComponent],
  templateUrl: './maquinas-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', './maquinas-page.component.scss']
})
export class MaquinasPageComponent implements OnInit, OnDestroy {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sub?: Subscription;

  nav = MAQ_NAV;
  hub = MAQ_HUB;
  crumbs: HeroCrumb[] = [];
  sections: MaqSection[] = MAQ_SECTIONS;
  slug: string | null = null;
  heroTitle = 'MÁQUINAS';
  heroLead = 'Rendimiento y tecnología para tu operación';
  heroBody =
    'Máquina y equipo para poner, renovar o innovar tu cafetería. Cada equipo se eligió por calidad, desempeño y durabilidad: te asesoramos, instalamos y damos servicio para alargar su vida útil.';

  heroImage = MAQ_HERO_FALLBACK;

  slidersBySection: Record<string, GrinderBrand[]> = Object.fromEntries(
    MAQ_SECTIONS.map((sec) => [
      sec.id,
      sec.id === 'molinos' ? GRINDER_BRANDS : sec.blocks.map(sliderFromBlock)
    ])
  );

  slidersOf(sec: MaqSection): GrinderBrand[] {
    return this.slidersBySection[sec.id] || [];
  }

  waveOf(sec: MaqSection): string {
    const list = this.slidersOf(sec);
    return list[list.length - 1]?.bg || '#f4eee4';
  }

  firstOf(sec: MaqSection): GrinderBrand | null {
    return this.slidersOf(sec)[0] || null;
  }

  waveTopOf(sec: MaqSection): string {
    return this.firstOf(sec)?.bg || '#f4eee4';
  }

  get firstBrand(): GrinderBrand | null {
    for (const sec of this.sections) {
      const list = this.slidersOf(sec);
      if (list.length) return list[0];
    }
    return null;
  }

  get heroColor(): string {
    return '#f4eee4';
  }

  get heroAccent(): string {
    return this.firstBrand?.leadColor || '#c45c4a';
  }

  /** Catálogo de una sección (destino de "Comprar" en las tarjetas; sin URL por producto en los datos). */
  catalogOf(sec: MaqSection): string {
    return findMaqNav(sec.id)?.catalogUrl || MAQ_CATALOG_HUB;
  }

  get catalogUrl(): string {
    return (this.slug && findMaqNav(this.slug)?.catalogUrl) || MAQ_CATALOG_HUB;
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => this.applySlug(params.get('slug')));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private applySlug(slug: string | null) {
    this.slug = slug;
    if (!slug) {
      this.crumbs = [{ label: 'Inicio', path: '/' }, { label: 'Máquinas', path: MAQ_HUB }];
      this.sections = MAQ_SECTIONS;
      this.heroTitle = 'MÁQUINAS';
      this.heroLead = 'Rendimiento y tecnología para tu operación';
      this.heroBody =
        'Máquina y equipo para poner, renovar o innovar tu cafetería. Cada equipo se eligió por calidad, desempeño y durabilidad: te asesoramos, instalamos y damos servicio para alargar su vida útil.';
      this.heroImage = MAQ_HERO_FALLBACK;
      this.seo.set({
        title: 'Maquina y Equipo para poner una cafetería - Encuentra todo lo que necesitas',
        description:
          'Maquina y Equipo para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
        keywords:
          'Maquina y Equipo para poner una cafetería, cafeteria,como iniciar una cafeteria,como poner una cafeteria,maquinas de espresso,molinos,licuadoras,tostadores',
        image: this.heroImage,
        ogType: 'website',
        jsonLd: ({ origin, url }) => [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': url + '#maquinas',
            name: 'Máquina y equipo para cafeterías',
            description:
              'Máquina y equipo para poner, renovar o innovar tu cafetería: espresso, autoservicio, licuadoras, molinos y tostadores.',
            url,
            isPartOf: { '@id': origin + '/#website' }
          },
          breadcrumbJsonLd(this.crumbs)
        ]
      });
      return;
    }

    const item = findMaqNav(slug);
    const sec = MAQ_SECTIONS.find((s) => s.id === slug);
    if (!item || !sec) {
      this.router.navigateByUrl(MAQ_HUB);
      return;
    }

    this.sections = [sec];
    this.crumbs = [{ label: 'Inicio', path: '/' }, { label: 'Máquinas', path: MAQ_HUB }, { label: item.label, path: MAQ_HUB + '/' + slug }];
    this.heroTitle = sec.title;
    this.heroLead = item.desc;
    this.heroBody = sec.intro;
    this.heroImage = firstMaqProductImage(sec);
    this.seo.set({
      title: item.seoTitle,
      description: item.seoDescription,
      keywords: item.seoKeywords,
      image: this.heroImage,
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': url + '#' + item.id,
          name: item.seoTitle,
          description: item.seoDescription,
          url,
          isPartOf: { '@id': origin + '/#website' },
          about: { '@type': 'Thing', name: item.label }
        },
        breadcrumbJsonLd(this.crumbs)
      ]
    });
  }
}