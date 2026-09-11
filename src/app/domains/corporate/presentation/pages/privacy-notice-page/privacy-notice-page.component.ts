import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-privacy-notice-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-notice-page.component.html',
  styleUrl: './privacy-notice-page.component.scss'
})
export class PrivacyNoticePageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.set({
      title: 'Aviso de privacidad | Café Etrusca',
      description: 'Aviso de privacidad integral de Etrusca Comercial, S.A. de C.V. Conoce el tratamiento de tus datos personales, derechos ARCO y cómo contactarnos.',
      keywords: 'aviso de privacidad,protección de datos,LFPDPPP,Café Etrusca,Etrusca Comercial,derechos ARCO'
    });
  }
}
