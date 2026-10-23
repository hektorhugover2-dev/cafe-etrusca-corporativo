import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';
/**
 * Accesorios hub (/accesorios-para-poner-una-cafeteria/) — contenido tomado verbatim del diseño PDF
 * "Accesorios" (Figma). Imágenes en /assets/images/accesorios/hub/ (webp 1x + @2x).
 *
 * TODO(contenido): el PDF no define destino para las etiquetas de subcategoría (Jarras, Tampers…)
 * ni para cada marca de la tira; se muestran como etiquetas no interactivas hasta tener URLs reales.
 */

export const ACCESORIOS_HUB = '/accesorios-para-poner-una-cafeteria';
const IMG = `${ASSETS_BASE_URL}/images/accesorios/hub`;

export interface AccImage {
  src: string;
  src2x: string;
  width: number;
  height: number;
}

export interface AccCategory {
  slug: string;
  /** Título en dos líneas, tal como en el diseño. */
  titleLines: [string, string];
  /** Descripción en dos líneas, tal como en el diseño. */
  descLines: [string, string];
  tags: string[];
  /** Clase de color / posición de la tarjeta. */
  tone: 'yellow' | 'cyan' | 'orange' | 'purple' | 'pink' | 'lime';
  image: AccImage;
  imageAlt: string;
}

const img = (name: string, width: number, height: number): AccImage => ({
  src: `${IMG}/${name}.webp`,
  src2x: `${IMG}/${name}@2x.webp`,
  width,
  height
});

export const ACC_HERO_IMAGES = {
  bg: `${IMG}/hero-fondo-ola.webp`,
  blob: `${IMG}/hero-blob.webp`,
  star: `${IMG}/hero-estrella.webp`,
  grinder: img('hero-molino-hario', 444, 570),
  pitcher: img('hero-jarra-lechera-roja', 246, 246)
};

export const ACC_CATEGORIES: AccCategory[] = [
  {
    slug: 'barista-espresso',
    titleLines: ['Barista y', 'Espresso'],
    descLines: ['Herramientas para un', 'espresso perfecto.'],
    tags: ['Jarras', 'Tampers', 'Bagaceras'],
    tone: 'yellow',
    image: img('cat-barista-espresso-tamper', 249, 249),
    imageAlt: 'Tamper para espresso con mango de madera'
  },
  {
    slug: 'metodo-extraccion',
    titleLines: ['Método de', 'extracción'],
    descLines: ['Elementos para', 'métodos manuales.'],
    tags: ['Drippers', 'Prensas', 'Chemex'],
    tone: 'cyan',
    image: img('cat-metodo-extraccion-dripper', 234, 234),
    imageAlt: 'Dripper rojo tipo origami sobre base de madera'
  },
  {
    slug: 'te-servicio',
    titleLines: ['Té y', 'servicio'],
    descLines: ['Accesorios para', 'disfrutar cada infusión.'],
    tags: ['Infusores', 'Teteras', 'Vasos'],
    tone: 'orange',
    image: img('cat-te-servicio-tetera', 208, 193),
    imageAlt: 'Tetera eléctrica de cuello de ganso Brewista'
  },
  {
    slug: 'bebidas-frias',
    titleLines: ['Bebidas frías y', 'Complementos'],
    descLines: ['Soluciones para bebidas', 'frías y creativas.'],
    tags: ['Bombas', 'Dosificadores', 'Sifones'],
    tone: 'purple',
    image: img('cat-bebidas-frias-sifon', 159, 265),
    imageAlt: 'Sifón de acero inoxidable para crema batida con cápsula'
  },
  {
    slug: 'catacion-medicion',
    titleLines: ['Catación y', 'medición'],
    descLines: ['Precisión para', 'mejores resultados.'],
    tags: ['Básculas', 'Cucharas', 'Tazones'],
    tone: 'pink',
    image: img('cat-catacion-bascula', 199, 157),
    imageAlt: 'Báscula digital negra para café'
  },
  {
    slug: 'limpieza',
    titleLines: ['Limpieza y', 'mantenimiento'],
    descLines: ['Cuida tu equipo y alarga', 'su vida útil.'],
    tags: ['Cafiza', 'Rinza', 'Cepillos'],
    tone: 'lime',
    image: img('cat-limpieza-cafiza', 243, 320),
    imageAlt: 'Bote de limpiador Urnex Cafiza para máquinas de espresso'
  }
];

