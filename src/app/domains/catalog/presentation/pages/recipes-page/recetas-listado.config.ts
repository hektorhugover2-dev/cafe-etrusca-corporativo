import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
/**
 * Configuración del listado /recetas/:
 *  1) RECETA_DEL_MES  → cambia aquí la receta destacada cada mes.
 *  2) RECETA_FILTROS  → etiquetas de filtro por receta (tipo, temperatura, temporada, popular).
 *
 * Las recetas en sí siguen en recetas.data.ts; aquí solo se referencian por slug.
 */

/* ============================== RECETA DEL MES ============================== */

export interface RecetaDelMesConfig {
  /** slug de la receta en recetas.data.ts (el botón "Ver receta" lleva a /recetas/<slug>). */
  slug: string;
  /** Título que se muestra en la tarjeta (si se deja vacío usa el título de la receta). */
  titulo?: string;
  /** Texto corto de la tarjeta (si se deja vacío usa el summary de la receta). */
  descripcion?: string;
  /** Foto de la tarjeta (si se deja vacía usa la imagen de la receta). */
  imagen?: string;
  /** Etiqueta tipo píldora sobre el título. */
  etiqueta: string;
  /**
   * ID de un video de RECETAS_VIDEOS (abajo) para abrirlo en el modal de "Ver en video".
   * Si es null se usa videoUrl; si ambos son null el botón manda a la Videoteca.
   * Para ocultar el botón, pon mostrarBotonVideo: false.
   */
  videoId: string | null;
  /** URL externa de video (YouTube, etc.), se abre en otra pestaña. */
  videoUrl: string | null;
  mostrarBotonVideo: boolean;
}

export const RECETA_DEL_MES: RecetaDelMesConfig = {
  slug: 'mangonada-chillout',
  titulo: 'Chamoyada de Mango',
  descripcion:
    'El balance perfecto entre lo dulce, lo picosito y lo refrescante. Una bebida icónica que siempre sabe a verano.',
  imagen: `${ASSETS_BASE_URL}/images/recetas/receta-del-mes/chamoyada-de-mango.webp`,
  etiqueta: 'Receta destacada',
  /* La playlist no tiene video de la Chamoyada todavía → el botón lleva a /videoteca. */
  videoId: null,
  videoUrl: null,
  mostrarBotonVideo: true
};

/* ========================= RECETARIO: VISTA INICIAL ========================= */

export interface RecetarioDefault {
  /** Valor de `collection` en recetas.data.ts (p. ej. 'calabaza', 'verano-2026'). */
  coleccion: string;
  /** Texto de la etiqueta: "Temporada actual: <label>". */
  label: string;
}

/**
 * Colección que el Recetario muestra al cargar (temporada actual).
 * Pon null para mostrar todas las recetas al cargar.
 * Ejemplos: { coleccion: 'verano-2026', label: 'Verano' } · { coleccion: 'san-valentin-2026', label: 'San Valentín' }
 */
export const RECETARIO_DEFAULT: RecetarioDefault | null = { coleccion: 'calabaza', label: 'Calabaza' };

/* ================================= FILTROS ================================= */

export type RecetaTipo = 'cafe' | 'te' | 'matcha' | 'bubble-tea' | 'cocteleria';
export type RecetaTemperatura = 'frio' | 'caliente';
export type RecetaTemporada = 'primavera' | 'verano' | 'otono' | 'invierno';

export interface RecetaFiltros {
  tipos: RecetaTipo[];
  temperatura: RecetaTemperatura;
  temporadas: RecetaTemporada[];
  popular?: boolean;
}

/** Valores por defecto para recetas nuevas que todavía no tengan etiquetas aquí. */
export const RECETA_FILTROS_DEFAULT: RecetaFiltros = { tipos: [], temperatura: 'frio', temporadas: [] };

