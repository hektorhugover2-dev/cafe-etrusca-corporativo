import { HeroCrumbsComponent, HeroCrumb, breadcrumbJsonLd } from '../../../../../shared/ui/hero-crumbs/hero-crumbs.component';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { GrinderSliderComponent } from '../../components/grinder-slider/grinder-slider.component';
import {
  MAQ_CATALOG_HUB,
  MAQ_HUB,
  MAQ_HERO_FALLBACK,
  MAQ_NAV,
  MAQ_SECTIONS,
  MaqSection,
  findMaqNav,
  firstMaqProductImage,
  maqNavVisible
} from '../../maquinas.data';
import {
  GRINDER_BRANDS,
  GrinderBrand,
  findGrinderBrand,
  brandIdFromName,
  sliderFromBlock
} from '../../grinders.data';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

const WA = 'https://wa.me/525541668777';
const ETRUSCA_BIZ = 'https://etrusca.biz/';
const DISC_NOTICE = 'Este equipo ya no forma parte de nuestro catálogo';

@Component({
  selector: 'app-maquinas-page',
  standalone: true,
  imports: [HeroCrumbsComponent, RouterLink, RouterLinkActive, InsumosCtaComponent, ScrollWaveComponent, GrinderSliderComponent],
  templateUrl: './maquinas-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', './maquinas-page.component.scss']
})
export class MaquinasPageComponent implements OnInit, OnDestroy {
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sub?: Subscription;

  nav = maqNavVisible();
  hub = MAQ_HUB;
  crumbs: HeroCrumb[] = [];
  sections: MaqSection[] = MAQ_SECTIONS;
  slug: string | null = null;
  /** Página de una sola marca (descontinuada o Fiorenzato directa). */
  brandOnly: GrinderBrand | null = null;
  heroTitle = 'MÁQUINAS';
  heroLead = 'Rendimiento y tecnología para tu operación';
  heroBody =
    'Máquina y equipo para poner, renovar o innovar tu cafetería. Cada equipo se eligió por calidad, desempeño y durabilidad: te asesoramos, instalamos y damos servicio para alargar su vida útil.';

  heroImage = MAQ_HERO_FALLBACK;
  showDiscBanner = false;

  private allSlidersBySection: Record<string, GrinderBrand[]> = Object.fromEntries(
    MAQ_SECTIONS.map((sec) => [
      sec.id,
      sec.id === 'molinos'
        ? GRINDER_BRANDS.map((b) => ({ ...b, categoryId: b.categoryId || 'molinos' }))
        : sec.blocks.map((block) => sliderFromBlock(block, sec.id))
    ])
  );

  slidersOf(sec: MaqSection): GrinderBrand[] {
    const list = this.allSlidersBySection[sec.id] || [];
    // En hub o categoría activa: solo marcas vigentes. En autoservicio (todo descontinuado) o brandOnly: se decide aparte.
    if (this.brandOnly) return [this.brandOnly];
    if (sec.id === 'autoservicio') return list; // página viva con Melitta descontinuada
    return list.filter((b) => !b.discontinued);
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
    if (this.brandOnly) return this.brandOnly;
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
    return this.firstBrand?.leadColor || '#c0523f';
  }

  catalogOf(sec: MaqSection): string {
    return findMaqNav(sec.id)?.catalogUrl || MAQ_CATALOG_HUB;
  }

  get catalogUrl(): string {
    if (this.showDiscBanner || this.brandOnly?.discontinued) return '';
    return (this.slug && findMaqNav(this.slug)?.catalogUrl) || MAQ_CATALOG_HUB;
  }

