import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';
/**
 * Datos de la página /insumos-para-cafeterias/bases-en-polvo/mocafe/.
 * Brief: /workspace/etrusca/briefs/2026-10-30-brief-mocafe.md (agente SEO, 30-oct-2026). Modelo: David Rio / ChillOut / Torani.
 *
 * - 25 claves (todas línea MOCAFE en https://cafeetrusca.com/api/product?type=1&q=mocafe, 30-oct-2026).
 * - SIN precios, ofertas, descuentos ni stock (regla de Héctor). No leer precioofertac_impuestos/descuento.
 * - Dosis solo en gramos: 50 g de polvo por bebida de 480 ml. Nada de scoops.
 * - Rendimiento (ficha del preciador interno): bolsas 1.36 kg = 27 bebidas de 480 ml; IBP-147 caja 11.33 kg = aprox. 226.
 * - Fotos: R2 corporativo/assets/images/insumos/mocafe/IBP-XXX.webp (subidas 30-oct-2026, sin sobrescribir).
 *   Para reemplazar una foto basta con cambiar SU ruta en MOCAFE_PHOTOS (una sola ruta por producto).
 *   IBP-144 e IBP-147 usan foto oficial iBev (pueden reemplazarse). IBP-133 (chai vainilla): la foto del zip es idéntica a IBP-132.
 */

export interface MocafeProduct {
  code: string;
  /** Nombre en Etrusca */
  name: string;
  /** Nombre oficial (ibevconcepts.com) */
  official: string;
  description: string;
  presentation: string;
  /** Nombre exacto de la API (para la URL de la ficha en tienda) */
  apiName: string;
  /** Línea vegano / alérgenos (ficha interna / etiqueta MX) */
  allergens: string;
  /** Texto de rendimiento (solo con fuente) */
  yield: string;
  isNew?: boolean;
}

export interface MocafeLine {
  anchor: string;
  name: string;
  sub: string;
  description: string;
  /** Clave representativa para la foto de la tarjeta */
  cover: string;
  tone: 'yellow' | 'cyan' | 'lime' | 'coral';
  products: MocafeProduct[];
}

const MC_IMG = 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/mocafe';
const JAR = `${ASSETS_BASE_URL}/images/insumos/jarabes`;

/** Una ruta por producto: cambiar aquí para reemplazar una foto. */
export const MOCAFE_PHOTOS: Record<string, string> = {
  'IBP-123': `${MC_IMG}/IBP-123.webp`,
  'IBP-124': `${MC_IMG}/IBP-124.webp`,
  'IBP-125': `${MC_IMG}/IBP-125.webp`,
  'IBP-126': `${MC_IMG}/IBP-126.webp`,
  'IBP-127': `${MC_IMG}/IBP-127.webp`,
  'IBP-128': `${MC_IMG}/IBP-128.webp`,
  'IBP-129': `${MC_IMG}/IBP-129.webp`,
  'IBP-130': `${MC_IMG}/IBP-130.webp`,
  'IBP-131': `${MC_IMG}/IBP-131.webp`,
  'IBP-132': `${MC_IMG}/IBP-132.webp`,
  'IBP-133': `${MC_IMG}/IBP-133.webp`,
  'IBP-134': `${MC_IMG}/IBP-134.webp`,
  'IBP-135': `${MC_IMG}/IBP-135.webp`,
  'IBP-136': `${MC_IMG}/IBP-136.webp`,
  'IBP-137': `${MC_IMG}/IBP-137.webp`,
  'IBP-138': `${MC_IMG}/IBP-138.webp`,
  'IBP-139': `${MC_IMG}/IBP-139.webp`,
  'IBP-140': `${MC_IMG}/IBP-140.webp`,
  'IBP-141': `${MC_IMG}/IBP-141.webp`,
  'IBP-142': `${MC_IMG}/IBP-142.webp`,
  'IBP-143': `${MC_IMG}/IBP-143.webp`,
  'IBP-144': `${MC_IMG}/IBP-144.webp`, // provisional: foto oficial iBev (bolsa ZenFreeze genérica)
  'IBP-145': `${MC_IMG}/IBP-145.webp`,
  'IBP-147': `${MC_IMG}/IBP-147.webp`, // provisional: foto oficial iBev de la caja 25 lb
  'IBP-250': `${MC_IMG}/IBP-250.webp`
};

export const MOCAFE_STORE_URL = 'https://tienda.cafeetrusca.com/productos?search=MOCAFE';

