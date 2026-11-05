/**
 * Datos de la página /insumos-para-cafeterias/bases-en-polvo/david-rio/.
 * Brief: /workspace/etrusca/briefs/2026-10-29-brief-david-rio.md (agente SEO, 29-oct-2026). Modelo: Torani / ChillOut.
 *
 * - Lista interna de Héctor (21 claves) menos las que no tienen foto; quedan 16 (todas cruzan con https://cafeetrusca.com/api/product?type=1&q=david).
 *   NO listar IBP-273/274/275/276 ni muestras IMU-002/IMU-024.
 * - Precio REGULAR (precioregularc_impuesto) e imagen (image_thumbnail) se leen de la API al prerenderizar/en el navegador.
 *   NUNCA usar precioofertac_impuestos, descuento ni descuentovalidode/hasta (regla de Héctor: sin promociones).
 * - Stock: Héctor indicó que el stock de la API es de una sucursal sin existencias → NO se usa para ocultar,
 *   marcar agotado ni se muestra. Los 21 productos van como normales.
 * - Nombres de animal y nombre oficial solo del sitio oficial davidrio.com; descripciones traducidas del brief.
 *   NO se usa arte/ilustraciones de David Rio (pendiente autorización de Héctor): solo fotos de bote de la API.
 */

export interface DavidRioSku {
  code: string;
  /** Nombre en Etrusca / chip de tamaño */
  label: string;
  presentation: string;
  /** Nombre de la API (para la URL de la ficha en tienda) */
  apiName: string;
  /** Porciones de 100 ml por envase (etiqueta mexicana _T, ver rendimiento.md). Sin dato = no se muestra. */
  servings?: number;
}

export interface DavidRioAnimal {
  slug: string;
  animal: string;
  official: string;
  etrusca: string;
  description: string;
  color: string;
  soft: string;
  skus: DavidRioSku[];
}

export interface DavidRioExtra {
  code: string;
  name: string;
  official: string;
  presentation: string;
  apiName: string;
  note?: string;
  /** Porciones de 100 ml por envase. Sin dato = no se muestra. */
  servings?: number;
}

/** Fotos propias en R2 (subidas 29-oct-2026, foto frontal _1 de cada producto). Si un código no está aquí se usa image_thumbnail de la API.
 *  IBP-180/267/268/269: fotos oficiales autorizadas por Héctor (29-oct-2026). AAC-266 sigue fuera (sin foto). */
const DR_IMG = 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/david-rio';
export const DAVID_RIO_PHOTOS: Record<string, string> = Object.fromEntries(
  ['IBP-085', 'IBP-086', 'IBP-087', 'IBP-089', 'IBP-092', 'IBP-094', 'IBP-095', 'IBP-099', 'IBP-100', 'IBP-101', 'IBP-102', 'IBP-209', 'IBP-228', 'IBP-180', 'IBP-267', 'IBP-268', 'IBP-269']
    .map((c) => [c, `${DR_IMG}/${c}-transparente.webp`])
);

/** Ilustración del animal (silueta del emblema oficial de cada bote David Rio), fondo de la card. Sin ilustración: se muestra el nombre. */
export const DAVID_RIO_ANIMAL_ART: Record<string, string> = Object.fromEntries(
  ['elefante', 'tortuga', 'orca', 'flamingo', 'tucan', 'panda', 'rhino'].map((s) => [s, `${DR_IMG}/animales/${s}.webp`]).concat([['tigre', `${DR_IMG}/animales/tigre-v2.webp`]])
);

export const DAVID_RIO_STORE_URL = 'https://tienda.cafeetrusca.com/productos?search=DAVID%20RIO';

