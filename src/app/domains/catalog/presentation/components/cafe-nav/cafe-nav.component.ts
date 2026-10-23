import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

export const CAFE_NAV = [
  { slug: 'premium', label: 'Café Premium', icon: `${ASSETS_BASE_URL}/images/cafe/nav/premium.png` },
  { slug: 'especialidad', label: 'Especialidad', icon: `${ASSETS_BASE_URL}/images/cafe/nav/especialidad.png` },
  { slug: 'verde', label: 'Café en verde', icon: `${ASSETS_BASE_URL}/images/cafe/nav/verde.png` }
] as const;

@Component({
  selector: 'app-cafe-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="cafe-nav ins-nav" [class.all-color]="allColor" aria-label="Líneas de café">
      @for (item of items; track item.slug) {
        <a
          class="ins-cat"
          [class]="'ins-cat cafe-cat-' + item.slug"
          [routerLink]="['/productos/cafe', item.slug]"
          routerLinkActive="active"
        >
          <span class="ins-cat-icon" aria-hidden="true">
            <img [src]="item.icon" alt="">
          </span>
          <span class="ins-cat-label">{{ item.label }}</span>
        </a>
      }
    </nav>
  `,
  styleUrls: ['../../insumos-theme.scss'],
  styles: [`
    :host {
      display: block;
      position: relative;
      z-index: 8;
    }

    /* Mismo espacio hero → categorías que Insumos (.ins-nav) */
    .cafe-nav.ins-nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.1rem 1.35rem;
      margin-top: 0;
      padding: 5rem 1.25rem 0.8rem;
      position: relative;
      z-index: 8;
    }

    .cafe-nav .ins-cat {
      width: 92px;
    }

    .cafe-nav .ins-cat-icon {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      background: #e8e8e8;
    }

    .cafe-nav .ins-cat-icon img {
      width: 52px;
      height: 52px;
      object-fit: contain;
    }

    .cafe-nav .ins-cat-label {
      font-weight: 800;
      font-size: 0.86rem;
      line-height: 1.15;
      text-align: center;
    }

    .cafe-nav.all-color .cafe-cat-premium .ins-cat-icon,
    .cafe-cat-premium.active .ins-cat-icon {
      background: #fac85b;
    }

    .cafe-nav.all-color .cafe-cat-especialidad .ins-cat-icon,
    .cafe-cat-especialidad.active .ins-cat-icon {
      background: #e7c9a0;
    }

    .cafe-nav.all-color .cafe-cat-verde .ins-cat-icon,
    .cafe-cat-verde.active .ins-cat-icon {
      background: #cfe658;
    }
  `]
})
export class CafeNavComponent {
  @Input() allColor = false;
  items = CAFE_NAV;
}
