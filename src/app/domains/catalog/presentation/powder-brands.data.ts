/**
 * Páginas de marca nuevas de Bases en polvo: Hollander, Cappuccine y Don Gustavo (briefs SEO 2026-11-26).
 * Datos de producto de la lista de precios (intranet, 26-nov-2026) sin precios, promos ni existencias.
 * LOCAL: las fotos viven en public/assets/images/insumos/<marca>/ hasta que Héctor apruebe subirlas a R2.
 * Hollander y Cappuccine: sin gramos, porciones ni rendimiento confirmados; se muestra «Según preparación».
 * Don Gustavo (ficha de intranet confirmada, 26-nov-2026): 50 g por bebida de 480 ml, 40 bebidas por empaque de 2.025 kg; vegetariano y vegano (dato del producto, no es un claim de salud).
 */
import { TEA_ZONE_BRAND } from './tea-zone.data';

export type PbTone = 'coral' | 'yellow' | 'cyan' | 'lime';

export interface PbProduct {
  code: string;
  /** Nombre completo en la API (sólo para buscar la ficha en la tienda desde el modal «Comprar»). */
  apiName: string;
  name: string;
  official: string | null;
  /** Ancla de la línea a la que pertenece. */
  line: string;
  description: string;
  presentation: string;
  ingredients: string | null;
  allergens: string | null;
  gtin: string | null;
  /** Ruta local (public/assets). */
  photo: string;
  photoAlt: string;
  ldName: string;
  ldDescription: string;
  /** Rendimiento. Si falta, la plantilla muestra «Según preparación». */
  yield?: string;
  /** Dosis por bebida (solo Tea Zone, donde hay dato). */
  dose?: string;
  /** No mostrar la línea «Rendimiento» (accesorios). */
  hideYield?: boolean;
  /** Dato del producto (ficha de intranet). No es un claim de salud. */
  vegetarian?: boolean;
  vegan?: boolean;
  /** Declaración nutrimental de la etiqueta (por sabor). */
  nutrition?: PbNutrition;
}

export interface PbLine {
  anchor: string;
  name: string;
  sub: string;
  tone: PbTone;
  description: string;
  /** Código del producto cuya foto cubre la tarjeta. */
  cover: string;
  /** Sin modal «Sabores» (líneas de pocas claves): la tarjeta muestra «N productos». */
  noModal?: boolean;
  /** Sustituyen el texto calculado de Presentación / Rendimiento en la tarjeta de línea. */
  presentationLabel?: string;
  yieldLabel?: string;
  /** Enlace interno bajo la descripción de la línea. */
  moreLink?: PbLink;
}

export interface PbFaq { q: string; a: string }
export interface PbLink { t: string; route: string }
export interface PbNutritionRow { label: string; value: string; strong?: boolean }

export interface PbNutrition {
  title: string;
  basis: string;
  energy: string[];
  rows: PbNutritionRow[];
  /** Notas de la etiqueta (sellos, «sin saborizantes artificiales»). */
  notes: string[];
  source: string;
}

export interface PbBrand {
  id: 'hollander' | 'cappuccine' | 'don-gustavo' | 'tea-zone';
  brandName: string;
  path: string;
  title: string;
  description: string;
  keywords: string;
  datePublished: string;
  /** Logo de la marca (R2, ya existente en el hub). */
  logo: { src: string; alt: string; width: number; height: number } | null;
  h1Main: string;
  h1Sub: string;
  leadAccent: string;
  leadRest: string;
  body: string;
  facts: { n: string; label: string }[];
  /** Una sola ficha de producto (sin tarjetas de línea ni modal «Sabores»). */
  single: boolean;
  linesTitle: string;
  lines: PbLine[];
  products: PbProduct[];
  heroCodes: string[];
  presentationTitle: string;
  presentationText: string;
  presentationChips: string[];
  presentationPhoto: string;
  prepIntro: string;
  prepCards: { h: string; p: string }[];
  storage: string;
  ideasText: string;
  ideasLinks: PbLink[];
  extraBlock: { title: string; text: string; links: PbLink[] } | null;
  calcTitle: string;
  calcText: string;
  alsoLinks: PbLink[];
  faq: PbFaq[];
  ctaTitle: string;
  storeUrl: string;
  nutrition: PbNutrition | null;
  ogPhoto: string;
  /** Categoría padre (migas de pan, JSON-LD y enlaces de regreso). Por defecto: Bases en polvo. */
  category?: { name: string; path: string; backLabel: string };
  /** H2 del bloque de enlaces a otras marcas / productos. Por defecto: «Otras marcas de bases en polvo». */
  alsoTitle?: string;
  /** H2 del bloque de preparación. Por defecto: «Cómo se prepara». */
  prepTitle?: string;
  /** Texto del bloque CTA final. */
  ctaText?: string;
  /** Mostrar la pastilla «Rendimiento» en Presentación (por defecto sí). */
  showYieldChip?: boolean;
  /** Tabla de presentaciones (contenido neto en g / ml). */
  presentationRows?: { line: string; presentation: string; content: string; codes: string }[];
  /** Tabla «Cuánto usar por bebida». */
  doseTable?: { title: string; intro: string; head: string[]; rows: { line: string; presentation: string; dose: string; yield: string }[]; note: string };
  /** Nodo Brand del JSON-LD. */
  ldBrand?: { description: string; logo: string };
}

export const PB_CALC_PATH = '/calculadora-de-precios';
export const PB_WHATSAPP = 'https://wa.me/525541668777';
export const PB_BIZ = 'https://etrusca.biz/';
const STORAGE = 'Consérvese en un lugar fresco y seco.';