export const DAVID_RIO_ANIMALS: DavidRioAnimal[] = [
  {
    slug: 'tigre', animal: 'Tigre', official: 'Tiger Spice Chai®', etrusca: 'Chai Tigre tradicional',
    description: 'Té negro con especias premium como canela, cardamomo y clavo; la marca lo describe como rico y cremoso. También en versión descafeinada.',
    color: '#f28c28', soft: '#ffe3c4',
    skus: [
      { code: 'IBP-085', servings: 136, label: '1.814 kg', presentation: 'Bote 1.814 kg', apiName: 'DAVID RIO CHAI TIGRE BASE EN POLVO SABOR TRADICIONAL BOTE 1.814 kg' },
      { code: 'IBP-100', servings: 30, label: '398 g', presentation: 'Bote 398 g', apiName: 'DAVID RIO CHAI TIGRE BASE EN POLVO SABOR TRADICIONAL BOTE 398 g' },
      { code: 'IBP-104', servings: 30, label: 'Descafeinado 398 g', presentation: 'Bote 398 g descafeinado', apiName: 'DAVID RIO CHAI TIGRE BASE EN POLVO SABOR TRADICIONAL DESCAFEINADO BOTE 398 g' }
    ]
  },
  {
    slug: 'elefante', animal: 'Elefante', official: 'Elephant Vanilla Chai®', etrusca: 'Chai Elefante vainilla',
    description: 'Vainilla con té negro, canela, cardamomo y clavo.',
    color: '#8e7cc3', soft: '#e9e3fa',
    skus: [
      { code: 'IBP-086', servings: 136, label: '1.814 kg', presentation: 'Bote 1.814 kg', apiName: 'DAVID RIO CHAI ELEFANTE BASE EN POLVO SABOR VAINILLA BOTE 1.814 kg' },
      { code: 'IBP-099', servings: 30, label: '398 g', presentation: 'Bote 398 g', apiName: 'DAVID RIO CHAI ELEFANTE BASE EN POLVO SABOR VAINILLA BOTE 398 g' }
    ]
  },
  {
    slug: 'tortuga', animal: 'Tortuga', official: 'Tortoise Green Tea™ Chai', etrusca: 'Chai Tortuga té verde',
    description: 'Té verde con canela y cardamomo, pensado para que brille el sabor del té verde.',
    color: '#5aa469', soft: '#dcf1df',
    skus: [
      { code: 'IBP-087', servings: 136, label: '1.814 kg', presentation: 'Bote 1.814 kg', apiName: 'DAVID RIO CHAI TORTUGA BASE EN POLVO SABOR TÉ VERDE BOTE 1.814 kg' },
      { code: 'IBP-101', servings: 30, label: '398 g', presentation: 'Bote 398 g', apiName: 'DAVID RIO CHAI TORTUGA BASE EN POLVO SABOR TÉ VERDE BOTE 398 g' }
    ]
  },
  {
    slug: 'orca', animal: 'Orca', official: 'Orca Spice™ Reduced Calorie Chai', etrusca: 'Chai Orca tradicional sin azúcar',
    description: 'Chai de té negro y especias, reducido en calorías y endulzado con sucralosa.',
    color: '#2f6fb3', soft: '#d9e8f8',
    skus: [
      { code: 'IBP-089', servings: 114, label: '1.520 kg', presentation: 'Bote 1.520 kg', apiName: 'DAVID RIO CHAI ORCA BASE EN POLVO SABOR TRADICIONAL SIN AZUCAR BOTE 1.520 kg' },
      { code: 'IBP-102', servings: 25, label: '337 g', presentation: 'Bote 337 g', apiName: 'DAVID RIO CHAI ORCA BASE EN POLVO SABOR TRADICIONAL SIN AZUCAR BOTE 337 g' }
    ]
  },
  {
    slug: 'flamingo', animal: 'Flamingo', official: 'Flamingo Vanilla™ Decaf Reduced Calorie Chai', etrusca: 'Chai Flamingo vainilla sin azúcar',
    description: 'Vainilla, descafeinado, reducido en calorías y endulzado con sucralosa; té negro, canela, cardamomo y vainilla.',
    color: '#ff7aa2', soft: '#ffe0ea',
    skus: [
      { code: 'IBP-092', servings: 114, label: '1.520 kg', presentation: 'Bote 1.520 kg', apiName: 'DAVID RIO CHAI FLAMINGO BASE EN POLVO SABOR VAINILLA SIN AZUCAR BOTE 1.520 kg' },
      { code: 'IBP-095', servings: 25, label: '337 g', presentation: 'Bote 337 g', apiName: 'DAVID RIO CHAI FLAMINGO BASE EN POLVO SABOR VAINILLA SIN AZUCAR BOTE 337 g' }
    ]
  },
  {
    slug: 'tucan', animal: 'Tucán', official: 'Toucan Mango™ Chai', etrusca: 'Chai Tucán mango',
    description: 'Mango con té negro, canela y cardamomo; la marca lo sugiere en frappé o como iced chai.',
    color: '#f6b400', soft: '#fff1b8',
    skus: [
      { code: 'IBP-094', servings: 136, label: '1.814 kg', presentation: 'Bote 1.814 kg', apiName: 'DAVID RIO CHAI TUCAN BASE EN POLVO SABOR MANGO BOTE 1.814 kg' }
    ]
  },
  {
    slug: 'panda', animal: 'Panda', official: 'Red Panda Pumpkin™ Chai', etrusca: 'Chai Panda calabaza',
    description: 'Calabaza con especias y té negro; la marca lo presenta como sabor de temporada.',
    color: '#c8553d', soft: '#f8dcd4',
    skus: [
      { code: 'IBP-181', servings: 30, label: '398 g', presentation: 'Bote 398 g', apiName: 'DAVID RIO CHAI PANDA BASE EN POLVO SABOR CALABAZA BOTE 398g' }
    ]
  },
  {
    slug: 'rhino', animal: 'Rhino', official: 'Black Rhino Cocoa™ Chai', etrusca: 'Chai Rhino cocoa',
    description: 'Especias masala con cacao premium, para servir frío o caliente.',
    color: '#5b4636', soft: '#eadfd5',
    skus: [
      { code: 'IBP-180', label: '456 g', presentation: 'Bote 456 g', apiName: 'DAVID RIO CHAI RHINO BASE EN POLVO SABOR COCOA BOTE 456g' }
    ]
  }
];

