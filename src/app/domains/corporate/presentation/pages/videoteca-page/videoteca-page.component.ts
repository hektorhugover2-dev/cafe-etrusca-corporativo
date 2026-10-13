import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import {
  TRAVESIAS_DEL_SABOR,
  VIDEOTECA_CHANNEL_URL,
  VIDEOTECA_PLAYLIST_URL,
  VideotecaVideo
} from './videoteca.data';

@Component({
  selector: 'app-videoteca-page',
  standalone: true,
  imports: [ScrollWaveComponent],
  templateUrl: './videoteca-page.component.html',
  styleUrl: './videoteca-page.component.scss'
})
export class VideotecaPageComponent implements OnInit {
  private seo = inject(SeoService);
  private sanitizer = inject(DomSanitizer);

  readonly channelUrl = VIDEOTECA_CHANNEL_URL;
  readonly playlistUrl = VIDEOTECA_PLAYLIST_URL;
  videos: VideotecaVideo[] = TRAVESIAS_DEL_SABOR;
  active: VideotecaVideo = this.videos[this.videos.length - 1] || this.videos[0];

  ngOnInit() {
    const brand = 'Café Etrusca';
    this.seo.set({
      title: 'Videoteca | Travesías del Sabor | ' + brand,
      description:
        'Videoteca de Café Etrusca: podcast y episodios de Travesías del Sabor con historias, técnica y negocio del café.',
      keywords:
        'Videoteca,Travesías del Sabor,podcast café,Café Etrusca,YouTube,barismo,cafetería',
      image: this.active?.thumb,
      ogType: 'website',
      jsonLd: ({ origin, url }) => ({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': url + '#videoteca',
        name: 'Videoteca | Travesías del Sabor | ' + brand,
        url,
        description:
          'Episodios del podcast Travesías del Sabor en la videoteca de Café Etrusca.',
        isPartOf: { '@id': origin + '/#website' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: this.videos.length,
          itemListElement: this.videos.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: v.url,
            name: v.title
          }))
        }
      })
    });
  }

  select(v: VideotecaVideo) {
    this.active = v;
    if (typeof document !== 'undefined') {
      document.getElementById('vt-player')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  embedUrl(v: VideotecaVideo): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`
    );
  }
}
