import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Llamada a la acción reutilizable de las guías /blog/<slug>/: texto + botón navy (estilo del artículo).
 * Se usa para la invitación general a /recetas/ y para el botón de la calculadora de precios.
 * `path` es una ruta interna del sitio (routerLink). Con `external` = true, `path` es una URL externa
 * y se abre en otra pestaña (target="_blank" rel="noopener"). `secondaryLabel`/`secondaryUrl`: enlace
 * externo secundario opcional (p. ej. el podcast).
 */
@Component({
  selector: 'app-blog-link-cta',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="blog-link-cta" [class.blog-link-cta--soft]="variant() === 'soft'" [class.blog-link-cta--live]="variant() === 'live'">
      <p class="blog-link-cta-text">{{ text() }}</p>
      @if (external()) {
        <a class="blog-link-cta-btn" [href]="path()" target="_blank" rel="noopener">{{ label() }}</a>
      } @else {
        <a class="blog-link-cta-btn" [routerLink]="route()" [queryParams]="query()">{{ label() }}</a>
      }
      @if (cards().length) {
        <ul class="blog-link-cta-cards">
          @for (c of cards(); track c.path) {
            <li><a [routerLink]="c.path"><img [src]="c.img" [alt]="c.name" width="160" height="240" loading="lazy" decoding="async" /><span>{{ c.name }}</span></a></li>
          }
        </ul>
      }
      @if (secondaryLabel() && secondaryUrl()) {
        <p class="blog-link-cta-secondary">
          {{ secondaryText() }} <a [href]="secondaryUrl()" target="_blank" rel="noopener">{{ secondaryLabel() }}</a>
        </p>
      }
    </aside>
  `,
  styles: [`
    :host { display: block; margin: 0 0 1.6rem; }
    .blog-link-cta {
      text-align: center;
      background: #f3f5f8;
      border-radius: 24px;
      padding: 1.8rem 1.4rem;
      font-family: 'Poppins', sans-serif;
    }
    .blog-link-cta--soft { background: #fff; border: 1px solid #e3e7ec; }
    .blog-link-cta-text { font-size: 1.04rem; line-height: 1.7; color: #2f3842; margin: 0 0 1.1rem; }
    .blog-link-cta-btn {
      display: inline-block;
      padding: 0.8rem 1.6rem;
      border-radius: 999px;
      background: var(--etrusca-navy-900, #283039);
      color: #fff;
      font-weight: 600;
      text-decoration: none;
    }
    .blog-link-cta-btn:hover { opacity: 0.9; }
    .blog-link-cta--live { background: #283039; }
    .blog-link-cta--live .blog-link-cta-text, .blog-link-cta--live .blog-link-cta-secondary { color: #fff; }
    .blog-link-cta--live .blog-link-cta-btn { background: #fff; color: #283039; }
    .blog-link-cta--live .blog-link-cta-secondary a { color: #fff; }
    .blog-link-cta-cards { list-style: none; padding: 0; margin: 1.4rem 0 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.9rem; }
    .blog-link-cta-cards a { display: block; text-decoration: none; color: #283039; font-weight: 600; font-size: 0.92rem; }
    .blog-link-cta-cards img { width: 100%; height: auto; aspect-ratio: 2 / 3; object-fit: cover; border-radius: 16px; display: block; margin-bottom: 0.5rem; }
    .blog-link-cta-secondary { font-size: 0.95rem; color: #3b4450; margin: 1rem 0 0; }
    .blog-link-cta-secondary a { color: inherit; font-weight: 600; text-decoration: underline; }
  `]
})
export class BlogLinkCtaComponent {
  readonly text = input.required<string>();
  readonly label = input.required<string>();
  readonly path = input.required<string>();
  readonly variant = input<'default' | 'soft' | 'live'>('default');
  readonly external = input(false);
  readonly secondaryText = input('');
  readonly secondaryLabel = input('');
  readonly secondaryUrl = input('');
  /** Tarjetas opcionales (p. ej. recetas destacadas); img ya resuelta o relativa a assets. */
  readonly cards = input<Array<{ name: string; path: string; img: string }>>([]);
  /** Ruta interna sin query (routerLink) y query params aparte: "/recetas/?temporada=invierno". */
  readonly route = computed(() => this.path().split('?')[0]);
  readonly query = computed(() => {
    const q = this.path().split('?')[1];
    return q ? Object.fromEntries(new URLSearchParams(q).entries()) : null;
  });
}