/** Productos David Rio sin animal ("Más allá del chai"), como productos normales (sin promoción). */
export const DAVID_RIO_EXTRAS: DavidRioExtra[] = [
  { code: 'IBP-169', name: 'Tea Frost matcha', official: 'Tea Frost Japanese Matcha', presentation: 'Bolsa 1.361 kg', apiName: 'DAVID RIO TEA FROST BASE EN POLVO SABOR MATCHA BOLSA 1361g' },
  // Nombre exacto confirmado por Héctor (29-oct-2026). No usar otro nombre.
  { code: 'IBP-228', servings: 109, name: 'DAVID RIO MATCHA LATTE & FRAPPE MIX BOLSA 1360g', official: '', presentation: 'Bolsa 1.36 kg', apiName: 'DAVID RIO MATCHA LATTE & FRAPPE MIX BOLSA 1360g' },
  { code: 'IBP-209', servings: 30, name: 'Super Blends Turmeric latte', official: 'SuperBlends Turmeric Latte', presentation: 'Lata 90 g', apiName: 'DAVID RIO SUPER BLENDS TURMERIC LATTE EN POLVO LATA 90g' },
  // Soup Latte 907 g: nombres desde la API (espacios dobles normalizados; apiName conserva el original para la URL de tienda).
  { code: 'IBP-267', name: 'DAVID RIO SOUP LATTE SABOR CHAMPIÑON CON TRUFA BOLSA 907g', official: 'Soup Latte™', presentation: 'Bolsa 907 g', apiName: 'DAVID RIO SOUP LATTE  SABOR CHAMPIÑON CON TRUFA BOLSA 907g' },
  { code: 'IBP-268', name: 'DAVID RIO SOUP LATTE SABOR CURRY CON COCO BOLSA 907g', official: 'Soup Latte™', presentation: 'Bolsa 907 g', apiName: 'DAVID RIO SOUP LATTE SABOR CURRY CON COCO BOLSA 907g' },
  { code: 'IBP-269', name: 'DAVID RIO SOUP LATTE SABOR BROCOLI CON QUESO CHEDAR BOLSA 907g', official: 'Soup Latte™', presentation: 'Bolsa 907 g', apiName: 'DAVID RIO SOUP LATTE  SABOR BROCOLI CON QUESO CHEDAR BOLSA 907g' }
  // AAC-266 (bote conmemorativo) sigue fuera: sin foto.
];

