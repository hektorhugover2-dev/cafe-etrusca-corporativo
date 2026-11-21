import { Component, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import {
  TRAVESIAS_DEL_SABOR,
  VIDEOTECA_CHANNEL_URL,
  VIDEOTECA_PLAYLIST_URL,
  VIDEOTECA_TABS,
  VideotecaCategoria,
  VideotecaVideo,
  videotecaFilter,
  videotecaVideos
} from './videoteca.data';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-videoteca-page',
  standalone: true,
  imports: [ScrollWaveComponent],
  templateUrl: './videoteca-page.component.html',
  styleUrl: './videoteca-page.component.scss'
})
export class VideotecaPageComponent implements OnInit {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private seo = inject(SeoService);
  private sanitizer = inject(DomSanitizer);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly channelUrl = VIDEOTECA_CHANNEL_URL;
  readonly playlistUrl = VIDEOTECA_PLAYLIST_URL;
  readonly tabs = VIDEOTECA_TABS;
  readonly allVideos: VideotecaVideo[] = videotecaVideos();
  categoria: VideotecaCategoria = 'todas';
  videos: VideotecaVideo[] = this.allVideos;
  active: VideotecaVideo = TRAVESIAS_DEL_SABOR[TRAVESIAS_DEL_SABOR.length - 1] || this.allVideos[0];
  /** El iframe de YouTube se monta solo tras un clic (fachada). */
  playing = false;

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((q) => this.aplicarCategoria(q));
  }

  private aplicarCategoria(q: ParamMap) {
    const raw = q.get('categoria');
    const cat: VideotecaCategoria =
      raw === 'recetas' || raw === 'travesias' || raw === 'todas' ? raw : 'todas';
    this.categoria = cat;
    this.videos = videotecaFilter(this.allVideos, cat);
    if (!this.videos.some((v) => v.id === this.active?.id)) {
      this.active =
        cat === 'recetas'
          ? this.videos[0]
          : this.videos[this.videos.length - 1] || this.videos[0];
      this.playing = false;
    }
  }

  setCategoria(id: VideotecaCategoria) {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: id === 'todas' ? {} : { categoria: id },
      replaceUrl: true
    });
  }

  ngOnInit() {
    const brand = 'Café Etrusca';
    this.seo.set({
      title: 'Videoteca | Recetas y Travesías del Sabor | ' + brand,
      description:
        'Videoteca de Café Etrusca: recetas en video y episodios de Travesías del Sabor con historias, técnica y negocio del café.',
      keywords:
        'Videoteca,recetas café,Travesías del Sabor,podcast café,Café Etrusca,YouTube,barismo,cafetería',
      image: this.active?.thumb,
      ogType: 'website',
      jsonLd: ({ origin, url }) => ({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': url + '#videoteca',
        name: 'Videoteca | Recetas y Travesías del Sabor | ' + brand,
        url,
        description:
          'Recetas en video y episodios del podcast Travesías del Sabor en la videoteca de Café Etrusca.',
        isPartOf: { '@id': origin + '/#website' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: this.allVideos.length,
          itemListElement: this.allVideos.map((v, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: v.url,
            name: v.title
          }))
        }
      })
    });
  }

  get leadAccent(): string {
    if (this.categoria === 'recetas') return 'Recetas en video';
    if (this.categoria === 'travesias') return 'Travesías del Sabor';
    return 'Recetas y Travesías del Sabor';
  }

  get leadRest(): string {
    if (this.categoria === 'recetas') return ' — recetas paso a paso del canal oficial';
    if (this.categoria === 'travesias') return ' — podcast del canal oficial';
    return ' — videos del canal oficial';
  }

  get bodyText(): string {
    if (this.categoria === 'recetas') {
      return 'Recetas paso a paso, tips de barista y mucha inspiración. Mira los videos aquí o en YouTube.';
    }
    if (this.categoria === 'travesias') {
      return 'Historias, técnica y negocio del café. Mira los episodios aquí o en YouTube.';
    }
    return 'Recetas en video y episodios de Travesías del Sabor. Mira los videos aquí o en YouTube.';
  }

  get seriesLabel(): string {
    if (this.active?.series === 'recetas') return 'Recetas';
    if (this.active?.series === 'tips') return 'Tips de barista';
    return 'Travesías del Sabor';
  }

  get gridTitle(): string {
    if (this.categoria === 'recetas') return 'Recetas';
    if (this.categoria === 'travesias') return 'Todos los episodios';
    return 'Todos los videos';
  }

  get showPlaylist(): boolean {
    return this.categoria !== 'recetas';
  }

  select(v: VideotecaVideo) {
    this.active = v;
    this.playing = true;
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      document.getElementById('vt-player')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  }

  play() {
    this.playing = true;
  }

  embedUrl(v: VideotecaVideo): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1&autoplay=1`
    );
  }
}
