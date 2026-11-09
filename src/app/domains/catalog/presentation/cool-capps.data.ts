import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';
/**
 * Datos de /insumos-para-cafeterias/bases-en-polvo/cool-capps/.
 * Brief: /workspace/etrusca/briefs/2026-11-09-brief-cool-capps.md
 * Solo 22 claves API línea COOL CAPPS (9 nov 2026). Sin precios/promos/stock.
 * Prep/rendimiento/alérgenos: PDFs NUTRIMENTAL MX. Gramos prep 1.36 kg (salvo 208): pendientes.
 */

export interface CoolCappsProduct {
  code: string;
  name: string;
  official: string;
  description: string;
  presentation: string;
  apiName: string;
  allergens: string;
  yield: string;
  /** Prep en gramos; vacío si pendiente */
  prep?: string;
}

export interface CoolCappsLine {
  anchor: string;
  name: string;
  sub: string;
  description: string;
  cover: string;
  tone: 'yellow' | 'cyan' | 'lime' | 'coral';
  products: CoolCappsProduct[];
}

const CC_IMG = 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/cool-capps';
const JAR = `${ASSETS_BASE_URL}/images/insumos/jarabes`;

export const COOL_CAPPS_PHOTOS: Record<string, string> = {
  'IBP-071': `${CC_IMG}/IBP-071-2026-11-09.webp`,
  'IBP-072': `${CC_IMG}/IBP-072-2026-11-09.webp`,
  'IBP-073': `${CC_IMG}/IBP-073-2026-11-09.webp`,
  'IBP-074': `${CC_IMG}/IBP-074-2026-11-09.webp`,
  'IBP-075': `${CC_IMG}/IBP-075-2026-11-09.webp`,
  'IBP-076': `${CC_IMG}/IBP-076-2026-11-09.webp`,
  'IBP-077': `${CC_IMG}/IBP-077-2026-11-09.webp`,
  'IBP-078': `${CC_IMG}/IBP-078-2026-11-09.webp`,
  'IBP-079': `${CC_IMG}/IBP-079-2026-11-09.webp`,
  'IBP-081': `${CC_IMG}/IBP-081-2026-11-09.webp`,
  'IBP-082': `${CC_IMG}/IBP-082-2026-11-09.webp`,
  'IBP-083': `${CC_IMG}/IBP-083-2026-11-09.webp`,
  'IBP-084': `${CC_IMG}/IBP-084-2026-11-09.webp`,
  'IBP-208': `${CC_IMG}/IBP-208-2026-11-09.webp`,
  'IBP-237': `${CC_IMG}/IBP-237-2026-11-09.webp`,
  'IBP-238': `${CC_IMG}/IBP-238-2026-11-09.webp`,
  'IBP-242': `${CC_IMG}/IBP-242-2026-11-09.webp`,
  'IBP-243': `${CC_IMG}/IBP-243-2026-11-09.webp`,
  'IBP-244': `${CC_IMG}/IBP-244-2026-11-09.webp`,
  'IBP-249': `${CC_IMG}/IBP-249-2026-11-09.webp`,
  'IBP-262': `${CC_IMG}/IBP-262-2026-11-09.webp`,
  'IBP-277': `${CC_IMG}/IBP-277-2026-11-09.webp`
};

export const COOL_CAPPS_STORE_URL = 'https://tienda.cafeetrusca.com/productos?search=COOL%20CAPP';

const B158 = 'Bolsa 1.58 kg';
const B136 = 'Bolsa 1.36 kg';
const Y152 = 'Rinde aprox. 152 bebidas de 100 ml';
const Y908 = 'Rinde aprox. 90.8 bebidas de 100 ml';
const Y78 = 'Rinde aprox. 78 bebidas de 100 ml';
const Y130 = 'Rinde aprox. 130.6 bebidas de 100 ml';
const PREP_STD = '10.41 g de polvo + 37.5 ml de agua + 52 g de hielo (vaso 100 ml)';
const PREP_DM = '17.5 g de polvo + 37.5 ml de agua + 52 g de hielo (vaso 100 ml)';
const PREP_M136 = '17.5 g de polvo + 31.25 ml de agua + 37.5 g de hielo (vaso 100 ml)';
const DAIRY = 'Contiene leche';