export const DAVID_RIO_CODES: string[] = [
  ...DAVID_RIO_ANIMALS.flatMap((a) => a.skus.map((s) => s.code)),
  ...DAVID_RIO_EXTRAS.map((e) => e.code)
];

export interface DavidRioFaqPart { t: string; route?: string; href?: string }
/** a = texto plano (JSON-LD); rich = mismo texto con ligas para la página. */
export interface DavidRioFaq { q: string; a: string; pending?: boolean; rich?: DavidRioFaqPart[] }

/** FAQ del brief. Las marcadas pending se muestran con aviso y NO van al JSON-LD. */
export const DAVID_RIO_FAQ: DavidRioFaq[] = [
  { q: '¿Qué es el chai David Rio?', a: 'Es una mezcla de chai en polvo de la marca David Rio: té negro (o verde, según el sabor) con especias como canela, cardamomo y clavo. Se prepara con agua caliente o leche.' },
  { q: '¿Qué significa cada animal?', a: 'Cada sabor tiene un animal: Tigre es el chai tradicional (Tiger Spice), Elefante el de vainilla, Tortuga el de té verde, Orca el tradicional sin azúcar, Flamingo el de vainilla sin azúcar y descafeinado, Tucán el de mango, Panda el de calabaza y Rhino el de cacao.' },
  { q: '¿Hay chai David Rio sin azúcar?', a: 'Sí: Orca (tradicional) y Flamingo (vainilla, descafeinado), endulzados con sucralosa y reducidos en calorías, en bote de 1.520 kg y 337 g.' },
  { q: '¿Hay chai descafeinado?', a: 'Sí: Tigre descafeinado (398 g) y Flamingo vainilla, que la marca describe como descafeinado.' },
  { q: '¿Qué tamaño conviene para una cafetería?', a: 'Los botes grandes de 1.814 kg y 1.520 kg son los de uso en barra; los de 398 g, 337 g y 456 g sirven para probar sabores. Rendimiento aproximado en porciones de 100 ml: bote de 1.814 kg, 136; bote de 1.520 kg, 114; bote de 398 g, 30; bote de 337 g, 25. Matcha Latte & Frappé Mix de 1360 g, 109, y Turmeric Latte de 90 g, 30.' },
  { q: '¿Cuál es la preparación sugerida?', a: 'Chai (porción de 100 ml): en la licuadora pon 57.14 ml de agua, un vaso al ras de hielo y 13.33 g de polvo, y licúa hasta obtener textura frappé. No uses leche y no es necesario agregar azúcar. Turmeric Latte (IBP-209): mezcla 3 g de polvo en 100 ml de agua hasta integrar.' },
  { q: '¿Dónde compro chai David Rio?', a: 'Encuéntralo en tu sucursal favorita de Café Etrusca o en nuestra tienda en línea. Manejamos venta de mayoreo y menudeo, tanto para negocios como para consumidores.',
    rich: [{ t: 'Encuéntralo en tu ' }, { t: 'sucursal favorita', route: '/sucursales' }, { t: ' de Café Etrusca o en nuestra ' }, { t: 'tienda en línea', href: 'https://tienda.cafeetrusca.com/' }, { t: '. Manejamos venta de mayoreo y menudeo, tanto para negocios como para consumidores.' }] }
];
