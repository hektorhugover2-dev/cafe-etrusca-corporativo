import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL, absoluteAssetUrl } from '../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, ScrollWaveComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent implements OnInit, AfterViewInit, OnDestroy {
  /* ===== Carrusel "Nuestras marcas" (3 visibles desktop, 2 tablet, 1 móvil; auto lento con pausa) ===== */
  @ViewChild('marcasTrack') private marcasTrack?: ElementRef<HTMLElement>;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private marcasTimer: ReturnType<typeof setInterval> | null = null;
  private marcasPaused = false;
  private reduceMotion = false;
  activeMarca = 0;
  marcaDots: number[] = [0, 1];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = this.marcasTrack?.nativeElement;
    if (!el) return;
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.zone.runOutsideAngular(() => {
      el.addEventListener('scroll', () => this.syncMarcas(), { passive: true });
      if (!this.reduceMotion) {
        this.marcasTimer = setInterval(() => {
          if (!this.marcasPaused && !document.hidden) this.moveMarcas(1);
        }, 5500);
      }
    });
    this.syncMarcas();
  }

  ngOnDestroy(): void {
    if (this.marcasTimer) clearInterval(this.marcasTimer);
  }

  @HostListener('window:resize')
  onResizeMarcas(): void { this.syncMarcas(); }

  pauseMarcas(p: boolean): void { this.marcasPaused = p; }

  private marcaStep(el: HTMLElement): number {
    const card = el.querySelector('.brand-card') as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return card ? card.offsetWidth + gap : el.clientWidth;
  }

  private scrollMarcas(el: HTMLElement, left: number): void {
    el.scrollTo({ left, behavior: this.reduceMotion ? 'auto' : 'smooth' });
  }

  moveMarcas(dir: number): void {
    const el = this.marcasTrack?.nativeElement;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    let left = el.scrollLeft + dir * this.marcaStep(el);
    if (left > max + 2) left = 0;
    else if (left < -2) left = max;
    this.scrollMarcas(el, left);
  }

  goMarca(i: number): void {
    const el = this.marcasTrack?.nativeElement;
    if (!el) return;
    this.scrollMarcas(el, Math.min(i * this.marcaStep(el), el.scrollWidth - el.clientWidth));
  }

  private syncMarcas(): void {
    const el = this.marcasTrack?.nativeElement;
    if (!el) return;
    const step = this.marcaStep(el);
    const total = el.querySelectorAll('.brand-card').length;
    const visible = Math.max(1, Math.round((el.clientWidth + (parseFloat(getComputedStyle(el).columnGap) || 0)) / step));
    const positions = Math.max(1, total - visible + 1);
    const max = el.scrollWidth - el.clientWidth;
    const active = el.scrollLeft >= max - 2 ? positions - 1 : Math.min(positions - 1, Math.round(el.scrollLeft / step));
    const center = Math.min(total - 1, active + Math.floor(visible / 2));
    el.querySelectorAll('.brand-card').forEach((c, i) => c.classList.toggle('is-active', i === center));
    if (positions !== this.marcaDots.length || active !== this.activeMarca) {
      this.zone.run(() => {
        this.marcaDots = Array.from({ length: positions }, (_, i) => i);
        this.activeMarca = active;
      });
    }
  }

  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);

    valores = [
    { label: 'Lealtad', tone: 'blue' },
    { label: 'Honestidad', tone: 'lime' },
    { label: 'Compromiso', tone: 'pink' },
    { label: 'Empatía', tone: 'yellow' },
    { label: 'Innovación', tone: 'orange' }
  ];

  ngOnInit() {
    const brand = 'Café Etrusca';
    this.seo.set({
      title: 'Nosotros | ' + brand + ' — Desde 1995',
      description:
        'Conoce a ' + brand + ': referente de la industria del café en México desde 1995. Insumos, equipo, capacitación y acompañamiento para cafeterías.',
      keywords:
        'Café Etrusca,nosotros,quiénes somos,misión,visión,cafetería México,insumos,capacitación baristas,La Fenice,Barista Champ,ChillOut,Tenzyu',
      image: `${ASSETS_BASE_URL}/images/home/banners/banner_home_la_fenice.webp`,
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': url + '#about',
          name: 'Nosotros | ' + brand,
          url,
          description:
            'Referente para la industria del café en México desde 1995. Insumos, equipo y capacitación para cafeterías.',
          isPartOf: { '@id': origin + '/#website' },
          about: { '@id': origin + '/#organization' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': origin + '/#organization',
          name: brand,
          url: origin + '/',
          foundingDate: '1995',
          logo: absoluteAssetUrl('images/logo-etrusca.webp'),
          telephone: '+52-55-4166-8777',
          email: 'atencion@cafeetrusca.com',
          sameAs: [
            'https://www.facebook.com/CafeEtrusca',
            'https://www.instagram.com/cafeetrusca',
            'https://www.youtube.com/@CafeEtrusca',
            'https://www.tiktok.com/@cafeetrusca'
          ]
        }
      ]
    });
  }
}
