import { Component } from '@angular/core';

@Component({
  selector: 'app-insumos-cta',
  standalone: true,
  template: `
    <section class="ins-cta-band">
      <div class="card">
        <h2>¿No sabes qué necesitas?</h2>
        <p>Te acompañamos a elegir las mejores soluciones para tu negocio. Hablemos.</p>
        <a href="https://wa.me/525541668777" target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp (se abre en otra pestaña)">Escríbenos por WhatsApp</a>
      </div>
    </section>
  `,
  styleUrls: ['../../insumos-theme.scss']
})
export class InsumosCtaComponent {}
