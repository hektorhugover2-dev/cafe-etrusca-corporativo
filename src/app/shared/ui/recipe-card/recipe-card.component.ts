import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Recipe } from '../../../domains/catalog/presentation/pages/recipes-page/recetas.data';

const BTN = ['btn-rosa', 'btn-rosa', 'btn-verde', 'btn-amarillo'];
const SUB = ['sub-rosa', 'sub-rosa', 'sub-verde', 'sub-amarillo'];
const ORIGINS = ['septiembre-2026', 'verano-2026', 'san-valentin-2026', 'calabaza'];

/**
 * Tarjeta de receta con el mismo markup y estilo que la sección RECETAS del home
 * (imagen con fondo de colección + leyenda, título, resumen y botón "Ver receta →").
 * Va dentro de un `.row` de Bootstrap; el host usa display: contents para que la
 * columna sea hija directa de la fila, igual que en el home.
 */
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink],
  host: { style: 'display: contents' },
  template: `
    <div class="col-6 col-lg-3 d-flex flex-column align-items-center text-center recipe-item">
      <div class="recipe-img-wrapper mb-4" [class]="'recipe-img-wrapper mb-4 ' + originClass()">
        <img [src]="recipe().image" [alt]="title()" class="recipe-img" loading="lazy">
        <p class="recipe-legend">Sugerencia de preparación</p>
      </div>
      <h3 class="fw-bold mb-1 home-card-title" style="color: var(--etrusca-navy-900);">{{ title() }}</h3>
      <p class="small mb-3 recipe-sub" [class]="'small mb-3 recipe-sub ' + subClass()">{{ recipe().summary }}</p>
      <a [routerLink]="['/recetas', recipe().slug]" class="badge rounded-pill text-dark fw-bold px-4 py-2 text-decoration-none btn-receta"
         [class]="'badge rounded-pill text-dark fw-bold px-4 py-2 text-decoration-none btn-receta ' + btnClass()"
         [attr.aria-label]="'Ver receta: ' + title()">Ver receta →</a>
    </div>
  `,
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {
  readonly recipe = input.required<Recipe>();
  readonly index = input(0);

  title(): string {
    const r = this.recipe();
    return [r.title, r.titleAccent].filter(Boolean).join(' ');
  }
  btnClass(): string { return BTN[this.index() % 4]; }
  subClass(): string { return SUB[this.index() % 4]; }
  originClass(): string {
    const o = this.recipe().origin;
    if (!o) return '';
    if (o === 'navidad-2023' || o === 'invierno-2024') return 'origin-navidad-2023';
    return ORIGINS.includes(o) ? 'origin-' + o : '';
  }
}