export const HOLLANDER_PRODUCTS: PbProduct[] = [
  { code: 'ICP-004', apiName: 'HOLLANDER CHOCOLATE DULCE EN POLVO BOLSA 1.13kg', name: 'Chocolate dulce en polvo', official: 'Sweet Ground Dutched Chocolate Powder', line: 'chocolate-en-polvo', description: 'Chocolate molido dulce con cacao alcalinizado («dutched») y vainilla, pensado para mochas, chocolate caliente, chocolate para beber y recetas creativas.', presentation: 'Bolsa 1.13 kg', ingredients: 'Azúcares añadidos (azúcar de caña), cocoa holandés alcalina, cocoa, vainilla natural, saborizante natural, mezcla de gomas (celulosa, xantana, agar) y sal marina.', allergens: null, gtin: '851606006015', photo: '/assets/images/insumos/hollander/ICP-004.webp', photoAlt: 'Hollander Chocolate dulce en polvo, bolsa de 1.13 kg', ldName: 'Hollander Chocolate dulce en polvo, bolsa 1.13 kg', ldDescription: 'Chocolate dulce en polvo con cacao alcalinizado y vainilla para mochas, chocolate caliente y bebidas frías de cafetería.' },
  { code: 'ICP-008', apiName: 'HOLLANDER CHOCOLATE VELVET DARK BOLSA 1.13 kg', name: 'Velvet Dark', official: 'Velvet Dark Chocolate Powder', line: 'chocolate-en-polvo', description: 'Chocolate oscuro en polvo con alto contenido de cacao y sabor equilibrado (mantequilloso, dulce e intenso); la marca lo describe como chocolate molido dulce y cocoa en polvo.', presentation: 'Bolsa 1.13 kg', ingredients: null, allergens: null, gtin: '851606006022', photo: '/assets/images/insumos/hollander/ICP-008.webp', photoAlt: 'Hollander Velvet Dark, bolsa de 1.13 kg', ldName: 'Hollander Velvet Dark chocolate oscuro en polvo, bolsa 1.13 kg', ldDescription: 'Chocolate oscuro en polvo de alto contenido de cacao para bebidas calientes y frías de cafetería.' },
  { code: 'ICP-006', apiName: 'HOLLANDER CHOCOLATE CREME FRAPPE & BASE POWDER BOLSA 1.13kg', name: 'Chocolate crème (base para frappé)', official: 'Chocolate Crème Frappé & Blender Base', line: 'creme-para-frappe', description: 'Base en polvo con cacao holandés y vainilla para frappés licuados, smoothies, malteadas y granizados.', presentation: 'Bolsa 1.13 kg', ingredients: 'Azúcar de caña, leche descremada, cacao fino holandés (procesado con álcali), cacao, vainilla, sabor natural, gomas vegetales (celulosa, xantano, agar), sal marina.', allergens: 'Contiene leche (lácteos).', gtin: '851606006091', photo: '/assets/images/insumos/hollander/ICP-006.webp', photoAlt: 'Hollander Chocolate crème (base para frappé), bolsa de 1.13 kg', ldName: 'Hollander Chocolate crème, base para frappé, bolsa 1.13 kg', ldDescription: 'Base en polvo de chocolate crème con cacao holandés y vainilla para frappés licuados, smoothies y malteadas.' }
];

