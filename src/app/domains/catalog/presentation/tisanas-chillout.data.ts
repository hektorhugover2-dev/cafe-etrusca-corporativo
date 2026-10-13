/**
 * Datos de la página /insumos-para-cafeterias/tisanas/chillout/ (tisanas frutales ChillOut, bolsa 250 g).
 * Mismo patrón que torani.data.ts / chillout.data.ts (bases en polvo: es OTRA línea y otra página).
 *
 * Fuente: brief SEO del 2-oct-2026 (workspace/etrusca/briefs/2026-10-02-brief-tisanas-chillout.md), revisión de
 * tienda.cafeetrusca.com del 2-oct-2026 y API de búsqueda del sitio (cafeetrusca.com/api/search?q=CHILLOUT%20TISANA).
 * No inventar datos. Numeración de códigos = la de la TIENDA (coincide con la lista SAP de la intranet al menos en
 * ITI-104 = «FUSION DE MORAS»); hay una lista de 13 nombres con otra numeración que NO se usa (ver tabla
 * tisanas-chillout-recodificacion-2026-10-02.csv).
 * - 13 productos = los 8 con ficha de tienda (ITI-104, 105, 106, 107, 108, 111, 112, 114) + 5 sin ficha hoy
 *   (ITI-109, 110, 113, 115, 117).
 * - Enlace por código: ficha directa (`direct: true`) SOLO si la ficha responde 200 al momento de construir
 *   (verificado el 2-oct-2026 con curl; ver /workspace/etrusca/tisanas-chillout-verify-tienda-2026-10-02.json).
 *   Si no, `direct: false` y el enlace es la BÚSQUEDA de la tienda (?search=<nombre>, espacios como %20).
 *   Cuando una ficha pase a 200, ponerla con `direct: true` (y entonces entra `url` en el ItemList del JSON-LD).
 * - Nombre: para las fichas en 200 es el título exacto de la tienda (`confirmed: true`). Para las demás es el título
 *   de la API del sitio (`confirmed: false`) y el sabor impreso en la foto del empaque.
 * - Imágenes: fotos de la tienda (cafeetrusca.com/e-commerce/FOTOS-2026/INSUMOS/…/CHILLOUT TISANA/ITI-xxx_1.webp;
 *   ITI-109 de la miniatura /img/thumbnail/ITI-109.webp) a /assets/images/insumos/tisanas/chillout/ (800×800, sin
 *   deformar), emparejadas por SABOR impreso en el empaque. Son «fotografía ilustrativa». Sin foto = bloque neutro.
 * - Sin precios ni existencias (viven en la tienda) y sin `offers` en el JSON-LD.
 * - Única receta con gramos publicada por Etrusca: Strawberry matcha lemonade (10 g de tisana fresa kiwi,
 *   80 ml de agua caliente, 5 min). Se cita tal cual, como ejemplo, no como regla general.
 *
 * TODO(Héctor) — por confirmar antes de publicar más detalle (hoy NO aparece en texto ni en schema):
 * - Confirmar contra la intranet (SAP) el nombre de ITI-109 Piña coco, ITI-110 Guayaba, ITI-113 Cosecha de manzana,
 *   ITI-115 Fresa e ITI-117 Menta tropical (hoy solo vienen de la API del sitio y del empaque; sus fichas dan 404).
 *   ITI-117: la API dice «CON SEMILLA DE CAPOMO», otra lista decía «CON SEÑA DE PEPINO»; en la página va solo
 *   «Menta tropical» hasta confirmar. ITI-117 no tiene foto (queda bloque neutro).
 * - ITI-116 «Matcha kiwi»: hay foto (ITI-116_1.webp) y título en la API, pero no está entre los 13: ¿se agrega?
 * - Cuando la tienda publique las fichas 109, 110, 113, 115 y 117, pasar `direct` a true y poner la URL de ficha.
 *   Revisar que cada ficha muestre el MISMO sabor que el nombre de la tarjeta.
 * - Precio vigente y si se muestra (en tienda: $302.50 MXN los 8, 2-oct-2026; si se muestra, leerlo de la API en el
 *   build, nunca escrito a mano). Envíos/descuentos del banner de tienda.
 * - Mayoreo, factura, envío a todo México y tiempos de entrega. Sucursales con existencia.
 * - Dosis, tiempos y rendimiento por bolsa para cada sabor (solo hay una receta con gramos), costo por vaso.
 * - Ingredientes, alérgenos, cafeína por sabor, caducidad / vida útil (ficha técnica ChillOut). Nota: la foto
 *   de ITI-108 (ponche tradicional) e ITI-114 (mango fresa) muestra el sello "EXCESO AZÚCARES": no afirmar
 *   "sin azúcar" ni "saludable" en esta página.
 * - ¿El SKU de "tisana fresa kiwi" de la receta es ITI-105 «Esencia fresa kiwi»? (hoy la receta NO enlaza a una
 *   ficha de compra).
 * - Fotos de bebidas (tisana caliente y over ice) para la sección de ideas de menú: hoy hay un bloque neutro
 *   (ver `.tis-idea-media` en el .scss). Si hay foto, ponerla en `image` de cada idea.
 * - Si la receta Strawberry matcha lemonade ya está en producción (hoy se revisó en desarrollo).
 * - Bloque Euro Te: solo se remite a la categoría; sin precios ni número de sabores.
 */

