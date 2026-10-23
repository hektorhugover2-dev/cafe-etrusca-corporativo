import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, NgZone, OnDestroy,
  PLATFORM_ID, ViewChild, inject, signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import { ACCESORIOS_HUB } from '../../accesorios.data';

export interface AccEssential {
  id: string;
  title: string;
  /** Etiqueta del círculo (puede ir en 2 líneas). */
  label: string;
  desc: string;
  img: string;
  img2x: string;
  alt: string;
  /** Color del círculo (claro) y de la tarjeta (intenso), del diseño de Lizbeth. */
  tone: 'pink' | 'orange' | 'yellow' | 'lime' | 'cyan' | 'purple';
  /** Subcategoría del hub a la que lleva "Ver productos". */
  slug: string;
}

const A = `${ASSETS_BASE_URL}/images/accesorios`;
const pic = (path: string) => ({ img: `${A}/${path}.webp`, img2x: `${A}/${path}@2x.webp` });

/** Textos tal cual los mockups de Héctor (14-oct-2026). Jarra espumadora: texto propuesto (sin mockup). */
export const ACC_ESSENTIALS: AccEssential[] = [
  { id: 'tamper', title: 'Tamper', label: 'Tamper', tone: 'pink', slug: 'barista-espresso',
    desc: 'Compacta el café molido para lograr una extracción equilibrada.',
    ...pic('esenciales/tamper'), alt: 'Tamper con mango de madera y base de acero' },
  { id: 'jarra', title: 'Jarra espumadora', label: 'Jarra espumadora', tone: 'orange', slug: 'barista-espresso',
    desc: 'Ideal para texturizar la leche y lograr un latte art perfecto.',
    ...pic('esenciales/jarra-espumadora'), alt: 'Jarra espumadora roja para leche' },
  { id: 'dripper', title: 'Dripper', label: 'Dripper', tone: 'yellow', slug: 'metodo-extraccion',
    desc: 'Permite preparar café filtrado manual con control y consistencia.',
    ...pic('esenciales/dripper-la-fenice'), alt: 'Dripper negro de cerámica La Fenice' },
  { id: 'prensa', title: 'Prensa francesa', label: 'Prensa francesa', tone: 'lime', slug: 'metodo-extraccion',
    desc: 'Método de inmersión que resalta cuerpo y notas intensas.',
    ...pic('esenciales/prensa-francesa'), alt: 'Prensa francesa de vidrio con acabado cobre' },
  { id: 'molino', title: 'Molino Manual', label: 'Molino manual', tone: 'cyan', slug: 'metodo-extraccion',
    desc: 'Muele al momento para conservar los aromas y mejorar el sabor.',
    ...pic('esenciales/molino-pietro'), alt: 'Molino manual Pietro' },
  { id: 'catacion', title: 'Accesorios de catación', label: 'Accesorios de catación', tone: 'purple', slug: 'catacion-medicion',
    desc: 'Sirve para evaluar aromas, sabores y calidad del café.',
    ...pic('esenciales/tazon-cupping'), alt: 'Tazón de catación Coffee Cupping' }
];

/**
 * Carrusel infinito de 6 accesorios (círculo → píldora).
 * - Auto-desplazamiento continuo (~35 s por vuelta) con 3 copias de la pista; el salto de vuelta es
 *   exactamente el ancho de una copia, así que no se nota la costura.
 * - Pausa con hover/foco, mientras una tarjeta está abierta, al arrastrar y con la pestaña oculta.
 *   Con prefers-reduced-motion no hay auto-desplazamiento (solo flechas / arrastre).
 * - La tarjeta abierta está EN EL FLUJO: el ítem crece de círculo a píldora y los vecinos se recorren.
 * - Solo la primera copia es accesible; las copias son aria-hidden y quedan fuera del orden de tabulación
 *   (siguen respondiendo al mouse/toque para que cualquier círculo visible funcione).
 */
