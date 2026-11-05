import { Component, ElementRef, Input, OnDestroy, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Imagen dinámica de bebidas del hero de la calculadora de precios (video HyperFrames VP9 con transparencia
 * sobre la mancha amarilla). Mismos archivos y mismo comportamiento que la calculadora:
 * en SSR y con prefers-reduced-motion o sin soporte VP9 se muestra el poster estático; el video solo carga
 * y se reproduce cuando está en viewport. Decorativo (aria-hidden).
 */
@Component({
  selector: 'app-drink-video-hero',
  standalone: true,
  template: `
    <div class="dvh" aria-hidden="true">
      <span class="blob"></span>
      @if (videoOn()) {
        <video class="dvh-vid" muted playsinline loop preload="none" [attr.data-start]="start"
               [poster]="poster" aria-hidden="true" tabindex="-1"
               disablepictureinpicture disableremoteplayback [muted]="true">
          <source [src]="webm" type="video/webm">
        </video>
      } @else {
        <img class="dvh-vid" [src]="poster" alt="" width="960" height="800">
      }
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .dvh { position: relative; min-height: 380px; }
    .blob { position: absolute; inset: 6% 0 0 10%; background: #fde7a6; border-radius: 48% 52% 40% 60% / 55% 45% 55% 45%; }
    .dvh-vid { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; object-fit: contain; object-position: center bottom; background: transparent; pointer-events: none; }
    @media (max-width: 767px) { .dvh { min-height: 280px; } }
  `]
})
export class DrinkVideoHeroComponent implements OnDestroy {
  @Input() webm = '/assets/videos/calculadora/calculadora-bebidas.webm';
  @Input() poster = '/assets/videos/calculadora/calculadora-bebidas-poster.webp';
  @Input() start = 0;

  readonly videoOn = signal(false);
  private platformId = inject(PLATFORM_ID);
  private host = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;

  private _init = afterNextRender(() => {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    if (!document.createElement('video').canPlayType('video/webm; codecs="vp9"')) return;
    this.videoOn.set(true);
    setTimeout(() => this.observe(), 0);
  });

  private observe(): void {
    const v = (this.host.nativeElement as HTMLElement).querySelector<HTMLVideoElement>('video.dvh-vid');
    if (!v || typeof IntersectionObserver === 'undefined') return;
    this.io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          if (v.preload !== 'auto') {
            v.preload = 'auto';
            v.addEventListener('loadedmetadata', () => { v.currentTime = Number(v.dataset['start'] || 0); }, { once: true });
            v.load();
          }
          v.muted = true;
          v.play?.().catch(() => {});
        } else {
          v.pause();
        }
      }
    }, { rootMargin: '120px 0px' });
    this.io.observe(v);
  }

  ngOnDestroy(): void { this.io?.disconnect(); }
}
