import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INSUMOS_NAV } from '../../insumos.data';

@Component({
  selector: 'app-insumos-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="ins-nav" [class.all-color]="allColor" aria-label="Categorías de insumos">
      @for (item of items; track item.slug) {
        <a class="ins-cat"
           [class]="'ins-cat ins-cat-' + item.slug"
           [routerLink]="['/productos/insumos', item.slug]"
           routerLinkActive="active">
          <span class="ins-cat-icon" aria-hidden="true">
            <img [src]="item.icon" alt="">
          </span>
          <span class="ins-cat-label">{{ item.label }}</span>
        </a>
      }
    </nav>
  `,
  styleUrls: ['../../insumos-theme.scss']
})
export class InsumosNavComponent {
  @Input() allColor = false;
  items = INSUMOS_NAV;
}
