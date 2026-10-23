import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { siteUrl } from '../../kernel/config/site-url';

/** Una miga: nombre visible y ruta del sitio. El último elemento es la página actual. */
export interface HeroCrumb {
  label: string;
  path: string;
}

/** JSON-LD BreadcrumbList a partir de las mismas migas que se muestran (mismo patrón que Torani/ChillOut). */
export function breadcrumbJsonLd(crumbs: ReadonlyArray<HeroCrumb>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: siteUrl(c.path) }))
  };
}

/**
 * Migas del hero con el diseño de `.tor-crumbs` de /insumos-para-cafeterias/jarabes/torani/
 * (fila de enlaces separados por «›», navy #192966, página actual en rojo #c2474b).
 * `tone="light"` para heros de fondo oscuro.
 */
@Component({
  selector: 'app-hero-crumbs',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="tor-crumbs" [class.is-light]="tone() === 'light'" aria-label="Ruta de navegación">
      @for (c of items(); track c.path; let last = $last) {
        @if (last) {
          <span aria-current="page">{{ c.label }}</span>
        } @else {
          <a [routerLink]="c.path">{{ c.label }}</a><span aria-hidden="true">›</span>
        }
      }
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .tor-crumbs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      align-items: center;
      font-size: 0.85rem;
      font-weight: 600;
      color: #192966;
      margin-bottom: 1.1rem;
      text-align: left;
    }
    .tor-crumbs a { color: #192966; text-decoration: none; }
    .tor-crumbs a:hover { text-decoration: underline; }
    .tor-crumbs a:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; border-radius: 2px; }
    .tor-crumbs [aria-current] { color: #c2474b; }
    .tor-crumbs.is-light, .tor-crumbs.is-light a { color: #fff; }
    .tor-crumbs.is-light [aria-current] { color: #fdd640; }
  `]
})
export class HeroCrumbsComponent {
  readonly items = input.required<ReadonlyArray<HeroCrumb>>();
  readonly tone = input<'dark' | 'light'>('dark');
}
