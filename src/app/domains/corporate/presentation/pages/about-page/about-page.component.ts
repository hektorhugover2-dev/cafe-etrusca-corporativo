import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL, absoluteAssetUrl } from '../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, ScrollWaveComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent implements OnInit {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);

    valores = [
    { label: 'Lealtad', tone: 'blue' },
    { label: 'Honestidad', tone: 'lime' },
    { label: 'Compromiso', tone: 'pink' },
    { label: 'Empatía', tone: 'yellow' },
    { label: 'Innovación', tone: 'orange' }
  ];

  ngOnInit() {
    const brand = 'Café Etrusca';
    this.seo.set({
      title: 'Nosotros | ' + brand + ' — Desde 1995',
      description:
        'Conoce a ' + brand + ': referente de la industria del café en México desde 1995. Insumos, equipo, capacitación y acompañamiento para cafeterías.',
      keywords:
        'Café Etrusca,nosotros,quiénes somos,misión,visión,cafetería México,insumos,capacitación baristas,La Fenice,Barista Champ,ChillOut',
      image: `${ASSETS_BASE_URL}/images/home/banners/banner_home_la_fenice.webp`,
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': url + '#about',
          name: 'Nosotros | ' + brand,
          url,
          description:
            'Referente para la industria del café en México desde 1995. Insumos, equipo y capacitación para cafeterías.',
          isPartOf: { '@id': origin + '/#website' },
          about: { '@id': origin + '/#organization' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': origin + '/#organization',
          name: brand,
          url: origin + '/',
          foundingDate: '1995',
          logo: absoluteAssetUrl('images/logo-etrusca.webp'),
          telephone: '+52-55-4166-8777',
          email: 'atencion@cafeetrusca.com',
          sameAs: [
            'https://www.facebook.com/CafeEtrusca',
            'https://www.instagram.com/cafeetrusca',
            'https://www.youtube.com/@CafeEtrusca',
            'https://www.tiktok.com/@cafeetrusca'
          ]
        }
      ]
    });
  }
}