export const CAPPUCCINE_PRODUCTS: PbProduct[] = [
  // IBP-011 Cinnamon Bun está oculto en esta página (sin foto oficial ni tabla nutrimental). Su ficha /Producto/Detalle/ no se toca.
  { code: 'IBP-001', apiName: 'CAPPUCCINE BASE EN POLVO SABOR FROSTED LATTE BOLSA 1.362 kg', name: 'Frosted Latte', official: null, line: 'cafe-frappes-y-lattes', description: 'Latte helado de café con leche, endulzado; la marca lo describe como mezcla de café arábica de montaña con leche.', presentation: 'Bolsa 1.362 kg', ingredients: 'Sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], azúcares añadidos (azúcar de caña), leche descremada, café, cocoa alcalina y saborizante artificial.', allergens: 'Contiene leche.', gtin: '707586716188', photo: '/assets/images/insumos/cappuccine/cappuccine-frosted-latte-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Frosted Latte, bolsa de 1.362 kg', ldName: 'Cappuccine Frosted Latte, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Frosted Latte, base en polvo para bebidas de cafetería. Latte helado de café con leche, endulzado; la marca lo describe como mezcla de café arábica de montaña con leche. Presentación: bolsa de 1.362 kg. Contiene leche.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['59 kcal (247 kJ) por 100 ml', '7 729 kcal (32 357 kJ) por envase'], rows: [{"label":"Proteínas","value":"0 g"}, {"label":"Grasas totales","value":"3 g"}, {"label":"Grasas saturadas","value":"3 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"8 g"}, {"label":"Azúcares","value":"4 g"}, {"label":"Azúcares añadidos","value":"4 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"17 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-002', apiName: 'CAPPUCCINE BASE EN POLVO SABOR LATTE FRAPPE BOLSA 1.362 kg', name: 'Latte Frappe', official: 'Cafe Latte', line: 'cafe-frappes-y-lattes', description: 'Café latte en polvo de sabor intenso a café, para frappé, caliente o sobre hielo.', presentation: 'Bolsa 1.362 kg', ingredients: 'Sustituto de crema [grasa vegetal hidrogenada, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], azúcares añadidos (azúcar de caña), leche descremada, café, cocoa alcalina, sólidos de la leche, saborizantes artificiales y saborizantes naturales.', allergens: 'Contiene leche.', gtin: '707586716560', photo: '/assets/images/insumos/cappuccine/cappuccine-latte-frappe-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Latte Frappe, bolsa de 1.362 kg', ldName: 'Cappuccine Latte Frappe, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Latte Frappe, base en polvo para bebidas de cafetería. Café latte en polvo de sabor intenso a café, para frappé, caliente o sobre hielo. Presentación: bolsa de 1.362 kg. Contiene leche.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['55 kcal (230 kJ) por 100 ml', '7 205 kcal (30 130 kJ) por envase'], rows: [{"label":"Proteínas","value":"1 g"}, {"label":"Grasas totales","value":"3 g"}, {"label":"Grasas saturadas","value":"3 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"6 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"1 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"24 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-003', apiName: 'CAPPUCCINE BASE EN POLVO SABOR DOUBLE ESPRESSO BOLSA 1.362 kg', name: 'Double Espresso', official: null, line: 'cafe-frappes-y-lattes', description: 'Sabor a doble shot de espresso con crema dulce.', presentation: 'Bolsa 1.362 kg', ingredients: 'Sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], azúcares añadidos (azúcar de caña), café, maltodextrina y cocoa alcalina.', allergens: 'Contiene caseinatos (leche).', gtin: '707586718328', photo: '/assets/images/insumos/cappuccine/cappuccine-double-espresso-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Double Espresso, bolsa de 1.362 kg', ldName: 'Cappuccine Double Espresso, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Double Espresso, base en polvo para bebidas de cafetería. Sabor a doble shot de espresso con crema dulce. Presentación: bolsa de 1.362 kg. Contiene caseinatos (leche).', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['46 kcal (193 kJ) por 100 ml', '6 026 kcal (25 283 kJ) por envase'], rows: [{"label":"Proteínas","value":"0 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"4 g"}, {"label":"Azúcares añadidos","value":"4 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"17 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene caseinatos (leche).'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-004', apiName: 'CAPPUCCINE BASE EN POLVO SABOR MOKA GLACIAR BOLSA 1.362 kg', name: 'Moka Glaciar', official: 'Mocha', line: 'cafe-frappes-y-lattes', description: 'Moka clásica: cacao con café arábica, para servir caliente, fría o frappé.', presentation: 'Bolsa 1.362 kg', ingredients: 'Sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], azúcares añadidos (azúcar de caña), leche descremada, café, cocoa alcalina, sólidos de la leche y saborizante natural.', allergens: 'Contiene leche.', gtin: '707586716348', photo: '/assets/images/insumos/cappuccine/cappuccine-moka-glaciar-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Moka Glaciar, bolsa de 1.362 kg', ldName: 'Cappuccine Moka Glaciar, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Moka Glaciar, base en polvo para bebidas de cafetería. Moka clásica: cacao con café arábica, para servir caliente, fría o frappé. Presentación: bolsa de 1.362 kg. Contiene leche.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['50 kcal (210 kJ) por 100 ml', '6 550 kcal (27 510 kJ) por envase'], rows: [{"label":"Proteínas","value":"1 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"1 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"25 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-005', apiName: 'CAPPUCCINE BASE EN POLVO SABOR MOKA FRAPPE BOLSA 1.362 kg', name: 'Moka Frappe', official: 'Double Chocolate Mocha', line: 'cafe-frappes-y-lattes', description: 'Moka oscura e intensa, de inspiración europea.', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (azúcar de caña), sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], café, cocoa alcalina, leche descremada, saborizantes naturales, saborizantes artificiales, sal, goma xantana, maltodextrina y sólidos de la leche.', allergens: 'Contiene leche.', gtin: '707586716584', photo: '/assets/images/insumos/cappuccine/cappuccine-moka-frappe-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Moka Frappe, bolsa de 1.362 kg', ldName: 'Cappuccine Moka Frappe, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Moka Frappe, base en polvo para bebidas de cafetería. Moka oscura e intensa, de inspiración europea. Presentación: bolsa de 1.362 kg. Contiene leche.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['50 kcal (210 kJ) por 100 ml', '6 550 kcal (27 510 kJ) por envase'], rows: [{"label":"Proteínas","value":"1 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"2 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"30 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-006', apiName: 'CAPPUCCINE BASE EN POLVO SABOR MOKA DOUBLE FUDGE BOLSA 1.362 kg', name: 'Moka Double Fudge', official: 'Fudge Mocha', line: 'cafe-frappes-y-lattes', description: 'Sabor a fudge dulce con café.', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (azúcar de caña), sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], cocoa alcalina, café, saborizantes artificiales, saborizantes naturales, sal y goma xantana.', allergens: 'Contiene caseinatos (leche).', gtin: '707586716423', photo: '/assets/images/insumos/cappuccine/cappuccine-moka-double-fudge-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Moka Double Fudge, bolsa de 1.362 kg', ldName: 'Cappuccine Moka Double Fudge, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Moka Double Fudge, base en polvo para bebidas de cafetería. Sabor a fudge dulce con café. Presentación: bolsa de 1.362 kg. Contiene caseinatos (leche).', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['50 kcal (210 kJ) por 100 ml', '6 550 kcal (27 510 kJ) por envase'], rows: [{"label":"Proteínas","value":"1 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"5 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"32 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene caseinatos (leche).'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-010', apiName: 'CAPPUCCINE BASE EN POLVO SABOR TOFFEE COFFEE BOLSA 1.362 kg', name: 'Toffee Coffee', official: 'Toffee Latte', line: 'cafe-frappes-y-lattes', description: 'Trocitos de toffee con mantequilla, un toque de chocolate y café.', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (azúcar de caña), sustituto de crema [grasa vegetal, azúcares añadidos (sólidos de jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial, bixina cis], trozos de caramelo [azúcares añadidos (azúcar de caña), sólidos de la leche, almendras, chocolate con leche [azúcares añadidos (azúcar de caña), manteca de cocoa, chocolate, leche descremada, crema, sólidos de la leche, lecitina de soya, sal, vainillina), leche, sal], leche descremada, café, cocoa alcalina, saborizantes naturales y sólidos de la leche.', allergens: 'Contiene leche.', gtin: '707586716508', photo: '/assets/images/insumos/cappuccine/cappuccine-toffee-coffee-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Toffee Coffee, bolsa de 1.362 kg', ldName: 'Cappuccine Toffee Coffee, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Toffee Coffee, base en polvo para bebidas de cafetería. Trocitos de toffee con mantequilla, un toque de chocolate y café. Presentación: bolsa de 1.362 kg. Contiene leche.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['50 kcal (210 kJ) por 100 ml', '6 550 kcal (27 510 kJ) por envase'], rows: [{"label":"Proteínas","value":"1 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"6 g"}, {"label":"Azúcares añadidos","value":"4 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"25 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-012', apiName: 'CAPPUCCINE BASE EN POLVO SABOR CARAMEL LATTE BOLSA 1.362 kg', name: 'Caramel Latte', official: null, line: 'cafe-frappes-y-lattes', description: 'Caramelo cremoso con un toque de café.', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (jarabe de maíz, azúcar de caña, dextrosa), sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], leche descremada, saborizantes naturales, saborizantes artificiales, caseinatos, sal, café, colorante artificial, goma xantana y cocoa alcalina.', allergens: 'Contiene leche.', gtin: '707586716485', photo: '/assets/images/insumos/cappuccine/cappuccine-caramel-latte-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Caramel Latte, bolsa de 1.362 kg', ldName: 'Cappuccine Caramel Latte, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Caramel Latte, base en polvo para bebidas de cafetería. Caramelo cremoso con un toque de café. Presentación: bolsa de 1.362 kg. Contiene leche.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['54 kcal (227 kJ) por 100 ml', '7 074 kcal (29 737 kJ) por envase'], rows: [{"label":"Proteínas","value":"1 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"8 g"}, {"label":"Azúcares","value":"6 g"}, {"label":"Azúcares añadidos","value":"6 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"38 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-009', apiName: 'CAPPUCCINE BASE EN POLVO SABOR CHOCOLATE WHITE SYMPHONY BOLSA 1.362 kg', name: 'Chocolate White Symphony', official: 'White Chocolate', line: 'dulces-y-postres', description: 'Chocolate blanco cremoso, sin café ni té; sirve solo o como base para otras bebidas.', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (azúcar de caña), sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], maltodextrina, saborizantes naturales, saborizantes artificiales, sal, goma xantana y cocoa alcalina.', allergens: 'Contiene caseinatos (leche).', gtin: '707586716546', photo: '/assets/images/insumos/cappuccine/cappuccine-chocolate-white-symphony-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Chocolate White Symphony, bolsa de 1.362 kg', ldName: 'Cappuccine Chocolate White Symphony, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Chocolate White Symphony, base en polvo para bebidas de cafetería. Chocolate blanco cremoso, sin café ni té; sirve solo o como base para otras bebidas. Presentación: bolsa de 1.362 kg. Contiene caseinatos (leche).', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['46 kcal (193 kJ) por 100 ml', '6 026 kcal (25 283 kJ) por envase'], rows: [{"label":"Proteínas","value":"0 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"5 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"41 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene caseinatos (leche).'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-014', apiName: 'CAPPUCCINE BASE EN POLVO SABOR PISTACHIO FRAPPE BOLSA 1.362 kg', name: 'Pistachio Frappe', official: 'Pistachio', line: 'dulces-y-postres', description: 'Sabor a pistache para frappé refrescante, sin café ni té.', presentation: 'Bolsa 1.362 kg', ingredients: 'Sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, dióxido de silicio, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, sal, lecitina de soya, carragenina, saborizante artificial y colorante artificial], azúcares añadidos (azúcar de caña y miel), maltodextrina, saborizantes naturales, saborizantes artificiales, emulsificante (mono y diglicéridos, leche descremada y almidón modificado), amarillo 5 (tartrazina) y azul 1.', allergens: 'Contiene leche y tartrazina.', gtin: '707586718076', photo: '/assets/images/insumos/cappuccine/cappuccine-pistachio-frappe-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Pistachio Frappe, bolsa de 1.362 kg', ldName: 'Cappuccine Pistachio Frappe, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Pistachio Frappe, base en polvo para bebidas de cafetería. Sabor a pistache para frappé refrescante, sin café ni té. Presentación: bolsa de 1.362 kg. Contiene leche y tartrazina.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['55 kcal (230 kJ) por 100 ml', '7 205 kcal (30 130 kJ) por envase'], rows: [{"label":"Proteínas","value":"0 g"}, {"label":"Grasas totales","value":"3 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"5 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"17 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche y tartrazina.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-015', apiName: 'CAPPUCCINE BASE EN POLVO SABOR COOKIES AND CREAM FRAPPE BOLSA 1.362 kg', name: 'Cookies and Cream Frappe', official: 'Cookies & Cream', line: 'dulces-y-postres', description: 'Crema dulce con trocitos de galleta de chocolate.', presentation: 'Bolsa 1.362 kg', ingredients: 'Sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], azúcares añadidos (azúcar de caña), galleta [harina (harina de trigo, niacina, hierro, tiamina, riboflavina y ácido fólico), azúcares añadidos (azúcar de caña y jarabe de alta fructosa), manteca vegetal, cocoa alcalina, bicarbonato de sodio, sal, lecitina de soya, chocolate y vainillina], maltodextrina, saborizantes naturales, saborizantes artificiales, cocoa alcalina y goma xantana.', allergens: 'Contiene caseinatos (leche) y trigo (gluten).', gtin: '707586719004', photo: '/assets/images/insumos/cappuccine/cappuccine-cookies-and-cream-frappe-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Cookies and Cream Frappe, bolsa de 1.362 kg', ldName: 'Cappuccine Cookies and Cream Frappe, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Cookies and Cream Frappe, base en polvo para bebidas de cafetería. Crema dulce con trocitos de galleta de chocolate. Presentación: bolsa de 1.362 kg. Contiene caseinatos (leche) y trigo (gluten).', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['50 kcal (210 kJ) por 100 ml', '6 550 kcal (27 510 kJ) por envase'], rows: [{"label":"Proteínas","value":"0 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"8 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"4 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"25 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene caseinatos (leche) y trigo (gluten).'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-016', apiName: 'CAPPUCCINE BASE EN POLVO SABOR RED VELVET BOLSA 1.362 kg', name: 'Red Velvet', official: null, line: 'dulces-y-postres', description: 'Sabor a pastel red velvet con cacao y su color rojo característico.', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (azúcar de caña), sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, dióxido de silicio, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], maltodextrina, saborizantes naturales, saborizantes artificiales, sólidos de la leche, leche descremada, cocoa alcalina, rojo 40 y goma xantana.', allergens: 'Contiene leche.', gtin: '707586718977', photo: '/assets/images/insumos/cappuccine/cappuccine-red-velvet-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Red Velvet, bolsa de 1.362 kg', ldName: 'Cappuccine Red Velvet, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Red Velvet, base en polvo para bebidas de cafetería. Sabor a pastel red velvet con cacao y su color rojo característico. Presentación: bolsa de 1.362 kg. Contiene leche.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['46 kcal (193 kJ) por 100 ml', '6 026 kcal (25 283 kJ) por envase'], rows: [{"label":"Proteínas","value":"0 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"5 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"26 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-022', apiName: 'CAPPUCCINE BASE EN POLVO SABOR VAINILLA SMOOTHIE MIX BOLSA 1.362 kg', name: 'Vainilla Smoothie Mix', official: 'Vanilla Smoothie', line: 'dulces-y-postres', description: 'Sabor y aroma de vainilla; la marca lo sugiere como base para bebidas con espresso.', presentation: 'Bolsa 1.362 kg', ingredients: 'Sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], azúcares añadidos (azúcar de caña), leche descremada, maltodextrina, saborizantes naturales, saborizantes artificiales y sólidos de la leche.', allergens: 'Contiene leche.', gtin: '707586716362', photo: '/assets/images/insumos/cappuccine/cappuccine-vainilla-smoothie-mix-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Vainilla Smoothie Mix, bolsa de 1.362 kg', ldName: 'Cappuccine Vainilla Smoothie Mix, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Vainilla Smoothie Mix, base en polvo para bebidas de cafetería. Sabor y aroma de vainilla; la marca lo sugiere como base para bebidas con espresso. Presentación: bolsa de 1.362 kg. Contiene leche.', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['50 kcal (210 kJ) por 100 ml', '6 550 kcal (27 510 kJ) por envase'], rows: [{"label":"Proteínas","value":"1 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"5 g"}, {"label":"Azúcares añadidos","value":"1 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"30 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene leche.'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-018', apiName: 'CAPPUCCINE BASE EN POLVO SABOR MATCHA FRAPPE BOLSA 1.362 kg', name: 'Matcha Frappe', official: 'Matcha Latte', line: 'te-matcha-y-chai', description: 'Té verde matcha en polvo para latte o frappé.', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (azúcar de caña), sustituto de crema [grasa vegetal, azúcares añadidos (jarabe de maíz y azúcar de caña), caseinatos, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal, lecitina de soya, carragenina, saborizante artificial y bixina cis], maltodextrina, té verde matcha, saborizantes naturales, saborizantes artificiales, sal y goma xantana.', allergens: 'Contiene caseinatos (leche).', gtin: '707586717123', photo: '/assets/images/insumos/cappuccine/cappuccine-matcha-frappe-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Matcha Frappe, bolsa de 1.362 kg', ldName: 'Cappuccine Matcha Frappe, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Matcha Frappe, base en polvo para bebidas de cafetería. Té verde matcha en polvo para latte o frappé. Presentación: bolsa de 1.362 kg. Contiene caseinatos (leche).', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['46 kcal (193 kJ) por 100 ml', '6 026 kcal (25 283 kJ) por envase'], rows: [{"label":"Proteínas","value":"0 g"}, {"label":"Grasas totales","value":"2 g"}, {"label":"Grasas saturadas","value":"2 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"7 g"}, {"label":"Azúcares","value":"6 g"}, {"label":"Azúcares añadidos","value":"5 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"25 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene caseinatos (leche).'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-020', apiName: 'CAPPUCCINE BASE EN POLVO SABOR CHAI VAINILLA BOLSA 1.362 kg', name: 'Chai Vainilla', official: 'Vanilla Chai Latte', line: 'te-matcha-y-chai', description: 'Chai con vainilla: té negro y mezcla de especias (canela, jengibre, clavo, cardamomo y anís).', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (azúcar de caña y miel), sustituto de crema [grasa vegetal, azúcares añadidos (sólidos de jarabe de maíz y azúcar de caña), caseinatos, fosfato tricálcico, fosfato dipotásico secundario, ésteres de propilenglicol de ácidos grasos, mono y diglicéridos, silicoaluminato de sodio, sal y saborizante artificial], sólidos de la leche, té (Camellia Sinensis), saborizantes artificiales, saborizantes naturales, mezcla de especias y sal.', allergens: 'Contiene caseinatos (leche).', gtin: '850025626149', photo: '/assets/images/insumos/cappuccine/cappuccine-chai-vainilla-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Chai Vainilla, bolsa de 1.362 kg', ldName: 'Cappuccine Chai Vainilla, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Chai Vainilla, base en polvo para bebidas de cafetería. Chai con vainilla: té negro y mezcla de especias (canela, jengibre, clavo, cardamomo y anís). Presentación: bolsa de 1.362 kg. Contiene caseinatos (leche).', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['45 kcal (190 kJ) por 100 ml', '5 895 kcal (24 890 kJ) por envase'], rows: [{"label":"Proteínas","value":"1 g"}, {"label":"Grasas totales","value":"1 g"}, {"label":"Grasas saturadas","value":"1 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"8 g"}, {"label":"Azúcares","value":"7 g"}, {"label":"Azúcares añadidos","value":"7 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"36 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene caseinatos (leche).'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
  { code: 'IBP-021', apiName: 'CAPPUCCINE BASE EN POLVO SABOR CHAI SPICE BOLSA 1.362 kg', name: 'Chai Spice', official: 'Spiced Chai Latte', line: 'te-matcha-y-chai', description: 'Chai especiado: té negro y mezcla de especias (canela, jengibre, clavo, cardamomo y anís).', presentation: 'Bolsa 1.362 kg', ingredients: 'Azúcares añadidos (azúcar de caña y miel), sustituto de crema [azúcares añadidos (jarabe de maíz), grasa vegetal, caseinatos, mono y diglicéridos, fosfato dipotásico secundario, fosfato tricálcico, lecitina de soya, saborizantes artificiales y colorante artificial], sólidos de la leche, té (Camellia Sinensis), saborizantes artificiales, saborizante natural, goma celulosa, mezcla de especias, sal y dióxido de silicio.', allergens: 'Contiene caseinatos (leche).', gtin: '850025626156', photo: '/assets/images/insumos/cappuccine/cappuccine-chai-spice-bolsa-1362g-2026-11-26-sin-fondo.webp', photoAlt: 'Cappuccine Chai Spice, bolsa de 1.362 kg', ldName: 'Cappuccine Chai Spice, base en polvo, bolsa 1.362 kg', ldDescription: 'Cappuccine Chai Spice, base en polvo para bebidas de cafetería. Chai especiado: té negro y mezcla de especias (canela, jengibre, clavo, cardamomo y anís). Presentación: bolsa de 1.362 kg. Contiene caseinatos (leche).', yield: '10.41 g por 100 ml de bebida preparada (aprox. 131 porciones por bolsa)', nutrition: { title: 'Declaración nutrimental', basis: 'Por 100 ml de bebida preparada, según las instrucciones de preparación contenidas en el envase (aprox. 131 porciones por bolsa)', energy: ['45 kcal (190 kJ) por 100 ml', '5 895 kcal (24 890 kJ) por envase'], rows: [{"label":"Proteínas","value":"0 g"}, {"label":"Grasas totales","value":"1 g"}, {"label":"Grasas saturadas","value":"1 g","strong":true}, {"label":"Grasas trans","value":"0 mg","strong":true}, {"label":"Hidratos de carbono disponibles","value":"9 g"}, {"label":"Azúcares","value":"7 g"}, {"label":"Azúcares añadidos","value":"4 g","strong":true}, {"label":"Fibra dietética","value":"0 g"}, {"label":"Sodio","value":"35 mg","strong":true}], notes: ['La bolsa lleva los sellos EXCESO CALORÍAS, EXCESO AZÚCARES y EXCESO GRASAS SATURADAS.', 'Contiene caseinatos (leche).'], source: 'Fuente: etiqueta de la bolsa de 1.362 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.' } },
];

export const DON_GUSTAVO_PRODUCTS: PbProduct[] = [
  { code: 'ICP-001', apiName: 'DON GUSTAVO CHOCOLATE EN POLVO BOLSA DE 2kg', name: 'Chocolate en polvo Don Gustavo', official: null, line: 'chocolate-en-polvo', description: 'Chocolate Don Gustavo en polvo, chocolate mexicano tradicional con canela. Presentación de 2.025 kg.', presentation: '2.025 kg', ingredients: 'Azúcares añadidos (azúcar), pasta de cacao, cacahuate, cocoa, lecitina de soya, canela.', allergens: 'Contiene soya y cacahuate.', gtin: '630492113539', photo: '/assets/images/insumos/don-gustavo/chocolate-don-gustavo-caja-2025kg-2026-11-26.webp', photoAlt: 'Chocolate en polvo Don Gustavo 2.025 kg', ldName: 'Chocolate en polvo Don Gustavo 2.025 kg', ldDescription: 'Chocolate Don Gustavo en polvo, chocolate mexicano tradicional con canela. Presentación de 2.025 kg. 50 g por bebida de 480 ml, 40 bebidas por empaque. Contiene soya y cacahuate. Vegetariano y vegano.', yield: '50 g por bebida de 480 ml, 40 bebidas por empaque', vegetarian: true, vegan: true }
];

const BASES = '/insumos-para-cafeterias/bases-en-polvo';
const ALSO: Record<string, PbLink> = {
  'cool-capps': { t: 'Cool Capps', route: BASES + '/cool-capps' },
  mocafe: { t: 'Mocafe', route: BASES + '/mocafe' },
  'david-rio': { t: 'David Rio', route: BASES + '/david-rio' },
  chillout: { t: 'ChillOut', route: BASES + '/chillout' },
  hollander: { t: 'Hollander', route: BASES + '/hollander' },
  cappuccine: { t: 'Cappuccine', route: BASES + '/cappuccine' },
  'don-gustavo': { t: 'Don Gustavo', route: BASES + '/don-gustavo' },
  torani: { t: 'Torani', route: '/insumos-para-cafeterias/jarabes/torani' }
};
const also = (...ids: string[]) => ids.map((i) => ALSO[i]);
const CONSULT: PbLink = { t: 'Hablar con un asesor', route: '/contacto' };

export const HOLLANDER_BRAND: PbBrand = {
  id: 'hollander',
  brandName: 'Hollander',
  path: BASES + '/hollander',
  title: 'Hollander: chocolate en polvo para cafetería | Etrusca',
  description: 'Chocolate en polvo Hollander: dulce, crème para frappé y Velvet Dark. Bolsas de 1.13 kg para bebidas calientes y frías en Café Etrusca.',
  keywords: 'hollander chocolate, chocolate hollander, chocolate en polvo hollander, hollander velvet dark, chocolate holandés en polvo, base para frappé de chocolate, chocolate en polvo para cafetería, Café Etrusca',
  datePublished: '2026-11-26',
  logo: { src: 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/bases/logo-6.webp', alt: 'Hollander', width: 251, height: 90 },
  h1Main: 'Hollander Chocolate ',
  h1Sub: 'para cafetería',
  leadAccent: 'Chocolate en polvo y crème para frappé',
  leadRest: ' para tu cafetería',
  body:
    'Hollander Chocolate (Hollander Chocolate Co., de Wisconsin, EE. UU.) es una marca de chocolate en polvo y bases para bebidas de cafetería: mochas, chocolate caliente y frappés. ' +
    'En Café Etrusca hay 3 productos en bolsa de 1.13 kg.',
  facts: [{ n: '2', label: 'líneas' }, { n: '3', label: 'sabores' }, { n: '3', label: 'claves' }],
  single: false,
  linesTitle: 'Productos Hollander',
  lines: [
    { anchor: 'chocolate-en-polvo', name: 'Hollander', sub: 'CHOCOLATE EN POLVO', tone: 'cyan', description: 'Para mochas, chocolate caliente, bebidas frías y salsa de chocolate casera.', cover: 'ICP-004' },
    { anchor: 'creme-para-frappe', name: 'Hollander', sub: 'CRÈME PARA FRAPPÉ', tone: 'coral', description: 'Base para frappés licuados, smoothies, malteadas y bebidas artesanales.', cover: 'ICP-006' }
  ],
  products: HOLLANDER_PRODUCTS,
  heroCodes: ['ICP-004', 'ICP-006', 'ICP-008'],
  presentationTitle: 'Bolsa de 1.13 kg',
  presentationText: 'Los 3 productos Hollander de Café Etrusca vienen en bolsa de 1.13 kg (2.5 lb en la marca).',
  presentationChips: ['Bolsa 1.13 kg'],
  presentationPhoto: 'ICP-004',
  prepIntro: 'La cantidad de polvo por bebida depende de tu receta y del tamaño de tu vaso: según preparación. Un asesor te ayuda a armar tu receta.',
  prepCards: [
    { h: 'Chocolate en polvo', p: 'Para mochas, chocolate caliente, bebidas frías y salsa de chocolate casera.' },
    { h: 'Crème para frappé', p: 'Para frappés licuados, smoothies, malteadas y granizados.' },
    { h: 'Conservación', p: STORAGE }
  ],
  storage: STORAGE,
  ideasText: 'Ideas de frappé y bebidas de temporada en nuestro blog y en el recetario. Aún no hay fichas de receta con chocolate en polvo Hollander como ingrediente.',
  ideasLinks: [
    { t: 'Ver todas las recetas', route: '/recetas' },
    { t: 'Frappé para cafetería', route: '/blog/frappe-para-cafeteria' },
    { t: 'Bebidas navideñas para cafetería', route: '/blog/bebidas-navidenas-para-cafeteria' }
  ],
  extraBlock: {
    title: '¿Buscas las salsas Hollander?',
    text: 'Las salsas Hollander (chocolate, caramelo y pumpkin pie) viven en la categoría de salsas.',
    links: [{ t: 'Ver salsas', route: '/insumos-para-cafeterias/salsas' }]
  },
  calcTitle: '¿Cuánto cobrar por una bebida de chocolate?',
  calcText: 'Con la calculadora de Café Etrusca calculas el costo por vaso y tu precio de venta a partir de los insumos de tu receta.',
  alsoLinks: also('cool-capps', 'mocafe', 'david-rio', 'chillout', 'cappuccine', 'don-gustavo', 'torani'),
  faq: [
    { q: '¿Qué es Hollander Chocolate?', a: 'Es una marca de chocolate en polvo y bases para bebidas de cafetería, de Hollander Chocolate Co. (Wisconsin, EE. UU.). Sus productos sirven para mochas, chocolate caliente, bebidas frías y frappés.' },
    { q: '¿Qué productos Hollander hay en polvo?', a: 'En Café Etrusca hay tres, todos en bolsa de 1.13 kg: Chocolate dulce en polvo, Velvet Dark y Chocolate crème (base para frappé).' },
    { q: '¿Qué diferencia hay entre el chocolate dulce y el Velvet Dark?', a: 'Ambos son chocolate en polvo para bebidas; el Velvet Dark es de cacao más oscuro (la marca lo describe como alto en cacao y de sabor más intenso).' },
    { q: '¿Es vegano? ¿Qué alérgenos tiene?', a: 'Según nuestra ficha, el chocolate dulce en polvo es vegetariano y vegano y no declara alérgenos; el chocolate crème contiene leche (lácteos) y es vegetariano, no vegano. Revisa siempre la etiqueta de cada bolsa.' },
    { q: '¿Cuánto cobrar por una bebida de chocolate?', a: 'Usa la calculadora de precios de Café Etrusca con tu costo por bolsa y el tamaño de tu vaso.' },
    { q: '¿Dónde compro Hollander?', a: 'En sucursales Café Etrusca, en la tienda en línea y con asesoría para negocios en etrusca.biz o en la página de contacto. Mayoreo y menudeo. Las salsas Hollander están en la categoría de salsas.' }
  ],
  ctaTitle: '¿Buscas Hollander para tu negocio?',
  storeUrl: 'https://tienda.cafeetrusca.com/productos?search=HOLLANDER',
  nutrition: null,
  ogPhoto: '/assets/images/insumos/hollander/ICP-004.webp'
};

export const CAPPUCCINE_BRAND: PbBrand = {
  id: 'cappuccine',
  brandName: 'Cappuccine',
  path: BASES + '/cappuccine',
  title: 'Cappuccine para cafetería: lattes, moka y chai | Etrusca',
  description: 'Bases en polvo Cappuccine en 16 sabores: latte, moka, red velvet, matcha y chai. Bolsa de 1.362 kg para bebidas calientes, frías y frappés.',
  keywords: 'cappuccine, capuccine, base cappuccine, cappuccine red velvet, cappuccine latte frappe, cappuccine double espresso, cappuccine chocolate blanco, cappuccine chai, cappuccine matcha, Café Etrusca',
  datePublished: '2026-11-26',
  logo: { src: 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/bases/logo-5.webp', alt: 'Cappuccine', width: 150, height: 54 },
  h1Main: 'Cappuccine ',
  h1Sub: 'para cafetería',
  leadAccent: 'Lattes, moka, matcha y chai',
  leadRest: ' en bases en polvo',
  body:
    'Cappuccine es una marca estadounidense de premezclas en polvo para frappés, lattes, moka, matcha y chai (la marca dice «desde 1991» y «100% Made in the US»). ' +
    'Se preparan frías, calientes o en frappé. En Café Etrusca hay 16 sabores en bolsa de 1.362 kg.',
  facts: [{ n: '3', label: 'líneas' }, { n: '16', label: 'sabores' }, { n: '16', label: 'claves' }],
  single: false,
  linesTitle: 'Sabores de Cappuccine',
  lines: [
    { anchor: 'cafe-frappes-y-lattes', name: 'Cappuccine', sub: 'CAFÉ: FRAPPÉS Y LATTES', tone: 'yellow', description: 'Frappés y lattes con café: latte, espresso, moka, toffee y caramelo.', cover: 'IBP-002' },
    { anchor: 'dulces-y-postres', name: 'Cappuccine', sub: 'DULCES Y POSTRES', tone: 'coral', description: 'Sabores dulces y de postre sin café en su lista de ingredientes: chocolate blanco, pistache, cookies and cream, red velvet y vainilla.', cover: 'IBP-016' },
    { anchor: 'te-matcha-y-chai', name: 'Cappuccine', sub: 'TÉ: MATCHA Y CHAI', tone: 'lime', description: 'Matcha y dos chai (vainilla y especiado) para lattes y frappés.', cover: 'IBP-018' }
  ],
  products: CAPPUCCINE_PRODUCTS,
  heroCodes: ['IBP-010', 'IBP-018', 'IBP-016'],
  presentationTitle: 'Bolsa de 1.362 kg',
  presentationText: 'Los 16 sabores de Cappuccine en Café Etrusca vienen en una sola presentación: bolsa de 1.362 kg.',
  presentationChips: ['Bolsa 1.362 kg'],
  presentationPhoto: 'IBP-018',
  prepIntro: 'La etiqueta indica cómo preparar una bebida de 3.38 fl oz (100 ml): 1.26 fl oz (37.5 ml) de agua, 10.41 g de premezcla y un vaso al ras de 1.75 oz (52 g) de hielo; licue hasta obtener una textura frappé. Son aprox. 131 porciones de 100 ml por bolsa de 1.362 kg. Un asesor te ayuda a armar el tamaño de tu vaso.',
  prepCards: [
    { h: 'Frappé de 100 ml (etiqueta)', p: 'En el vaso de la licuadora: 1.26 fl oz (37.5 ml) de agua, 10.41 g de premezcla y un vaso al ras de 1.75 oz (52 g) de hielo. Licue hasta obtener una textura frappé. Indicaciones de la etiqueta, para una bebida de 3.38 fl oz (100 ml).' },
    { h: 'Frappé original de 480 ml (etiqueta)', p: 'En la licuadora: 5 fl oz (150 ml) de leche, agua o café, 2 scoops (70 cc) de premezcla y 14 oz (420 ml) de hielo; licue hasta que quede suave. Indicaciones de la etiqueta, para una bebida de 16 fl oz (480 ml).' },
    { h: 'Con hielo o caliente (etiqueta)', p: 'Con hielo: 1½ scoops de premezcla en 4 fl oz (120 ml) de leche o agua caliente, disuelva, agregue 4 fl oz (120 ml) de leche fría y sirva en un vaso de 16 fl oz (480 ml) con hielo. Caliente: 2 scoops en 14 fl oz (420 ml) de leche o agua caliente, disuelva y sirva. Opción espresso: sustituya 1–2 fl oz (30–60 ml) de líquido por espresso. Indicaciones de la etiqueta.' }
  ],
  storage: STORAGE,
  ideasText: 'Recetas del sitio que llevan Cappuccine: Red velvet bombón, Rojo pasión Foam, Caramelo navideño caliente (con Toffee coffee) y Caramelo navideño frappé (con Chocolate white symphony).',
  ideasLinks: [
    { t: 'Red velvet bombón', route: '/recetas/red-velvet-bombon' },
    { t: 'Rojo pasión Foam', route: '/recetas/rojo-pasion-foam' },
    { t: 'Caramelo navideño caliente', route: '/recetas/caramelo-navideno-caliente' },
    { t: 'Caramelo navideño frappé', route: '/recetas/caramelo-navideno-frio' },
    { t: 'Ver todas las recetas', route: '/recetas' }
  ],
  extraBlock: null,
  calcTitle: '¿Cuánto cobrar por un frappé o latte?',
  calcText: 'Con la calculadora de Café Etrusca calculas el costo por vaso y tu precio de venta a partir de los insumos de tu receta.',
  alsoLinks: also('cool-capps', 'mocafe', 'david-rio', 'chillout', 'hollander', 'don-gustavo', 'torani'),
  faq: [
    { q: '¿Qué es Cappuccine?', a: 'Cappuccine es una marca estadounidense de premezclas en polvo para frappés, lattes, moka, té y chai que la marca fabrica desde 1991. Se preparan frías, calientes o en frappé. En Café Etrusca hay 16 sabores en bolsa de 1.362 kg.' },
    { q: '¿Cuántos sabores de Cappuccine hay en Café Etrusca?', a: 'Hay 16 sabores: 8 con café (frappés y lattes), 5 dulces y de postre sin café en su lista de ingredientes, y 3 de té (matcha y dos chai).' },
    { q: '¿Qué presentación tiene Cappuccine?', a: 'Todos los sabores vienen en bolsa de 1.362 kg.' },
    { q: '¿Cappuccine es vegano?', a: 'Los 16 sabores contienen leche o caseinatos (leche); no son veganos. Revisa la lista de ingredientes y alérgenos de cada sabor en esta página y en el empaque.' },
    { q: '¿Cómo se prepara Cappuccine?', a: 'Para 100 ml de bebida preparada se usan 10.41 g de premezcla, 37.5 ml de agua y 52 g de hielo, licuados hasta textura frappé (aprox. 131 porciones por bolsa de 1.362 kg). La misma etiqueta trae indicaciones para frappé, con hielo o caliente en un vaso de 16 fl oz (480 ml).' },
    { q: '¿Se puede preparar Cappuccine caliente?', a: 'Sí. La etiqueta indica una preparación caliente: 2 scoops de premezcla en 14 fl oz (420 ml) de leche o agua caliente, disuelva y sirva. También trae indicaciones para frappé y para servir con hielo.' },
    { q: '¿Qué recetas llevan Cappuccine?', a: 'En nuestras recetas hay el Red velvet bombón, el Rojo pasión Foam, el Caramelo navideño caliente (con Toffee coffee) y el Caramelo navideño frappé (con Chocolate white symphony). Míralas en el recetario.' },
    { q: '¿Cómo se conserva Cappuccine?', a: 'En un lugar fresco y seco.' },
    { q: '¿Cuánto cobrar por un frappé o latte con Cappuccine?', a: 'Usa la calculadora de precios de Café Etrusca con tu costo por bolsa y el tamaño de tu vaso.' },
    { q: '¿Dónde compro Cappuccine?', a: 'En sucursales Café Etrusca, en la tienda en línea y con asesoría para negocios en etrusca.biz o en la página de contacto. Mayoreo y menudeo.' }
  ],
  ctaTitle: '¿Buscas Cappuccine para tu negocio?',
  storeUrl: 'https://tienda.cafeetrusca.com/productos?search=CAPPUCCINE',
  nutrition: null,
  ogPhoto: '/assets/images/insumos/cappuccine/IBP-016.webp'
};

export const DON_GUSTAVO_BRAND: PbBrand = {
  id: 'don-gustavo',
  brandName: 'Don Gustavo',
  path: BASES + '/don-gustavo',
  title: 'Chocolate Don Gustavo en polvo para cafetería | Etrusca',
  description: 'Chocolate en polvo Don Gustavo: chocolate mexicano tradicional para preparar bebidas de chocolate en tu cafetería. Presentación de 2.025 kg en Café Etrusca.',
  keywords: 'chocolate don gustavo, don gustavo chocolate, chocolate don gustavo ingredientes, chocolate granulado don gustavo, chocolate en polvo para cafetería, chocolate mexicano en polvo, Café Etrusca',
  datePublished: '2026-11-26',
  logo: null,
  h1Main: 'Chocolate Don Gustavo ',
  h1Sub: 'para cafetería',
  leadAccent: 'Chocolate mexicano en polvo',
  leadRest: ' para tus bebidas de chocolate',
  body:
    'Chocolate Don Gustavo es chocolate mexicano tradicional de una empresa familiar de Guadalajara; en Café Etrusca lo manejamos en polvo, en presentación de 2.025 kg, para preparar bebidas de chocolate en cafetería. ' +
    'Según la marca, tiene más de 100 años de historia.',
  facts: [{ n: '1', label: 'sabor' }, { n: '2.025 kg', label: 'presentación' }, { n: '40', label: 'bebidas por empaque' }],
  single: true,
  linesTitle: 'Chocolate en polvo Don Gustavo',
  lines: [
    { anchor: 'chocolate-en-polvo', name: 'Don Gustavo', sub: 'CHOCOLATE EN POLVO', tone: 'lime', description: 'Chocolate Don Gustavo en polvo, chocolate mexicano tradicional con canela. Presentación de 2.025 kg.', cover: 'ICP-001' }
  ],
  products: DON_GUSTAVO_PRODUCTS,
  heroCodes: ['ICP-001'],
  presentationTitle: '2.025 kg',
  presentationText: 'En Café Etrusca el chocolate Don Gustavo en polvo se maneja en una sola presentación: 2.025 kg (clave ICP-001). Según la ficha del producto, rinde 40 bebidas de 480 ml con 50 g de polvo por bebida.',
  presentationChips: ['2.025 kg'],
  presentationPhoto: 'ICP-001',
  prepIntro: 'Según la ficha del producto, se usan 50 g de polvo por bebida de 480 ml (40 bebidas por empaque de 2.025 kg). La etiqueta de la caja no trae modo de preparación; un asesor te ayuda a armar tu receta.',
  prepCards: [],
  storage: '',
  ideasText: 'Ideas de bebidas de chocolate en el recetario. Aún no hay fichas de receta con Don Gustavo como ingrediente.',
  ideasLinks: [{ t: 'Ver todas las recetas', route: '/recetas' }],
  extraBlock: null,
  calcTitle: '¿Cuánto cobrar por una bebida de chocolate?',
  calcText: 'Con la calculadora de Café Etrusca calculas el costo por vaso y tu precio de venta a partir de los insumos de tu receta.',
  alsoLinks: also('chillout', 'hollander', 'cappuccine', 'cool-capps', 'mocafe', 'david-rio', 'torani'),
  faq: [
    { q: '¿Qué es el chocolate Don Gustavo en polvo?', a: 'Es chocolate mexicano tradicional de la marca Don Gustavo, que en Café Etrusca manejamos en polvo en presentación de 2.025 kg para preparar bebidas de chocolate en cafetería.' },
    { q: '¿Qué ingredientes tiene el chocolate Don Gustavo?', a: 'Azúcares añadidos (azúcar), pasta de cacao, cacahuate, cocoa, lecitina de soya y canela. Contiene soya y cacahuate.' },
    { q: '¿Qué alérgenos tiene el chocolate Don Gustavo?', a: 'Contiene soya (lecitina de soya) y cacahuate. Revisa también la etiqueta del empaque.' },
    { q: '¿Cuántas bebidas salen de un empaque?', a: 'Según la ficha del producto, 50 g por bebida de 480 ml, 40 bebidas por empaque de 2.025 kg.' },
    { q: '¿Es vegetariano o vegano?', a: 'Según la ficha del producto, el chocolate Don Gustavo es vegetariano y vegano. Contiene soya y cacahuate; revisa la etiqueta del empaque.' },
    { q: '¿Qué sellos de advertencia lleva?', a: 'La etiqueta de la caja lleva los sellos EXCESO CALORÍAS y EXCESO AZÚCARES. Consulta la declaración nutrimental en esta página y en el empaque.' },
    { q: '¿Cuánto cuesta el chocolate Don Gustavo?', a: 'El precio cambia; consúltalo actualizado en la tienda en línea o con un asesor, y usa la calculadora de precios para saber cuánto cobrar por bebida.' },
    { q: '¿Dónde compro chocolate Don Gustavo?', a: 'En sucursales Café Etrusca, en la tienda en línea y con asesoría para negocios en etrusca.biz o en la página de contacto. Mayoreo y menudeo.' },
    { q: '¿Cuánto cobrar por una bebida de chocolate?', a: 'Usa la calculadora de precios con tu costo por envase y el tamaño de tu vaso.' }
  ],
  ctaTitle: '¿Buscas chocolate Don Gustavo para tu negocio?',
  storeUrl: 'https://tienda.cafeetrusca.com/productos?search=DON%20GUSTAVO',
  nutrition: {
    title: 'Declaración nutrimental',
    basis: 'Por 100 ml de producto preparado, de acuerdo con el modo de preparación de la etiqueta',
    energy: ['68.5 kcal (288.5 kJ) por 100 ml', '20 550 kcal (86 550 kJ) por envase'],
    rows: [
      { label: 'Proteínas', value: '3.2 g' },
      { label: 'Grasas totales', value: '2.1 g' },
      { label: 'Grasas saturadas', value: '1.2 g', strong: true },
      { label: 'Grasas trans', value: '0 mg', strong: true },
      { label: 'Hidratos de carbono disponibles', value: '9.2 g' },
      { label: 'Azúcares', value: '8.4 g' },
      { label: 'Azúcares añadidos', value: '4.1 g', strong: true },
      { label: 'Fibra dietética', value: '0.2 g' },
      { label: 'Sodio', value: '42 mg', strong: true }
    ],
    notes: [
      'La caja lleva los sellos EXCESO CALORÍAS y EXCESO AZÚCARES.',
      'Dato de la etiqueta: sin saborizantes artificiales.'
    ],
    source: 'Fuente: etiqueta de la caja de 2.025 kg (revisión de Café Etrusca, 26 nov 2026). Revisa siempre el empaque de tu producto.'
  },
  ogPhoto: '/assets/images/insumos/don-gustavo/chocolate-don-gustavo-caja-2025kg-2026-11-26.webp'
};

export const PB_BRANDS: Record<string, PbBrand> = {
  hollander: HOLLANDER_BRAND,
  cappuccine: CAPPUCCINE_BRAND,
  'don-gustavo': DON_GUSTAVO_BRAND,
  'tea-zone': TEA_ZONE_BRAND
};
export { CONSULT as PB_CONSULT };
