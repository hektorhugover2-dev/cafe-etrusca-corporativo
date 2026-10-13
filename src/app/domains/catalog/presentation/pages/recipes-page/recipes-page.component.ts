import { Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { Recipe, publishedRecipes, recipeBySlug } from './recetas.data';
import {
  APRENDE_VIENDO_IDS,
  RECETAS_VIDEOS,
  RECETARIO_DEFAULT,
  RECETA_DEL_MES,
  RecetaVideo,
  RecetaTemporada,
  RecetaTipo,
  filtrosDeReceta
} from './recetas-listado.config';

type Pestana = 'todas' | 'populares' | 'frio' | 'caliente';
/** Chips redondos: tipos de bebida + atajos de temperatura (Frías / Calientes). */
type ChipId = RecetaTipo | 'frias' | 'calientes';

interface Chip {
  id: ChipId;
  label: string;
  tone: 'yellow' | 'gold' | 'coral' | 'lime' | 'cyan' | 'peach' | 'lilac';
  icon: 'cup' | 'tea' | 'bowl' | 'iced' | 'hot' | 'boba' | 'cocktail';
}

interface ChipTemporada {
  id: RecetaTemporada;
  label: string;
  tone: 'yellow' | 'lime' | 'peach' | 'cyan';
  icon: 'flower' | 'sun' | 'leaf' | 'snow';
}

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [RouterLink, ScrollWaveComponent],
  templateUrl: './recipes-page.component.html',
  /* Hero, H2 y línea: mismos estilos de Jarabes (insumos-theme + jarabes-theme), como Torani/Máquinas. */
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', './recipes-page.component.scss']
})
export class RecipesPageComponent implements OnInit {
  private seo = inject(SeoService);
  private sanitizer = inject(DomSanitizer);
  recipes: Recipe[] = publishedRecipes();

  /* ---------- Receta del mes (se configura en recetas-listado.config.ts) ---------- */
  readonly delMes = RECETA_DEL_MES;
  readonly recetaDelMes: Recipe | null = recipeBySlug(RECETA_DEL_MES.slug);
  readonly delMesTitulo =
    RECETA_DEL_MES.titulo || (this.recetaDelMes ? this.displayTitle(this.recetaDelMes) : '');
  readonly delMesTexto = RECETA_DEL_MES.descripcion || this.recetaDelMes?.summary || '';
  readonly delMesImagen = RECETA_DEL_MES.imagen || this.recetaDelMes?.image || '';

