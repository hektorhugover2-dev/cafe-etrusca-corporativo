import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';
/**
 * Datos de la página /insumos-para-cafeterias/bases-en-polvo/chillout/.
 * Clonada de la página Torani (torani.data.ts); mismo patrón de brief SEO.
 *
 * Fuentes (no inventar datos):
 * - Líneas (descripción, sabores, presentación, rendimiento): copiadas de `basesLines`
 *   en insumos-category-page.component.ts (ChillOut y ChillOut Just Fruit). Mantener sincronizado.
 * - Productos: catálogo real de https://cafeetrusca.com/api/product (26-sep-2026). Nombre, código e
 *   imagen (thumbnail oficial) tal cual; URL de ficha en tienda.cafeetrusca.com verificada con HTTP 200.
 *   Sin precios ni existencias: esos datos viven en la tienda.
 * - Sin azúcar: productos reales con "SIN AZÚCAR" en el nombre (base neutra, taro, cappuccino).
 *
 * TODO(Héctor): sin imagen en catálogo para Just Fruit Piña colada (IBP-234) ni Cappuccino sin azúcar
 * (IBP-240/241); agregarlos cuando tengan foto.
 */

export interface ChilloutProduct {
  code: string;
  flavor: string;
  line: string;
  presentation: string;
  /** Nombre exacto de la ficha de tienda */
  name: string;
  url: string;
  image: string;
}

export interface ChilloutLine {
  name: string;
  sub: string;
  description: string;
  sabores: string;
  presentacion: string;
  rendimiento: string;
  image: string;
  blob: string;
  tone: 'yellow' | 'cyan' | 'lime' | 'coral';
  anchor: string;
  icons: { sabor: string; pres: string; rend: string };
}

const JAR = `${ASSETS_BASE_URL}/images/insumos/jarabes`;
const CHL = `${ASSETS_BASE_URL}/images/insumos/chillout`;

export const CHILLOUT_STORE_URL = 'https://tienda.cafeetrusca.com/productos?search=CHILLOUT%20BASE%20EN%20POLVO';

export const CHILLOUT_LINES: ChilloutLine[] = [
  {
    name: 'ChillOut', sub: 'MIX',
    description: 'Línea de polvos saborizados con gran variedad de opciones para crear tus propias recetas especiales.',
    sabores: '31 sabores', presentacion: '2 kg y 700 g', rendimiento: 'Según preparación',
    image: CHL + '/linea-chillout-mix.webp', blob: JAR + '/blob-coral.png', tone: 'coral', anchor: 'sabores',
    icons: { sabor: JAR + '/icon-sabor-coral.png', pres: JAR + '/icon-pres-coral.png', rend: JAR + '/icon-rend-coral.png' }
  },
  {
    name: 'ChillOut', sub: 'JUST FRUIT',
    description: 'Polvos de fruta deshidratada para bebidas naturales, refrescantes y llenas de sabor frutal intenso.',
    sabores: '3 sabores', presentacion: '2 kg y 700 g', rendimiento: 'Según preparación',
    image: CHL + '/linea-chillout-just-fruit.webp', blob: JAR + '/blob-yellow.png', tone: 'yellow', anchor: 'just-fruit',
    icons: { sabor: JAR + '/icon-sabor-yellow.png', pres: JAR + '/icon-pres-yellow.png', rend: JAR + '/icon-rend-yellow.png' }
  }
];

