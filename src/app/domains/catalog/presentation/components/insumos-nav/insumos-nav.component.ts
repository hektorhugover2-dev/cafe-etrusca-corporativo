import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { INSUMOS_NAV } from '../../insumos.data';

@Component({
  selector: 'app-insumos-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="ins-nav" aria-label="Categorías de insumos">
      @for (item of items; track item.slug) {
        <a class="ins-pill"
           [routerLink]="['/productos/insumos', item.slug]"
           routerLinkActive="active">{{ item.label }}</a>
      }
    </nav>
  `,
  styleUrls: ['../../insumos-theme.scss']
})
export class InsumosNavComponent {
  @Input() active = '';
  items = INSUMOS_NAV;
}
