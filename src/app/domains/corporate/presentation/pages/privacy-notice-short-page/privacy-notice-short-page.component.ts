import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-privacy-notice-short-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-notice-short-page.component.html',
  styleUrl: './privacy-notice-short-page.component.scss'
})
export class PrivacyNoticeShortPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.set({
      title: 'Aviso de privacidad simplificado | Café Etrusca',
      description: 'Aviso de privacidad simplificado de Etrusca Comercial, S.A. de C.V. Finalidades del tratamiento de datos personales y acceso al aviso integral.',
      keywords: 'aviso de privacidad simplificado,protección de datos,Café Etrusca,Etrusca Comercial'
    });
  }
}
