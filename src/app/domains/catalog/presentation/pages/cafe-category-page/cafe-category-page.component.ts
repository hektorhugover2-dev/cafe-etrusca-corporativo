import { HeroCrumbsComponent, HeroCrumb, breadcrumbJsonLd } from '../../../../../shared/ui/hero-crumbs/hero-crumbs.component';
import { Component, OnDestroy, OnInit, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CafeNavComponent } from '../../components/cafe-nav/cafe-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import { ESTADOS_FINCAS, EstadoFinca, FINCAS_PUBLICABLES } from './fincas-especialidad.data';

export type CafeSlug = 'premium' | 'verde' | 'especialidad';

export interface CafePageContent {
  slug: CafeSlug;
  theme: 'premium' | 'verde' | 'especialidad';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoImage: string;
}

const WA = 'https://wa.me/525541668777';

@Component({
  selector: 'app-cafe-category-page',
  standalone: true,
  imports: [HeroCrumbsComponent, RouterLink, ScrollWaveComponent, CafeNavComponent],
  templateUrl: './cafe-category-page.component.html',
  styleUrls: ['../../cafe-theme.scss']
})
export class CafeCategoryPageComponent implements OnInit, OnDestroy {
  /** Nombres de las subcategorías tal como aparecen en /productos/cafe/. */
  private static readonly CRUMB_LABEL: Record<string, string> = { premium: 'Café Premium', especialidad: 'Café de especialidad', verde: 'Café en verde' };
  crumbs: HeroCrumb[] = [];
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);
  private sub?: Subscription;

  readonly wa = WA;

  /** Slider del hero (reemplaza al video Rueda; archivos del video siguen en public/assets/videos/especialidad/). */
  readonly heroSlides = FINCAS_PUBLICABLES.filter((f) => !!f.imagen);
  readonly slideIdx = signal(0);
  /** 'off' mientras corre el autoplay (no saturar lectores); 'polite' en pausa o sin autoplay. */
  readonly sliderLive = signal<'off' | 'polite'>('polite');
  private sliderTimer?: ReturnType<typeof setInterval>;
  private sliderPaused = false;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      if (mq && mq.matches) return;
      this.sliderLive.set('off');
      this.sliderTimer = setInterval(() => {
        if (!this.sliderPaused && !document.hidden) this.nextSlide();
      }, 5000);
    });
  }

  estadoCode(e: EstadoFinca | null): string {
    return e === 'veracruz' ? 'VER' : e === 'puebla' ? 'PUE' : e === 'hidalgo' ? 'HID' : 'NAY';
  }

  nextSlide(): void {
    this.slideIdx.set((this.slideIdx() + 1) % this.heroSlides.length);
  }

  pauseSlider(p: boolean): void {
    this.sliderPaused = p;
    if (this.sliderTimer) this.sliderLive.set(p ? 'polite' : 'off');
  }

  slug: CafeSlug | null = null;

  /** Fincas Barista Champ por estado (selector de estados en Especialidad). */
  readonly estadosFincas = ESTADOS_FINCAS;
  estadoFincas: EstadoFinca = 'veracruz';

  get estadoFincasNombre(): string {
    return this.estadosFincas.find((e) => e.id === this.estadoFincas)?.nombre ?? '';
  }

  get fincasDelEstado() {
    return FINCAS_PUBLICABLES.filter((f) => f.estado === this.estadoFincas);
  }

  seleccionarEstado(id: EstadoFinca): void {
    this.estadoFincas = id;
  }

  private readonly pages: Record<CafeSlug, CafePageContent> = {
    premium: {
      slug: 'premium',
      theme: 'premium',
      seoTitle: 'Café Premium | Mezclas especiales para cafeterías | Café Etrusca',
      seoDescription:
        'Línea confiable y balanceada de Café Premium Etrusca: perfiles consistentes para espresso y leche, presentaciones listas para tu menú y mezclas especiales.',
      seoKeywords: 'Café Premium, mezcla especial, espresso, cafetería, Café Etrusca, tueste medio',
      seoImage: `${ASSETS_BASE_URL}/images/cafe/premium/hero-composition.png`
    },
    verde: {
      slug: 'verde',
      theme: 'verde',
      seoTitle: 'Café en verde | Materia prima con trazabilidad | Café Etrusca',
      seoDescription:
        'Café en verde de Café Etrusca: materia prima con trazabilidad, control de calidad y perfiles listos para tueste profesional.',
      seoKeywords: 'Café verde, café en verde, trazabilidad, tostadores, Café Etrusca',
      seoImage: `${ASSETS_BASE_URL}/images/cafe/verde/hero.png`
    },
    especialidad: {
      slug: 'especialidad',
      theme: 'especialidad',
      seoTitle: 'Café de especialidad Barista Champ | Café Etrusca',
      seoDescription:
        'Barista Champ, café de especialidad mexicano: orígenes de Chiapas, Veracruz, Puebla, Hidalgo y Nayarit, con trazabilidad, procesos cuidados y más de 80 puntos SCA.',
      seoKeywords:
        'café de especialidad,Barista Champ,café mexicano,SCA,finca pajaritos,café Veracruz,café Puebla,Café Etrusca',
      seoImage: `${ASSETS_BASE_URL}/images/cafe/especialidad/hero-bags.webp`
    }
  };

  get content(): CafePageContent | null {
    return this.slug ? this.pages[this.slug] : null;
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const raw = (params.get('slug') || '').toLowerCase();
      if (raw !== 'premium' && raw !== 'verde' && raw !== 'especialidad') {
        this.router.navigate(['/productos/cafe']);
        return;
      }
      this.slug = raw as CafeSlug;
      const page = this.pages[raw];
      this.crumbs = [
        { label: 'Inicio', path: '/' },
        { label: 'Café', path: '/productos/cafe' },
        { label: CafeCategoryPageComponent.CRUMB_LABEL[raw], path: '/productos/cafe/' + raw }
      ];
      this.seo.set({
        title: page.seoTitle,
        description: page.seoDescription,
        keywords: page.seoKeywords,
        image: page.seoImage,
        jsonLd: () => [breadcrumbJsonLd(this.crumbs)]
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.sliderTimer) clearInterval(this.sliderTimer);
  }
}