export interface TisanaProduct {
  code: string;
  flavor: string;
  line: string;
  presentation: string;
  /** Nombre del producto: título exacto de la ficha de tienda (confirmed) o título de la API del sitio */
  name: string;
  /** true = el nombre es el título de una ficha de tienda en 200; false = solo API/empaque: confirmar en intranet */
  confirmed: boolean;
  /** Destino de compra en línea: ficha directa (200) o, si no hay ficha, búsqueda de la tienda */
  url: string;
  /** true = `url` es una ficha de producto verificada en 200; false = es una búsqueda de la tienda */
  direct: boolean;
  /** Imagen local (webp, 800×800). Sin imagen = bloque neutro */
  image?: string;
}

export const TISANAS_CHILLOUT_PATH = '/insumos-para-cafeterias/tisanas/chillout';
export const TISANAS_CATEGORY_PATH = '/insumos-para-cafeterias/tisanas';
export const TISANAS_CHILLOUT_STORE_URL = 'https://tienda.cafeetrusca.com/productos?search=CHILLOUT%20TISANA';

const IMG = '/assets/images/insumos/tisanas/chillout';
const STORE = 'https://tienda.cafeetrusca.com/producto/detalle';

/** Búsqueda en la tienda: ?search=<término>, con %20 en los espacios (formato que pidió Héctor). */
export function tisanaSearchUrl(term: string): string {
  return 'https://tienda.cafeetrusca.com/productos?search=' + encodeURIComponent(term);
}

const P = 'Bolsa 250 g';
const LIVE = 'Tisana frutal';

