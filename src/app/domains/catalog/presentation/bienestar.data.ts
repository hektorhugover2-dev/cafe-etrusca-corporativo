import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';

/**
 * Página "Bienestar": insumos sin azúcar / sugar free (brief SEO 2026-10-30-brief-bienestar.md).
 * 37 claves: Torani SF jarabes 25, Torani SF salsas 3, David Rio chai sin azúcar 4, ChillOut sin azúcar 5.
 * Reglas: sin precios, stock ni promos; sellos y leyendas tal cual la etiqueta; sin claims de salud;
 * NO publicar vida útil ya abierto; IBP-221 sin rendimiento ni carbohidratos (por confirmar con Héctor).
 * Vegano/alérgenos: ficha de ingredientes (tal cual el brief). PET = mismo dato que su gemelo de vidrio (confirmado por Héctor).
 */

const BN = `${ASSETS_BASE_URL}/images/insumos/bienestar`;
const THUMB = (c: string) => `https://cafeetrusca.com/img/thumbnail/${c}.webp`;
/** Fotos propias subidas a R2 (de Héctor). El resto usa el thumbnail oficial de Etrusca. */
const OWN = new Set(['IJA-197', 'ISA-013', 'IBP-102', 'IBP-220', 'IBP-221', 'IBP-240', 'IBP-241']);
export const bnPhoto = (c: string) => (OWN.has(c) ? `${BN}/${c}.webp` : THUMB(c));
export const BN_HERO = (c: string) => `${BN}/${c}-transparente.webp`;

export const BN_WARN = 'CONTIENE EDULCORANTES, NO RECOMENDABLE EN NIÑOS';
export const BN_LACTITOL = 'CONTIENE: LACTITOL, EL CONSUMO EXCESIVO DE ESTE EDULCORANTE PUEDE CAUSAR EFECTOS LAXANTES';

/** Datos de etiqueta enviados por Héctor (copiados tal cual). */
export interface BnLabel {
  ingredients: string;
  allergenNote?: string;
  seals?: string[];
  legends?: string[];
  nutritionBase?: string;
  nutrition?: Array<[string, string]>;
  yield?: string;
  prep?: string;
  storage?: string;
  origin?: string;
}

export interface BnProduct {
  code: string;
  name: string;
  pres: string;
  vegan: string;
  allergens: string;
  label?: BnLabel;
  /** true = se usa app-product-facts (product-facts.data / product-nutrition.data). */
  facts?: boolean;
  /** Leyenda de etiqueta a mostrar aunque no haya ficha completa. */
  legends?: string[];
}

export interface BnLine {
  anchor: string;
  brand: string;
  name: string;
  sub: string;
  description: string;
  cover: string;
  brandLink?: { label: string; route: string };
  products: BnProduct[];
}

const V = 'Vegano (según ficha)';
const NOV = 'No vegano';
const NOANIMAL = 'Sin ingredientes de origen animal declarados';

const IRISH_LABEL: BnLabel = {
  ingredients: 'Agua, color caramelo clase IV, ácido cítrico, acesulfame K (14 mg/100 g), saborizantes naturales, sorbato de potasio, benzoato de sodio, goma xantana y sucralosa (6 mg/100 g).',
  allergenNote: 'Sin alérgenos declarados.',
  legends: [BN_WARN],
  nutrition: [['Contenido energético', '0 kcal'], ['Sodio', '2 mg']],
  yield: 'Aprox. 60 porciones por botella de 750 ml.',
  prep: 'Para un vaso de 100 ml: 12.5 ml de jarabe + 67.5 ml de agua + un hielo.',
  storage: 'Consérvese en un lugar fresco y seco.',
  origin: 'Hecho en EUA, importado por Etrusca Comercial.'
};

const LEMON_LABEL: BnLabel = {
  ingredients: 'Agua, saborizantes naturales, ácido cítrico, ácido tartárico, mezcla de acesulfame K con sucralosa (208 mg/100 g), benzoato de sodio, goma xantana, sorbato de potasio, color caramelo IV y amarillo 5 (tartrazina). Contiene tartrazina.',
  legends: [BN_WARN],
  nutrition: [['Contenido energético', '0 kcal'], ['Sodio', '1 mg']],
  yield: 'Aprox. 60 porciones por botella de 750 ml.',
  prep: 'Para un vaso de 100 ml: 12.5 ml de jarabe + 67.5 ml de agua + un hielo.',
  storage: 'Consérvese en un lugar fresco y seco.',
  origin: 'Hecho en EUA, importado por Etrusca Comercial.'
};