/** Selección de sabores ChillOut Mix (fichas reales de tienda; sin ranking de ventas). */
export const CHILLOUT_MIX: ChilloutProduct[] = [
  { code: 'IBP-195', flavor: 'Taro', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR TARO BOLSA 2 kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-195/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-TARO-BOLSA-2-kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-195.webp' },
  { code: 'IBP-197', flavor: 'Té matcha', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR TE MATCHA BOLSA 2 kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-197/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-TE-MATCHA-BOLSA-2-kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-197.webp' },
  { code: 'IBP-203', flavor: 'Chocolate', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR CHOCOLATE BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-203/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-CHOCOLATE-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-203.webp' },
  { code: 'IBP-198', flavor: 'Chocolate blanco', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR CHOCOLATE BLANCO BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-198/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-CHOCOLATE-BLANCO-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-198.webp' },
  { code: 'IBP-199', flavor: 'Caramelo', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR CARAMELO BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-199/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-CARAMELO-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-199.webp' },
  { code: 'IBP-200', flavor: 'Vainilla francesa', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR VAINILLA FRANCESA BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-200/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-VAINILLA-FRANCESA-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-200.webp' },
  { code: 'IBP-201', flavor: 'Moka', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR MOKA BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-201/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-MOKA-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-201.webp' },
  { code: 'IBP-204', flavor: 'Cookies & cream', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR COOKIES & CREAM BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-204/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-COOKIES-&-CREAM-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-204.webp' },
  { code: 'IBP-211', flavor: 'Chai té negro', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR CHAI TÉ NEGRO BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-211/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-CHAI-TÉ-NEGRO-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-211.webp' },
  { code: 'IBP-217', flavor: 'Horchata', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR HORCHATA BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-217/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-HORCHATA-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-217.webp' },
  { code: 'IBP-248', flavor: 'Pistache', line: 'Mix', presentation: 'Bote 700 g', name: "CHILLOUT MIX BASE EN POLVO SABOR PISTACHE BOTE 700g", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-248/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-PISTACHE-BOTE-700g', image: 'https://cafeetrusca.com/img/thumbnail/IBP-248.webp' },
  { code: 'IBP-239', flavor: 'Dulce de calabaza', line: 'Temporada', presentation: 'Bolsa 2 kg', name: "CHILLOUT BASE EN POLVO SABOR DULCE DE CALABAZA BOLSA 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-239/CHILLOUT-BASE-EN-POLVO-SABOR-DULCE-DE-CALABAZA-BOLSA-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-239.webp' }
];

export const CHILLOUT_SIN_AZUCAR: ChilloutProduct[] = [
  { code: 'IBP-214', flavor: 'Base neutra sin azúcar', line: 'Mix', presentation: 'Bolsa 1.6 kg', name: "CHILLOUT MIX BASE EN POLVO BASE NEUTRA SIN AZÚCAR BOLSA 1.6 kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-214/CHILLOUT-MIX-BASE-EN-POLVO-BASE-NEUTRA-SIN-AZÚCAR-BOLSA-1-6-kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-214.webp' },
  { code: 'IBP-220', flavor: 'Taro sin azúcar', line: 'Mix', presentation: 'Bote 2 kg', name: "CHILLOUT MIX BASE EN POLVO SABOR TARO SIN AZUCAR BOTE 2kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-220/CHILLOUT-MIX-BASE-EN-POLVO-SABOR-TARO-SIN-AZUCAR-BOTE-2kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-220.webp' },
  { code: 'IBP-194', flavor: 'Base neutra', line: 'Mix', presentation: 'Bolsa 2 kg', name: "CHILLOUT MIX BASE EN POLVO NEUTRA BOLSA 2 kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-194/CHILLOUT-MIX-BASE-EN-POLVO-NEUTRA-BOLSA-2-kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-194.webp' }
];

export const CHILLOUT_JUST_FRUIT: ChilloutProduct[] = [
  { code: 'IBP-219', flavor: 'Moka blanco', line: 'Just Fruit', presentation: 'Bolsa 2 kg', name: "CHILLOUT JUST FRUIT BASE EN POLVO SABOR MOKA BLANCO BOLSA 2 kg", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-219/CHILLOUT-JUST-FRUIT-BASE-EN-POLVO-SABOR-MOKA-BLANCO-BOLSA-2-kg', image: 'https://cafeetrusca.com/img/thumbnail/IBP-219.webp' },
  { code: 'IBP-040', flavor: 'Choco-fresa', line: 'Just Fruit', presentation: 'Bote 800 g', name: "CHILLOUT JUST FRUIT BASE EN POLVO SABOR CHOCO-FRESA BOTE 800 g", url: 'https://tienda.cafeetrusca.com/producto/detalle/IBP-040/CHILLOUT-JUST-FRUIT-BASE-EN-POLVO-SABOR-CHOCO-FRESA-BOTE-800-g', image: 'https://cafeetrusca.com/img/thumbnail/IBP-040.webp' }
];

export interface ChilloutFaq {
  q: string;
  a: string;
}

// TODO(Héctor): confirmar rendimiento por bolsa/bote (dosis por bebida), política de mayoreo y cobertura
// de envíos antes de publicar respuestas más específicas (hoy remiten a asesor/tienda, sin promesas).
export const CHILLOUT_FAQ: ChilloutFaq[] = [
  {
    q: '¿Qué sabores de base en polvo ChillOut venden?',
    a: 'Manejamos ChillOut Mix, una línea de polvos saborizados con 31 sabores, y ChillOut Just Fruit, con polvos de fruta deshidratada. Entre los sabores están taro, té matcha, chocolate, caramelo, vainilla francesa, horchata y chai; revisa la disponibilidad de cada sabor en la tienda en línea.'
  },
  {
    q: '¿Tienen bases ChillOut sin azúcar?',
    a: 'Sí. En la tienda encontrarás ChillOut Mix base neutra sin azúcar, taro sin azúcar y cappuccino sin azúcar. Confirma presentaciones y disponibilidad en la ficha de cada producto.'
  },
  {
    q: '¿En qué presentaciones vienen las bases ChillOut?',
    a: 'ChillOut Mix y ChillOut Just Fruit se manejan en presentaciones de 2 kg y 700 g; algunos sabores también están en otras presentaciones, como la base neutra sin azúcar de 1.6 kg.'
  },
  {
    q: '¿Cuánto rinde una bolsa de base en polvo ChillOut?',
    a: 'El rendimiento depende de la preparación y de la dosis que uses en cada receta. Un asesor de Café Etrusca puede ayudarte a calcularlo para tu menú.'
  },
  {
    q: '¿Venden ChillOut al mayoreo y hacen envíos a todo México?',
    a: 'Para compras por volumen y envíos, habla con un asesor de ventas: te confirmamos disponibilidad, condiciones y cobertura de entrega para tu negocio. También puedes comprar en la tienda en línea de Café Etrusca.'
  },
  {
    q: '¿Dónde compro ChillOut en CDMX o en sucursal?',
    a: 'Puedes comprar en la tienda en línea o visitar una sucursal Café Etrusca; en la página de Contacto encuentras las sucursales de Ciudad de México y del resto del país. Te recomendamos confirmar la disponibilidad del sabor antes de tu visita.'
  }
];
