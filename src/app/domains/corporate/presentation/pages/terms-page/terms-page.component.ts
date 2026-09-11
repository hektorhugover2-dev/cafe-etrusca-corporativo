import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './terms-page.component.html',
  styleUrl: './terms-page.component.scss'
})
export class TermsPageComponent implements OnInit {
  private seo = inject(SeoService);
  lang: 'es' | 'en' = 'es';

  ngOnInit() {
    this.seo.set({
      title: 'Términos y condiciones | Café Etrusca',
      description: 'Términos y condiciones de uso del sitio Café Etrusca: cuenta, servicios, propiedad intelectual, responsabilidades y contacto.',
      keywords: 'términos y condiciones,Café Etrusca,Etrusca Comercial,uso del sitio,términos del servicio'
    });
  }
}
