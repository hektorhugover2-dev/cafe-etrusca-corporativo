import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EDU_NAV } from '../../education.data';

@Component({
  selector: 'app-edu-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="edu-nav" aria-label="Categorías de educación">
      @for (item of items; track item.slug) {
        <a class="edu-pill"
           [routerLink]="['/educacion', item.slug]"
           routerLinkActive="active">{{ item.navLabel }}</a>
      }
    </nav>
  `,
  styleUrls: ['../../edu-theme.scss']
})
export class EduNavComponent {
  items = EDU_NAV;
}