  /* ---------- Aprende viendo (videos en recetas-listado.config.ts) ---------- */
  readonly videos: RecetaVideo[] = APRENDE_VIENDO_IDS.map((id) => RECETAS_VIDEOS.find((v) => v.id === id)).filter(
    (v): v is RecetaVideo => !!v
  );
  /** Video abierto en el modal (null = cerrado). Solo cambia con un clic, así que es seguro en SSR. */
  readonly videoActivo = signal<RecetaVideo | null>(null);
  readonly videoEmbed = computed<SafeResourceUrl | null>(() => {
    const v = this.videoActivo();
    return v
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '?autoplay=1&rel=0'
        )
      : null;
  });

  thumb(v: RecetaVideo): string {
    return 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg';
  }

  abrirVideo(v: RecetaVideo) {
    this.videoActivo.set(v);
  }

  cerrarVideo() {
    this.videoActivo.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.videoActivo()) this.cerrarVideo();
  }

  /** "Ver en video" de la receta del mes: video propio → video de la playlist → Videoteca. */
  readonly delMesVideo: RecetaVideo | null = RECETA_DEL_MES.videoId
    ? RECETAS_VIDEOS.find((v) => v.id === RECETA_DEL_MES.videoId) ?? null
    : null;

  /* ---------- Filtros del recetario ---------- */
  readonly pestanas: { id: Pestana; label: string }[] = [
    { id: 'todas', label: 'Todas' },
    { id: 'populares', label: 'Populares' },
    { id: 'frio', label: 'Fríos' },
    { id: 'caliente', label: 'Calientes' }
  ];

  readonly chips: Chip[] = [
    { id: 'cafe', label: 'Café', tone: 'yellow', icon: 'cup' },
    { id: 'te', label: 'Té', tone: 'coral', icon: 'tea' },
    { id: 'matcha', label: 'Matcha', tone: 'lime', icon: 'bowl' },
    { id: 'frias', label: 'Frías', tone: 'cyan', icon: 'iced' },
    { id: 'calientes', label: 'Calientes', tone: 'coral', icon: 'hot' },
    { id: 'bubble-tea', label: 'Bubble Tea', tone: 'gold', icon: 'boba' },
    { id: 'cocteleria', label: 'Coctelería', tone: 'lilac', icon: 'cocktail' }
  ];

  readonly temporadas: ChipTemporada[] = [
    { id: 'primavera', label: 'Primavera', tone: 'yellow', icon: 'flower' },
    { id: 'verano', label: 'Verano', tone: 'lime', icon: 'sun' },
    { id: 'otono', label: 'Otoño', tone: 'peach', icon: 'leaf' },
    { id: 'invierno', label: 'Invierno', tone: 'cyan', icon: 'snow' }
  ];

  /** Temporada actual que se aplica al cargar (también en SSR). Se quita en cuanto el usuario usa cualquier filtro. */
  readonly temporadaActual = signal(RECETARIO_DEFAULT);
  readonly pestana = signal<Pestana>('todas');
  readonly chip = signal<ChipId | null>(null);
  readonly temporada = signal<RecetaTemporada | null>(null);
  /** Último grupo de filtros que tocó el usuario (decide el fondo si hay tipo y temporada a la vez). */
  private readonly ultimoFiltro = signal<'tipo' | 'temporada' | null>(null);

  /**
   * Fondo temático de las tarjetas según el filtro activo (tiene prioridad sobre el patrón por colección `origin-*`).
   * Temporada → patrón (fondo-temporada-*); tipo de bebida → foto de cafetería desenfocada (fondo-tipo-*).
   * Sin filtro (o con la temporada actual por defecto / Populares) → '' y se queda el patrón de cada receta.
   */
  readonly fondoFiltro = computed(() => {
    const chip = this.chip();
    const temporada = this.temporada();
    const pestana = this.pestana();
    if (temporada && (this.ultimoFiltro() === 'temporada' || !chip)) return 'fondo-temporada-' + temporada;
    if (chip) return 'fondo-tipo-' + chip;
    if (pestana === 'frio') return 'fondo-tipo-frias';
    if (pestana === 'caliente') return 'fondo-tipo-calientes';
    return '';
  });

  readonly hayFiltros = computed(
    () =>
      this.temporadaActual() !== null ||
      this.pestana() !== 'todas' ||
      this.chip() !== null ||
      this.temporada() !== null
  );

  readonly recetasFiltradas = computed(() => {
    const pestana = this.pestana();
    const chip = this.chip();
    const temporada = this.temporada();
    const actual = this.temporadaActual();
    return this.recipes.filter((r) => {
      if (actual && r.collection !== actual.coleccion) return false;
      const f = filtrosDeReceta(r.slug);
      if (pestana === 'populares' && !f.popular) return false;
      if ((pestana === 'frio' || pestana === 'caliente') && f.temperatura !== pestana) return false;
      if (chip === 'frias' && f.temperatura !== 'frio') return false;
      if (chip === 'calientes' && f.temperatura !== 'caliente') return false;
      if (chip && chip !== 'frias' && chip !== 'calientes' && !f.tipos.includes(chip)) return false;
      if (temporada && !f.temporadas.includes(temporada)) return false;
      return true;
    });
  });

  /* Cualquier interacción con los filtros quita la temporada actual por defecto. */
  setPestana(id: Pestana) {
    this.temporadaActual.set(null);
    this.pestana.set(id);
  }

  toggleChip(id: ChipId) {
    this.temporadaActual.set(null);
    this.chip.update((actual) => (actual === id ? null : id));
    this.ultimoFiltro.set('tipo');
  }

  toggleTemporada(id: RecetaTemporada) {
    this.temporadaActual.set(null);
    this.temporada.update((actual) => (actual === id ? null : id));
    this.ultimoFiltro.set('temporada');
  }

  quitarTemporadaActual() {
    this.temporadaActual.set(null);
  }

  limpiarFiltros() {
    this.temporadaActual.set(null);
    this.pestana.set('todas');
    this.chip.set(null);
    this.temporada.set(null);
    this.ultimoFiltro.set(null);
  }

  ngOnInit() {
    const brand = 'Caf\u00e9 Etrusca';
    this.seo.set({
      title: 'Recetas para cafeter\u00eda | Fiestas Patrias, Verano y San Valent\u00edn 2026 | ' + brand,
      description:
        'Recetario ChillOut, Calabaza, Fiestas Patrias, Verano y San Valentín 2026: mangonada, micheladas, cold brew, sodas y m\u00e1s bebidas de barra.',
      keywords:
        'recetas cafeter\u00eda, Fiestas Patrias, Verano 2026, San Valent\u00edn 2026, ChillOut, mangonada, cold brew, Caf\u00e9 Etrusca, recetas barista',
      image: '/assets/images/recetas/mangonada-card.webp',
      ogType: 'website',
      jsonLd: ({ origin, url }) => {
        const items = this.recipes.map((r, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: origin + '/recetas/' + r.slug + '/',
          name: [r.title, r.titleAccent].filter(Boolean).join(' ')
        }));
        return [
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': url + '#recipes',
            name: 'Recetas para cafeter\u00eda | ' + brand,
            description:
              'Recetas de bebidas para barra y cafeter\u00eda: ChillOut, temporada y cl\u00e1sicos.',
            url,
            isPartOf: { '@id': origin + '/#website' },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: items,
              numberOfItems: items.length
            }
          }
        ];
      }
    });
  }

  displayTitle(r: Recipe): string {
    return [r.title, r.titleAccent].filter(Boolean).join(' ');
  }
}