export const COOL_CAPPS_LINES: CoolCappsLine[] = [
  {
    anchor: 'frappes-lattes',
    name: 'Cool Capps',
    sub: 'FRAPPÉS Y LATTES DE CAFÉ',
    cover: 'IBP-074',
    tone: 'coral',
    description: 'Bases con café arábica para frappé, latte o bebida caliente: moka, doble moka, capuccino, vainilla, coffee toffee y cookies & cream.',
    products: [
      { code: 'IBP-074', name: 'Moka', official: 'Mocha', description: 'Mocha con carácter de espresso y chocolate; base versátil caliente, fría o frappé.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR MOKA BOLSA 1.58 kg', allergens: 'Contiene leche. Puede contener: huevo, soya, nueces de árbol y trigo.', yield: Y152, prep: PREP_STD },
      { code: 'IBP-077', name: 'Doble moka', official: 'Double Mocha Java', description: 'Mocha de doble intensidad: espresso oscuro con capa fuerte de chocolate.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR DOBLE MOKA  BOLSA 1.58 kg', allergens: 'Contiene leche. Puede contener huevo, soya, nueces y trigo.', yield: Y908, prep: PREP_DM },
      { code: 'IBP-262', name: 'Doble moka', official: 'Double Mocha Java', description: 'Mocha de doble intensidad: espresso oscuro con capa fuerte de chocolate.', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR DOBLE MOKA  BOLSA 1.36kg', allergens: 'Contiene leche. Puede contener huevo, soya, nueces y trigo.', yield: Y130 },
      { code: 'IBP-078', name: 'Capuccino', official: 'Cappuccino', description: 'Latte/cappuccino en polvo de la línea Coffee Classics.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR CAPUCCINO BOLSA 1.58 kg', allergens: DAIRY, yield: Y152, prep: PREP_STD },
      { code: 'IBP-237', name: 'Capuccino', official: 'Cappuccino', description: 'Latte/cappuccino en polvo de la línea Coffee Classics.', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR CAPUCCINO BOLSA 1.36 kg', allergens: DAIRY, yield: Y130 },
      { code: 'IBP-075', name: 'Vainilla', official: 'Vanilla Latte', description: 'Café con vainilla; perfil coffee-forward según la ficha oficial.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR VAINILLA BOLSA 1.58 kg', allergens: DAIRY, yield: Y152, prep: PREP_STD },
      { code: 'IBP-277', name: 'Vainilla', official: 'Vanilla Latte', description: 'Café con vainilla; perfil coffee-forward según la ficha oficial.', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR VAINILLA BOLSA 1.36 kg', allergens: DAIRY, yield: Y130 },
      { code: 'IBP-076', name: 'Coffee toffee', official: 'Coffee Toffee', description: 'Café con toffee.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR COFFEE TOFFEE BOLSA 1.58 kg', allergens: 'Contiene leche y nueces.', yield: Y152, prep: PREP_STD },
      { code: 'IBP-244', name: 'Coffee toffee', official: 'Coffee Toffee', description: 'Café con toffee.', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR COFFEE TOFFEE BOLSA 1.36 kg', allergens: 'Contiene leche y nueces.', yield: Y130 },
      { code: 'IBP-071', name: 'Cookies & cream', official: 'Cookies & Cream', description: 'Galleta con crema; la fórmula incluye café arábica y trigo.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR COOKIES & CREAM BOLSA 1.58 kg', allergens: DAIRY, yield: Y152, prep: PREP_STD },
      { code: 'IBP-243', name: 'Cookies & cream', official: 'Cookies & Cream', description: 'Galleta con crema; la fórmula incluye café arábica y trigo.', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR COOKIES & CREAM BOLSA 1.36 kg', allergens: DAIRY, yield: Y130 }
    ]
  },
  {
    anchor: 'cremas-smoothies',
    name: 'Cool Capps',
    sub: 'CREMAS Y SMOOTHIES',
    cover: 'IBP-082',
    tone: 'yellow',
    description: 'Bases cremosas sin café en ficha: chocolate blanco, fresa y vainilla smoothie.',
    products: [
      { code: 'IBP-079', name: 'Chocolate blanco', official: 'White Chocolate', description: 'Base cremosa de chocolate blanco.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR CHOCOLATE BLANCO BOLSA 1.58 kg', allergens: DAIRY, yield: Y152, prep: PREP_STD },
      { code: 'IBP-249', name: 'Chocolate blanco', official: 'White Chocolate', description: 'Base cremosa de chocolate blanco.', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR CHOCOLATE BLANCO BOLSA 1.36 kg', allergens: DAIRY, yield: Y130 },
      { code: 'IBP-082', name: 'Fresa', official: 'Strawberry', description: 'Base tipo strawberry cream con fresas deshidratadas.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR FRESA BOLSA 1.58 kg', allergens: 'Contiene Rojo 40 y caseinatos (leche).', yield: Y152, prep: PREP_STD },
      { code: 'IBP-242', name: 'Fresa', official: 'Strawberry', description: 'Base tipo strawberry cream con fresas deshidratadas.', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR FRESA BOLSA 1.36kg', allergens: 'Contiene Rojo 40 y caseinatos (leche).', yield: Y130 },
      { code: 'IBP-073', name: 'Vainilla smoothie', official: 'Vanilla Smoothie', description: 'Base cremosa con vainilla de Tahití (ficha oficial).', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR VAINILLA SMOOTHIE BOLSA 1.58 kg', allergens: DAIRY, yield: Y152, prep: PREP_STD },
      { code: 'IBP-238', name: 'Vainilla smoothie', official: 'Vanilla Smoothie', description: 'Base cremosa con vainilla de Tahití (ficha oficial).', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR VAINILLA SMOOTHIE BOLSA 1.36 kg', allergens: DAIRY, yield: Y130 }
    ]
  },
  {
    anchor: 'chai',
    name: 'Cool Capps',
    sub: 'CHAI',
    cover: 'IBP-084',
    tone: 'coral',
    description: 'Té negro con especias: chai spiced, chai vainilla y manzana chai (Dutch Apple). Solo bolsa 1.58 kg en la API.',
    products: [
      { code: 'IBP-083', name: 'Chai spiced', official: 'Spiced Chai', description: 'Té negro con canela, cardamomo, jengibre y clavo.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR CHAI SPICED BOLSA 1.58 kg', allergens: DAIRY, yield: Y152, prep: PREP_STD },
      { code: 'IBP-084', name: 'Chai vainilla', official: 'Vanilla Chai', description: 'Chai con vainilla; el SKU con más visitas en tienda.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR CHAI VAINILLA BOLSA 1.58 kg', allergens: DAIRY, yield: Y152, prep: PREP_STD },
      { code: 'IBP-072', name: 'Manzana chai', official: 'Dutch Apple Chai', description: 'Chai con manzana tipo holandesa y especias (canela, cardamomo, jengibre).', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR  MANZANA CHAI BOLSA 1.58 kg', allergens: DAIRY, yield: Y152, prep: PREP_STD }
    ]
  },
  {
    anchor: 'matcha',
    name: 'Cool Capps',
    sub: 'MATCHA',
    cover: 'IBP-081',
    tone: 'lime',
    description: 'Mix de té verde matcha para hot, iced o blended (ficha oficial Green Matcha).',
    products: [
      { code: 'IBP-081', name: 'Té verde matcha', official: 'Green Matcha', description: 'Mix de té verde matcha japonés para hot, iced o blended.', presentation: B158, apiName: 'COOL CAPP BASE EN POLVO SABOR TÉ VERDE MATCHA BOLSA 1.58 kg', allergens: 'Contiene leche y tartrazina.', yield: Y152, prep: PREP_STD },
      { code: 'IBP-208', name: 'Té verde matcha', official: 'Green Matcha', description: 'Mix de té verde matcha japonés para hot, iced o blended.', presentation: B136, apiName: 'COOL CAPP BASE EN POLVO SABOR TÉ VERDE MATCHA BOLSA 1.36 kg', allergens: 'Contiene leche y tartrazina. Puede contener: huevo, soya, nueces de árbol y trigo.', yield: Y78, prep: PREP_M136 }
    ]
  }
];

export const COOL_CAPPS_LINE_ICONS = (tone: string) => ({
  sabor: `${JAR}/icon-sabor-${tone}.png`,
  pres: `${JAR}/icon-pres-${tone}.png`,
  rend: `${JAR}/icon-rend-${tone}.png`,
  blob: `${JAR}/blob-${tone}.png`
});

export const COOL_CAPPS_PRODUCTS: CoolCappsProduct[] = COOL_CAPPS_LINES.flatMap((l) => l.products);
export const COOL_CAPPS_CODES: string[] = COOL_CAPPS_PRODUCTS.map((p) => p.code);

export interface CoolCappsFaqPart { t: string; route?: string; href?: string }
export interface CoolCappsFaq { q: string; a: string; pending?: boolean; rich?: CoolCappsFaqPart[] }

export const COOL_CAPPS_FAQ: CoolCappsFaq[] = [
  { q: '¿Qué es Cool Capps?', a: 'Es una marca de bases en polvo para cafetería (Cool Capp®): frappés y lattes de café, cremas y smoothies, chai y matcha. Se preparan con agua, leche o bebida vegetal; calientes, frías o licuadas.' },
  { q: '¿Cuál es la diferencia entre las líneas?', a: 'Los frappés y lattes de café llevan café arábica; las cremas y smoothies (chocolate blanco, fresa, vainilla smoothie) son bases cremosas; los chai son té negro con especias; el matcha es té verde matcha.' },
  {
    q: '¿Cómo preparo un frappé Cool Capps?',
    a: 'Según la etiqueta MX: vaso de 100 ml con agua (37.5 ml en la mayoría; 31.25 ml en Matcha 1.36 kg), hielo (52 g / 37.5 g en Matcha 1.36 kg) y el polvo indicado (10.41 g en la mayoría; 17.5 g en Doble moka y Matcha 1.36 kg). No uses leche ni agregues azúcar. Ideas en /recetas/.',
    rich: [
      { t: 'Según la etiqueta MX: vaso de 100 ml con agua (37.5 ml en la mayoría; 31.25 ml en Matcha 1.36 kg), hielo (52 g / 37.5 g en Matcha 1.36 kg) y el polvo indicado (10.41 g en la mayoría; 17.5 g en Doble moka y Matcha 1.36 kg). No uses leche ni agregues azúcar. Ideas en ' },
      { t: 'nuestras recetas', route: '/recetas' },
      { t: '.' }
    ]
  },
  { q: '¿Qué presentaciones hay?', a: 'En Café Etrusca hay bolsa de 1.58 kg y, en varios sabores, bolsa de 1.36 kg.' },
  { q: '¿Cool Capps es vegano? ¿Qué alérgenos tiene?', a: 'Los sabores con dato en nuestra ficha son vegetarianos y no veganos: contienen lácteos. Cookies & cream y manzana chai también traen trigo y soya según la ficha interna. Revisa la etiqueta de cada bolsa.' },
  {
    q: '¿Dónde compro Cool Capps?',
    a: 'En sucursales Café Etrusca, en la tienda en línea y con asesoría para negocios en etrusca.biz o /contacto/. Mayoreo y menudeo.',
    rich: [
      { t: 'En sucursales Café Etrusca, en la ' },
      { t: 'tienda en línea', href: 'https://tienda.cafeetrusca.com/' },
      { t: ' y con asesoría para negocios en ' },
      { t: 'etrusca.biz', href: 'https://etrusca.biz/' },
      { t: ' o ' },
      { t: '/contacto/', route: '/contacto' },
      { t: '. Mayoreo y menudeo.' }
    ]
  },
  {
    q: '¿Cuánto cobrar por un frappé?',
    a: 'Usa la calculadora de precios (/calculadora-de-precios/) con tu costo por bolsa y tu tamaño de vaso.',
    rich: [
      { t: 'Usa la ' },
      { t: 'calculadora de precios', route: '/calculadora-de-precios' },
      { t: ' con tu costo por bolsa y tu tamaño de vaso.' }
    ]
  }
];

/** Conservación (todas las etiquetas NUTRIMENTAL leídas). */
export const COOL_CAPPS_STORAGE = 'Consérvese en un lugar fresco y seco.';