const BAG = 'Bolsa 1.36 kg';
const Y27 = 'Rinde 27 bebidas de 480 ml (50 g por bebida)';
const DAIRY = 'Vegetariano · no vegano · contiene lácteos';

export const MOCAFE_LINES: MocafeLine[] = [
  {
    anchor: 'frappes', name: 'Mocafe', sub: 'FRAPPÉS DE CAFÉ Y MOKA', cover: 'IBP-123', tone: 'coral',
    description: 'Frappés y lattes con café: moka, caramelo, java chip, cookies & cream, vainilla y el nuevo chocolate pistache Dubai.',
    products: [
      { code: 'IBP-250', isNew: true, name: 'Chocolate pistache Dubai', official: 'Dubai Chocolate Pistachio Frappe', description: 'Pistache con chispas de chocolate incluidas; con espresso se vuelve un “Dubai mocha”.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR CHOCOLATE PISTACHE DUBAI BOLSA 1.36kg', allergens: 'Contiene leche; puede contener huevo, soya, nueces de árbol y trigo', yield: Y27 },
      { code: 'IBP-123', name: 'Wild Tribe moka frappé', official: 'Wild Tribe Moka Frappe', description: 'Cacao Forastero africano con café colombiano suave.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR WILD TRIBE MOKA FRAPPE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-124', name: 'Original moka frappé', official: 'Original Mocha Frappe', description: 'Cacao tostado de Trinidad con café de tueste medio y un toque de canela.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR ORIGINAL MOKA FRAPPE  BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-126', name: 'Toffee coffee frappé', official: 'Toffee Nut Coffee Frappe Latte', description: 'Frappé latte de café con sabor toffee.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR TOFFEE COFFEE FRAPPE  BOLSA 1.36 kg', allergens: 'Vegetariano · no vegano · contiene lácteos y frutos secos (almendra)', yield: Y27 },
      { code: 'IBP-128', name: 'Tahitian vainilla latte', official: 'Tahitian Vanilla Latte Frappe', description: 'Vainilla de Tahití con café colombiano de tueste suave.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR TAHITIAN VAINILLA LATTE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-129', name: 'Caffe latte', official: 'Caffe Latte Frappe', description: 'Frappé de café latte, también disponible en caja de 11.33 kg.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR CAFFE LATTE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-147', name: 'Caffe latte frappé', official: 'Caffe Latte Frappe (25 lb)', description: 'El mismo caffe latte en caja de 11.33 kg para barras de alto volumen.', presentation: 'Caja 11.33 kg', apiName: 'MOCAFE BASE EN POLVO SABOR CAFFE LATTE FRAPPE CAJA 11.33 kg', allergens: DAIRY, yield: 'Rinde aprox. 226 bebidas de 480 ml (50 g por bebida)' },
      { code: 'IBP-130', name: 'Java chip', official: 'Java Chip Frappe', description: 'Chispas grandes de chocolate holandés con café colombiano.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR JAVA CHIP BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-131', name: 'Cookies & cream', official: 'Cookies & Cream Frappe', description: 'Galletas de chocolate tipo sándwich con café colombiano.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR COOKIES & CREAM BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-134', name: 'Caramel', official: 'Caramel Latte Frappe', description: 'Caramelo con café colombiano; la marca lo llama su favorito desde 1996.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR CARAMEL BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-137', name: 'Charcoal', official: 'Charcoal Mocha', description: 'Carbón activado de cáscara de coco con cacao “black onyx”.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR CHARCOAL BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-140', name: 'Creme white chocolate', official: 'White Chocolate Frappe', description: 'Frappé de chocolate blanco.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR CREME WHITE CHOCOLATE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-142', name: 'Chocolate menta barista frappé', official: 'Chocolate Mint Frappe', description: 'Cacao holandés con menta; con café queda un peppermint mocha. Caliente, frío o licuado.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR CHOCOLATE MENTA BARISTA FRAPPE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 }
    ]
  },
  {
    anchor: 'chocolates', name: 'Mocafe', sub: 'CHOCOLATES', cover: 'IBP-125', tone: 'yellow',
    description: 'Chocolate congelado tipo frappé y chocolate mexicano especiado para bebidas calientes o mocha.',
    products: [
      { code: 'IBP-125', name: 'Arctica frozen chocolate frappé', official: 'Arctica® Frozen Hot Chocolate', description: 'Chocolate congelado tipo frappé, muy chocolatoso.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR ARCTICA FROZEN CHOCOLATE FRAPPE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-127', name: 'Chocolate Azteca de Oro', official: "Azteca D'Oro 1519 Mexican Spiced Chocolate", description: 'Chocolate mexicano con especias, vainilla, almendra y canela; para chocolate caliente o mocha.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR CHOCOLATE AZTECA DE ORO BOLSA  1.36 kg', allergens: 'Vegano · contiene especias y lecitina de soya', yield: Y27 }
    ]
  },
  {
    anchor: 'chai', name: 'Mocafe', sub: 'CHAI PRECIOUS DIVINITY', cover: 'IBP-132', tone: 'coral',
    description: 'Té negro Darjeeling con jengibre, clavo, canela, cardamomo y miel de flores; caliente, frío o frappé.',
    products: [
      { code: 'IBP-132', name: 'Chai spiced Precious Divinity', official: 'Precious Divinity™ Spiced Chai', description: 'Té negro Darjeeling, jengibre, clavo, canela, cardamomo y miel de flores.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO CHAI SPICED PRECIOUS DIVINITY BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-133', name: 'Chai vainilla Precious Divinity', official: 'Precious Divinity™ Vanilla Chai', description: 'La misma base de chai especiado, con vainilla.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO CHAI VAINILLA PRECIOUS DIVINITY BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 }
    ]
  },
  {
    anchor: 'matcha', name: 'Mocafe', sub: 'MATCHA', cover: 'IBP-135', tone: 'lime',
    description: 'Matcha japonés premium, endulzado y con lácteos, para latte o frappé. La marca lo llama su #1.',
    products: [
      { code: 'IBP-135', name: 'Green tea matcha latte', official: 'Matcha Green Tea Latte', description: 'Matcha japonés premium, endulzado y con lácteos, para latte o frappé.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR GREEN TEA MATCHA LATTE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 }
    ]
  },
  {
    anchor: 'vainilla-smoothie', name: 'Mocafe', sub: 'VAINILLA PARA SMOOTHIE', cover: 'IBP-141', tone: 'yellow',
    description: 'Vainilla Bourbon de Madagascar como base para smoothies de fruta.',
    products: [
      { code: 'IBP-141', name: 'Madagascar vainilla natural', official: 'All Natural Madagascar Vanilla', description: 'Vainilla Bourbon de Madagascar; base para smoothies de fruta.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR MADAGASCAR VAINILLA NATURAL BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-136', name: 'Madagascar vainilla non dairy', official: 'Madagascar Vanilla Non-Dairy', description: 'Vainilla Bourbon de Madagascar. “Non dairy” es el nombre de la marca, pero contiene caseinato (derivado de leche).', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR MADAGASCAR VAINILLA NON DAIRY BOLSA 1.36 kg', allergens: 'Vegetariano · no vegano · contiene caseinato de sodio (derivado de leche)', yield: Y27 }
    ]
  },
  {
    anchor: 'zenfreeze', name: 'Mocafe', sub: 'ZENFREEZE: FRUTAS Y BOBA', cover: 'IBP-139', tone: 'cyan',
    description: 'Polvos para bebidas con boba, milk tea, smoothies y frappés: coco, taro, fresa, almendra y mango.',
    products: [
      { code: 'IBP-138', name: 'Coconut latte', official: 'ZenFreeze Coconut', description: 'Polvo sabor coco para boba, milk tea, smoothies y frappés.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR COCONUT LATTE BOLSA 1.36 kg', allergens: 'Contiene lácteos; puede contener trigo, soya, huevo y nueces', yield: Y27 },
      { code: 'IBP-139', name: 'Taro latte', official: 'ZenFreeze Taro', description: 'Polvo sabor taro para boba, milk tea, smoothies y frappés.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR TARO LATTE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-143', name: 'Fresa con crema de frutas', official: 'Strawberry Blended Crème', description: 'Fresa con crema para smoothies y frappés.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR FRESA CON CREMA DE FRUTAS BOLSA 1.36 kg', allergens: 'Vegetariano · no vegano · contiene leche · contiene rojo 40', yield: Y27 },
      { code: 'IBP-144', name: 'Almendra latte', official: 'ZenFreeze Almond', description: 'Polvo sabor almendra para boba, milk tea, smoothies y frappés.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR ALMENDRA LATTE BOLSA 1.36 kg', allergens: DAIRY, yield: Y27 },
      { code: 'IBP-145', name: 'Mango latte', official: 'ZenFreeze Mango', description: 'Polvo sabor mango para boba, milk tea, smoothies y frappés.', presentation: BAG, apiName: 'MOCAFE BASE EN POLVO SABOR MANGO LATTE BOLSA 1.36 kg', allergens: 'Vegetariano · no vegano · contiene lácteos · contiene tartrazina', yield: Y27 }
    ]
  }
];

export const MOCAFE_LINE_ICONS = (tone: string) => ({ sabor: `${JAR}/icon-sabor-${tone}.png`, pres: `${JAR}/icon-pres-${tone}.png`, rend: `${JAR}/icon-rend-${tone}.png`, blob: `${JAR}/blob-${tone}.png` });

export const MOCAFE_PRODUCTS: MocafeProduct[] = MOCAFE_LINES.flatMap((l) => l.products);
export const MOCAFE_CODES: string[] = MOCAFE_PRODUCTS.map((p) => p.code);

export interface MocafeFaqPart { t: string; route?: string; href?: string }
export interface MocafeFaq { q: string; a: string; pending?: boolean; rich?: MocafeFaqPart[] }

/** FAQ del brief (answer-first). pending = por confirmar: se muestra pero NO va al JSON-LD. */
export const MOCAFE_FAQ: MocafeFaq[] = [
  { q: '¿Qué es Mocafe?', a: 'Es una marca de bases en polvo para cafetería: frappés de café y moka, chocolates, chai, matcha y bases para smoothie y boba. Se preparan con leche o agua, calientes, frías o licuadas con hielo.' },
  { q: '¿Cuál es la diferencia entre las líneas?', a: 'Los frappés de café y moka llevan café; los chai Precious Divinity son té negro con especias; la línea ZenFreeze (coco, taro, mango, almendra, fresa) es para smoothies y bebidas con boba; las vainillas Madagascar son base para smoothies de fruta.' },
  { q: '¿Cómo preparo un frappé Mocafe?', a: 'Licúa 50 g de polvo con 180 ml de leche y hielo para una bebida de 480 ml. Para ideas, mira nuestras recetas en /recetas/.',
    rich: [{ t: 'Licúa 50 g de polvo con 180 ml de leche y hielo para una bebida de 480 ml. Para ideas, mira ' }, { t: 'nuestras recetas', route: '/recetas' }, { t: '.' }] },
  { q: '¿Cuántas bebidas rinde una bolsa?', a: 'Cada bolsa de 1.36 kg rinde 27 bebidas de 480 ml, con 50 g de polvo por bebida. Para costear cada vaso usa la /calculadora-de-precios/.',
    rich: [{ t: 'Cada bolsa de 1.36 kg rinde 27 bebidas de 480 ml, con 50 g de polvo por bebida. Para costear cada vaso usa la ' }, { t: 'calculadora de precios', route: '/calculadora-de-precios' }, { t: '.' }] },
  { q: '¿Mocafe es vegano? ¿Qué alérgenos tiene?', a: 'Todos los sabores son vegetarianos y contienen lácteos, excepto el chocolate Azteca de Oro, que es vegano (contiene especias y lecitina de soya). El Toffee contiene almendra; el de coco puede contener trigo, soya, huevo y nueces; el de mango contiene tartrazina. Revisa la etiqueta de cada bolsa.' },
  { q: '¿Los frappés Mocafe llevan café?', pending: true, a: 'Los de la línea de café y moka sí (la marca usa café colombiano o de tueste medio). Arctica, Azteca, chai, matcha y ZenFreeze no se presentan como bebidas de café.' },
  { q: '¿Dónde compro Mocafe?', a: 'Encuéntralo en tu sucursal favorita de Café Etrusca o en nuestra tienda en línea. Manejamos venta de mayoreo y menudeo, tanto para negocios como para consumidores.',
    rich: [{ t: 'Encuéntralo en tu ' }, { t: 'sucursal favorita de Café Etrusca', route: '/sucursales' }, { t: ' o en nuestra ' }, { t: 'tienda en línea', href: 'https://tienda.cafeetrusca.com/' }, { t: '. Manejamos venta de mayoreo y menudeo, tanto para negocios como para consumidores.' }] },
  { q: '¿Cuánto cobrar por un frappé?', a: 'Usa nuestra calculadora de precios (/calculadora-de-precios/) con tu costo por bolsa y tu tamaño de vaso.',
    rich: [{ t: 'Usa nuestra ' }, { t: 'calculadora de precios', route: '/calculadora-de-precios' }, { t: ' con tu costo por bolsa y tu tamaño de vaso.' }] }
];