  ngOnInit() {
    this.sub = this.route.paramMap.subscribe((params) => this.applySlug(params.get('slug')));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  private productJsonLd(brand: GrinderBrand, origin: string, url: string) {
    return brand.slides.map((s) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: s.titulo,
      description: s.descripcion || brand.lead,
      brand: { '@type': 'Brand', name: brand.name },
      image: s.img || undefined,
      sku: s.sku || undefined,
      url
      // Sin offers: descontinuado o sin precio público en esta página.
    }));
  }

  private applySlug(slug: string | null) {
    this.slug = slug;
    this.brandOnly = null;
    this.showDiscBanner = false;
    this.nav = maqNavVisible();

    if (!slug) {
      this.crumbs = [{ label: 'Inicio', path: '/' }, { label: 'Máquinas', path: MAQ_HUB }];
      this.sections = MAQ_SECTIONS.filter((s) => s.id !== 'autoservicio');
      this.heroTitle = 'MÁQUINAS';
      this.heroLead = 'Rendimiento y tecnología para tu operación';
      this.heroBody =
        'Máquina y equipo para poner, renovar o innovar tu cafetería. Cada equipo se eligió por calidad, desempeño y durabilidad: te asesoramos, instalamos y damos servicio para alargar su vida útil.';
      this.heroImage = MAQ_HERO_FALLBACK;
      this.seo.set({
        title: 'Máquina y Equipo para poner una cafetería - Encuentra todo lo que necesitas',
        description:
          'Máquina y Equipo para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
        keywords:
          'Máquina y Equipo para poner una cafetería, cafeteria,como iniciar una cafeteria,como poner una cafeteria,maquinas de espresso,molinos,licuadoras,tostadores',
        image: this.heroImage,
        ogType: 'website',
        jsonLd: ({ origin, url }) => [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': url + '#maquinas',
            name: 'Máquina y equipo para cafeterías',
            description:
              'Máquina y equipo para poner, renovar o innovar tu cafetería: espresso, licuadoras, molinos y tostadores.',
            url,
            isPartOf: { '@id': origin + '/#website' }
          },
          breadcrumbJsonLd(this.crumbs)
        ]
      });
      return;
    }

    // Marca dedicada (descontinuada o Fiorenzato)
    let brand = findGrinderBrand(slug);
    if (!brand) {
      for (const sec of MAQ_SECTIONS) {
        const block = sec.blocks.find((b) => brandIdFromName(b.brand) === slug);
        if (block) {
          brand = sliderFromBlock(block, sec.id);
          break;
        }
      }
    }
    if (brand) {
      this.brandOnly = brand;
      this.showDiscBanner = !!brand.discontinued;
      const cat = brand.categoryId || 'molinos';
      const catNav = findMaqNav(cat);
      const sec = MAQ_SECTIONS.find((s) => s.id === cat) || MAQ_SECTIONS[0];
      this.sections = [sec];
      this.crumbs = [
        { label: 'Inicio', path: '/' },
        { label: 'Máquinas', path: MAQ_HUB },
        ...(catNav ? [{ label: catNav.label, path: MAQ_HUB + '/' + cat }] : []),
        { label: brand.name, path: MAQ_HUB + '/' + brand.id }
      ];
      this.heroTitle = brand.name;
      this.heroLead = brand.discontinued ? DISC_NOTICE : brand.lead;
      this.heroBody = brand.discontinued
        ? 'Te asesoramos en servicio, mantenimiento o para elegir un equipo vigente para tu barra.'
        : brand.lead;
      this.heroImage = brand.slides[0]?.img || MAQ_HERO_FALLBACK;
      this.seo.set({
        title: `${brand.name} para cafeterías | Café Etrusca`,
        description: brand.discontinued
          ? `${brand.name}: ya no forma parte de nuestro catálogo. Asesoría de servicio y alternativas vigentes en Café Etrusca.`
          : brand.lead.slice(0, 160),
        keywords: `${brand.name}, molinos, maquinaria, Café Etrusca`,
        image: this.heroImage,
        ogType: 'website',
        robots: 'index, follow',
        jsonLd: ({ origin, url }) => [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': url + '#' + brand.id,
            name: brand.name,
            description: brand.lead,
            url,
            isPartOf: { '@id': origin + '/#website' }
          },
          ...this.productJsonLd(brand, origin, url),
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
    this.showDiscBanner = slug === 'autoservicio' || sec.blocks.every((b) => b.discontinued);
    this.crumbs = [
      { label: 'Inicio', path: '/' },
      { label: 'Máquinas', path: MAQ_HUB },
      { label: item.label, path: MAQ_HUB + '/' + slug }
    ];
    this.heroTitle = sec.title;
    this.heroLead = this.showDiscBanner ? DISC_NOTICE : item.desc;
    this.heroBody = sec.intro;
    this.heroImage = firstMaqProductImage(sec);
    this.seo.set({
      title: item.seoTitle,
      description: item.seoDescription,
      keywords: item.seoKeywords,
      image: this.heroImage,
      ogType: 'website',
      robots: 'index, follow',
      jsonLd: ({ origin, url }) => {
        const brands = this.slidersOf(sec);
        const products = brands.flatMap((b) => this.productJsonLd(b, origin, url));
        return [
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
          ...products,
          breadcrumbJsonLd(this.crumbs)
        ];
      }
    });
  }
}
