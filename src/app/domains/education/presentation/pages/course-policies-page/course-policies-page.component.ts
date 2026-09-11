import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-course-policies-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-policies-page.component.html',
  styleUrl: './course-policies-page.component.scss'
})
export class CoursePoliciesPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.set({
      title: 'Políticas externas cursos 2026 | Café Etrusca',
      description:
        'Consulta las políticas externas de cursos y talleres Café Etrusca 2026: inscripciones, cancelaciones y lineamientos.',
      keywords: 'políticas cursos Café Etrusca, talleres, cancelaciones, inscripciones',
      image: '/assets/images/educacion/icon-cursos.png',
      ogType: 'website',
      jsonLd: ({ origin, url }) => ({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': url + '#policies',
        name: 'Políticas externas cursos 2026',
        url,
        isPartOf: { '@id': origin + '/#website' }
      })
    });
  }
}