export const RECETA_FILTROS: Record<string, RecetaFiltros> = {
  /* Otoño · Calabaza */
  'pumpkin-cold-brew': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['otono'], popular: true },
  'dirty-pumpkin-chai': { tipos: ['cafe', 'te'], temperatura: 'caliente', temporadas: ['otono', 'invierno'] },
  'calabaza-brulee-latte': { tipos: ['cafe'], temperatura: 'caliente', temporadas: ['otono'] },
  'mokalabaza-latte': { tipos: ['cafe'], temperatura: 'caliente', temporadas: ['otono', 'invierno'] },
  'affogato-de-otono': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['otono'] },
  'bubble-pumpkin': { tipos: ['bubble-tea'], temperatura: 'frio', temporadas: ['otono'], popular: true },
  'calabaza-brulee': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['otono'] },
  'calabaza-y-espresso-latte': { tipos: ['cafe'], temperatura: 'caliente', temporadas: ['otono'], popular: true },
  'calabaza-y-matcha-latte': { tipos: ['matcha'], temperatura: 'caliente', temporadas: ['otono'] },
  'dulce-de-calabaza-molecular': { tipos: ['bubble-tea'], temperatura: 'frio', temporadas: ['otono'] },
  /* Otoño 2023 (no calabaza) */
  'red-velvet-bombon': { tipos: [], temperatura: 'caliente', temporadas: ['otono', 'invierno'] },
  'fresandia-frozen': { tipos: [], temperatura: 'frio', temporadas: ['otono', 'verano'] },
  'matcha-azul-frappe-480ml': { tipos: ['matcha'], temperatura: 'frio', temporadas: ['otono', 'verano'] },
  'matcha-azul-frio-480ml': { tipos: ['matcha'], temperatura: 'frio', temporadas: ['otono', 'verano'] },
  'matcha-azul-floral-360ml': { tipos: ['matcha'], temperatura: 'caliente', temporadas: ['otono', 'primavera'] },

  /* ChillOut (receta del mes) */
  'mangonada-chillout': { tipos: ['bubble-tea'], temperatura: 'frio', temporadas: ['primavera', 'verano'], popular: true },

  /* Fiestas Patrias 2026 (septiembre → otoño) */
  'miche-cero': { tipos: ['cocteleria'], temperatura: 'frio', temporadas: ['otono'] },
  'mi-mero-mole': { tipos: ['cafe', 'cocteleria'], temperatura: 'frio', temporadas: ['otono'] },
  'diablito-de-fresa': { tipos: [], temperatura: 'frio', temporadas: ['otono'], popular: true },
  'nogada-clasica': { tipos: ['bubble-tea'], temperatura: 'frio', temporadas: ['otono'] },
  'margarita': { tipos: ['te', 'cocteleria'], temperatura: 'frio', temporadas: ['otono'] },
  'marchanta': { tipos: ['te', 'cocteleria'], temperatura: 'frio', temporadas: ['otono', 'primavera'] },
  'cate-de-mi-corazon': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['otono'] },
  'horchata-mexa': { tipos: [], temperatura: 'frio', temporadas: ['otono'], popular: true },

  /* Verano 2026 */
  'lychee-rose': { tipos: ['cocteleria'], temperatura: 'frio', temporadas: ['verano', 'primavera'] },
  'mojito-dragon-fruit': { tipos: ['te', 'cocteleria'], temperatura: 'frio', temporadas: ['verano'] },
  'dirty-soda': { tipos: [], temperatura: 'frio', temporadas: ['verano'], popular: true },
  'orange-cream-cold-brew': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['verano'] },
  'matcha-colada': { tipos: ['matcha'], temperatura: 'frio', temporadas: ['verano'], popular: true },
  'strawberry-matcha-lemonade': { tipos: ['matcha'], temperatura: 'frio', temporadas: ['verano', 'primavera'] },
  'tropical-cold-brew': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['verano'] },
  'soda-tropical-espumosa': { tipos: [], temperatura: 'frio', temporadas: ['verano', 'primavera'] },
  'sparkling-cherry': { tipos: [], temperatura: 'frio', temporadas: ['verano'] },

  /* San Valentín 2026 (febrero → invierno) */
  'manzana-acaramelada': { tipos: [], temperatura: 'frio', temporadas: ['invierno'] },
  'rosa-pistache-foam': { tipos: [], temperatura: 'frio', temporadas: ['invierno', 'primavera'] },
  'caricia-de-amor': { tipos: ['cocteleria'], temperatura: 'frio', temporadas: ['invierno'] },
  'soda-de-la-pasion': { tipos: ['bubble-tea'], temperatura: 'frio', temporadas: ['invierno', 'primavera'] },
  'negro-dulce-corazon': { tipos: ['te', 'bubble-tea'], temperatura: 'frio', temporadas: ['invierno'] },
  'lemon-cherry': { tipos: [], temperatura: 'frio', temporadas: ['invierno', 'primavera'] },
  'beso-de-fresa': { tipos: ['cocteleria'], temperatura: 'frio', temporadas: ['invierno', 'primavera'] },
  'sandia-on-fire': { tipos: ['bubble-tea'], temperatura: 'frio', temporadas: ['invierno'], popular: true },
  'dulce-cheesecake-frambuesa': { tipos: [], temperatura: 'frio', temporadas: ['invierno'] },
  'orange-fantasy-tonic': { tipos: ['te', 'cocteleria'], temperatura: 'frio', temporadas: ['invierno', 'primavera'] },
  'rojo-pasion-foam': { tipos: [], temperatura: 'frio', temporadas: ['invierno'] },

  /* Invierno 2024 */
  'arroz-con-leche': { tipos: [], temperatura: 'caliente', temporadas: ['invierno'] },
  'noche-de-invierno-latte': { tipos: [], temperatura: 'caliente', temporadas: ['invierno'] },
  'winter-peach': { tipos: ['te'], temperatura: 'frio', temporadas: ['invierno'] },
  'copito-de-chocolate-blanco': { tipos: [], temperatura: 'caliente', temporadas: ['invierno'] },
  'latte-de-noel': { tipos: ['te'], temperatura: 'caliente', temporadas: ['invierno'], popular: true },
  'chai-cream': { tipos: ['te', 'bubble-tea'], temperatura: 'frio', temporadas: ['invierno'] },
  'solsticio-de-lavanda-frio': { tipos: ['matcha'], temperatura: 'frio', temporadas: ['invierno', 'primavera'] },
  'cerveza-navidena': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['invierno'], popular: true },
  'toasted-brulee': { tipos: ['cocteleria'], temperatura: 'frio', temporadas: ['invierno'] },
  'ponche-navideno-calentito': { tipos: ['te', 'cocteleria'], temperatura: 'caliente', temporadas: ['invierno'] },

  /* Navidad 2023 */
  'caramelo-navideno-caliente': { tipos: ['cafe'], temperatura: 'caliente', temporadas: ['invierno'], popular: true },
  'caramelo-navideno-frio': { tipos: ['bubble-tea'], temperatura: 'frio', temporadas: ['invierno'] },
  'arbol-de-noche-buena': { tipos: ['matcha', 'bubble-tea'], temperatura: 'frio', temporadas: ['invierno'] },
  'ponche-de-invierno': { tipos: ['te'], temperatura: 'caliente', temporadas: ['invierno'] },
  'horchata-decembrina': { tipos: ['bubble-tea'], temperatura: 'frio', temporadas: ['invierno'] },
  'pan-de-jengibre-latte': { tipos: ['cafe'], temperatura: 'caliente', temporadas: ['invierno'], popular: true },
  'tiramisu-menta': { tipos: [], temperatura: 'caliente', temporadas: ['invierno'] },

  /* ChillOut */
  'soda-italiana-480ml': { tipos: [], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'espresso-chai-360ml': { tipos: ['cafe', 'te'], temperatura: 'caliente', temporadas: ['otono', 'invierno'] },
  'moka-mazapan-360ml': { tipos: [], temperatura: 'caliente', temporadas: ['otono', 'invierno'] },
  'moras-y-jamaica-smoothie-yogur-480ml': { tipos: [], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'curcuma-y-mandarina-soda-dorada-480ml': { tipos: [], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'carajillo-de-mazapan-300ml': { tipos: ['cafe', 'cocteleria'], temperatura: 'frio', temporadas: ['otono', 'invierno'] },
  'fresa-primaveral-frio': { tipos: [], temperatura: 'frio', temporadas: ['primavera'] },
  'jelly-soda': { tipos: [], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'pina-colada-frappe': { tipos: [], temperatura: 'frio', temporadas: ['verano'] },
  'blueberry-cheesecake': { tipos: [], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'frappe-mexicano': { tipos: [], temperatura: 'frio', temporadas: ['verano'] },
  'frappe-de-moras-y-cereza': { tipos: ['te', 'bubble-tea'], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'purple-frozen': { tipos: [], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'super-maracuya': { tipos: [], temperatura: 'frio', temporadas: ['verano'] },
  'chai-caramel': { tipos: ['te'], temperatura: 'caliente', temporadas: ['otono', 'invierno'] },
  'cappuccino-sin-culpa': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'horchata-coco-fria': { tipos: [], temperatura: 'frio', temporadas: ['verano'] },
  'te-helado-fresco': { tipos: ['te'], temperatura: 'frio', temporadas: ['primavera', 'verano'] },

  /* Otras */
  'smoothie-pina-durazno': { tipos: [], temperatura: 'frio', temporadas: ['primavera', 'verano'] },
  'margarita-mango': { tipos: ['cocteleria'], temperatura: 'frio', temporadas: ['verano'] },
  'tiramisu-latte': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['otono'] },
  'iced-coffee-coconut': { tipos: ['cafe'], temperatura: 'frio', temporadas: ['verano'] }
};

export function filtrosDeReceta(slug: string): RecetaFiltros {
  return RECETA_FILTROS[slug] ?? RECETA_FILTROS_DEFAULT;
}

/* ============================== APRENDE VIENDO ============================== */

/** Playlist "Talleres y Cursos" de Café Etrusca en YouTube. */
export const RECETAS_PLAYLIST_URL =
  'https://www.youtube.com/playlist?list=PLLBzEtCvegCzcM5nC__dIJgfn8tar0ID5';

export interface RecetaVideo {
  /** ID de YouTube (lo que va después de watch?v=). */
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
}

/** Lista completa de la playlist (para cambiar los videos destacados solo cambia APRENDE_VIENDO_IDS). */
export const RECETAS_VIDEOS: RecetaVideo[] = [
  { id: '5qQtwbCftks', titulo: 'Rosa Mini Mochis', descripcion: 'Bebida de 480 ml, dulce, cremosa y con mini mochis.', duracion: '1:51' },
  { id: 'llgVFLgysEk', titulo: 'Soda tea de Piña y Osmanthus', descripcion: 'Refrescante, floral y burbujeante.', duracion: '1:26' },
  { id: '515wfcBZEFw', titulo: 'Matcha Brûlée', descripcion: 'Matcha cremoso con un toque caramelizado.', duracion: '1:17' },
  { id: 'EnNFV4UDyec', titulo: 'Cursos y Talleres', descripcion: 'Conoce los cursos y talleres de Café Etrusca.', duracion: '1:04' },
  { id: 'LM6rSTbZ_GA', titulo: 'Taller Formación para un Barista', descripcion: 'Las bases para crecer detrás de la barra.', duracion: '0:49' },
  { id: 'EFrRIQuUbJM', titulo: 'Curso de Bubble Tea & Iced Coffee', descripcion: 'Bebidas frías y bubble tea para tu menú.', duracion: '0:53' },
  { id: '0oBmKnkBTtI', titulo: 'Taller de Catación', descripcion: 'De la semilla a lo sensorial.', duracion: '0:44' }
];

/** Los 3 videos que se muestran en "Aprende viendo" (en este orden). */
export const APRENDE_VIENDO_IDS: string[] = ['5qQtwbCftks', 'llgVFLgysEk', '515wfcBZEFw'];
