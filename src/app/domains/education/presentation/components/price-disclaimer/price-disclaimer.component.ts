import { Component } from '@angular/core';

/**
 * Leyenda reutilizable bajo precios de cursos/talleres.
 * Color #6b635a (microcopy edu): 5.12:1 sobre el crema del hero (#f4eee4) y 5.90:1 sobre blanco.
 */
@Component({
  selector: 'app-price-disclaimer',
  standalone: true,
  template: `<p class="edu-price-disclaimer">Sujetos a disponibilidad y cambios sin previo aviso.</p>`,
  styles: [`
    :host { display: block; }
    .edu-price-disclaimer {
      margin: 0.45rem 0 0;
      max-width: 38rem;
      font-family: 'Poppins', 'Poppins Fallback', sans-serif;
      font-size: 0.75rem;
      font-weight: 400;
      line-height: 1.45;
      color: #6b635a;
    }
    @media (min-width: 768px) {
      .edu-price-disclaimer { font-size: 0.8125rem; }
    }
  `]
})
export class PriceDisclaimerComponent {}