const TARO_INGR = 'Maltodextrina, arroz, lactitol (2 g/100 g), saborizantes artificiales, polidextrosa, color rojo 40, color azul 1, carboximetilcelulosa, goma xantana, acesulfame K (150 mg/100 g) y dióxido de silicio. Contiene rojo 40.';

const CAPP_LABEL = (yieldTxt: string): BnLabel => ({
  ingredients: 'Sólidos de la leche, leche, café soluble, alulosa, lactitol (5 g/100 g), saborizante artificial, cocoa alcalina, goma xantana y acesulfame K (200 mg/100 g).',
  allergenNote: 'CONTIENE LECHE.',
  legends: [BN_LACTITOL, BN_WARN],
  nutritionBase: 'Por 100 ml preparados',
  nutrition: [
    ['Contenido energético', '54.92 kcal (232 kJ)'], ['Proteínas', '1 g'], ['Grasas totales', '1 g'], ['Grasas saturadas', '1 g'],
    ['Grasas trans', '0 mg'], ['Hidratos de carbono', '10 g'], ['Azúcares', '1 g'], ['Azúcares añadidos', '0 g'], ['Fibra dietética', '0 g'], ['Sodio', '2 mg']
  ],
  yield: yieldTxt,
  origin: 'Hecho en México exclusivamente para Etrusca Comercial.'
});

const TJ = (code: string, name: string, pres: 'Vidrio 750 ml' | 'PET 750 ml', vegan: string, allergens: string, extra: Partial<BnProduct> = {}): BnProduct =>
  ({ code, name, pres, vegan, allergens, legends: [BN_WARN], ...extra });