export interface AccBrandLogo {
  id: string;
  name: string;
  image: AccImage;
}

/** Logos grandes de la sección "Marcas" (orden visual del diseño: fila 1 y fila 2). */
export const ACC_BRAND_LOGOS: AccBrandLogo[] = [
  { id: 'la-fenice', name: 'La Fenice', image: img('marca-la-fenice', 224, 141) },
  { id: 'chemex', name: 'Chemex', image: img('marca-chemex', 331, 96) },
  { id: 'toddy', name: 'Toddy', image: img('marca-toddy', 289, 99) },
  { id: 'brewista', name: 'Brewista', image: img('marca-brewista', 388, 109) },
  { id: 'urnex', name: 'Urnex', image: img('marca-urnex', 289, 150) },
  { id: 'hario', name: 'Hario', image: img('marca-hario', 345, 184) }
];

/** Tira de marcas bajo los logos (texto del diseño). TODO: sin URL por marca en el PDF. */
export const ACC_BRAND_STRIP: string[] = [
  'La fenice',
  'Hario',
  'Brewista',
  'Chemex',
  'Toddy',
  'AeroPress',
  'BestWhip',
  'Pietro',
  'Urnex'
];

/** "Ver todos las marcas": se enlaza a la sección existente Nosotros → Nuestras marcas. */
export const ACC_ALL_BRANDS_LINK = { path: '/nosotros', fragment: 'nuestras-marcas' };

export const ACC_WHATSAPP = 'https://wa.me/525541668777';

export interface AccSeo {
  title: string;
  description: string;
  keywords: string;
}

export const ACC_HUB_SEO: AccSeo = {
  title: 'Accesorios para poner una cafetería - Encuentra todo lo que necesitas',
  description:
    'Accesorios para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
  keywords: 'Accesorios para poner una cafetería, equipo para barista, jarras, molinos, Café Etrusca'
};

/**
 * SEO propio de cada subcategoría (/accesorios-para-poner-una-cafeteria/<slug>/).
 * Mismo texto que tenía product-hub-page (sin claims nuevos).
 */
export const ACC_SUBCAT_SEO: Record<string, AccSeo> = {
  'barista-espresso': {
    title: 'Accesorios de barista y espresso | Café Etrusca',
    description:
      'Accesorios de barista y espresso para tu cafetería: herramientas para preparar espresso en barra. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios de barista, accesorios para espresso, accesorios para cafetería, Café Etrusca'
  },
  'metodo-extraccion': {
    title: 'Accesorios para métodos de extracción | Café Etrusca',
    description:
      'Accesorios y elementos para métodos de extracción manual en tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para métodos de extracción, métodos manuales, accesorios para cafetería, Café Etrusca'
  },
  'te-servicio': {
    title: 'Accesorios para té y servicio | Café Etrusca',
    description:
      'Accesorios para té y servicio en tu cafetería, para disfrutar cada infusión. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para té, accesorios de servicio, accesorios para cafetería, Café Etrusca'
  },
  'bebidas-frias': {
    title: 'Accesorios para bebidas frías y complementos | Café Etrusca',
    description:
      'Accesorios y complementos para bebidas frías y creativas en tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para bebidas frías, complementos para cafetería, accesorios para cafetería, Café Etrusca'
  },
  'catacion-medicion': {
    title: 'Accesorios de catación y medición | Café Etrusca',
    description:
      'Accesorios de catación y medición para tu cafetería, con precisión en cada preparación. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios de catación, medición de café, accesorios para cafetería, Café Etrusca'
  },
  limpieza: {
    title: 'Accesorios de limpieza y mantenimiento | Café Etrusca',
    description:
      'Accesorios de limpieza y mantenimiento para cuidar el equipo de tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'limpieza de máquinas de café, mantenimiento, accesorios para cafetería, Café Etrusca'
  }
};
