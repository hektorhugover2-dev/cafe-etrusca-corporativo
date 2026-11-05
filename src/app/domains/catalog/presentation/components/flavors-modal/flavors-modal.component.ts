import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { flavorIcon, FLAVOR_ICON_PATHS, FlavorIconKey } from './flavor-icons';

/**
 * Modal accesible con la lista de sabores de una línea (cards "LÍNEAS" de insumos).
 * Focus trap, Esc, clic en fondo, scroll interno; hoja inferior en móvil.
 */
@Component({
  selector: 'app-flavors-modal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="fm-backdrop" (click)="close()"></div>
    <div #dialog class="fm-dialog" [attr.data-tone]="tone" role="dialog" aria-modal="true" [attr.aria-labelledby]="titleId">
      <header class="fm-head">
        <div>
          <p class="fm-kicker">Sabores</p>
          <h2 class="fm-title" [id]="titleId">{{ title }}</h2>
          @if (items.length) { <p class="fm-count">{{ items.length }} {{ items.length === 1 ? 'sabor' : 'sabores' }}</p> }
        </div>
        <button #closeBtn type="button" class="fm-close" (click)="close()" aria-label="Cerrar lista de sabores">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </header>
      <div class="fm-body" tabindex="0" aria-label="Lista de sabores">
        @if (items.length) {
          <ul class="fm-list">
            @for (it of items; track it.name) {
              <li>
                <span class="fm-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
                    @for (d of paths[it.icon]; track $index) {
                      <path [attr.d]="d" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    }
                  </svg>
                </span>
                <span class="fm-name">{{ it.name }}@if (it.ask) {<small class="fm-ask">Pregunta disponibilidad en tu <a routerLink="/sucursales" (click)="close()">sucursal</a> o en el <a routerLink="/contacto" (click)="close()">Call Center</a></small>}</span>
              </li>
            }
          </ul>
        } @else {
          <p class="fm-empty">Estamos actualizando la lista de sabores de esta l&iacute;nea. Consulta disponibilidad con un asesor.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; font-family: 'Poppins', system-ui, sans-serif; }
    .fm-backdrop { position: absolute; inset: 0; background: rgba(30, 36, 44, .55); animation: fmFade .18s ease-out; }
    .fm-dialog { --fm-c: #283039; --fm-soft: #eef1f4; --fm-ink: #283039;
      position: relative; width: min(640px, 100%); max-height: min(80vh, 720px); display: flex; flex-direction: column;
      background: #fff; border-radius: 22px; border: 2px solid var(--fm-c); box-shadow: 0 24px 60px rgba(0,0,0,.22); animation: fmPop .2s ease-out; overflow: hidden; }
    .fm-dialog[data-tone='coral'], .fm-dialog[data-tone='concentrate'], .fm-dialog[data-tone='jam'] { --fm-c: #ff9496; --fm-soft: #ffdcdd; --fm-ink: #b8454a; }
    .fm-dialog[data-tone='yellow'] { --fm-c: #fdd640; --fm-soft: #fff4c4; --fm-ink: #8f7010; }
    .fm-dialog[data-tone='cyan'], .fm-dialog[data-tone='smoothie'] { --fm-c: #62e0e9; --fm-soft: #c8f4f7; --fm-ink: #157780; }
    .fm-dialog[data-tone='lime'], .fm-dialog[data-tone='puree'] { --fm-c: #bbdc17; --fm-soft: #eef6c4; --fm-ink: #5a700c; }
    .fm-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding: 1.5rem 1.75rem 1rem; background: var(--fm-soft); }
    .fm-kicker { margin: 0; font-size: .75rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--fm-ink); }
    .fm-title { margin: .15rem 0 0; font-size: 1.35rem; font-weight: 800; line-height: 1.2; color: #283039; }
    .fm-count { margin: .25rem 0 0; font-size: .85rem; color: #4a525c; }
    .fm-close { flex: none; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 50%; border: 1.5px solid var(--fm-c); background: #fff; color: #283039; cursor: pointer; }
    .fm-close:hover { background: var(--fm-c); }
    .fm-close:focus-visible, .fm-body:focus-visible { outline: 3px solid #283039; outline-offset: 2px; }
    .fm-body { overflow-y: auto; overscroll-behavior: contain; padding: 1.25rem 1.75rem 1.75rem; }
    .fm-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .6rem 1.25rem; }
    .fm-list li { display: flex; align-items: center; gap: .75rem; padding: .45rem 0; border-bottom: 1px solid #eef0f2; font-size: .95rem; color: #283039; }
    .fm-ico { flex: none; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 12px; background: var(--fm-soft); color: var(--fm-ink); }
    .fm-empty { margin: 0; color: #4a525c; }
    .fm-name { display: flex; flex-direction: column; }
    .fm-ask { margin-top: .15rem; font-size: .75rem; line-height: 1.3; color: #4a525c; }
    .fm-ask a { color: var(--fm-ink); font-weight: 600; }
    @keyframes fmFade { from { opacity: 0; } }
    @keyframes fmPop { from { opacity: 0; transform: translateY(8px) scale(.98); } }
    @keyframes fmUp { from { transform: translateY(100%); } }
    @media (max-width: 640px) {
      :host { align-items: flex-end; padding: 0; }
      .fm-dialog { width: 100%; max-height: 85vh; border-radius: 22px 22px 0 0; border-width: 2px 0 0; animation: fmUp .25s ease-out; }
      .fm-dialog::before { content: ''; position: absolute; top: 8px; left: 50%; width: 44px; height: 4px; margin-left: -22px; border-radius: 4px; background: rgba(40,48,57,.25); }
      .fm-head { padding: 1.5rem 1.25rem .9rem; }
      .fm-body { padding: 1rem 1.25rem calc(1.5rem + env(safe-area-inset-bottom)); }
      .fm-list { grid-template-columns: 1fr; }
    }
    @media (prefers-reduced-motion: reduce) { .fm-backdrop, .fm-dialog { animation: none; } }
  `]
})
export class FlavorsModalComponent implements AfterViewInit, OnDestroy {
  private static seq = 0;
  @Input() title = '';
  @Input() tone = '';
  private flavorList: string[] = [];
  private askList: string[] = [];
  @Input() set flavors(v: string[] | null | undefined) { this.flavorList = v || []; this.build(); }
  /** Sabores sin venta en línea: se marcan con aviso de sucursal / Call Center. */
  @Input() set unavailable(v: string[] | null | undefined) { this.askList = v || []; this.build(); }
  private build() {
    const ask = new Set(this.askList);
    this.items = this.flavorList.map((name) => ({ name, icon: flavorIcon(name), ask: ask.has(name) }));
  }
  @Output() closed = new EventEmitter<void>();
  @ViewChild('dialog') dialog?: ElementRef<HTMLElement>;
  @ViewChild('closeBtn') closeBtn?: ElementRef<HTMLButtonElement>;
  items: { name: string; icon: FlavorIconKey; ask?: boolean }[] = [];
  readonly paths = FLAVOR_ICON_PATHS;
  readonly titleId = 'fm-title-' + ++FlavorsModalComponent.seq;
  private opener: HTMLElement | null = null;
  private prevOverflow = '';

  ngAfterViewInit() {
    if (typeof document === 'undefined') return;
    this.opener = document.activeElement as HTMLElement | null;
    this.prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.closeBtn?.nativeElement.focus());
  }

  ngOnDestroy() {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = this.prevOverflow;
    this.opener?.focus?.();
  }

  close() { this.closed.emit(); }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') { e.preventDefault(); this.close(); return; }
    if (e.key !== 'Tab' || !this.dialog) return;
    const f = Array.from(this.dialog.nativeElement.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'));
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (!this.dialog.nativeElement.contains(active)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  }
}
