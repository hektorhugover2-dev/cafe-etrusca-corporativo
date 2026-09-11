import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-edu-cta',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="edu-cta">
      <h2>¿Quieres comenzar tu camino?</h2>
      <p>Explora nuestro calendario y encuentra la opción ideal para ti.</p>
      <div class="edu-actions" style="justify-content:center;">
        <a class="btn-navy" routerLink="/contacto">Hablar con un asesor</a>
        <a class="btn-ghost" href="https://calendario-cursos.cafeetrusca.com/web/viewer.html?file=CALENDARIO_SESIONES-OCT-DIC-2026.pdf" target="_blank" rel="noopener">Ver calendario completo</a>
      </div>
    </section>
  `,
  styleUrls: ['../../edu-theme.scss']
})
export class EduCtaComponent {}