/** Orden = orden por código. Presentación: bolsa 250 g, 1 pieza. Enlaces verificados el 2-oct-2026 (ver arriba). */
export const TISANAS_CHILLOUT: TisanaProduct[] = [
  { code: 'ITI-104', flavor: 'Fusión de moras', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR FUSION DE MORAS BOLSA 250g', confirmed: true, url: STORE + '/ITI-104/CHILLOUT-TISANA-FRUTAL-SABOR-FUSION-DE-MORAS-BOLSA-250g', direct: true, image: IMG + '/iti-104.webp' },
  { code: 'ITI-105', flavor: 'Esencia fresa kiwi', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR ESENCIA FRESA KIWI BOLSA 250g', confirmed: true, url: STORE + '/ITI-105/CHILLOUT-TISANA-FRUTAL-SABOR-ESENCIA-FRESA-KIWI-BOLSA-250g', direct: true, image: IMG + '/iti-105.webp' },
  { code: 'ITI-106', flavor: 'Fruta de la pasión', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR FRUTA DE LA PASION BOLSA 250g', confirmed: true, url: STORE + '/ITI-106/CHILLOUT-TISANA-FRUTAL-SABOR-FRUTA-DE-LA-PASION-BOLSA-250g', direct: true, image: IMG + '/iti-106.webp' },
  { code: 'ITI-107', flavor: 'Mango maracuyá', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR MANGO MARACUYA BOLSA 250g', confirmed: true, url: STORE + '/ITI-107/CHILLOUT-TISANA-FRUTAL-SABOR-MANGO-MARACUYA-BOLSA-250g', direct: true, image: IMG + '/iti-107.webp' },
  { code: 'ITI-108', flavor: 'Ponche tradicional', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR PONCHE TRADICIONAL BOLSA 250g', confirmed: true, url: STORE + '/ITI-108/CHILLOUT-TISANA-FRUTAL-SABOR-PONCHE-TRADICIONAL-BOLSA-250g', direct: true, image: IMG + '/iti-108.webp' },
  // Sin ficha (404 el 2-oct-2026): nombre = título de la API del sitio; confirmar en intranet
  { code: 'ITI-109', flavor: 'Piña coco', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR PIÑA COCO BOLSA 250g', confirmed: false, url: tisanaSearchUrl('CHILLOUT TISANA FRUTAL SABOR PIÑA COCO'), direct: false, image: IMG + '/iti-109.webp' },
  { code: 'ITI-110', flavor: 'Guayaba', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR GUAYABA BOLSA 250g', confirmed: false, url: tisanaSearchUrl('CHILLOUT TISANA FRUTAL SABOR GUAYABA'), direct: false, image: IMG + '/iti-110.webp' },
  { code: 'ITI-111', flavor: 'Cereza', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR CEREZA BOLSA 250g', confirmed: true, url: STORE + '/ITI-111/CHILLOUT-TISANA-FRUTAL-SABOR-CEREZA-BOLSA-250g', direct: true, image: IMG + '/iti-111.webp' },
  { code: 'ITI-112', flavor: 'Fusión manzana arándano', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR FUSION MANZANA ARANDANO BOLSA 250g', confirmed: true, url: STORE + '/ITI-112/CHILLOUT-TISANA-FRUTAL-SABOR-FUSION-MANZANA-ARANDANO-BOLSA-250g', direct: true, image: IMG + '/iti-112.webp' },
  { code: 'ITI-113', flavor: 'Cosecha de manzana', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR COSECHA DE MANZANA BOLSA 250g', confirmed: false, url: tisanaSearchUrl('CHILLOUT TISANA FRUTAL SABOR COSECHA DE MANZANA'), direct: false, image: IMG + '/iti-113.webp' },
  { code: 'ITI-114', flavor: 'Mango fresa', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR MANGO FRESA BOLSA 250g', confirmed: true, url: STORE + '/ITI-114/CHILLOUT-TISANA-FRUTAL-SABOR-MANGO-FRESA-BOLSA-250g', direct: true, image: IMG + '/iti-114.webp' },
  { code: 'ITI-115', flavor: 'Fresa', line: LIVE, presentation: P, name: 'CHILLOUT TISANA FRUTAL SABOR FRESA BOLSA 250g', confirmed: false, url: tisanaSearchUrl('CHILLOUT TISANA FRUTAL SABOR FRESA'), direct: false, image: IMG + '/iti-115.webp' },
  // ITI-117: sin foto (bloque neutro) y sin ficha; el sabor completo está por confirmar (capomo / pepino)
  { code: 'ITI-117', flavor: 'Menta tropical', line: 'Tisana', presentation: P, name: 'CHILLOUT TISANA SABOR MENTA TROPICAL BOLSA 250g', confirmed: false, url: tisanaSearchUrl('CHILLOUT TISANA SABOR MENTA TROPICAL'), direct: false }
];

const COUNT_WORDS = ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis'];
/** «trece» para 13 productos: el conteo del texto sale de los datos. */
export const TISANAS_COUNT_WORD = COUNT_WORDS[TISANAS_CHILLOUT.length] ?? String(TISANAS_CHILLOUT.length);
const FLAVOR_LIST = (() => {
  const f = TISANAS_CHILLOUT.map((p) => p.flavor.toLowerCase());
  return f.slice(0, -1).join(', ') + ' y ' + f[f.length - 1];
})();

export interface TisanaPoint {
  title: string;
  text: string;
}

/** "Cómo ponerla en el menú": sin cifras (rendimiento, costo por vaso y márgenes: ver TODO arriba). */
export const TISANAS_MENU_POINTS: TisanaPoint[] = [
  { title: 'Una bolsa, dos servicios', text: 'La misma tisana se sirve caliente o con hielo, así que un sabor puede estar en tu carta en las dos versiones.' },
  { title: 'Dónde encaja', text: 'Es una bebida sin café para quien no toma café: funciona en la tarde y la noche, en temporada fría (posadas) y en verano.' },
  { title: 'Base de otras bebidas', text: 'Úsala como base de limonadas, refreshers y sodas con tisana. Más abajo tienes un ejemplo de Etrusca.' },
  { title: 'Cómo nombrarla', text: 'Pon el nombre del sabor en la carta y presenta la bebida con su color y en el vaso adecuado.' },
  { title: 'Costeo', text: 'El taller de Bebidas Frías incluye tisanas frías y costeo.' }
];

export interface TisanaIdea {
  title: string;
  concept: string;
  /** Sabores ChillOut sugeridos (de la lista de arriba). */
  flavors: string;
  tone: 'coral' | 'yellow';
  /** Enlace opcional de apoyo (ruta del sitio, sin "/" final). */
  link?: { label: string; path: string };
}

/** Ideas de carta del brief. Sin gramos ni tiempos: la ejecución por receta está por confirmar (ver TODO). */
export const TISANAS_IDEAS: TisanaIdea[] = [
  { title: 'Tisana caliente de la casa', concept: 'Infusión servida caliente en taza o vaso.', flavors: 'Ponche tradicional, fusión manzana arándano, fusión de moras', tone: 'coral' },
  { title: 'Tisana fría over ice', concept: 'Infusión enfriada sobre hielo.', flavors: 'Mango fresa, mango maracuyá, fruta de la pasión', tone: 'yellow' },
  { title: 'Limonada o refresher con tisana', concept: 'Tisana con limón o agua mineral.', flavors: 'Esencia fresa kiwi (hay receta de Etrusca, abajo)', tone: 'coral' },
  { title: 'Soda frutal con tisana', concept: 'Tisana con agua mineral.', flavors: 'Cereza, fusión de moras', tone: 'yellow' },
  {
    title: 'Edición posadas (nov–dic)',
    concept: 'Tisana caliente de temporada.',
    flavors: 'Ponche tradicional',
    tone: 'coral',
    link: { label: 'Ver la sesión «Tisanas para las posadas»', path: '/educacion/sesiones/tisanas-para-las-posadas' }
  }
];

export const TISANA_RECIPE_SLUG = 'strawberry-matcha-lemonade';

export interface TisanaFaq {
  q: string;
  a: string;
}

/**
 * Preguntas frecuentes: solo hechos del brief. El mismo texto se pinta en la página y en el FAQPage.
 * Precio, mayoreo/envíos/factura, sucursales y dosis estándar quedan fuera hasta que Héctor los confirme.
 */
export const TISANAS_CHILLOUT_FAQ: TisanaFaq[] = [
  {
    q: '¿Qué es una tisana?',
    a: 'Una tisana es una infusión de frutas, flores, hierbas o especias que no lleva hoja de té, y por eso normalmente no tiene cafeína. Se sirve caliente o fría.'
  },
  {
    q: '¿Cuál es la diferencia entre té y tisana?',
    a: 'El té se hace con hojas de la planta Camellia sinensis; la tisana, con frutas, flores, hierbas o especias. Por eso la tisana normalmente no lleva cafeína.'
  },
  {
    q: '¿Qué sabores de tisana ChillOut venden?',
    a: `Tenemos ${TISANAS_COUNT_WORD} sabores en bolsa de 250 g: ${FLAVOR_LIST}.`
  },
  {
    q: '¿Cómo pongo una tisana en el menú de mi cafetería?',
    a: 'Ofrécela como bebida caliente y como bebida fría con hielo, con un sabor por bebida y un nombre claro en la carta. Para costear y practicar recetas, el taller de Bebidas Frías incluye tisanas frías y costeo.'
  },
  {
    q: '¿Cuánta tisana lleva un vaso?',
    a: 'Depende de la receta. Ejemplo de Etrusca: la Strawberry matcha lemonade (480 ml) usa 10 g de tisana fresa kiwi infusionados 5 minutos en 80 ml de agua caliente. Para otras recetas, un asesor de Café Etrusca puede ayudarte.'
  },
  {
    q: '¿Dónde compro tisanas ChillOut?',
    a: 'En la tienda en línea de Café Etrusca (tienda.cafeetrusca.com) y con un asesor desde la página de Contacto.'
  }
];
