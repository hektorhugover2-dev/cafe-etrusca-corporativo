import {
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ACC_WHATSAPP } from '../../accesorios.data';
import { BuyModalService, BuyRequest } from './buy-modal.service';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Modal "Comprar": en línea (ficha de la tienda o catálogo), en sucursal (página /sucursales) o asesoría (WhatsApp).
 * Accesible: role="dialog" + aria-modal, foco atrapado (Tab / Shift+Tab), Esc y clic en el fondo cierran, el foco
 * vuelve al botón que lo abrió. Sólo se renderiza en el navegador (lo monta AppComponent al abrirlo).
 */
@Component({
  selector: 'app-buy-modal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.scss'],
  host: { '(document:keydown)': 'onKeydown($event)' }
})
export class BuyModalComponent {
  readonly req = input.required<BuyRequest>();

  private svc = inject(BuyModalService);
  private doc = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private dialog = viewChild<ElementRef<HTMLElement>>('dialog');
  private sub?: Subscription;
  private prevOverflow = '';

  readonly whatsapp = ACC_WHATSAPP;
  readonly resolving = signal(false);
  private readonly resolved = signal<string | null>(null);

  readonly onlineUrl = computed(() => this.req().onlineUrl || this.resolved());
  readonly onlineHref = computed(() => this.onlineUrl() || this.req().fallbackUrl);
  readonly themeStyle = computed(() => {
    const t = this.req().theme;
    return t ? `--bm-btn:${t.btn};--bm-ink:${t.ink}` : '';
  });

  constructor() {
    // Nuevo producto → si hace falta, busca su ficha en la tienda.
    effect(() => {
      const r = this.req();
      untracked(() => this.reset(r));
    });
    afterNextRender(() => {
      this.prevOverflow = this.doc.body.style.overflow;
      this.doc.body.style.overflow = 'hidden';
      this.focusFirst();
    });
    inject(DestroyRef).onDestroy(() => {
      this.sub?.unsubscribe();
      if (this.isBrowser) this.doc.body.style.overflow = this.prevOverflow;
    });
  }

  private reset(r: BuyRequest): void {
    this.sub?.unsubscribe();
    this.resolved.set(null);
    this.resolving.set(false);
    if (!r.onlineUrl && r.lookup?.code) {
      this.resolving.set(true);
      this.sub = this.svc.resolve(r.lookup).subscribe((url) => {
        this.resolved.set(url);
        this.resolving.set(false);
      });
    }
  }

  close(): void {
    this.svc.close();
  }

  /** Tras seguir un enlace (tienda / Contacto): se cierra después del clic para no cancelar la navegación. */
  closeSoon(): void {
    setTimeout(() => this.svc.close(), 0);
  }

  onBackdrop(ev: MouseEvent): void {
    if (ev.target === ev.currentTarget) this.close();
  }

  onKeydown(ev: KeyboardEvent): void {
    if (ev.key === 'Escape') {
      ev.preventDefault();
      this.close();
      return;
    }
    if (ev.key !== 'Tab') return;
    const root = this.dialog()?.nativeElement;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = this.doc.activeElement as HTMLElement | null;
    if (!root.contains(active)) {
      ev.preventDefault();
      first.focus();
    } else if (ev.shiftKey && active === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && active === last) {
      ev.preventDefault();
      first.focus();
    }
  }

  private focusFirst(): void {
    const root = this.dialog()?.nativeElement;
    const target = root?.querySelector<HTMLElement>('[data-autofocus]') || root?.querySelector<HTMLElement>(FOCUSABLE);
    target?.focus();
  }
}
