/**
 * Métodos de extracción (/accesorios-para-poner-una-cafeteria/metodo-extraccion/) — contenido tomado
 * verbatim del diseño PDF "Métodos de extracción". Imágenes en /assets/images/accesorios/metodos-extraccion/
 * (extraídas del PDF; hero = foto entregada por el cliente), webp 1x + @2x.
 *
 * TODO(contenido): el PDF no define URLs para marcas, subcategorías, "Comprar" ni "Ver todos"; mientras
 * tanto las marcas/subcategorías son etiquetas no interactivas, "Comprar" y "Ver todos" abren el
 * catálogo de equipos y accesorios y "Asesoría" lleva al formulario de contacto.
 */
import { ACCESORIOS_HUB } from './accesorios.data';
import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';

export const METODOS_SLUG = 'metodo-extraccion';
export const METODOS_PATH = `${ACCESORIOS_HUB}/${METODOS_SLUG}`;
const IMG = `${ASSETS_BASE_URL}/images/accesorios/metodos-extraccion`;

export interface MetImage {
  src: string;
  src2x: string;
  width: number;
  height: number;
}

const img = (name: string, size = 260): MetImage => ({
  src: `${IMG}/${name}.webp`,
  src2x: `${IMG}/${name}@2x.webp`,
  width: size,
  height: size
});

export const MET_HERO = {
  /** Foto del cliente (1672×941) como fondo del hero. */
  bg: `${IMG}/hero-metodos-extraccion.webp`,
  bgMobile: `${IMG}/hero-metodos-extraccion-960.webp`
};

/**
 * Tira "Productos": marcas (texto del diseño). BestWhip se quitó a petición del cliente (sus productos son
 * sifones para crema/soda → Bebidas frías según el PDF de secciones).
 */
export const MET_BRANDS: string[] = ['La fenice', 'Hario', 'Brewista', 'Chemex', 'Toddy', 'AeroPress'];

/** "Explora por subcategoría" (texto del diseño). TODO: sin URL por subcategoría en el PDF. */
export const MET_SUBCATS: string[] = ['Drippers', 'Prensas', 'Chemex', 'Jarra cuello de ganso', 'Filtros', 'Molinos manuales'];

export type MetTone = 'yellow' | 'pink' | 'teal' | 'lime' | 'purple' | 'beige';

export interface MetProduct {
  id: string;
  brand: string;
  title: string;
  desc: string;
  tone: MetTone;
  image: MetImage;
  imageAlt: string;
}

/**
 * Tarjetas de producto, textos verbatim del PDF.
 * TODO(contenido): en el PDF las tarjetas AeroPress, molino y prensa repiten la descripción
 * "Un icono del café filtrado…" y la tarjeta AeroPress repite el título del dripper; se mantienen
 * tal cual hasta recibir los textos reales.
 */
export const MET_PRODUCTS: MetProduct[] = [
  {
    id: 'jarra-servidora',
    brand: 'La fenice',
    title: 'Jarra servidora de vidrio con filtro de acero inoxidable 800ml',
    desc: 'Extracción uniforme para sabores limpios y balanceados.',
    tone: 'yellow',
    image: img('jarra-servidora-filtro-la-fenice'),
    imageAlt: 'Jarra servidora de vidrio La Fenice con filtro de acero inoxidable y funda de madera'
  },
  {
    id: 'dripper-origami',
    brand: 'La fenice',
    title: 'Dripper de cerámica tipo origami 2-4 tazas',
    desc: 'Un icono del café filtrado con sabor y elegancia atemporal.',
    tone: 'pink',
    image: img('dripper-origami-la-fenice'),
    imageAlt: 'Dripper de cerámica rojo tipo origami sobre base de madera'
  },
  {
    id: 'hervidor-cuello-ganso',
    brand: 'Brewista',
    title: 'Hervidor Cuello de Ganso 600 ml',
    desc: 'Control y precisión en cada vertido para tu extracción.',
    tone: 'teal',
    image: img('hervidor-cuello-ganso-brewista'),
    imageAlt: 'Hervidor eléctrico negro de cuello de ganso Brewista'
  },
  {
    id: 'aeropress',
    brand: 'AeroPress',
    title: 'Dripper de cerámica tipo origami 2-4 tazas',
    desc: 'Un icono del café filtrado con sabor y elegancia atemporal.',
    tone: 'lime',
    image: img('aeropress'),
    imageAlt: 'Cafetera AeroPress'
  },
  {
    id: 'molino-manual',
    brand: 'La fenice',
    title: 'Set de molino manual negro mate',
    desc: 'Un icono del café filtrado con sabor y elegancia atemporal.',
    tone: 'purple',
    image: img('molino-manual-negro-la-fenice'),
    imageAlt: 'Molino manual negro mate con perilla de madera'
  },
  {
    id: 'prensa-francesa',
    brand: 'Brewista',
    title: 'Prensa francesa de vidrio color plata 600ml',
    desc: 'Un icono del café filtrado con sabor y elegancia atemporal.',
    tone: 'beige',
    image: img('prensa-francesa-brewista'),
    imageAlt: 'Prensa francesa de vidrio con estructura plateada'
  }
];

/** "Mas buscados": en el PDF son las tres primeras tarjetas. */
export const MET_TOP_IDS = ['jarra-servidora', 'dripper-origami', 'hervidor-cuello-ganso'];

export interface MetCourse {
  kicker: string;
  title: string;
  image: string;
  /** Slug del catálogo de educación (education.data.ts); la ruta se resuelve con coursePublicPath. */
  slug: string;
}

/**
 * "Te puede interesar". El PDF repite tres veces "Curso · Formación De Emprendedores" (marcador de
 * posición); la primera se mantiene y las otras dos son cursos reales afines del catálogo.
 * TODO(contenido): confirmar qué tres cursos deben ir aquí.
 */
export const MET_COURSES: MetCourse[] = [
  {
    kicker: 'Curso',
    title: 'Formación De Emprendedores',
    image: `${IMG}/curso-formacion-emprendedores.webp`,
    slug: 'formacion-de-emprendedores'
  },
  {
    kicker: 'Taller',
    title: 'Métodos De Extracción',
    image: `${ASSETS_BASE_URL}/images/educacion/cursos-photo.png`,
    slug: 'metodos-de-extraccion'
  },
  {
    kicker: 'Taller',
    title: 'Formación Para Un Barista',
    image: `${ASSETS_BASE_URL}/images/educacion/taller-formacion-barista.webp`,
    slug: 'formacion-barista'
  }
];
