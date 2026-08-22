import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insumos-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="ins-cta-band">
      <div class="card">
        <h2>¿No sabes qué necesitas?</h2>
        <p>Te acompañamos a elegir las mejores soluciones para tu negocio. Hablemos.</p>
        <a routerLink="/contacto">Más información</a>
      </div>
    </section>
  `,
  styleUrls: ['../../insumos-theme.scss']
})
export class InsumosCtaComponent {}