export const BN_LINES: BnLine[] = [
  {
    anchor: 'torani-sugar-free-jarabes',
    brand: 'Torani',
    name: 'Torani Sugar Free',
    sub: 'Jarabes',
    description: 'Jarabes sin azúcar endulzados con sucralosa y acesulfame K (según la ficha), para café, frappés y sodas.',
    cover: 'IJA-107',
    brandLink: { label: 'Ver todos los jarabes Torani', route: '/insumos-para-cafeterias/jarabes/torani' },
    products: [
      TJ('IJA-105', 'Almendra', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-106', 'Avellana', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-193', 'Avellana', 'PET 750 ml', V, 'Edulcorantes', { facts: true }),
      TJ('IJA-118', 'Café', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-107', 'Caramelo', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-194', 'Caramelo', 'PET 750 ml', V, 'Edulcorantes', { facts: true }),
      TJ('IJA-115', 'Cereza negra', 'Vidrio 750 ml', V, 'Rojo 40'),
      TJ('IJA-116', 'Chocolate', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-108', 'Chocolate blanco', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-109', 'Coco', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-117', 'Crema irlandesa', 'Vidrio 750 ml', NOANIMAL, 'Sin alérgenos declarados', { label: IRISH_LABEL, legends: undefined }),
      TJ('IJA-196', 'Crema irlandesa', 'PET 750 ml', NOANIMAL, 'Sin alérgenos declarados', { label: IRISH_LABEL, legends: undefined }),
      TJ('IJA-110', 'Durazno', 'Vidrio 750 ml', V, 'Tartrazina, rojo 40'),
      TJ('IJA-119', 'English toffee', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-111', 'Frambuesa', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-120', 'Fresa', 'Vidrio 750 ml', V, 'Rojo 40'),
      TJ('IJA-197', 'Fresa', 'PET 750 ml', V, 'Rojo 40', { facts: true }),
      TJ('IJA-124', 'Limón', 'Vidrio 750 ml', NOANIMAL, 'Sin alérgenos declarados · contiene tartrazina', { label: LEMON_LABEL, legends: undefined }),
      TJ('IJA-121', 'Mango', 'Vidrio 750 ml', V, 'No declara alérgenos'),
      TJ('IJA-125', 'Pumpkin pie', 'Vidrio 750 ml', V, 'No declara alérgenos'),
      TJ('IJA-123', 'Sandía', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-114', 'Vainilla', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-195', 'Vainilla', 'PET 750 ml', V, 'Edulcorantes', { facts: true }),
      TJ('IJA-122', 'Vainilla francesa', 'Vidrio 750 ml', V, 'Edulcorantes'),
      TJ('IJA-198', 'Vainilla francesa', 'PET 750 ml', V, 'Edulcorantes', { facts: true })
    ]
  },
  {
    anchor: 'torani-sugar-free-salsas',
    brand: 'Torani',
    name: 'Torani Sugar Free',
    sub: 'Salsas',
    description: 'Salsas sin azúcar en bote de 1.89 l: chocolate oscuro, chocolate blanco y caramelo.',
    cover: 'ISA-013',
    brandLink: { label: 'Ver todas las salsas', route: '/insumos-para-cafeterias/salsas' },
    products: [
      { code: 'ISA-012', name: 'Chocolate oscuro', pres: 'Bote 1.89 l', vegan: NOV, allergens: 'No declara alérgenos', facts: true },
      {
        code: 'ISA-013', name: 'Chocolate blanco', pres: 'Bote 1.89 l', vegan: NOV, allergens: 'Leche, soya (lecitina de soya)',
        label: {
          ingredients: 'Agua, glicerina, polidextrosas, maltodextrina, crema batida, manteca de cacao, almidón modificado, sal, lecitina de soya, mono y diglicéridos, sorbato de potasio, saborizantes naturales, carragenina, goma xantana, sucralosa (25 mg/100g) y pectina. Contiene leche.',
          seals: ['EXCESO CALORÍAS', 'EXCESO GRASAS SATURADAS'],
          legends: [BN_WARN],
          nutritionBase: 'Por 100 ml de producto',
          nutrition: [
            ['Contenido energético', '245 kcal'], ['Proteínas', '0 g'], ['Grasas totales', '5 g'], ['Grasas saturadas', '3 g'], ['Grasas trans', '0 mg'],
            ['Hidratos de carbono', '50 g'], ['Azúcares', '0 g'], ['Azúcares añadidos', '0 g'], ['Fibra dietética', '17 g'], ['Sodio', '183 mg']
          ],
          yield: 'Aprox. 19 porciones de 100 ml por envase.',
          storage: 'En su empaque original, en lugar seco y fresco, lejos de la luz directa del sol.',
          origin: 'Hecho en EUA, importado por Etrusca Comercial.'
        }
      },
      { code: 'ISA-014', name: 'Caramelo', pres: 'Bote 1.89 l', vegan: NOV, allergens: 'Lácteos, soya', facts: true }
    ]
  },
  {
    anchor: 'david-rio-chai-sin-azucar',
    brand: 'David Rio',
    name: 'David Rio',
    sub: 'Chai sin azúcar',
    description: 'Base en polvo de té negro con especias, endulzada con sucralosa. Contiene caseinato de sodio (derivado de la leche).',
    cover: 'IBP-102',
    brandLink: { label: 'Ver todo David Rio', route: '/insumos-para-cafeterias/bases-en-polvo/david-rio' },
    products: [
      { code: 'IBP-089', name: 'Orca, tradicional', pres: 'Bote 1.520 kg', vegan: NOV, allergens: 'Lácteos, soja, especias', facts: true },
      {
        code: 'IBP-102', name: 'Orca, tradicional', pres: 'Lata 337 g', vegan: NOV, allergens: 'Leche, soya',
        label: {
          ingredients: 'Maltodextrina, grasa vegetal, té negro en polvo (7%), caseinatos, mono y diglicéridos, fosfato dipotásico secundario, mezcla de especias, lecitina de soya, sucralosa (140 mg / 100 g de producto), saborizantes naturales, sal. Contiene caseinatos (leche).',
          seals: ['EXCESO GRASAS SATURADAS'],
          legends: [BN_WARN],
          nutritionBase: 'Por 100 ml preparados',
          nutrition: [
            ['Contenido energético', '34 kcal'], ['Proteínas', '0 g'], ['Grasas totales', '2 g'], ['Grasas saturadas', '1 g'], ['Grasas trans', '0 mg'],
            ['Hidratos de carbono', '4 g'], ['Azúcares', '0 g'], ['Azúcares añadidos', '0 g'], ['Fibra dietética', '0 g'], ['Sodio', '14 mg']
          ],
          yield: 'Aprox. 25 porciones de 100 ml por lata.',
          storage: 'Consérvese en un lugar fresco y seco.',
          origin: 'Hecho en EUA, importado por Etrusca Comercial.'
        }
      },
      { code: 'IBP-092', name: 'Flamingo, vainilla (té descafeinado)', pres: 'Bote 1.520 kg', vegan: NOV, allergens: 'Lácteos, especias, soja', facts: true },
      { code: 'IBP-095', name: 'Flamingo, vainilla (té descafeinado)', pres: 'Bote 337 g', vegan: NOV, allergens: 'Lácteos, especias, soja', facts: true }
    ]
  },
  {
    anchor: 'chillout-sin-azucar',
    brand: 'ChillOut',
    name: 'ChillOut',
    sub: 'Bases sin azúcar',
    description: 'Bases en polvo sin azúcar para frappés: base neutra, taro y cappuccino.',
    cover: 'IBP-240',
    brandLink: { label: 'Ver todo ChillOut', route: '/insumos-para-cafeterias/bases-en-polvo/chillout' },
    products: [
      { code: 'IBP-214', name: 'Base neutra sin azúcar', pres: 'Bolsa 1.6 kg', vegan: NOV, allergens: 'Lácteos (leche entera y descremada, maltodextrina)', facts: true },
      {
        code: 'IBP-220', name: 'Taro sin azúcar', pres: 'Bote 2 kg', vegan: NOANIMAL, allergens: 'Ninguno declarado · contiene rojo 40',
        label: {
          ingredients: TARO_INGR,
          legends: [BN_LACTITOL, BN_WARN],
          nutritionBase: 'Por 100 ml preparados',
          nutrition: [
            ['Contenido energético', '28.5 kcal'], ['Proteínas', '0 g'], ['Grasas', '0 g'], ['Hidratos de carbono', '7 g'],
            ['Azúcares', '0 g'], ['Azúcares añadidos', '0 g'], ['Sodio', '1 mg']
          ],
          yield: 'Aprox. 190.4 bebidas de 100 ml por bote de 2 kg, preparadas según las instrucciones del bote.',
          storage: 'Consérvese en lugar fresco y seco.',
          origin: 'Hecho en México exclusivamente para Etrusca Comercial.'
        }
      },
      {
        // Rendimiento y carbohidratos de la etiqueta 700 g NO se publican (inconsistentes vs 2 kg; por confirmar con Héctor).
        code: 'IBP-221', name: 'Taro sin azúcar', pres: 'Bote 700 g', vegan: NOANIMAL, allergens: 'Ninguno declarado · contiene rojo 40',
        label: {
          ingredients: TARO_INGR,
          legends: [BN_WARN],
          nutritionBase: 'Por 100 ml preparados',
          nutrition: [['Contenido energético', '28.5 kcal'], ['Azúcares', '0 g'], ['Sodio', '1 mg']],
          storage: 'Consérvese en lugar fresco y seco.'
        }
      },
      { code: 'IBP-240', name: 'Cappuccino sin azúcar', pres: 'Bote 1.6 kg', vegan: NOV, allergens: 'Leche', label: CAPP_LABEL('100 bebidas de 100 ml por bote de 1.6 kg (16 g por cada 100 ml).') },
      { code: 'IBP-241', name: 'Cappuccino sin azúcar', pres: 'Bote 700 g', vegan: NOV, allergens: 'Leche', label: CAPP_LABEL('43.75 bebidas de 100 ml por bote de 700 g (16 g por cada 100 ml).') }
    ]
  }
];

export const BN_PRODUCTS: BnProduct[] = BN_LINES.flatMap((l) => l.products);
export const BN_CODES: string[] = BN_PRODUCTS.map((p) => p.code);

export interface BnFaqPart { t: string; route?: string; href?: string }
export interface BnFaq { q: string; a: string; rich?: BnFaqPart[] }

const STORE = 'https://tienda.cafeetrusca.com/';
const WHERE = 'Encuéntralo en tu sucursal favorita de Café Etrusca o en nuestra tienda en línea. Manejamos venta de mayoreo y menudeo, tanto para negocios como para consumidores.';

/** FAQ del brief: solo lo confirmado (sin dosis en g, sin vida útil abierto, sin rendimiento del taro 700 g). */
export const BN_FAQ: BnFaq[] = [
  { q: '¿Qué jarabes sin azúcar manejan?', a: `Torani Sugar Free en 19 sabores de vidrio (almendra, avellana, café, caramelo, cereza negra, chocolate, chocolate blanco, coco, crema irlandesa, durazno, English toffee, frambuesa, fresa, limón, mango, pumpkin pie, sandía, vainilla y vainilla francesa) y 6 de PET (avellana, caramelo, crema irlandesa, fresa, vainilla y vainilla francesa). Etiqueta: "${BN_WARN}".` },
  { q: '¿Con qué están endulzados los jarabes Torani Sugar Free?', a: 'Con sucralosa y acesulfame K, según la ficha.' },
  { q: '¿"Sin azúcar" significa sin calorías?', a: 'No necesariamente; revisa la etiqueta. Las bases en polvo llevan maltodextrina y leche.' },
  { q: '¿Los jarabes sugar free son veganos?', a: 'La mayoría sí, según la ficha. Crema irlandesa (IJA-117/196) y limón (IJA-124) no tienen ingredientes de origen animal declarados (limón contiene tartrazina). Para los demás, según etiqueta.' },
  { q: '¿Las salsas sugar free tienen lácteos?', a: 'Chocolate blanco (leche y soya) y caramelo sí; chocolate oscuro no indica alérgenos, pero no es vegano.' },
  { q: '¿El chai David Rio sin azúcar lleva leche?', a: 'Sí, caseinato de sodio.' },
  { q: '¿Hay chai sin azúcar descafeinado?', a: 'Sí, Flamingo vainilla, con té negro descafeinado.' },
  { q: '¿Qué base sin azúcar sirve para frappé?', a: 'ChillOut base neutra, taro y cappuccino sin azúcar.' },
  { q: '¿Cuánto jarabe uso por bebida?', a: 'Ejemplo de etiqueta (Torani Sugar Free crema irlandesa y limón): para un vaso de 100 ml, 12.5 ml de jarabe + 67.5 ml de agua + un hielo; aprox. 60 porciones por botella de 750 ml. Otros sabores: según etiqueta.' },
  { q: '¿Cuánto rinde?', a: 'Torani Sugar Free crema irlandesa y limón: aprox. 60 porciones por botella de 750 ml (etiqueta). Taro sin azúcar 2 kg (IBP-220): aprox. 190.4 bebidas de 100 ml, preparadas según las instrucciones del bote (etiqueta). Chai Orca 337 g (IBP-102): aprox. 25 porciones de 100 ml por lata (etiqueta). Cappuccino sin azúcar: 1.6 kg (IBP-240) rinde 100 bebidas de 100 ml y 700 g (IBP-241) rinde 43.75, con 16 g por cada 100 ml (etiqueta).' },
  { q: '¿Cómo se guardan?', a: 'Torani Sugar Free crema irlandesa y limón: "Consérvese en un lugar fresco y seco" (etiqueta). Taro sin azúcar (IBP-220 e IBP-221): "Consérvese en lugar fresco y seco" (etiqueta). Salsa Torani Sugar Free chocolate blanco (ISA-013): en su empaque original, en lugar seco y fresco, lejos de la luz directa del sol (etiqueta). Chai David Rio Orca 337 g (IBP-102): "Consérvese en un lugar fresco y seco" (etiqueta).' },
  { q: '¿Venden mayoreo?', a: 'Sí. ' + WHERE,
    rich: [{ t: 'Sí. Encuéntralo en tu ' }, { t: 'sucursal favorita', route: '/sucursales' }, { t: ' de Café Etrusca o en nuestra ' }, { t: 'tienda en línea', href: STORE }, { t: '. Manejamos venta de mayoreo y menudeo, tanto para negocios como para consumidores.' }] }
];

export const BN_STORE_URL = STORE;