@Component({
  selector: 'app-acc-essentials',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './acc-essentials.component.html',
  styleUrls: ['./acc-essentials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccEssentialsComponent implements AfterViewInit, OnDestroy {
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private zone = inject(NgZone);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  @ViewChild('vp', { static: true }) vpRef!: ElementRef<HTMLElement>;
  @ViewChild('track', { static: true }) trackRef!: ElementRef<HTMLElement>;

  readonly items = ACC_ESSENTIALS;
  /** 0 = copia real (accesible); 1 y 2 = clones decorativos para el bucle. */
  readonly copies = [0, 1, 2];
  /** Clave de la instancia abierta: `${copia}-${id}`. */
  readonly open = signal<string | null>(null);

  /** px por segundo del auto-desplazamiento (se recalcula para ~35 s por vuelta). */
  private speed = 0;
  private offset = 0;
  private loopW = 0;
  private raf = 0;
  private last = 0;
  private hoverVp = false;
  private focusVp = false;
  private reduced = false;
  private tween: { from: number; to: number; t0: number; dur: number } | null = null;
  private drag: { x: number; off: number; moved: boolean; id: number } | null = null;
  private suppressClick = false;
  private pointerFocus = false;
  private ro?: ResizeObserver;
  private mq?: MediaQueryList;
  private timers: ReturnType<typeof setTimeout>[] = [];

  key(copy: number, it: AccEssential) {
    return `${copy}-${it.id}`;
  }
  link(it: AccEssential) {
    return `${ACCESORIOS_HUB}/${it.slug}`;
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;
    this.mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduced = this.mq.matches;
    this.mq.addEventListener?.('change', this.onMotionPref);
    // Fase de captura (Angular no tiene sintaxis para capture): un arrastre no cuenta como clic.
    this.vpRef.nativeElement.addEventListener('click', this.clickCaptureVp, true);
    this.measure();
    this.ro = new ResizeObserver(() => { if (!this.open()) this.measure(); });
    this.ro.observe(this.trackRef.nativeElement);
    this.zone.runOutsideAngular(() => {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    });
  }

  ngOnDestroy() {
    if (!this.isBrowser) return;
    cancelAnimationFrame(this.raf);
    this.ro?.disconnect();
    this.vpRef.nativeElement.removeEventListener('click', this.clickCaptureVp, true);
    this.mq?.removeEventListener?.('change', this.onMotionPref);
    this.timers.forEach(clearTimeout);
  }

  private onMotionPref = (e: MediaQueryListEvent) => { this.reduced = e.matches; };

  /** Ancho de una copia = distancia entre el primer ítem de la copia 0 y el de la copia 1. */
  private measure() {
    const lis = this.trackRef.nativeElement.querySelectorAll<HTMLElement>(':scope > li');
    const n = this.items.length;
    if (lis.length > n) this.loopW = lis[n].offsetLeft - lis[0].offsetLeft;
    this.speed = this.loopW / 35;
    this.wrap();
    this.apply();
  }

  private wrap() {
    if (!this.loopW || this.open()) return;
    this.offset = ((this.offset % this.loopW) + this.loopW) % this.loopW;
  }

  private apply() {
    this.trackRef.nativeElement.style.transform = `translate3d(${-this.offset}px,0,0)`;
  }

  private paused() {
    return this.reduced || this.hoverVp || this.focusVp || !!this.open() || !!this.drag?.moved ||
      (typeof document !== 'undefined' && document.hidden);
  }

  private tick = (now: number) => {
    const dt = Math.min(64, now - this.last) / 1000;
    this.last = now;
    if (this.tween) {
      const p = Math.min(1, (now - this.tween.t0) / this.tween.dur);
      const e = 1 - Math.pow(1 - p, 3);
      this.offset = this.tween.from + (this.tween.to - this.tween.from) * e;
      if (p >= 1) { this.tween = null; this.wrap(); }
      this.apply();
    } else if (!this.paused() && this.loopW) {
      this.offset += this.speed * dt;
      if (this.offset >= this.loopW) this.offset -= this.loopW;
      this.apply();
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  private animateTo(to: number, dur = 450) {
    this.tween = { from: this.offset, to, t0: performance.now(), dur };
  }

  /** Flechas: avanza / retrocede un ítem. */
  step(dir: 1 | -1) {
    if (!this.isBrowser) return;
    this.open.set(null);
    const li = this.trackRef.nativeElement.querySelector<HTMLElement>(':scope > li');
    const gap = parseFloat(getComputedStyle(this.trackRef.nativeElement).columnGap || '0') || 0;
    const w = (li?.offsetWidth || 160) + gap;
    if (this.tween) { this.offset = this.tween.to; this.tween = null; }
    if (dir < 0 && this.offset - w < 0) this.offset += this.loopW;
    if (dir > 0 && this.offset + w > this.loopW * 2) this.offset -= this.loopW;
    this.animateTo(this.offset + dir * w);
  }

  /** Lleva el ítem abierto a la vista (centrado en móvil; solo si se sale en escritorio). */
  private bringIntoView(key: string, center: boolean) {
    const t = setTimeout(() => {
      if (this.open() !== key) return;
      const li = this.trackRef.nativeElement.querySelector<HTMLElement>(`[data-key="${key}"]`);
      if (!li) return;
      const vp = this.vpRef.nativeElement.getBoundingClientRect();
      const r = li.getBoundingClientRect();
      let delta = 0;
      if (center) delta = (r.left + r.width / 2) - (vp.left + vp.width / 2);
      else if (r.right > vp.right - 8) delta = r.right - vp.right + 16;
      else if (r.left < vp.left + 8) delta = r.left - vp.left - 16;
      if (Math.abs(delta) > 1) this.animateTo(this.offset + delta, 380);
    }, 470);
    this.timers.push(t);
  }

  private canHover(): boolean {
    return this.isBrowser && !!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
  }

  // ---------- viewport (hover / foco / arrastre) ----------
  vpEnter() { this.hoverVp = true; }
  vpLeave() { this.hoverVp = false; }
  vpFocusIn() { this.focusVp = true; }
  vpFocusOut(ev: FocusEvent) {
    const next = ev.relatedTarget as Node | null;
    if (!next || !this.vpRef.nativeElement.contains(next)) this.focusVp = false;
  }

  pointerDownVp(ev: PointerEvent) {
    if (ev.button !== 0) return;
    this.drag = { x: ev.clientX, off: this.offset, moved: false, id: ev.pointerId };
  }
  pointerMoveVp(ev: PointerEvent) {
    const d = this.drag;
    if (!d || d.id !== ev.pointerId) return;
    const dx = ev.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 8) {
      d.moved = true;
      this.tween = null;
      if (this.open()) this.zone.run(() => this.open.set(null));
      this.vpRef.nativeElement.setPointerCapture?.(ev.pointerId);
    }
    if (d.moved) {
      this.offset = d.off - dx;
      if (this.loopW) {
        if (this.offset < 0) { this.offset += this.loopW; d.off += this.loopW; }
        if (this.offset >= this.loopW) { this.offset -= this.loopW; d.off -= this.loopW; }
      }
      this.apply();
    }
  }
  pointerUpVp(ev: PointerEvent) {
    const d = this.drag;
    if (!d || d.id !== ev.pointerId) return;
    if (d.moved) this.suppressClick = true;
    this.drag = null;
  }
  /** Fase de captura: un arrastre no debe contar como clic/toque. */
  private clickCaptureVp = (ev: MouseEvent) => {
    if (this.suppressClick) {
      ev.preventDefault();
      ev.stopPropagation();
      this.suppressClick = false;
    }
  };

  // ---------- ítems ----------
  pointerDown() {
    this.pointerFocus = true;
  }
  enter(k: string) {
    if (this.canHover() && !this.drag?.moved) {
      this.open.set(k);
      this.bringIntoView(k, false);
    }
  }
  leave(k: string) {
    if (this.canHover() && this.open() === k) this.open.set(null);
  }
  toggle(k: string) {
    this.pointerFocus = false;
    if (this.canHover()) { this.open.set(k); return; }
    const next = this.open() === k ? null : k;
    this.open.set(next);
    if (next) this.bringIntoView(next, true);
  }
  focusIn(k: string) {
    if (this.pointerFocus) return;
    this.open.set(k);
    this.bringIntoView(k, false);
  }
  focusOut(ev: FocusEvent, k: string) {
    const next = ev.relatedTarget as Node | null;
    const li = ev.currentTarget as HTMLElement;
    if ((!next || !li.contains(next)) && this.open() === k) this.open.set(null);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(ev: MouseEvent) {
    if (this.open() && !this.host.nativeElement.contains(ev.target as Node)) this.open.set(null);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    const k = this.open();
    if (!k) return;
    this.open.set(null);
    const id = k.slice(k.indexOf('-') + 1);
    this.pointerFocus = true; // devolver el foco no debe reabrir
    this.host.nativeElement.querySelector<HTMLButtonElement>(`#ess-btn-${id}`)?.focus({ preventScroll: true });
    this.pointerFocus = false;
  }
}
