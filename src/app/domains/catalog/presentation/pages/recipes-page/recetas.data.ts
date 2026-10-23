import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
export interface RecipeStep {
  title: string;
  text: string;
  tone: 'yellow' | 'pink' | 'blue' | 'green';
  icon?: string;
}

export interface RecipeProduct {
  label: string;
  description: string;
  image: string;
  link: string;
}

/** Insumo de la receta vinculado a su código SAP (lista de precios cafeetrusca.com/api/product). */
export interface RecipeSapIngredient {
  ingredient: string;
  sap: string;
  qty: number;
  unit: string;
  /** Confianza del match revisado (revision_sap.xlsx). Sin valor = match original. */
  confidence?: 'alta' | 'media' | 'baja';
}

export interface Recipe {
  slug: string;
  title: string;
  titleAccent?: string;
  kicker: string;
  category: string;
  collection?: string;
  /** e.g. septiembre-2026 → listing uses Mexican patterned card media */
  origin?: string;
  summary: string;
  image: string;
  banner: string;
  tone: 'coral' | 'lime' | 'gold' | 'navy' | 'sky';
  brand?: string;
  time?: string;
  yield?: string;
  difficulty?: string;
  bubble?: string;
  escarchado?: string[];
  ingredients?: string[];
  tools?: string[];
  toolIcon?: string;
  steps?: RecipeStep[];
  tips?: string[];
  products?: RecipeProduct[];
  seo?: { title: string; description: string; keywords: string };
  /** id en intranet.cafeetrusca.com/api/v1/administracion/receta/todos */
  intranetId?: number;
  /** Insumos con código SAP para la calculadora de precios. */
  sapIngredients?: RecipeSapIngredient[];
  /** Fecha real de publicación (recetas migradas del blog anterior). Sin valor = 2026-01-01. */
  datePublished?: string;
  /** Video de YouTube de la receta (se incrusta y va como VideoObject en el JSON-LD). */
  video?: { youtubeId: string; name: string; uploadDate: string; thumbnailUrl: string };
  /** Agrega BreadcrumbList (Inicio › Recetas › receta) al JSON-LD. */
  breadcrumbJsonLd?: boolean;
  published: boolean;
}

const ICO = {
  base: `${ASSETS_BASE_URL}/images/recetas/icons/step-01.svg`,
  blend: `${ASSETS_BASE_URL}/images/recetas/icons/step-02.svg`,
  decor: `${ASSETS_BASE_URL}/images/recetas/icons/step-03.svg`,
  finish: `${ASSETS_BASE_URL}/images/recetas/icons/step-04.svg`,
  tool: `${ASSETS_BASE_URL}/images/recetas/icons/tool-licuadora.svg`
};

export const RECIPES: Recipe[] = [
  {
    slug: "pumpkin-cold-brew",
    intranetId: 104,
    sapIngredients: [
      { ingredient: "150 ml de cold brew preparado con Mezcla especial No. 1", sap: "CPM-002", qty: 150, unit: "ml" },
      { ingredient: "30 ml de salsa Torani pumpkin pie", sap: "ISA-022", qty: 30, unit: "ml" }
    ],
    title: "Pumpkin",
    titleAccent: "cold brew",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Cold brew 480 ml con Torani pumpkin pie, leche, agua e hielo, terminado con canela.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/pumpkin-cold-brew.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/pumpkin-cold-brew.webp`,
    tone: "gold",
    brand: "Torani",
    time: "4 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
      "150 ml de cold brew preparado con Mezcla especial No. 1",
      "30 ml de salsa Torani pumpkin pie",
      "150 ml de agua",
      "100 ml de leche",
      "4 piezas de hielo",
      "Canela para decorar"
    ],
    tools: ["Jarra de acero", "Vaso"],
    steps: [
      {
        title: "Espuma",
        text: "Espuma la leche junto con la salsa pumpkin en una jarra de acero hasta la temperatura deseada y reserva.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Arma",
        text: "Decora el vaso con salsa pumpkin. Agrega el cold brew, el agua y los hielos.",
        tone: "pink",
        icon: ICO.blend
      },
      {
        title: "Termina",
        text: "Vierte la mezcla de leche con salsa y decora con canela.",
        tone: "blue",
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Pumpkin cold brew 480 ml | Otoño | Café Etrusca",
      description: "Cold brew de calabaza con Torani pumpkin pie, leche e hielo. Receta de otoño Café Etrusca.",
      keywords: "pumpkin cold brew, torani pumpkin pie, cold brew, otoño, Café Etrusca"
    },
    published: true
  },
  {
    slug: "dirty-pumpkin-chai",
    intranetId: 105,
    sapIngredients: [
      { ingredient: "30 g de David Rio panda rojo", sap: "IBP-181", qty: 30, unit: "g", confidence: "media" },
      { ingredient: "60 ml de espresso preparado con Mezcla especial No. 1", sap: "CPM-002", qty: 60, unit: "ml" },
      { ingredient: "15 ml de jarabe Torani pumpkin pie", sap: "IJA-222", qty: 15, unit: "ml" }
    ],
    title: "Dirty",
    titleAccent: "pumpkin chai",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Chai latte 480 ml con David Rio panda rojo, espresso Mezcla especial No. 1 y Torani pumpkin pie.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/dirty-pumpkin-chai.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/dirty-pumpkin-chai.webp`,
    tone: "gold",
    brand: "David Rio",
    time: "4 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
      "30 g de David Rio panda rojo",
      "60 ml de espresso preparado con Mezcla especial No. 1",
      "15 ml de jarabe Torani pumpkin pie",
      "300 ml de leche"
    ],
    tools: ["Máquina espresso", "Jarra de acero", "Vaporizador"],
    steps: [
      {
        title: "Espresso",
        text: "Prepara el espresso en la taza de tu elección.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Espuma",
        text: "En una jarra de acero agrega el chai, el jarabe pumpkin y la leche; espuma hasta la temperatura deseada.",
        tone: "pink",
        icon: ICO.blend
      },
      {
        title: "Integra",
        text: "Mezcla el espresso con la preparación de la jarra y sirve.",
        tone: "blue",
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Dirty pumpkin chai 480 ml | Otoño | Café Etrusca",
      description: "Dirty pumpkin chai con David Rio panda rojo, espresso y Torani pumpkin pie.",
      keywords: "dirty pumpkin chai, david rio, torani pumpkin pie, espresso, Café Etrusca"
    },
    published: true
  },

  {
    slug: "calabaza-brulee-latte",
    intranetId: 156,
    sapIngredients: [
      { ingredient: "225 g de ChillOut mix dulce de calabaza", sap: "IBP-064", qty: 225, unit: "g" },
      { ingredient: "30 ml de espresso Mezcla especial 1", sap: "CPM-002", qty: 30, unit: "ml" },
      { ingredient: "30 g de ChillOut mix crème brûlée ya preparado", sap: "IBP-206", qty: 30, unit: "g" }
    ],
    title: "Calabaza",
    titleAccent: "Brûlée Latte",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Latte 360 ml con ChillOut dulce de calabaza, espresso Mezcla especial 1 y crème brûlée flameada.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/calabaza-brulee-latte.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/calabaza-brulee-latte.webp`,
    tone: "gold",
    brand: "ChillOut",
    time: "5 min",
    yield: "360 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
          "225 g de ChillOut mix dulce de calabaza",
          "30 ml de espresso Mezcla especial 1",
          "30 g de ChillOut mix crème brûlée ya preparado",
          "250 ml de leche",
          "Azúcar morena"
    ],
    tools: ["Máquina espresso","Vaporizador","Soplete"],
    steps: [
      {
        title: "Espresso y base",
        text: "Extrae el espresso en la taza e integra el mix dulce de calabaza hasta mezclar.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Leche",
        text: "Espuma la leche y sírvela sobre la mezcla.",
        tone: "pink",
        icon: ICO.blend
      },
      {
        title: "Brûlée",
        text: "Coloca el crème brûlée y azúcar morena; flamea hasta caramelizar.",
        tone: "blue",
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Calabaza Brûlée Latte 360 ml | Otoño | Café Etrusca",
      description: "Latte de calabaza con crème brûlée flameada, espresso Mezcla especial 1 y ChillOut mix dulce de calabaza.",
      keywords: "calabaza brulee latte, chillout dulce de calabaza, espresso, otoño, Café Etrusca"
    },
    published: true
  },
  {
    slug: "mokalabaza-latte",
    intranetId: 108,
    sapIngredients: [
      { ingredient: "30 g de ChillOut mix dulce de calabaza", sap: "IBP-064", qty: 30, unit: "g" },
      { ingredient: "22 ml de Torani chocolate blanco", sap: "IJA-005", qty: 22, unit: "ml" },
      { ingredient: "60 ml de espresso Mezcla especial No. 1", sap: "CPM-002", qty: 60, unit: "ml" }
    ],
    title: "Mokalabaza",
    titleAccent: "Latte",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Latte 480 ml con dulce de calabaza, Torani chocolate blanco, espresso y bombones flameados.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/mokalabaza-latte.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/mokalabaza-latte.webp`,
    tone: "gold",
    brand: "ChillOut",
    time: "5 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
          "30 g de ChillOut mix dulce de calabaza",
          "22 ml de Torani chocolate blanco",
          "60 ml de espresso Mezcla especial No. 1",
          "300 ml de leche",
          "Bombones flameados"
    ],
    tools: ["Máquina espresso","Vaporizador","Soplete"],
    steps: [
      {
        title: "Espresso",
        text: "Extrae el espresso en la taza.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Mezcla",
        text: "Agrega el polvo de calabaza y la salsa de chocolate blanco; mezcla bien.",
        tone: "pink",
        icon: ICO.blend
      },
      {
        title: "Leche y decoración",
        text: "Espuma la leche, sirve y decora con bombones; flaéalos al momento.",
        tone: "blue",
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Mokalabaza Latte 480 ml | Otoño | Café Etrusca",
      description: "Latte de calabaza con Torani chocolate blanco, espresso Mezcla especial No. 1 y bombones flameados.",
      keywords: "mokalabaza latte, calabaza, torani chocolate blanco, chillout, Café Etrusca"
    },
    published: true
  },
  {
    slug: "affogato-de-otono",
    intranetId: 107,
    sapIngredients: [
      { ingredient: "20 ml de Torani avellana", sap: "IJA-023", qty: 20, unit: "ml" },
      { ingredient: "30 g de ChillOut mix dulce de calabaza (diluido en agua caliente)", sap: "IBP-064", qty: 30, unit: "g" },
      { ingredient: "30 ml de espresso Mezcla especial No. 1", sap: "CPM-002", qty: 30, unit: "ml" }
    ],
    title: "Affogato",
    titleAccent: "de Otoño",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Affogato 480 ml con helado de vainilla, Torani avellana, dulce de calabaza y espresso.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/affogato-de-otono.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/affogato-de-otono.webp`,
    tone: "gold",
    brand: "ChillOut",
    time: "5 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
          "2 bolas de helado de vainilla",
          "20 ml de Torani avellana",
          "30 g de ChillOut mix dulce de calabaza (diluido en agua caliente)",
          "30 ml de espresso Mezcla especial No. 1",
          "Trozos de nueces"
    ],
    tools: ["Recipiente / vaso","Máquina espresso"],
    steps: [
      {
        title: "Base",
        text: "Coloca el helado de vainilla en el recipiente.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Café y jarabes",
        text: "Añade el espresso, el polvo de calabaza diluido y el Torani avellana.",
        tone: "pink",
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Termina con trozos de nueces.",
        tone: "blue",
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Affogato de Otoño 480 ml | Café Etrusca",
      description: "Affogato de temporada con helado, Torani avellana, ChillOut dulce de calabaza y espresso.",
      keywords: "affogato de otoño, calabaza, torani avellana, espresso, Café Etrusca"
    },
    published: true
  },
  {
    slug: "bubble-pumpkin",
    intranetId: 106,
    sapIngredients: [
      { ingredient: "45 g de ChillOut mix dulce de calabaza", sap: "IBP-064", qty: 45, unit: "g" },
      { ingredient: "15 ml de Torani salted caramel", sap: "IJA-056", qty: 15, unit: "ml" },
      { ingredient: "20 g de ChillOut tapioca", sap: "ICT-008", qty: 20, unit: "g" }
    ],
    title: "Bubble",
    titleAccent: "Pumpkin",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Bebida 480 ml con dulce de calabaza, Torani salted caramel, tapioca ChillOut y leche.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/bubble-pumpkin.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/bubble-pumpkin.webp`,
    tone: "coral",
    brand: "ChillOut",
    time: "5 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
          "45 g de ChillOut mix dulce de calabaza",
          "15 ml de Torani salted caramel",
          "20 g de ChillOut tapioca",
          "4 hielos",
          "240 ml de leche"
    ],
    tools: ["Licuadora","Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa todos los líquidos (excepto la tapioca) con hielo hasta que quede frío y homogéneo.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Decora",
        text: "Sirve y decora con la tapioca ChillOut.",
        tone: "pink",
        icon: ICO.blend
      }
    ],
    seo: {
      title: "Receta Bubble Pumpkin 480 ml | Otoño | Café Etrusca",
      description: "Bubble tea de calabaza con Torani salted caramel y tapioca ChillOut.",
      keywords: "bubble pumpkin, tapioca, calabaza, torani salted caramel, ChillOut"
    },
    published: true
  },
  {
    slug: "calabaza-brulee",
    intranetId: 85,
    sapIngredients: [
      { ingredient: "45 ml de Torani pumpkin pie", sap: "IJA-222", qty: 45, unit: "ml" },
      { ingredient: "180 ml de cold brew Mezcla especial No. 1", sap: "CPM-002", qty: 180, unit: "ml" },
      { ingredient: "1 cda de azúcar morena", sap: "ICT-085", qty: 1, unit: "pza", confidence: "media" }
    ],
    title: "Calabaza",
    titleAccent: "brûlée",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Cold brew 480 ml con crema Torani pumpkin pie en sifón y azúcar morena caramelizada.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/calabaza-brulee.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/calabaza-brulee.webp`,
    tone: "gold",
    brand: "ChillOut",
    time: "5 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
          "Crema batida: 220 ml de crema base rich",
          "250 ml de agua",
          "45 ml de Torani pumpkin pie",
          "1 cápsula",
          "Sifón 1/2 L",
          "180 ml de cold brew Mezcla especial No. 1",
          "180 ml de agua",
          "4 hielos",
          "1 cda de azúcar morena"
    ],
    tools: ["Sifón 1/2 L","Vaso","Soplete"],
    steps: [
      {
        title: "Crema",
        text: "Prepara la crema batida en el sifón con crema base, agua, Torani pumpkin pie y la cápsula.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Bebida",
        text: "En el vaso combina cold brew, agua y hielos; corona con la crema del sifón.",
        tone: "pink",
        icon: ICO.blend
      },
      {
        title: "Carameliza",
        text: "Espolvorea azúcar morena y carameliza con soplete.",
        tone: "blue",
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Calabaza brûlée 480 ml | Cold brew | Café Etrusca",
      description: "Cold brew de calabaza con crema pumpkin pie en sifón y brûlée de azúcar morena.",
      keywords: "calabaza brulee, cold brew, torani pumpkin pie, sifón, Café Etrusca"
    },
    published: true
  },
  {
    slug: "calabaza-y-espresso-latte",
    intranetId: 84,
    sapIngredients: [
      { ingredient: "30 g de ChillOut dulce de calabaza", sap: "IBP-064", qty: 30, unit: "g" },
      { ingredient: "60 ml de espresso doble Mezcla especial No. 1", sap: "CPM-002", qty: 60, unit: "ml" }
    ],
    title: "Calabaza y",
    titleAccent: "espresso latte",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Latte 480 ml con ChillOut dulce de calabaza, espresso doble y leche.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/calabaza-y-espresso-latte.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/calabaza-y-espresso-latte.webp`,
    tone: "gold",
    brand: "ChillOut",
    time: "5 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
          "30 g de ChillOut dulce de calabaza",
          "60 ml de espresso doble Mezcla especial No. 1",
          "250 ml de leche"
    ],
    tools: ["Máquina espresso","Vaporizador"],
    steps: [
      {
        title: "Base",
        text: "Disuelve el dulce de calabaza con el espresso doble.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Leche",
        text: "Espuma la leche y sírvela sobre la mezcla.",
        tone: "pink",
        icon: ICO.blend
      }
    ],
    seo: {
      title: "Receta Calabaza y espresso latte 480 ml | Café Etrusca",
      description: "Latte de calabaza con espresso doble Mezcla especial No. 1 y ChillOut.",
      keywords: "calabaza espresso latte, chillout, mezcla especial, Café Etrusca"
    },
    published: true
  },
  {
    slug: "calabaza-y-matcha-latte",
    intranetId: 83,
    sapIngredients: [
      { ingredient: "20 g de Aya matcha tostado", sap: "IBP-149", qty: 20, unit: "g", confidence: "media" },
      { ingredient: "30 ml de Torani pumpkin pie", sap: "IJA-222", qty: 30, unit: "ml" }
    ],
    title: "Calabaza y",
    titleAccent: "matcha latte",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Latte 480 ml con Aya matcha tostado, Torani pumpkin pie y leche.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/calabaza-y-matcha-latte.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/calabaza-y-matcha-latte.webp`,
    tone: "lime",
    brand: "Aya / Torani",
    time: "5 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
          "20 g de Aya matcha tostado",
          "30 ml de Torani pumpkin pie",
          "280 ml de leche"
    ],
    tools: ["Bowl / jarra","Batidor","Vaporizador"],
    steps: [
      {
        title: "Matcha",
        text: "Disuelve el matcha tostado con un poco de leche caliente.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Integra",
        text: "Agrega Torani pumpkin pie y el resto de la leche espumada.",
        tone: "pink",
        icon: ICO.blend
      }
    ],
    seo: {
      title: "Receta Calabaza y matcha latte 480 ml | Café Etrusca",
      description: "Latte de matcha tostado Aya con Torani pumpkin pie.",
      keywords: "calabaza matcha latte, aya matcha, torani pumpkin pie, Café Etrusca"
    },
    published: true
  },
  {
    slug: "dulce-de-calabaza-molecular",
    intranetId: 82,
    sapIngredients: [
      { ingredient: "45 g de ChillOut mix dulce de calabaza", sap: "IBP-064", qty: 45, unit: "g" },
      { ingredient: "15 ml de Torani salted caramel", sap: "IJA-056", qty: 15, unit: "ml" },
      { ingredient: "1 sobre de ChillOut tapioca instantánea", sap: "ICT-056", qty: 1, unit: "pza", confidence: "alta" }
    ],
    title: "Dulce de calabaza",
    titleAccent: "molecular",
    kicker: 'Otoño · Calabaza',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Bebida 480 ml con dulce de calabaza, Torani salted caramel y tapioca instantánea ChillOut.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/dulce-de-calabaza-molecular.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/dulce-de-calabaza-molecular.webp`,
    tone: "gold",
    brand: "ChillOut",
    time: "5 min",
    yield: "480 ml",
    difficulty: 'Fácil',
    bubble: "Temporada de calabaza",
    ingredients: [
          "45 g de ChillOut mix dulce de calabaza",
          "15 ml de Torani salted caramel",
          "1 sobre de ChillOut tapioca instantánea",
          "4 hielos",
          "240 ml de leche"
    ],
    tools: ["Licuadora","Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa el mix, Torani, leche y hielos hasta integrar.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Tapioca",
        text: "Prepara la tapioca instantánea e intégrala o decora al servir.",
        tone: "pink",
        icon: ICO.blend
      }
    ],
    seo: {
      title: "Receta Dulce de calabaza molecular 480 ml | Café Etrusca",
      description: "Bebida molecular de calabaza con tapioca instantánea ChillOut y Torani salted caramel.",
      keywords: "dulce de calabaza molecular, tapioca instantánea, chillout, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'red-velvet-bombon',
    intranetId: 81,
    sapIngredients: [
      { ingredient: "2 cucharadas de polvo Cappuccine red velvet", sap: "IBP-016", qty: 2, unit: "cucharadas" }
    ],
    title: "Red velvet",
    titleAccent: "bombón",
    kicker: 'Otoño · Temporada',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Bebida caliente 480 ml de red velvet con Cappuccine, leche espumada, bombones y jarabe n’Dulce dulce de leche.",
    image: `${ASSETS_BASE_URL}/images/recetas/otono/red-velvet-bombon.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/otono/red-velvet-bombon.webp`,
    tone: 'coral',
    brand: "Cappuccine",
    time: '10 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Temporada de otoño',
    ingredients: [
      "2 cucharadas de polvo Cappuccine red velvet",
      "1 vaso pequeño de leche",
      "1 bolsita de bombones",
      "2 cucharadas de jarabe n’Dulce dulce de leche"
    ],
    tools: ["Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Calienta",
        text: "Calienta la leche en una jarra casi a punto de ebullición, agrega el polvo red velvet y espuma mientras la viertes en otro recipiente.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Sirve en la taza de tu elección.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Coloca los bombones encima y termina con un poco de jarabe n’Dulce dulce de leche.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Red velvet bombón 480 ml | Otoño | Café Etrusca",
      description: "Bebida caliente 480 ml de red velvet con Cappuccine, leche espumada, bombones y jarabe n’Dulce dulce de leche. Receta de otoño Café Etrusca.",
      keywords: "red velvet bombon, red velvet caliente, cappuccine red velvet, bombones, ndulce dulce de leche, otoño, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'fresandia-frozen',
    intranetId: 86,
    sapIngredients: [
      { ingredient: "30 ml de ChillOut Jarabes fresa", sap: "IJA-144", qty: 30, unit: "ml" },
      { ingredient: "15 ml de ChillOut Fruit sandía", sap: "IPC-023", qty: 15, unit: "ml" },
      { ingredient: "40 g de ChillOut Mix base cristal", sap: "IBP-056", qty: 40, unit: "g" }
    ],
    title: "Fresandía",
    titleAccent: "frozen",
    kicker: 'Otoño · Temporada',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Frappé 480 ml de fresa y sandía con ChillOut Jarabes fresa, ChillOut Fruit sandía y ChillOut Mix base cristal.",
    image: `${ASSETS_BASE_URL}/images/recetas/otono/fresandia-frozen.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/otono/fresandia-frozen.webp`,
    tone: 'coral',
    brand: "ChillOut",
    time: '10 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Temporada de otoño',
    ingredients: [
      "30 ml de ChillOut Jarabes fresa",
      "15 ml de ChillOut Fruit sandía",
      "40 g de ChillOut Mix base cristal",
      "150 ml de agua",
      "1 vaso de 480 ml lleno de hielo"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Agrega todos los ingredientes a la licuadora, empezando por los líquidos.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Frappé",
        text: "Licúa hasta obtener una bebida frappé.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Sirve y decora al gusto.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Fresandía frozen 480 ml | Otoño | Café Etrusca",
      description: "Frappé 480 ml de fresa y sandía con ChillOut Jarabes fresa, ChillOut Fruit sandía y ChillOut Mix base cristal. Receta de otoño Café Etrusca.",
      keywords: "fresandia frozen, frappe de fresa y sandia, chillout fruit sandia, base cristal, otoño, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'matcha-azul-frappe-480ml',
    intranetId: 92,
    sapIngredients: [
      { ingredient: "40 g de ChillOut Mix matcha azul", sap: "IBP-184", qty: 40, unit: "g" },
      { ingredient: "30 g de ChillOut Jam mango", sap: "IPC-002", qty: 30, unit: "g" }
    ],
    title: "Matcha azul",
    titleAccent: "frappé",
    kicker: 'Otoño · Temporada',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Frappé 480 ml de ChillOut Mix matcha azul sobre ChillOut Jam mango y crema base vegetal.",
    image: `${ASSETS_BASE_URL}/images/recetas/otono/matcha-azul-frappe-480ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/otono/matcha-azul-frappe-480ml.webp`,
    tone: 'sky',
    brand: "ChillOut",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Temporada de otoño',
    ingredients: [
      "40 g de ChillOut Mix matcha azul",
      "30 g de ChillOut Jam mango",
      "20 ml de crema base vegetal",
      "150 ml de leche",
      "1 vaso de 480 ml lleno de hielo"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa el matcha azul, la leche y el hielo (sin el jam) hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Capas",
        text: "En el vaso coloca el jam de mango y después la crema base vegetal.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Agrega el frappé encima y mezcla antes de beber.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Matcha azul frappé 480 ml | Otoño | Café Etrusca",
      description: "Frappé 480 ml de ChillOut Mix matcha azul sobre ChillOut Jam mango y crema base vegetal. Receta de otoño Café Etrusca.",
      keywords: "matcha azul frappe, chillout mix matcha azul, jam mango, frappe azul, otoño, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'matcha-azul-frio-480ml',
    intranetId: 93,
    sapIngredients: [
      { ingredient: "50 g de ChillOut Mix matcha azul", sap: "IBP-184", qty: 50, unit: "g" }
    ],
    title: "Matcha azul",
    titleAccent: "frío",
    kicker: 'Otoño · Temporada',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Frappé 480 ml de ChillOut Mix matcha azul con nubes de crema batida en las paredes del vaso.",
    image: `${ASSETS_BASE_URL}/images/recetas/otono/matcha-azul-frio-480ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/otono/matcha-azul-frio-480ml.webp`,
    tone: 'sky',
    brand: "ChillOut",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Temporada de otoño',
    ingredients: [
      "50 g de ChillOut Mix matcha azul",
      "150 ml de leche",
      "1 vaso de 480 ml lleno de hielo",
      "Crema batida"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa el matcha azul, la leche y el hielo hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Nubes",
        text: "Decora las paredes del vaso con crema batida simulando nubes.",
        tone: 'pink',
        icon: ICO.decor
      },
      {
        title: "Sirve",
        text: "Sirve el frappé en el vaso decorado.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Matcha azul frío 480 ml | Otoño | Café Etrusca",
      description: "Frappé 480 ml de ChillOut Mix matcha azul con nubes de crema batida en las paredes del vaso. Receta de otoño Café Etrusca.",
      keywords: "matcha azul frio, frappe matcha azul, chillout mix matcha azul, nubes de crema, otoño, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'matcha-azul-floral-360ml',
    intranetId: 94,
    sapIngredients: [
      { ingredient: "30 g de ChillOut Mix matcha azul", sap: "IBP-184", qty: 30, unit: "g" },
      { ingredient: "15 ml de jarabe Torani rosas", sap: "IJA-061", qty: 15, unit: "ml" }
    ],
    title: "Matcha azul",
    titleAccent: "floral",
    kicker: 'Otoño · Temporada',
    category: 'Bebidas de temporada',
    collection: 'calabaza',
    origin: 'calabaza',
    summary: "Latte caliente 360 ml de ChillOut Mix matcha azul con jarabe Torani rosas y leche espumada.",
    image: `${ASSETS_BASE_URL}/images/recetas/otono/matcha-azul-floral-360ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/otono/matcha-azul-floral-360ml.webp`,
    tone: 'sky',
    brand: "ChillOut",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Temporada de otoño',
    ingredients: [
      "30 g de ChillOut Mix matcha azul",
      "15 ml de jarabe Torani rosas",
      "250 ml de leche"
    ],
    tools: ["Jarra de acero (20 oz)", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Integra",
        text: "Agrega todos los ingredientes a una jarra de acero de 20 oz.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Espuma",
        text: "Espuma hasta la temperatura deseada.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve en la taza de tu elección y espolvorea un poco de matcha azul.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Matcha azul floral 360 ml | Otoño | Café Etrusca",
      description: "Latte caliente 360 ml de ChillOut Mix matcha azul con jarabe Torani rosas y leche espumada. Receta de otoño Café Etrusca.",
      keywords: "matcha azul floral, latte de matcha azul, torani rosas, matcha azul caliente, otoño, Café Etrusca"
    },
    published: true
  },
    {
    slug: 'mangonada-chillout',
    title: 'CHAMOYADA',
    titleAccent: 'DE MANGO',
    kicker: 'Bebida fría',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: sin valor)
    summary:
      'Una bebida refrescante, picosita y llena de sabor, perfecta para disfrutar en cualquier momento.',
    image: `${ASSETS_BASE_URL}/images/recetas/mangonada-card.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/mangonada-lifestyle.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '5 min',
    yield: 'Bebida fría',
    difficulty: 'Fácil',
    bubble: 'Picosa, frutal y deliciosa',
    ingredients: [
      '40 g de ChillOut mix limón',
      '30 g de ChillOut jam mango',
      '35 g de ChillOut crystal boba mango',
      '30 ml de ChillOut chamoy',
      '150 ml de agua',
      'Hielo'
    ],
    tools: ['Licuadora'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Prepara la base',
        text: 'Vierte en el vaso de la licuadora el mix limón, jam mango, agua y hielo.',
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: 'Licúa',
        text: 'Procesa hasta obtener una consistencia de frappé tersa y homogénea.',
        tone: 'blue',
        icon: ICO.blend
      },
      {
        title: 'Decora el vaso',
        text: 'Recorre las paredes del vaso con ChillOut chamoy.',
        tone: 'pink',
        icon: ICO.decor
      },
      {
        title: 'Termina tu bebida',
        text: 'Integra las crystal boba y termina con un toque más de chamoy.',
        tone: 'green',
        icon: ICO.finish
      }
    ],
    tips: [
      'Si usas mango fresco, agrega más hielo para textura congelada.',
      'Las crystal boba van al final para que no se rompan al licuar.'
    ],
    products: [
      {
        label: 'ChillOut Mix Limón',
        description: 'Ideal para preparar la base fresca.',
        image: `/assets/images/insumos/cafe-bag-sin-fondo.webp`,
        link: '/insumos-para-cafeterias'
      },
      {
        label: 'ChillOut Jam Mango',
        description: 'Sabor intenso y auténtico.',
        image: `${ASSETS_BASE_URL}/images/insumos/matcha-can.png`,
        link: '/insumos-para-cafeterias'
      },
      {
        label: 'Crystal Boba Mango',
        description: 'Textura única y divertida.',
        image: `${ASSETS_BASE_URL}/images/insumos/product-tall-2.png`,
        link: '/insumos-para-cafeterias/toppings'
      },
      {
        label: 'ChillOut Chamoy',
        description: 'El toque picosito perfecto.',
        image: `${ASSETS_BASE_URL}/images/insumos/salsas-bottle-chamoy.webp`,
        link: '/insumos-para-cafeterias/salsas'
      }
    ],
    seo: {
      title: 'Receta Chamoyada de Mango ChillOut | Café Etrusca',
      description:
        'Prepara una chamoyada de mango con ChillOut mix limón, jam mango, crystal boba y chamoy. Receta fácil en 5 minutos.',
      keywords:
        'chamoyada de mango, mangonada, ChillOut, chamoy, crystal boba, bebidas frías, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'miche-cero',
    sapIngredients: [
      { ingredient: "20 ml de ChillOut Jam mango", sap: "IPC-002", qty: 20, unit: "ml" },
      { ingredient: "20 ml de Torani clásico limón", sap: "IJA-024", qty: 20, unit: "ml" }
    ],
    title: 'Miche',
    titleAccent: 'cero',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Michelada cero alcohol de 480 ml con escarchado de chamoy y chile, Jam mango ChillOut y Torani limón.',
    image: `${ASSETS_BASE_URL}/images/recetas/temporada/miche-cero.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/temporada/miche-cero.webp`,
    tone: 'lime',
    brand: 'ChillOut',
    time: '3 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Cero alcohol, máxima fiesta',
    escarchado: ['ChillOut Fruit chamoy', 'Chile en polvo'],
    ingredients: [
      '20 ml de ChillOut Jam mango',
      '20 ml de Torani clásico limón',
      'Cerveza 0 fría o agua mineral',
      'Sal al gusto'
    ],
    tools: ['Vaso / tarro'],
    steps: [
      {
        title: 'Escarcha',
        text: 'Escarcha el recipiente con ChillOut Fruit chamoy y chile en polvo.',
        tone: 'pink',
        icon: ICO.decor
      },
      {
        title: 'Integra',
        text: 'Agrega Jam mango, Torani limón, cerveza 0 o agua mineral y sal al gusto.',
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: 'Mezcla',
        text: 'Mezcla la bebida antes de beberla y sirve bien fría.',
        tone: 'green',
        icon: ICO.finish
      }
    ],
    seo: {
      title: 'Receta Miche cero 480 ml | Fiestas Patrias | Café Etrusca',
      description:
        'Michelada sin alcohol con ChillOut Fruit chamoy, Jam mango y Torani limón. Ideal para el menú de septiembre.',
      keywords:
        'miche cero, michelada sin alcohol, ChillOut chamoy, Torani limón, Fiestas Patrias, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'mi-mero-mole',
    sapIngredients: [
      { ingredient: "30 g de ChillOut Mix xocolatl", sap: "ICP-002", qty: 30, unit: "g" },
      { ingredient: "20 ml de Torani clásico canela", sap: "IBP-177", qty: 20, unit: "ml", confidence: "media" },
      { ingredient: "10 ml de Torani clásico crema de banana", sap: "IJA-008", qty: 10, unit: "ml" },
      { ingredient: "30 ml de espresso Mezcla especial No. 1", sap: "CPM-002", qty: 30, unit: "ml" }
    ],
    title: 'Mi mero',
    titleAccent: 'mole',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Bebida fría de 300 ml con Mix xocolatl, espresso Mezcla especial No. 1, Torani canela y crema de banana.',
    image: `${ASSETS_BASE_URL}/images/recetas/temporada/mi-mero-mole.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/temporada/mi-mero-mole.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '5 min',
    yield: '300 ml',
    difficulty: 'Media',
    bubble: 'Chocolate, chile y plátano',
    ingredients: [
      '30 g de ChillOut Mix xocolatl',
      '20 ml de Torani clásico canela',
      '10 ml de Torani clásico crema de banana',
      '20 ml de licor de chile',
      '30 ml de espresso Mezcla especial No. 1',
      'Plátano frito (garnitura)'
    ],
    tools: ['Coctelera'],
    steps: [
      {
        title: 'Diluye la base',
        text: 'Diluye el ChillOut Mix xocolatl previamente con 100 ml de agua.',
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: 'Agita',
        text: 'Agrega todos los ingredientes a una coctelera y mezcla hasta obtener una bebida fría.',
        tone: 'blue',
        icon: ICO.blend
      },
      {
        title: 'Decora',
        text: 'Sirve en vaso y decora con plátano frito.',
        tone: 'green',
        icon: ICO.finish
      }
    ],
    seo: {
      title: 'Receta Mi mero mole 300 ml | Fiestas Patrias | Café Etrusca',
      description:
        'Prepara Mi mero mole con ChillOut Mix xocolatl, espresso Mezcla especial No. 1 y Torani. Receta de temporada.',
      keywords:
        'mi mero mole, Mix xocolatl, espresso, Torani canela, Fiestas Patrias, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'diablito-de-fresa',
    sapIngredients: [
      { ingredient: "30 g de ChillOut Jam fresa", sap: "IPC-005", qty: 30, unit: "g" },
      { ingredient: "40 g de ChillOut Mix limón", sap: "IBP-215", qty: 40, unit: "g" },
      { ingredient: "30 ml de ChillOut Fruit chamoy", sap: "ICT-053", qty: 30, unit: "ml" }
    ],
    title: 'Diablito',
    titleAccent: 'de fresa',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Frappé de 480 ml con Jam fresa, Mix limón, Fruit chamoy y barrita de tamarindo.',
    image: `${ASSETS_BASE_URL}/images/recetas/temporada/diablito-de-fresa.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/temporada/diablito-de-fresa.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Fresa, chamoy y tamarindo',
    ingredients: [
      '30 g de ChillOut Jam fresa',
      '40 g de ChillOut Mix limón',
      '30 ml de ChillOut Fruit chamoy',
      '120 ml de agua',
      '1 vaso de 480 ml lleno de hielos',
      '1 barrita de tamarindo'
    ],
    tools: ['Licuadora'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Licúa la base',
        text: 'Agrega todos los ingredientes a la licuadora excepto la barrita de tamarindo, empezando por los líquidos, y licúa hasta frappé.',
        tone: 'yellow',
        icon: ICO.blend
      },
      {
        title: 'Sirve y decora',
        text: 'Sirve el frappé en el recipiente de tu preferencia y decora con la barrita de tamarindo.',
        tone: 'pink',
        icon: ICO.finish
      }
    ],
    seo: {
      title: 'Receta Diablito de fresa 480 ml | Fiestas Patrias | Café Etrusca',
      description:
        'Frappé Diablito de fresa con ChillOut Jam fresa, Mix limón, Fruit chamoy y tamarindo. Receta de septiembre.',
      keywords:
        'diablito de fresa, ChillOut jam fresa, chamoy, tamarindo, Fiestas Patrias, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'nogada-clasica',
    sapIngredients: [
      { ingredient: "Foam: 20 g ChillOut Mix leche evaporada", sap: "IBP-251", qty: 20, unit: "g", confidence: "alta" },
      { ingredient: "Foam: 10 ml Torani clásico nuez de macadamia", sap: "IJA-055", qty: 10, unit: "ml", confidence: "alta" },
      { ingredient: "Frappé: 30 ml Torani clásico granada", sap: "IJA-038", qty: 30, unit: "ml", confidence: "alta" },
      { ingredient: "Frappé: 30 g ChillOut Mix leche condensada", sap: "IBP-253", qty: 30, unit: "g", confidence: "alta" },
      { ingredient: "Frappé: 15 g ChillOut Pearls granada", sap: "ICT-029", qty: 15, unit: "g", confidence: "media" }
    ],
    title: 'Nogada',
    titleAccent: 'clásica',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Frappé de granada 480 ml coronado con foam de leche evaporada, macadamia y Pearls granada.',
    image: `${ASSETS_BASE_URL}/images/recetas/temporada/nogada-clasica.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/temporada/nogada-clasica.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '8 min',
    yield: '480 ml',
    difficulty: 'Media',
    bubble: 'Foam + frappé rosa',
    ingredients: [
      'Foam: 20 g ChillOut Mix leche evaporada',
      'Foam: 10 ml Torani clásico nuez de macadamia',
      'Foam: 25 ml crema para batir',
      'Foam: trozos de nuez (decoración)',
      'Frappé: 30 ml Torani clásico granada',
      'Frappé: 30 g ChillOut Mix leche condensada',
      'Frappé: 15 g ChillOut Pearls granada',
      'Frappé: 140 ml de leche',
      'Frappé: 1 vaso de 480 ml lleno de hielos'
    ],
    tools: ['Licuadora', 'Batidor'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Prepara el foam',
        text: 'Agrega los ingredientes del foam a un recipiente, bate y reserva en refrigeración.',
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: 'Licúa el frappé',
        text: 'Licúa los ingredientes del frappé excepto las perlas, empezando por los líquidos, hasta textura frappé.',
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: 'Arma y decora',
        text: 'Coloca el frappé, corona con foam y decora con nueces y Pearls granada.',
        tone: 'green',
        icon: ICO.finish
      }
    ],
    seo: {
      title: 'Receta Nogada clásica 480 ml | Fiestas Patrias | Café Etrusca',
      description:
        'Nogada clásica con foam de leche evaporada, frappé de granada Torani y ChillOut Pearls. Receta patriótica.',
      keywords:
        'nogada clásica, pearls granada, Torani granada, Fiestas Patrias, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'margarita',
    sapIngredients: [
      { ingredient: "20 ml de ChillOut Fruit limón", sap: "IPC-008", qty: 20, unit: "ml" },
      { ingredient: "20 ml de Torani clásico piña", sap: "IJA-026", qty: 20, unit: "ml" }
    ],
    title: 'Margarita',
    titleAccent: '',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Cóctel de 300 ml con infusión Stash manzanilla, ChillOut Fruit limón y Torani piña.',
    image: `${ASSETS_BASE_URL}/images/recetas/temporada/margarita.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/temporada/margarita.webp`,
    tone: 'coral',
    brand: 'Torani',
    time: '4 min',
    yield: '300 ml',
    difficulty: 'Fácil',
    bubble: 'Manzanilla y piña',
    escarchado: ['Sal', 'Limón'],
    ingredients: [
      '150 ml de infusión Stash manzanilla',
      '20 ml de ChillOut Fruit limón',
      '20 ml de Torani clásico piña',
      '4 piezas de hielo',
      'Sal y limón para escarchar'
    ],
    tools: ['Coctelera'],
    steps: [
      {
        title: 'Escarcha',
        text: 'Escarcha el recipiente con sal y limón; reserva.',
        tone: 'pink',
        icon: ICO.decor
      },
      {
        title: 'Agita',
        text: 'Agrega el resto de ingredientes a la coctelera y mezcla hasta obtener una bebida fría.',
        tone: 'blue',
        icon: ICO.blend
      },
      {
        title: 'Sirve',
        text: 'Sirve y decora con cítricos.',
        tone: 'green',
        icon: ICO.finish
      }
    ],
    seo: {
      title: 'Receta Margarita 300 ml con Stash manzanilla | Café Etrusca',
      description:
        'Margarita de temporada con infusión Stash manzanilla, ChillOut Fruit limón y Torani piña.',
      keywords:
        'margarita, Stash manzanilla, ChillOut Fruit limón, Torani piña, Fiestas Patrias'
    },
    published: true
  },
  {
    slug: 'marchanta',
    sapIngredients: [
      { ingredient: "20 ml de Torani clásico lavanda", sap: "IJA-062", qty: 20, unit: "ml" },
      { ingredient: "10 ml de Torani clásico diamond", sap: "IJA-221", qty: 10, unit: "ml" }
    ],
    title: 'Marchanta',
    titleAccent: '',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Bebida de 300 ml con Torani lavanda y diamond, infusión de hierbas y top de tónica.',
    image: `${ASSETS_BASE_URL}/images/recetas/temporada/marchanta.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/temporada/marchanta.webp`,
    tone: 'lime',
    brand: 'Torani',
    time: '3 min',
    yield: '300 ml',
    difficulty: 'Fácil',
    bubble: 'Lavanda y hierbas',
    ingredients: [
      '20 ml de Torani clásico lavanda',
      '10 ml de Torani clásico diamond',
      '100 ml de infusión (toronjil, menta, romero)',
      'Top de agua tónica',
      '3 piezas de hielo'
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Arma la base',
        text: 'Agrega en el vaso Torani lavanda, diamond, la infusión y el hielo.',
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: 'Termina',
        text: 'Finaliza con agua tónica y decora con romero.',
        tone: 'green',
        icon: ICO.finish
      }
    ],
    seo: {
      title: 'Receta Marchanta 300 ml | Fiestas Patrias | Café Etrusca',
      description:
        'Marchanta con Torani lavanda, diamond, infusión de hierbas y tónica. Receta ligera de temporada.',
      keywords:
        'marchanta, Torani lavanda, tónica, Fiestas Patrias, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'cate-de-mi-corazon',
    sapIngredients: [
      { ingredient: "20 g de ChillOut Mix limón", sap: "IBP-215", qty: 20, unit: "g" },
      { ingredient: "10 ml de ChillOut Fruit naranja enana", sap: "IPC-095", qty: 10, unit: "ml", confidence: "media" },
      { ingredient: "30 ml de espresso Mezcla especial No. 1", sap: "CPM-002", qty: 30, unit: "ml" }
    ],
    title: 'Cate',
    titleAccent: 'de mi corazón',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Frappé de 300 ml con Mix limón, Fruit naranja enana, espresso y aguacate.',
    image: `${ASSETS_BASE_URL}/images/recetas/temporada/cate-de-mi-corazon.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/temporada/cate-de-mi-corazon.webp`,
    tone: 'lime',
    brand: 'ChillOut',
    time: '5 min',
    yield: '300 ml',
    difficulty: 'Fácil',
    bubble: 'Aguacate + espresso',
    ingredients: [
      '20 g de ChillOut Mix limón',
      '10 ml de ChillOut Fruit naranja enana',
      '30 ml de espresso Mezcla especial No. 1',
      '1/4 de pieza de aguacate',
      '3 piezas de hielo'
    ],
    tools: ['Licuadora'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Licúa',
        text: 'Agrega todos los ingredientes al vaso de la licuadora y licúa hasta frappé.',
        tone: 'blue',
        icon: ICO.blend
      },
      {
        title: 'Sirve',
        text: 'Sirve y decora al gusto.',
        tone: 'green',
        icon: ICO.finish
      }
    ],
    seo: {
      title: 'Receta Cate de mi corazón 300 ml | Fiestas Patrias | Café Etrusca',
      description:
        'Cate de mi corazón: frappé con ChillOut Mix limón, Fruit naranja enana, espresso y aguacate.',
      keywords:
        'cate de mi corazón, aguacate, espresso, ChillOut, Fiestas Patrias, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'horchata-mexa',
    sapIngredients: [
      { ingredient: "30 g de ChillOut Fruit azúcar morena", sap: "IPC-111", qty: 30, unit: "g" },
      { ingredient: "40 g de ChillOut Mix horchata", sap: "IBP-062", qty: 40, unit: "g" }
    ],
    title: 'Horchata',
    titleAccent: 'mexa',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Frappé de 480 ml con Mix horchata, Fruit azúcar morena, leche y canela.',
    image: `${ASSETS_BASE_URL}/images/recetas/temporada/horchata-mexa.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/temporada/horchata-mexa.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Canela y azúcar morena',
    ingredients: [
      '30 g de ChillOut Fruit azúcar morena',
      '40 g de ChillOut Mix horchata',
      'Canela en polvo',
      '150 ml de leche',
      '1 vaso de 480 ml lleno de hielos'
    ],
    tools: ['Licuadora'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Licúa',
        text: 'Licúa leche, Mix horchata e hielos hasta obtener frappé.',
        tone: 'yellow',
        icon: ICO.blend
      },
      {
        title: 'Marmolea',
        text: 'Marmolea el vaso con Fruit azúcar morena, vierte el frappé y espolvorea canela.',
        tone: 'pink',
        icon: ICO.decor
      }
    ],
    seo: {
      title: 'Receta Horchata mexa 480 ml | Fiestas Patrias | Café Etrusca',
      description:
        'Horchata mexa con ChillOut Mix horchata, Fruit azúcar morena, leche y canela. Receta de septiembre.',
      keywords:
        'horchata mexa, ChillOut Mix horchata, azúcar morena, Fiestas Patrias, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'lychee-rose',
    intranetId: 197,
    sapIngredients: [
      { ingredient: "30 ml de jarabe Torani clásico rosas", sap: "IJA-061", qty: 30, unit: "ml" }
    ],
    title: 'Lychee',
    titleAccent: 'Rose',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Bebida efervescente de 480 ml con Torani rosas, cold foam ChillOut fruit lichi, romero y tónica.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/lychee-rose.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/lychee-rose.webp`,
    tone: 'coral',
    brand: 'Torani',
    time: '4 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Rosas y lichi',
    ingredients: [
      '30 ml de jarabe Torani clásico rosas',
      '40 ml de cold foam con ChillOut fruit lichi (previamente elaborado)',
      '1 ramita de romero',
      '300 ml de agua tónica',
      '4 hielos'
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Arma la base',
        text: 'Coloca en el vaso el jarabe, los hielos y el agua tónica.',
        tone: 'yellow'
      },
      {
        title: 'Aroma',
        text: 'Flamea el romero y agrégalo al vaso.',
        tone: 'pink'
      },
      {
        title: 'Termina',
        text: 'Finaliza con el cold foam de lichi.',
        tone: 'green'
      }
    ],
    seo: {
      title: 'Receta Lychee Rose 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Lychee Rose con Torani rosas, cold foam ChillOut fruit lichi, romero y tónica. Receta de verano.',
      keywords: 'lychee rose, Torani rosas, ChillOut lichi, verano, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'mojito-dragon-fruit',
    sapIngredients: [
      { ingredient: "20 g de ChillOut Jam pitahaya", sap: "IPC-001", qty: 20, unit: "g", confidence: "media" },
      { ingredient: "100 ml de infusión Stash green tea", sap: "ITB-014", qty: 100, unit: "ml", confidence: "media" },
      { ingredient: "10 g de ChillOut Mix limón", sap: "IBP-215", qty: 10, unit: "g" }
    ],
    title: 'Mojito',
    titleAccent: 'dragon fruit',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Mojito de 480 ml con Jam pitahaya, Stash green tea, Mix limón, menta y top de tónica.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/mojito-dragon-fruit.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/mojito-dragon-fruit.webp`,
    tone: 'lime',
    brand: 'ChillOut',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Pitahaya y menta',
    ingredients: [
      '20 g de ChillOut Jam pitahaya',
      '100 ml de infusión Stash green tea',
      '10 g de ChillOut Mix limón',
      'Hojas de menta',
      'Top de agua tónica',
      '4 piezas de hielo'
    ],
    tools: ['Shaker'],
    steps: [
      {
        title: 'Mezcla',
        text: 'Vierte en un shaker todos los ingredientes excepto el top de tónica y mezcla hasta obtener una bebida fría.',
        tone: 'yellow'
      },
      {
        title: 'Termina',
        text: 'Finaliza con top de agua tónica y decora con rodaja de limón y hojas de menta.',
        tone: 'green'
      }
    ],
    seo: {
      title: 'Receta Mojito dragon fruit 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Mojito dragon fruit con ChillOut Jam pitahaya, Stash green tea y Mix limón. Receta de verano.',
      keywords: 'mojito dragon fruit, pitahaya, Stash green tea, verano, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'dirty-soda',
    intranetId: 199,
    sapIngredients: [
      { ingredient: "15 ml de jarabe Torani clásico galleta de mantequilla", sap: "IJA-224", qty: 15, unit: "ml" },
      { ingredient: "30 ml de foam elaborado con ChillOut Mix leche condensada", sap: "IBP-253", qty: 30, unit: "ml", confidence: "media" }
    ],
    title: 'Dirty',
    titleAccent: 'soda',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Dirty soda de 480 ml con Torani galleta de mantequilla, foam Mix leche condensada y refresco cola.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/dirty-soda.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/dirty-soda.webp`,
    tone: 'gold',
    brand: 'Torani',
    time: '3 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Cola + foam',
    ingredients: [
      '15 ml de jarabe Torani clásico galleta de mantequilla',
      '30 ml de foam elaborado con ChillOut Mix leche condensada',
      '1 refresco sabor cola',
      '4 piezas de hielo'
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Arma',
        text: 'Agrega al vaso el refresco, el jarabe y los hielos.',
        tone: 'yellow'
      },
      {
        title: 'Termina',
        text: 'Finaliza con el foam y decora con cerezas si deseas.',
        tone: 'pink'
      }
    ],
    seo: {
      title: 'Receta Dirty soda 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Dirty soda con Torani galleta de mantequilla, foam ChillOut leche condensada y cola. Receta de verano.',
      keywords: 'dirty soda, Torani galleta de mantequilla, cola, verano, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'orange-cream-cold-brew',
    intranetId: 200,
    sapIngredients: [
      { ingredient: "180 ml de cold brew preparado con Café Etrusca Mezcla Especial n.º 1", sap: "CPM-002", qty: 180, unit: "ml" },
      { ingredient: "40 g de cold foam preparado con ChillOut Fruit naranja enana", sap: "IPC-095", qty: 40, unit: "g", confidence: "media" },
      { ingredient: "Salsa Torani caramelo (decoración)", sap: "ISA-017", qty: 0, unit: "ml", confidence: "media" }
    ],
    title: 'Orange cream',
    titleAccent: 'cold brew',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Cold brew 480 ml con Mezcla Especial n.º 1, foam Fruit naranja enana y Torani caramelo.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/orange-cream-cold-brew.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/orange-cream-cold-brew.webp`,
    tone: 'gold',
    brand: 'Café Etrusca',
    time: '4 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Naranja y caramelo',
    ingredients: [
      '180 ml de cold brew preparado con Café Etrusca Mezcla Especial n.º 1',
      '40 g de cold foam preparado con ChillOut Fruit naranja enana',
      'Salsa Torani caramelo (decoración)',
      '3 o 4 piezas de hielo',
      'Rodaja de naranja'
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Base',
        text: 'En un vaso agrega los hielos y el cold brew previamente elaborado (ratio 1:07).',
        tone: 'yellow'
      },
      {
        title: 'Foam y decora',
        text: 'Incorpora el cold foam de naranja y decora con rejilla de caramelo y rodaja de naranja.',
        tone: 'green'
      }
    ],
    seo: {
      title: 'Receta Orange cream cold brew 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Orange cream cold brew con Mezcla Especial n.º 1, foam ChillOut naranja enana y Torani caramelo.',
      keywords: 'orange cream cold brew, Mezcla Especial, ChillOut naranja, verano, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'matcha-colada',
    intranetId: 201,
    sapIngredients: [
      { ingredient: "25 g de ChillOut Mix matcha azul", sap: "IBP-184", qty: 25, unit: "g" },
      { ingredient: "20 ml de jarabe Torani clásico piña", sap: "IJA-026", qty: 20, unit: "ml" }
    ],
    title: 'Matcha',
    titleAccent: 'colada',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Frappé 480 ml con Mix matcha azul, Torani piña, foam Mix coco, leche e hielo.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/matcha-colada.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/matcha-colada.webp`,
    tone: 'sky',
    brand: 'ChillOut',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Matcha azul y coco',
    ingredients: [
      '25 g de ChillOut Mix matcha azul',
      '20 ml de jarabe Torani clásico piña',
      '40 g de cold foam elaborado con ChillOut Mix sabor coco',
      '130 ml de leche',
      '1 vaso de 480 ml con hielos'
    ],
    tools: ['Licuadora'],
    toolIcon: `${ASSETS_BASE_URL}/images/recetas/icons/tool-licuadora.svg`,
    steps: [
      {
        title: 'Licúa',
        text: 'Coloca todos los ingredientes (excepto el foam) en la licuadora y licúa hasta frappé.',
        tone: 'blue'
      },
      {
        title: 'Termina',
        text: 'Sirve hasta ¾ del vaso y finaliza con el foam de coco.',
        tone: 'green'
      }
    ],
    seo: {
      title: 'Receta Matcha colada 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Matcha colada con ChillOut Mix matcha azul, Torani piña y foam de coco. Receta de verano.',
      keywords: 'matcha colada, matcha azul, Torani piña, verano, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'strawberry-matcha-lemonade',
    intranetId: 202,
    sapIngredients: [
      { ingredient: "3 g de ChillOut matcha ceremonial", sap: "ITE-060", qty: 3, unit: "g" },
      { ingredient: "10 g de ChillOut tisana fresa kiwi", sap: "ITI-102", qty: 10, unit: "g" },
      { ingredient: "10 g de ChillOut Mix limón", sap: "IBP-215", qty: 10, unit: "g" }
    ],
    title: 'Strawberry',
    titleAccent: 'matcha lemonade',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Limonada estratificada 480 ml con matcha ceremonial, tisana fresa kiwi y Mix limón.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/strawberry-matcha-lemonade.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/strawberry-matcha-lemonade.webp`,
    tone: 'lime',
    brand: 'ChillOut',
    time: '8 min',
    yield: '480 ml',
    difficulty: 'Media',
    bubble: 'Fresa + matcha',
    ingredients: [
      '3 g de ChillOut matcha ceremonial',
      '10 g de ChillOut tisana fresa kiwi',
      '10 g de ChillOut Mix limón',
      '160 ml de agua caliente (no mayor a 80 °C)',
      '200 ml de agua mineral',
      '3 rodajas de limón amarillo',
      '3 a 6 hielos'
    ],
    tools: ['Shaker'],
    steps: [
      {
        title: 'Infusiona',
        text: 'Infusiona la tisana con 80 ml de agua caliente por 5 minutos; prepara el matcha ceremonial y reserva.',
        tone: 'yellow'
      },
      {
        title: 'Integra',
        text: 'En un shaker mezcla la tisana infusionada, el polvo de limón y 2 hielos hasta integrar.',
        tone: 'pink'
      },
      {
        title: 'Arma',
        text: 'Vierte la mezcla y los hielos en el vaso, decora con limón y corona con el matcha ceremonial.',
        tone: 'green'
      }
    ],
    seo: {
      title: 'Receta Strawberry matcha lemonade 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Strawberry matcha lemonade con matcha ceremonial ChillOut, tisana fresa kiwi y Mix limón.',
      keywords: 'strawberry matcha lemonade, matcha ceremonial, tisana fresa, verano, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'tropical-cold-brew',
    intranetId: 203,
    sapIngredients: [
      { ingredient: "30 ml de cold brew preparado con Café Etrusca Mezcla Especial n.º 1", sap: "CPM-002", qty: 30, unit: "ml" },
      { ingredient: "45 ml de jarabe Torani clásico coco", sap: "IJA-016", qty: 45, unit: "ml" },
      { ingredient: "45 ml de cold foam preparado con ChillOut Jam mango", sap: "IPC-002", qty: 45, unit: "ml", confidence: "media" }
    ],
    title: 'Tropical',
    titleAccent: 'cold brew',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Cold brew 480 ml con Mezcla Especial n.º 1, Torani coco, foam Jam mango, leche e hielo.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/tropical-cold-brew.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/tropical-cold-brew.webp`,
    tone: 'gold',
    brand: 'Café Etrusca',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Coco y mango',
    ingredients: [
      '30 ml de cold brew preparado con Café Etrusca Mezcla Especial n.º 1',
      '45 ml de jarabe Torani clásico coco',
      '45 ml de cold foam preparado con ChillOut Jam mango',
      '150 ml de leche',
      '4 piezas de hielo'
    ],
    tools: ['Shaker'],
    steps: [
      {
        title: 'Base láctea',
        text: 'En un shaker mezcla el jarabe con la leche y dos hielos; cuela en el vaso.',
        tone: 'yellow'
      },
      {
        title: 'Capas',
        text: 'Agrega hielos, el cold brew y el foam sobre uno de ellos para efecto de capas; espolvorea coco rallado.',
        tone: 'green'
      }
    ],
    seo: {
      title: 'Receta Tropical cold brew 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Tropical cold brew con Mezcla Especial n.º 1, Torani coco y foam ChillOut Jam mango.',
      keywords: 'tropical cold brew, Torani coco, Jam mango, verano, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'soda-tropical-espumosa',
    intranetId: 204,
    sapIngredients: [
      { ingredient: "30 g de ChillOut Mix maracuyá", sap: "IBP-222", qty: 30, unit: "g" }
    ],
    title: 'Soda tropical',
    titleAccent: 'espumosa',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Soda 480 ml con Mix maracuyá, agua mineral, hielo, menta y limón.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/soda-tropical-espumosa.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/soda-tropical-espumosa.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '4 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Maracuyá espumoso',
    ingredients: [
      '30 g de ChillOut Mix maracuyá',
      '60 ml de agua caliente',
      '300 ml de agua mineral',
      'Hielo al tope del vaso',
      'Hojas de menta o hierbabuena fresca y una rodaja de limón'
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Jarabe',
        text: 'En el fondo del vaso disuelve el polvo de maracuyá con el agua caliente hasta un jarabe espeso.',
        tone: 'yellow'
      },
      {
        title: 'Menta',
        text: 'Agrega las hojas de menta y macera un poco sin romperlas.',
        tone: 'pink'
      },
      {
        title: 'Espuma',
        text: 'Llena de hielo y vierte el agua mineral lentamente.',
        tone: 'blue'
      }
    ],
    seo: {
      title: 'Receta Soda tropical espumosa 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Soda tropical espumosa con ChillOut Mix maracuyá, agua mineral, menta y limón. Receta de verano.',
      keywords: 'soda tropical, maracuyá, ChillOut, verano, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'sparkling-cherry',
    intranetId: 205,
    sapIngredients: [
      { ingredient: "30 ml de jarabe Torani clásico cereza", sap: "IJA-015", qty: 30, unit: "ml" },
      { ingredient: "20 g de ChillOut Mix limón", sap: "IBP-215", qty: 20, unit: "g" },
      { ingredient: "60 ml de cold foam ChillOut Just fruit piña colada", sap: "IBP-057", qty: 60, unit: "ml", confidence: "media" }
    ],
    title: 'Sparkling',
    titleAccent: 'cherry',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Sparkling 480 ml con Torani cereza, Mix limón, cold foam piña colada y refresco lima-limón.',
    image: `${ASSETS_BASE_URL}/images/recetas/verano/sparkling-cherry.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/verano/sparkling-cherry.webp`,
    tone: 'coral',
    brand: 'Torani',
    time: '4 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Cereza sparkling',
    ingredients: [
      '30 ml de jarabe Torani clásico cereza',
      '20 g de ChillOut Mix limón',
      '60 ml de cold foam ChillOut Just fruit piña colada',
      '150 ml de refresco de lima-limón',
      '60 ml de agua',
      '4 piezas de hielo'
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Base',
        text: 'En un recipiente mezcla el jarabe, el agua y la base de limón hasta integrar; sirve en el vaso.',
        tone: 'yellow'
      },
      {
        title: 'Termina',
        text: 'Agrega los hielos, el refresco lima-limón y corona con el cold foam.',
        tone: 'pink'
      }
    ],
    seo: {
      title: 'Receta Sparkling cherry 480 ml | Verano 2026 | Café Etrusca',
      description:
        'Sparkling cherry con Torani cereza, ChillOut Mix limón y cold foam piña colada. Receta de verano.',
      keywords: 'sparkling cherry, Torani cereza, piña colada foam, verano, Café Etrusca'
    },
    published: true
  },
    // ——— San Valentín 2026 ———
  {
    slug: 'manzana-acaramelada',
    sapIngredients: [
      { ingredient: "40 g ChillOut mix base neutra", sap: "IBP-032", qty: 40, unit: "g" },
      { ingredient: "45 ml Torani clásico manzana verde", sap: "IJA-052", qty: 45, unit: "ml" },
      { ingredient: "30 ml salsa Torani Puremade caramelo", sap: "ISA-021", qty: 30, unit: "ml" }
    ],
    title: 'Manzana',
    titleAccent: 'Acaramelada',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Frappé 480 ml con Mix base neutra, Torani manzana verde y salsa Puremade caramelo.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/manzana-acaramelada.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/manzana-acaramelada.webp`,
    tone: 'coral',
    brand: 'Torani',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Manzana y caramelo',
    ingredients: [
      '40 g ChillOut mix base neutra',
      '45 ml Torani clásico manzana verde',
      '30 ml salsa Torani Puremade caramelo',
      '130 ml de leche',
      '1 vaso de 480 ml con hielos',
    ],
    tools: ['Licuadora'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Licúa',
        text: 'Licúa leche, jarabe, salsa, polvo e hielos hasta obtener frappé.',
        tone: 'yellow',
        icon: ICO.blend
      },
      {
        title: 'Marmolea',
        text: 'Marmolea el vaso con caramelo, vierte la mezcla y decora con crema batida marmoleada con caramelo.',
        tone: 'pink',
        icon: ICO.decor
      },
    ],
    seo: {
      title: 'Receta Manzana Acaramelada 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Manzana acaramelada con ChillOut base neutra, Torani manzana verde y Puremade caramelo. Receta de San Valentín.',
      keywords: 'manzana acaramelada, Torani manzana verde, caramelo, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'rosa-pistache-foam',
    sapIngredients: [
      { ingredient: "30 ml ChillOut fruit fresa", sap: "IBP-040", qty: 30, unit: "ml" },
      { ingredient: "30 g ChillOut mix pistache", sap: "IBP-247", qty: 30, unit: "g" },
      { ingredient: "30 g ChillOut mix base neutra", sap: "IBP-032", qty: 30, unit: "g" },
      { ingredient: "50 ml de crema base", sap: "IBP-143", qty: 50, unit: "ml", confidence: "media" }
    ],
    title: 'Rosa pistache',
    titleAccent: 'Foam',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Bebida 480 ml de pistache con foam rosa de ChillOut fruit fresa y mix base neutra.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/rosa-pistache-foam.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/rosa-pistache-foam.webp`,
    tone: 'lime',
    brand: 'ChillOut',
    time: '6 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Pistache y fresa',
    ingredients: [
      '30 ml ChillOut fruit fresa',
      '30 g ChillOut mix pistache',
      '30 g ChillOut mix base neutra',
      '50 ml de crema base',
      '200 ml de leche',
      '20 ml de leche para foam',
      '2-3 hielos',
      '3-5 pistaches',
    ],
    tools: ['Shaker', 'Batidor'],
    steps: [
      {
        title: 'Foam',
        text: 'Mezcla crema base, leche, fruit fresa y polvo hasta espesar; refrigera unos minutos.',
        tone: 'pink'
      },
      {
        title: 'Base',
        text: 'En shaker mezcla leche, mix pistache e hielos hasta integrar.',
        tone: 'yellow'
      },
      {
        title: 'Termina',
        text: 'Sirve en vaso con hielos, cuela la base y corona con foam y pistaches.',
        tone: 'green'
      },
    ],
    seo: {
      title: 'Receta Rosa pistache Foam 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Rosa pistache foam con ChillOut mix pistache y fruit fresa. Receta de San Valentín.',
      keywords: 'rosa pistache, foam fresa, ChillOut pistache, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'caricia-de-amor',
    sapIngredients: [
      { ingredient: "30 ml Torani clásico crema de banana", sap: "IJA-008", qty: 30, unit: "ml" },
      { ingredient: "30 ml Torani clásico cereza", sap: "IJA-015", qty: 30, unit: "ml" },
      { ingredient: "22.5 ml de crema base", sap: "IBP-143", qty: 22.5, unit: "ml", confidence: "media" }
    ],
    title: 'Caricia de',
    titleAccent: 'Amor',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Cóctel cremoso 480 ml con Torani crema de banana, cereza, crema base, vodka y leche.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/caricia-de-amor.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/caricia-de-amor.webp`,
    tone: 'coral',
    brand: 'Torani',
    time: '4 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Banana y cereza',
    ingredients: [
      '30 ml Torani clásico crema de banana',
      '30 ml Torani clásico cereza',
      '22.5 ml de crema base',
      '30 ml de vodka',
      '3 piezas de hielo',
      '60 ml de leche',
      '1 cereza',
    ],
    tools: ['Shaker'],
    steps: [
      {
        title: 'Mezcla',
        text: 'En shaker agrega todos los ingredientes y mezcla suavemente unos 5 segundos.',
        tone: 'yellow'
      },
      {
        title: 'Sirve',
        text: 'Cuela en el vaso de tu preferencia y decora con cereza.',
        tone: 'pink'
      },
    ],
    seo: {
      title: 'Receta Caricia de Amor 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Caricia de amor con Torani crema de banana y cereza. Receta de San Valentín.',
      keywords: 'caricia de amor, Torani banana, Torani cereza, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'soda-de-la-pasion',
    sapIngredients: [
      { ingredient: "30 g ChillOut pop níspero", sap: "ICT-111", qty: 30, unit: "g" },
      { ingredient: "30 g ChillOut pop fresa", sap: "IBP-040", qty: 30, unit: "g", confidence: "media" },
      { ingredient: "30 ml Torani clásico maracuyá", sap: "IJA-042", qty: 30, unit: "ml" }
    ],
    title: 'Soda de la',
    titleAccent: 'Pasión',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Soda 480 ml con ChillOut pop níspero y fresa, Torani maracuyá y agua mineral.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/soda-de-la-pasion.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/soda-de-la-pasion.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '3 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Maracuyá y pops',
    ingredients: [
      '30 g ChillOut pop níspero',
      '30 g ChillOut pop fresa',
      '30 ml Torani clásico maracuyá',
      '3-4 hielos',
      '230 ml de agua mineral',
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Arma',
        text: 'En el vaso agrega los pops, el jarabe y los hielos.',
        tone: 'yellow'
      },
      {
        title: 'Termina',
        text: 'Vierte el agua mineral con cuidado sobre los hielos y mezcla para disfrutar.',
        tone: 'green'
      },
    ],
    seo: {
      title: 'Receta Soda de la Pasión 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Soda de la pasión con ChillOut pop y Torani maracuyá. Receta de San Valentín.',
      keywords: 'soda de la pasión, Torani maracuyá, ChillOut pop, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'negro-dulce-corazon',
    sapIngredients: [
      { ingredient: "2 sobres de Stash english breakfast", sap: "ITB-005", qty: 2, unit: "pza" },
      { ingredient: "45 ml ChillOut fruit cereza", sap: "IPC-012", qty: 45, unit: "ml" },
      { ingredient: "30 g ChillOut jelly heart", sap: "ICT-011", qty: 30, unit: "g", confidence: "media" },
      { ingredient: "30 g ChillOut base cristal", sap: "IBP-056", qty: 30, unit: "g" }
    ],
    title: 'Negro dulce',
    titleAccent: 'Corazón',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Frappé 480 ml con Stash english breakfast, ChillOut fruit cereza, jelly heart y base cristal.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/negro-dulce-corazon.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/negro-dulce-corazon.webp`,
    tone: 'navy',
    brand: 'ChillOut',
    time: '6 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Té y cereza',
    ingredients: [
      '2 sobres de Stash english breakfast',
      '45 ml ChillOut fruit cereza',
      '30 g ChillOut jelly heart',
      '30 g ChillOut base cristal',
      '150 ml de agua caliente 85-90°',
      '1 vaso de 480 ml con hielos',
    ],
    tools: ['Licuadora'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Infusión',
        text: 'Infusiona los sobres de té con agua caliente y deja enfriar.',
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: 'Licúa',
        text: 'Licúa la infusión, el concentrado, la base cristal y los hielos hasta frappé.',
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: 'Decora',
        text: 'Marmolea el vaso con concentrado, vierte el frappé y decora con jelly heart.',
        tone: 'green',
        icon: ICO.decor
      },
    ],
    seo: {
      title: 'Receta Negro dulce Corazón 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Negro dulce corazón con Stash english breakfast y ChillOut fruit cereza. Receta de San Valentín.',
      keywords: 'negro dulce corazón, Stash english breakfast, jelly heart, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'lemon-cherry',
    sapIngredients: [
      { ingredient: "45 ml Torani clásico cereza", sap: "IJA-015", qty: 45, unit: "ml" },
      { ingredient: "30 g ChillOut mix limón", sap: "IBP-215", qty: 30, unit: "g" }
    ],
    title: 'Lemon',
    titleAccent: 'Cherry',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Bebida 480 ml con Torani cereza, ChillOut mix limón y agua, servida sobre hielo.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/lemon-cherry.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/lemon-cherry.webp`,
    tone: 'lime',
    brand: 'Torani',
    time: '4 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Limón y cereza',
    ingredients: [
      '45 ml Torani clásico cereza',
      '30 g ChillOut mix limón',
      '250 ml de agua',
      '60 ml de agua caliente',
      '3-4 hielos',
    ],
    tools: ['Shaker'],
    steps: [
      {
        title: 'Limón',
        text: 'En shaker agita agua, hielos y mix limón.',
        tone: 'yellow'
      },
      {
        title: 'Cereza',
        text: 'Diluye el jarabe de cereza con agua caliente.',
        tone: 'pink'
      },
      {
        title: 'Sirve',
        text: 'En vaso con hielo vierte la mezcla de limón y después la de cereza; mezcla.',
        tone: 'green'
      },
    ],
    seo: {
      title: 'Receta Lemon Cherry 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Lemon cherry con Torani cereza y ChillOut mix limón. Receta de San Valentín.',
      keywords: 'lemon cherry, Torani cereza, ChillOut limón, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'beso-de-fresa',
    sapIngredients: [
      { ingredient: "30 ml ChillOut jarabe fresa", sap: "IJA-144", qty: 30, unit: "ml" },
      { ingredient: "15 ml Torani clásico diamond", sap: "IJA-221", qty: 15, unit: "ml" }
    ],
    title: 'Beso de',
    titleAccent: 'Fresa',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Refresco 275 ml con ChillOut jarabe fresa, Torani diamond, tequila, fresa, menta y agua mineral.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/beso-de-fresa.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/beso-de-fresa.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '4 min',
    yield: '275 ml',
    difficulty: 'Fácil',
    bubble: 'Fresa y menta',
    ingredients: [
      '30 ml ChillOut jarabe fresa',
      '15 ml Torani clásico diamond',
      '30 ml de tequila de tu preferencia',
      '2 fresas',
      '3 hojas de menta',
      '100 ml de agua mineral',
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Macera',
        text: 'Corta la fresa y macérala con la menta en el vaso.',
        tone: 'yellow'
      },
      {
        title: 'Arma',
        text: 'Agrega hielos, jarabes, tequila y agua mineral; mezcla para disfrutar.',
        tone: 'pink'
      },
    ],
    seo: {
      title: 'Receta Beso de Fresa 275 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Beso de fresa con ChillOut jarabe fresa y Torani diamond. Receta de San Valentín.',
      keywords: 'beso de fresa, ChillOut fresa, Torani diamond, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'sandia-on-fire',
    sapIngredients: [
      { ingredient: "40 ml Tea zone sandía", sap: "IPC-050", qty: 40, unit: "ml" },
      { ingredient: "30 ml ChillOut fruit chamoy", sap: "ICT-053", qty: 30, unit: "ml" },
      { ingredient: "30 g ChillOut mix base cristal", sap: "IBP-056", qty: 30, unit: "g" },
      { ingredient: "30 g ChillOut jelly heart", sap: "ICT-011", qty: 30, unit: "g", confidence: "media" }
    ],
    title: 'Sandía on',
    titleAccent: 'Fire',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Granizado 480 ml con Tea zone sandía, ChillOut fruit chamoy, base cristal y jelly heart.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/sandia-on-fire.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/sandia-on-fire.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Sandía y chamoy',
    ingredients: [
      '40 ml Tea zone sandía',
      '30 ml ChillOut fruit chamoy',
      '30 g ChillOut mix base cristal',
      '30 g ChillOut jelly heart',
      '30 ml de agua',
      '1 vaso de 480 ml con hielos',
      '1 paleta de sandía chamoy',
    ],
    tools: ['Licuadora'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Licúa',
        text: 'Licúa los líquidos, el polvo y los hielos hasta textura de granizado.',
        tone: 'yellow',
        icon: ICO.blend
      },
      {
        title: 'Decora',
        text: 'Marmolea el vaso con chamoy y tajín, sirve y decora con paleta y jelly heart.',
        tone: 'pink',
        icon: ICO.decor
      },
    ],
    seo: {
      title: 'Receta Sandía on Fire 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Sandía on fire con Tea zone sandía y ChillOut fruit chamoy. Receta de San Valentín.',
      keywords: 'sandía on fire, chamoy, Tea zone sandía, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'dulce-cheesecake-frambuesa',
    sapIngredients: [
      { ingredient: "30 g ChillOut mix base neutra", sap: "IBP-032", qty: 30, unit: "g" },
      { ingredient: "30 ml ChillOut fruit frambuesa", sap: "IPC-013", qty: 30, unit: "ml" },
      { ingredient: "30 ml Torani clásico cheesecake", sap: "IJA-004", qty: 30, unit: "ml" }
    ],
    title: 'Dulce cheesecake de',
    titleAccent: 'Frambuesa',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Frappé 480 ml con Mix base neutra, ChillOut fruit frambuesa, Torani cheesecake y milk foam.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/dulce-cheesecake-frambuesa.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/dulce-cheesecake-frambuesa.webp`,
    tone: 'coral',
    brand: 'Torani',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Cheesecake y frambuesa',
    ingredients: [
      '30 g ChillOut mix base neutra',
      '30 ml ChillOut fruit frambuesa',
      '30 ml Torani clásico cheesecake',
      '120 ml de leche',
      '16 oz de hielo',
      'Milk foam',
    ],
    tools: ['Licuadora'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Licúa',
        text: 'Licúa primero los líquidos, luego el polvo y al final el hielo hasta frappé.',
        tone: 'yellow',
        icon: ICO.blend
      },
      {
        title: 'Termina',
        text: 'Marmolea el vaso con foam y concentrado, vacía la mezcla y corona con milk foam.',
        tone: 'pink',
        icon: ICO.decor
      },
    ],
    seo: {
      title: 'Receta Dulce cheesecake de Frambuesa 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Dulce cheesecake de frambuesa con Torani cheesecake y ChillOut fruit frambuesa. Receta de San Valentín.',
      keywords: 'cheesecake frambuesa, Torani cheesecake, ChillOut frambuesa, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'orange-fantasy-tonic',
    sapIngredients: [
      { ingredient: "45 ml ChillOut fruit naranja y limón", sap: "IPC-095", qty: 45, unit: "ml" },
      { ingredient: "1 sobre de Stash frambuesa e hibiscos", sap: "ITB-012", qty: 1, unit: "pza", confidence: "media" }
    ],
    title: 'Orange fantasy',
    titleAccent: 'Tonic',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Tónica 360 ml con ChillOut fruit naranja y limón, Stash frambuesa e hibiscos y agua tónica.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/orange-fantasy-tonic.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/orange-fantasy-tonic.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Naranja y tónica',
    ingredients: [
      '45 ml ChillOut fruit naranja y limón',
      '1 sobre de Stash frambuesa e hibiscos',
      '100 ml de agua caliente 85-90°',
      '200 ml de agua tónica',
      '2-3 hielos',
      'Decoración floral',
    ],
    tools: ['Vaso'],
    steps: [
      {
        title: 'Infusión',
        text: 'Infusiona el sobre de té con 100 ml de agua caliente.',
        tone: 'yellow'
      },
      {
        title: 'Arma',
        text: 'En el vaso mezcla tónica y concentrado; agrega hielos y vierte el té lentamente.',
        tone: 'pink'
      },
      {
        title: 'Termina',
        text: 'Mezcla y decora con flor.',
        tone: 'green'
      },
    ],
    seo: {
      title: 'Receta Orange fantasy Tonic 360 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Orange fantasy tonic con ChillOut fruit naranja y limón y Stash frambuesa e hibiscos. Receta de San Valentín.',
      keywords: 'orange fantasy tonic, Stash hibiscos, ChillOut naranja, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'rojo-pasion-foam',
    sapIngredients: [
      { ingredient: "40 g Cappuccine red velvet", sap: "IBP-016", qty: 40, unit: "g" },
      { ingredient: "30 g ChillOut mix leche condensada (foam)", sap: "IBP-253", qty: 30, unit: "g", confidence: "alta" },
      { ingredient: "50 ml de crema base (foam)", sap: "IBP-143", qty: 50, unit: "ml", confidence: "media" }
    ],
    title: 'Rojo pasión',
    titleAccent: 'Foam',
    kicker: 'San Valentín 2026',
    category: 'Bebidas de temporada',
    collection: 'san-valentin-2026',
    origin: 'san-valentin-2026',
    summary:
      'Frappé 480 ml con Cappuccine red velvet y foam de ChillOut mix leche condensada.',
    image: `${ASSETS_BASE_URL}/images/recetas/san-valentin/rojo-pasion-foam.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/san-valentin/rojo-pasion-foam.webp`,
    tone: 'coral',
    brand: 'Cappuccine',
    time: '6 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Red velvet foam',
    ingredients: [
      '40 g Cappuccine red velvet',
      '1 vaso de 480 ml con hielos',
      '150 ml de leche',
      'Ralladura de chocolate (decorativo)',
      '30 g ChillOut mix leche condensada (foam)',
      '50 ml de crema base (foam)',
      '50 ml de leche (foam)',
    ],
    tools: ['Licuadora', 'Batidor'],
    toolIcon: ICO.tool,
    steps: [
      {
        title: 'Foam',
        text: 'En un bowl mezcla crema, leche y polvo de leche condensada con batidor hasta obtener foam.',
        tone: 'pink',
        icon: ICO.base
      },
      {
        title: 'Licúa',
        text: 'Licúa leche, Cappuccine red velvet e hielos hasta frappé.',
        tone: 'yellow',
        icon: ICO.blend
      },
      {
        title: 'Termina',
        text: 'Sirve el frappé, corona con foam y ralladura de chocolate.',
        tone: 'green',
        icon: ICO.decor
      },
    ],
    seo: {
      title: 'Receta Rojo pasión Foam 480 ml | San Valentín 2026 | Café Etrusca',
      description:
        'Rojo pasión foam con Cappuccine red velvet y ChillOut leche condensada. Receta de San Valentín.',
      keywords: 'rojo pasión foam, Cappuccine red velvet, San Valentín, Café Etrusca'
    },
    published: true
  },
  {
    slug: 'arroz-con-leche',
    intranetId: 160,
    sapIngredients: [
      { ingredient: "15 g de ChillOut horchata", sap: "IBP-062", qty: 15, unit: "g" },
      { ingredient: "15 g de ChillOut coco", sap: "IBP-043", qty: 15, unit: "g" },
      { ingredient: "15 ml de salsa Torani chocolate blanco", sap: "ISA-016", qty: 15, unit: "ml" }
    ],
    title: "Arroz",
    titleAccent: "con leche",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Bebida caliente 360 ml con ChillOut horchata y coco, salsa Torani chocolate blanco, leche y canela.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/arroz-con-leche.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/arroz-con-leche.webp`,
    tone: 'gold',
    brand: "ChillOut",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "15 g de ChillOut horchata",
      "15 g de ChillOut coco",
      "15 ml de salsa Torani chocolate blanco",
      "5 g de canela",
      "240 ml de leche"
    ],
    tools: ["Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Texturiza",
        text: "En una jarra de acero agrega la leche, ChillOut horchata, ChillOut coco y la salsa Torani chocolate blanco; texturiza con el vaporizador.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Vierte la bebida en la taza.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Termina con canela espolvoreada.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Arroz con leche 360 ml | Invierno | Café Etrusca",
      description: "Bebida caliente 360 ml con ChillOut horchata y coco, salsa Torani chocolate blanco, leche y canela.",
      keywords: "arroz con leche, chillout horchata, chillout coco, torani chocolate blanco, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'noche-de-invierno-latte',
    intranetId: 162,
    sapIngredients: [
      { ingredient: "25 g de Chill Out Mix Crème Brûlée", sap: "IBP-206", qty: 25, unit: "g" },
      { ingredient: "10 ml de ChillOut agave azul crema de avellana", sap: "IJA-153", qty: 10, unit: "ml" },
      { ingredient: "250 ml de Noosh de avena", sap: "IPC-068", qty: 250, unit: "ml" }
    ],
    title: "Noche de invierno",
    titleAccent: "latte",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Latte 360 ml con ChillOut Crème Brûlée, crema de avellana y Noosh de avena, flameado con azúcar morena.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/noche-de-invierno-latte.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/noche-de-invierno-latte.webp`,
    tone: 'navy',
    brand: "ChillOut",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "25 g de Chill Out Mix Crème Brûlée",
      "10 ml de ChillOut agave azul crema de avellana",
      "250 ml de Noosh de avena",
      "Azúcar morena para flamear"
    ],
    tools: ["Jarra de acero", "Vaporizador", "Soplete", "Taza"],
    steps: [
      {
        title: "Espuma",
        text: "En una jarra de acero espuma el Noosh de avena con el Crème Brûlée y la crema de avellana.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Vierte en la taza.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Flamea",
        text: "Espolvorea azúcar morena encima y caramelízala con el soplete.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Noche de invierno latte 360 ml | Invierno | Café Etrusca",
      description: "Latte 360 ml con ChillOut Crème Brûlée, crema de avellana y Noosh de avena, flameado con azúcar morena.",
      keywords: "noche de invierno latte, chillout creme brulee, crema de avellana, noosh avena, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'winter-peach',
    sapIngredients: [
      { ingredient: "150 ml de cold brew de té Stash earl grey", sap: "ITB-004", qty: 150, unit: "ml", confidence: "media" },
      { ingredient: "100 ml de Noosh de almendra", sap: "IPC-069", qty: 100, unit: "ml" },
      { ingredient: "20 ml de ChillOut fruit durazno", sap: "IPC-017", qty: 20, unit: "ml" }
    ],
    title: "Winter",
    titleAccent: "peach",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Bebida fría 480 ml con cold brew de té Stash earl grey, Noosh de almendra y ChillOut fruit durazno.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/winter-peach.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/winter-peach.webp`,
    tone: 'coral',
    brand: "Stash",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "150 ml de cold brew de té Stash earl grey",
      "100 ml de Noosh de almendra",
      "20 ml de ChillOut fruit durazno",
      "4 hielos"
    ],
    tools: ["Coctelera", "Vaso"],
    steps: [
      {
        title: "Agita",
        text: "En una coctelera agrega el cold brew de earl grey, el Noosh de almendra, ChillOut fruit durazno y los hielos; agita.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Vierte en el vaso.",
        tone: 'pink',
        icon: ICO.blend
      }
    ],
    seo: {
      title: "Receta Winter peach 480 ml | Invierno | Café Etrusca",
      description: "Bebida fría 480 ml con cold brew de té Stash earl grey, Noosh de almendra y ChillOut fruit durazno.",
      keywords: "winter peach, stash earl grey, noosh almendra, chillout durazno, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'copito-de-chocolate-blanco',
    sapIngredients: [
      { ingredient: "30 g de ChillOut mix chocolate blanco", sap: "IBP-198", qty: 30, unit: "g" },
      { ingredient: "15 ml de Torani crema de menta", sap: "IJA-019", qty: 15, unit: "ml" }
    ],
    title: "Copito de",
    titleAccent: "chocolate blanco",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Bebida caliente 360 ml con ChillOut chocolate blanco y Torani crema de menta, con escarchado de chocolate blanco y diamantina.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/copito-de-chocolate-blanco.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/copito-de-chocolate-blanco.webp`,
    tone: 'sky',
    brand: "ChillOut",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "30 g de ChillOut mix chocolate blanco",
      "15 ml de Torani crema de menta",
      "Salsa Hollander chocolate blanco",
      "250 ml de leche",
      "Diamantina comestible"
    ],
    tools: ["Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Espuma",
        text: "Espuma la leche con el ChillOut chocolate blanco y el Torani crema de menta.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Escarcha",
        text: "Escarcha la taza con salsa Hollander chocolate blanco y diamantina comestible.",
        tone: 'pink',
        icon: ICO.decor
      },
      {
        title: "Sirve",
        text: "Vierte la bebida en la taza escarchada.",
        tone: 'blue',
        icon: ICO.blend
      }
    ],
    seo: {
      title: "Receta Copito de chocolate blanco 360 ml | Invierno | Café Etrusca",
      description: "Bebida caliente 360 ml con ChillOut chocolate blanco y Torani crema de menta, con escarchado de chocolate blanco y diamantina.",
      keywords: "copito de chocolate blanco, chillout chocolate blanco, torani crema de menta, hollander, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'latte-de-noel',
    intranetId: 165,
    sapIngredients: [
      { ingredient: "15 ml de Torani cereza", sap: "IJA-015", qty: 15, unit: "ml" },
      { ingredient: "20 g de chai David Rio tradicional", sap: "IBP-085", qty: 20, unit: "g" }
    ],
    title: "Latte de",
    titleAccent: "Noel",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Chai latte 360 ml con David Rio chai tradicional y Torani cereza, servido en taza navideña.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/latte-de-noel.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/latte-de-noel.webp`,
    tone: 'coral',
    brand: "David Rio",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "15 ml de Torani cereza",
      "20 g de chai David Rio tradicional",
      "300 ml de leche",
      "Mini galleta para decorar"
    ],
    tools: ["Jarra de acero", "Vaporizador", "Taza navideña"],
    steps: [
      {
        title: "Espuma",
        text: "Espuma la leche con el chai David Rio tradicional y el Torani cereza.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Vierte en una taza navideña.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Termina con una mini galleta.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Latte de Noel 360 ml | Invierno | Café Etrusca",
      description: "Chai latte 360 ml con David Rio chai tradicional y Torani cereza, servido en taza navideña.",
      keywords: "latte de noel, david rio chai, torani cereza, chai navideño, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'chai-cream',
    intranetId: 166,
    sapIngredients: [
      { ingredient: "180 ml de cold brew Prana Chai", sap: "CPM-028", qty: 180, unit: "ml", confidence: "media" },
      { ingredient: "15 ml de Torani manzana", sap: "IJA-036", qty: 15, unit: "ml" },
      { ingredient: "50 g de cheese foam", sap: "IJA-004", qty: 50, unit: "g", confidence: "media" },
      { ingredient: "30 g de tapioca", sap: "ICT-008", qty: 30, unit: "g", confidence: "media" }
    ],
    title: "Chai",
    titleAccent: "cream",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Bebida fría 480 ml con cold brew Prana Chai, Torani manzana, tapioca y cheese foam.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/chai-cream.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/chai-cream.webp`,
    tone: 'gold',
    brand: "Prana Chai",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "180 ml de cold brew Prana Chai",
      "15 ml de Torani manzana",
      "50 g de cheese foam",
      "30 g de tapioca",
      "3 a 4 hielos"
    ],
    tools: ["Vaso", "Cuchara"],
    steps: [
      {
        title: "Arma",
        text: "En el vaso mezcla el cold brew Prana Chai, el Torani manzana, la tapioca y los hielos.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Corona",
        text: "Termina con el cheese foam encima.",
        tone: 'pink',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Chai cream 480 ml | Invierno | Café Etrusca",
      description: "Bebida fría 480 ml con cold brew Prana Chai, Torani manzana, tapioca y cheese foam.",
      keywords: "chai cream, prana chai, torani manzana, cheese foam, tapioca, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'solsticio-de-lavanda-frio',
    intranetId: 167,
    sapIngredients: [
      { ingredient: "20 g de matcha Aiya", sap: "IBP-149", qty: 20, unit: "g" },
      { ingredient: "30 ml de Torani lavanda", sap: "IJA-062", qty: 30, unit: "ml" }
    ],
    title: "Solsticio de",
    titleAccent: "lavanda",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Matcha frío 480 ml con Aiya matcha, Torani lavanda y leche, decorado con pétalos de lavanda.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/solsticio-de-lavanda-frio.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/solsticio-de-lavanda-frio.webp`,
    tone: 'sky',
    brand: "Aiya",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "20 g de matcha Aiya",
      "30 ml de Torani lavanda",
      "300 ml de leche",
      "4 hielos para licuar y 2 hielos extra",
      "Pétalos de lavanda"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa la leche, el matcha Aiya y 4 hielos.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Arma",
        text: "En el vaso agrega 2 hielos y el Torani lavanda; vierte con cuidado el licuado encima.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Termina con pétalos de lavanda.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Solsticio de lavanda 480 ml | Invierno | Café Etrusca",
      description: "Matcha frío 480 ml con Aiya matcha, Torani lavanda y leche, decorado con pétalos de lavanda.",
      keywords: "solsticio de lavanda, matcha aiya, torani lavanda, matcha frio, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'cerveza-navidena',
    intranetId: 168,
    sapIngredients: [
      { ingredient: "360 ml de cold brew Mezcla especial No. 1", sap: "CPM-002", qty: 360, unit: "ml" },
      { ingredient: "22.5 ml de Torani canela y azúcar morena", sap: "IJA-047", qty: 22.5, unit: "ml" }
    ],
    title: "Cerveza",
    titleAccent: "navideña",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Cold brew nitro 380 ml con Torani canela y azúcar morena, cargado en sifón.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/cerveza-navidena.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/cerveza-navidena.webp`,
    tone: 'navy',
    brand: "Torani",
    time: '5 min',
    yield: '380 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "360 ml de cold brew Mezcla especial No. 1",
      "22.5 ml de Torani canela y azúcar morena",
      "1 cápsula de nitrógeno",
      "3 a 4 hielos"
    ],
    tools: ["Sifón de 1/2 L", "Vaso"],
    steps: [
      {
        title: "Carga",
        text: "En un sifón de 1/2 L agrega el cold brew y el Torani canela y azúcar morena; carga con la cápsula de nitrógeno.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Agita",
        text: "Agita el sifón.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve sobre hielo.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Cerveza navideña 380 ml | Invierno | Café Etrusca",
      description: "Cold brew nitro 380 ml con Torani canela y azúcar morena, cargado en sifón.",
      keywords: "cerveza navideña, cold brew nitro, torani canela azucar morena, sifon, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'toasted-brulee',
    intranetId: 169,
    sapIngredients: [
      { ingredient: "15 ml de Torani vainilla", sap: "IJA-022", qty: 15, unit: "ml" },
      { ingredient: "15 g de ChillOut Mix Crème Brûlée", sap: "IBP-206", qty: 15, unit: "g" },
      { ingredient: "10 ml de Torani malvavisco tostado", sap: "IJA-067", qty: 10, unit: "ml" }
    ],
    title: "Toasted",
    titleAccent: "brûlée",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Coctel 300 ml con vodka, Torani vainilla y malvavisco tostado y ChillOut Crème Brûlée, con azúcar caramelizada.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/toasted-brulee.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/toasted-brulee.webp`,
    tone: 'gold',
    brand: "Torani",
    time: '5 min',
    yield: '300 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "15 ml de Torani vainilla",
      "15 g de ChillOut Mix Crème Brûlée",
      "10 ml de Torani malvavisco tostado",
      "30 ml de vodka",
      "3 hielos",
      "5 g de azúcar morena"
    ],
    tools: ["Coctelera", "Copa", "Soplete"],
    steps: [
      {
        title: "Agita",
        text: "En una coctelera agrega Torani vainilla, Crème Brûlée, Torani malvavisco tostado, vodka y hielos; agita.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Sirve en una copa.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Carameliza",
        text: "Espolvorea la azúcar morena y carameliza con el soplete.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Toasted brûlée 300 ml | Invierno | Café Etrusca",
      description: "Coctel 300 ml con vodka, Torani vainilla y malvavisco tostado y ChillOut Crème Brûlée, con azúcar caramelizada.",
      keywords: "toasted brulee, coctel, torani malvavisco tostado, chillout creme brulee, vodka, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'ponche-navideno-calentito',
    intranetId: 170,
    sapIngredients: [
      { ingredient: "5 ml de Torani canela", sap: "IBP-177", qty: 5, unit: "ml", confidence: "media" }
    ],
    title: "Ponche navideño",
    titleAccent: "calentito",
    kicker: 'Invierno · 2024',
    category: 'Bebidas de temporada',
    collection: 'invierno-2024',
    origin: 'invierno-2024',
    summary: "Ponche caliente 360 ml con tisana Etrusca de guayaba, mezcal, Torani canela y naranja deshidratada.",
    image: `${ASSETS_BASE_URL}/images/recetas/invierno/ponche-navideno-calentito.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/invierno/ponche-navideno-calentito.webp`,
    tone: 'coral',
    brand: "Etrusca",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario de invierno',
    ingredients: [
      "300 ml de agua a 90 °C",
      "10 g de tisana Etrusca guayaba",
      "30 ml de mezcal",
      "5 ml de Torani canela",
      "2 rodajas de naranja deshidratada"
    ],
    tools: ["Vaso mezclador", "Tarro"],
    steps: [
      {
        title: "Infusiona",
        text: "En un vaso mezclador infusiona la tisana de guayaba en el agua a 90 °C durante 3 minutos.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Mezcla",
        text: "Agrega el mezcal y el Torani canela.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve en un tarro y decora con naranja deshidratada.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Ponche navideño calentito 360 ml | Invierno | Café Etrusca",
      description: "Ponche caliente 360 ml con tisana Etrusca de guayaba, mezcal, Torani canela y naranja deshidratada.",
      keywords: "ponche navideño, tisana guayaba, mezcal, torani canela, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'caramelo-navideno-caliente',
    sapIngredients: [
      { ingredient: "1 espresso (30 ml) preparado con Mezcla especial No. 1", sap: "CPM-002", qty: 1, unit: "pza" },
      { ingredient: "40 g de polvo Cappuccine Toffee coffee", sap: "IBP-010", qty: 40, unit: "g" }
    ],
    title: "Caramelo",
    titleAccent: "navideño",
    kicker: 'Invierno · Navidad',
    category: 'Bebidas de temporada',
    collection: 'navidad-2023',
    origin: 'navidad-2023',
    summary: "Latte caliente 360 ml con espresso Mezcla especial No. 1, Cappuccine Toffee coffee y leche, coronado con crema batida.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/caramelo-navideno-caliente.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/caramelo-navideno-caliente.webp`,
    tone: 'gold',
    brand: "Cappuccine",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetas navideñas',
    ingredients: [
      "1 espresso (30 ml) preparado con Mezcla especial No. 1",
      "40 g de polvo Cappuccine Toffee coffee",
      "280 ml de leche",
      "Crema batida"
    ],
    tools: ["Máquina de espresso", "Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Extrae",
        text: "Extrae el espresso en una taza y reserva.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Espuma",
        text: "En una jarra de acero agrega la leche y el Cappuccine Toffee coffee; espuma hasta la temperatura deseada.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Vierte la mezcla sobre el espresso y decora con crema batida.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Caramelo navideño 360 ml | Invierno | Café Etrusca",
      description: "Latte caliente 360 ml con espresso Mezcla especial No. 1, Cappuccine Toffee coffee y leche, coronado con crema batida.",
      keywords: "caramelo navideño, toffee coffee, cappuccine, latte navideño, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'caramelo-navideno-frio',
    sapIngredients: [
      { ingredient: "50 g de Cappuccine chocolate blanco", sap: "IBP-079", qty: 50, unit: "g", confidence: "media" },
      { ingredient: "30 ml de ChillOut fruit (cereza o fresa)", sap: "IBP-040", qty: 30, unit: "ml", confidence: "media" }
    ],
    title: "Caramelo navideño",
    titleAccent: "frappé",
    kicker: 'Invierno · Navidad',
    category: 'Bebidas de temporada',
    collection: 'navidad-2023',
    origin: 'navidad-2023',
    summary: "Frappé 480 ml de chocolate blanco con ChillOut fruit y perlas explosivas de cereza o fresa, crema batida y diamantina.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/caramelo-navideno-frio.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/caramelo-navideno-frio.webp`,
    tone: 'coral',
    brand: "ChillOut",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetas navideñas',
    ingredients: [
      "50 g de Cappuccine chocolate blanco",
      "30 ml de ChillOut fruit (cereza o fresa)",
      "45 g de ChillOut pearls (cereza o fresa)",
      "150 ml de leche",
      "1 vaso de 480 ml con hielo",
      "Crema batida",
      "Diamantina comestible"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa la leche, el chocolate blanco y el hielo hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Capas",
        text: "En el vaso agrega en diagonal la mitad de las perlas, un tercio del frappé, 15 ml de ChillOut fruit, otro tercio del frappé, el resto de las perlas, el último tercio y 15 ml más de fruit.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Termina con crema batida y diamantina comestible.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Caramelo navideño frappé 480 ml | Invierno | Café Etrusca",
      description: "Frappé 480 ml de chocolate blanco con ChillOut fruit y perlas explosivas de cereza o fresa, crema batida y diamantina.",
      keywords: "caramelo navideño frappe, chocolate blanco, chillout pearls, perlas explosivas, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'arbol-de-noche-buena',
    sapIngredients: [
      { ingredient: "30 g de matcha Aiya", sap: "IBP-149", qty: 30, unit: "g" },
      { ingredient: "1 sobre de tapioca instantánea (ya preparada)", sap: "ICT-056", qty: 1, unit: "pza", confidence: "media" },
      { ingredient: "25 ml de jarabe Torani menta", sap: "IJA-019", qty: 25, unit: "ml" }
    ],
    title: "Árbol de",
    titleAccent: "Noche Buena",
    kicker: 'Invierno · Navidad',
    category: 'Bebidas de temporada',
    collection: 'navidad-2023',
    origin: 'navidad-2023',
    summary: "Frappé de matcha 480 ml con Aiya matcha y Torani menta, decorado con tapiocas como esferas y diamantina.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/arbol-de-noche-buena.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/arbol-de-noche-buena.webp`,
    tone: 'lime',
    brand: "Aiya",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetas navideñas',
    ingredients: [
      "30 g de matcha Aiya",
      "1 sobre de tapioca instantánea (ya preparada)",
      "25 ml de jarabe Torani menta",
      "150 ml de leche",
      "1 vaso de 480 ml con hielo",
      "Diamantina comestible"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa el matcha, el Torani menta, la leche y el hielo hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Forma",
        text: "Sirve el frappé en el vaso y forma un triángulo encima, como un árbol.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Coloca las tapiocas simulando esferas y termina con diamantina.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Árbol de Noche Buena 480 ml | Invierno | Café Etrusca",
      description: "Frappé de matcha 480 ml con Aiya matcha y Torani menta, decorado con tapiocas como esferas y diamantina.",
      keywords: "arbol de noche buena, matcha aiya, torani menta, frappe navideño, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'ponche-de-invierno',
    sapIngredients: [
      { ingredient: "15 ml de jarabe Torani canela y azúcar morena", sap: "IJA-047", qty: 15, unit: "ml" }
    ],
    title: "Ponche de",
    titleAccent: "invierno",
    kicker: 'Invierno · Navidad',
    category: 'Bebidas de temporada',
    collection: 'navidad-2023',
    origin: 'navidad-2023',
    summary: "Infusión caliente 360 ml de tisana de guayaba con Torani canela y azúcar morena, anís estrella, naranja deshidratada y perlas explosivas.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/ponche-de-invierno.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/ponche-de-invierno.webp`,
    tone: 'coral',
    brand: "Etrusca",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetas navideñas',
    ingredients: [
      "10 g de tisana Etrusca guayaba",
      "15 ml de jarabe Torani canela y azúcar morena",
      "2 piezas de anís estrella",
      "2 rodajas de naranja deshidratada",
      "280 ml de agua caliente (90 a 92 °C)",
      "30 g de ChillOut perlas explosivas (cereza o fresa)"
    ],
    tools: ["Tarro de barro"],
    steps: [
      {
        title: "Infusiona",
        text: "En un tarro de barro agrega todos los ingredientes y deja infusionar 5 minutos.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Disfruta",
        text: "Sirve y disfruta caliente.",
        tone: 'pink',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Ponche de invierno 360 ml | Invierno | Café Etrusca",
      description: "Infusión caliente 360 ml de tisana de guayaba con Torani canela y azúcar morena, anís estrella, naranja deshidratada y perlas explosivas.",
      keywords: "ponche de invierno, tisana guayaba, torani canela, anis estrella, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'horchata-decembrina',
    sapIngredients: [
      { ingredient: "50 g de ChillOut mix horchata", sap: "IBP-062", qty: 50, unit: "g" },
      { ingredient: "35 g de ChillOut tapioca", sap: "ICT-008", qty: 35, unit: "g" },
      { ingredient: "25 ml de ChillOut agave (crema de avellana o crema irlandesa)", sap: "IJA-148", qty: 25, unit: "ml" },
      { ingredient: "Salsa Torani chocolate con avellana", sap: "ISA-018", qty: 0, unit: "ml", confidence: "alta" }
    ],
    title: "Horchata",
    titleAccent: "decembrina",
    kicker: 'Invierno · Navidad',
    category: 'Bebidas de temporada',
    collection: 'navidad-2023',
    origin: 'navidad-2023',
    summary: "Horchata fría 480 ml con ChillOut mix horchata, agave de avellana o irlandesa y tapioca, en vaso escarchado con chocolate y almendra.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/horchata-decembrina.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/horchata-decembrina.webp`,
    tone: 'gold',
    brand: "ChillOut",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetas navideñas',
    ingredients: [
      "50 g de ChillOut mix horchata",
      "35 g de ChillOut tapioca",
      "25 ml de ChillOut agave (crema de avellana o crema irlandesa)",
      "Salsa Torani chocolate con avellana",
      "4 hielos",
      "4 almendras trituradas"
    ],
    tools: ["Licuadora", "Vaso", "Popote para tapioca"],
    steps: [
      {
        title: "Escarcha",
        text: "Escarcha el vaso con la salsa de chocolate con avellana y las almendras.",
        tone: 'yellow',
        icon: ICO.decor
      },
      {
        title: "Licúa",
        text: "Licúa todos los ingredientes excepto la tapioca hasta obtener una bebida fría y líquida.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Agrega la tapioca al vaso escarchado, vierte la bebida y sirve con popote especial.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Horchata decembrina 480 ml | Invierno | Café Etrusca",
      description: "Horchata fría 480 ml con ChillOut mix horchata, agave de avellana o irlandesa y tapioca, en vaso escarchado con chocolate y almendra.",
      keywords: "horchata decembrina, chillout horchata, tapioca, torani chocolate avellana, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'pan-de-jengibre-latte',
    sapIngredients: [
      { ingredient: "1 espresso (30 ml) preparado con Mezcla especial No. 1", sap: "CPM-002", qty: 1, unit: "pza" },
      { ingredient: "30 ml de jarabe Torani Gingerbread", sap: "IJA-051", qty: 30, unit: "ml" }
    ],
    title: "Pan de jengibre",
    titleAccent: "latte",
    kicker: 'Invierno · Navidad',
    category: 'Bebidas de temporada',
    collection: 'navidad-2023',
    origin: 'navidad-2023',
    summary: "Latte caliente 360 ml con espresso Mezcla especial No. 1 y Torani Gingerbread.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/pan-de-jengibre-latte.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/pan-de-jengibre-latte.webp`,
    tone: 'gold',
    brand: "Torani",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetas navideñas',
    ingredients: [
      "1 espresso (30 ml) preparado con Mezcla especial No. 1",
      "30 ml de jarabe Torani Gingerbread",
      "280 ml de leche"
    ],
    tools: ["Máquina de espresso", "Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Extrae",
        text: "Extrae el espresso en una taza y reserva.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Espuma",
        text: "En una jarra de acero espuma la leche con el Torani Gingerbread hasta la temperatura deseada.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Vierte sobre el espresso y disfruta.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Pan de jengibre latte 360 ml | Invierno | Café Etrusca",
      description: "Latte caliente 360 ml con espresso Mezcla especial No. 1 y Torani Gingerbread.",
      keywords: "pan de jengibre latte, gingerbread latte, torani gingerbread, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'tiramisu-menta',
    sapIngredients: [
      { ingredient: "15 ml de jarabe Torani tiramisú", sap: "IJA-027", qty: 15, unit: "ml" }
    ],
    title: "Tiramisú",
    titleAccent: "menta",
    kicker: 'Invierno · Navidad',
    category: 'Bebidas de temporada',
    collection: 'navidad-2023',
    origin: 'navidad-2023',
    summary: "Bebida caliente 360 ml con Mint Chip Cappuccine y Torani tiramisú, decorada con chispas de chocolate.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/tiramisu-menta.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/tiramisu-menta.webp`,
    tone: 'lime',
    brand: "Cappuccine",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetas navideñas',
    ingredients: [
      "40 g de polvo Mint Chip Cappuccine",
      "15 ml de jarabe Torani tiramisú",
      "280 ml de leche",
      "10 g de chispas de chocolate"
    ],
    tools: ["Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Espuma",
        text: "En una jarra de acero espuma la leche con el Mint Chip Cappuccine y el Torani tiramisú.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Vierte en la taza.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Termina con chispas de chocolate.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Tiramisú menta 360 ml | Invierno | Café Etrusca",
      description: "Bebida caliente 360 ml con Mint Chip Cappuccine y Torani tiramisú, decorada con chispas de chocolate.",
      keywords: "tiramisu menta, mint chip cappuccine, torani tiramisu, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'smoothie-pina-durazno',
    intranetId: 154,
    sapIngredients: [
      { ingredient: "15 ml de ChillOut fruit durazno", sap: "IPC-017", qty: 15, unit: "ml" },
      { ingredient: "15 ml de ChillOut fruit piña", sap: "IBP-057", qty: 15, unit: "ml" },
      { ingredient: "40 g de ChillOut mix base neutra", sap: "IBP-032", qty: 40, unit: "g" }
    ],
    title: "Smoothie de",
    titleAccent: "piña durazno",
    kicker: 'Otras bebidas',
    category: 'Bebidas de temporada',
    collection: 'otros',
    origin: 'verano-2026', // fondo primavera (antes origin: otros)
    summary: "Smoothie cremoso 360 ml con ChillOut fruit piña y durazno y base neutra, decorado con piña.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/smoothie-pina-durazno.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/smoothie-pina-durazno.webp`,
    tone: 'gold',
    brand: "ChillOut",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Otras bebidas',
    ingredients: [
      "150 ml de agua o bebida vegetal",
      "15 ml de ChillOut fruit durazno",
      "15 ml de ChillOut fruit piña",
      "40 g de ChillOut mix base neutra",
      "1 vaso de 480 ml lleno de hielo",
      "Piña para decorar"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "En la licuadora agrega el fruit durazno, el fruit piña, la base neutra y el hielo; licúa hasta lograr una textura cremosa.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Sirve en el vaso de tu elección.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Decora con piña.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Smoothie de piña durazno 360 ml | Café Etrusca",
      description: "Smoothie cremoso 360 ml con ChillOut fruit piña y durazno y base neutra, decorado con piña.",
      keywords: "smoothie piña durazno, chillout fruit, base neutra, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'margarita-mango',
    intranetId: 155,
    sapIngredients: [
      { ingredient: "30 ml de ChillOut fruit mango", sap: "IPC-018", qty: 30, unit: "ml" },
      { ingredient: "20 g de ChillOut mix limón", sap: "IBP-215", qty: 20, unit: "g" }
    ],
    title: "Margarita de",
    titleAccent: "mango",
    kicker: 'Otras bebidas',
    category: 'Bebidas de temporada',
    collection: 'otros',
    origin: 'verano-2026', // fondo verano (antes origin: otros)
    summary: "Frappé de limón 360 ml con ChillOut fruit mango, en copa escarchada con sal y decorada con limón.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/margarita-mango.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/margarita-mango.webp`,
    tone: 'gold',
    brand: "ChillOut",
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Otras bebidas',
    ingredients: [
      "150 ml de agua",
      "30 ml de ChillOut fruit mango",
      "30 ml de agua",
      "20 g de ChillOut mix limón",
      "Hielo",
      "Sal para escarchar",
      "Rodaja de limón"
    ],
    tools: ["Licuadora", "Copa"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa el agua con el ChillOut mix limón y los hielos hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Escarcha",
        text: "Escarcha la copa con el concentrado y sal, y vierte el fruit de mango.",
        tone: 'pink',
        icon: ICO.decor
      },
      {
        title: "Sirve",
        text: "Sirve el frappé y decora con una rodaja de limón.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Margarita de mango 360 ml | Café Etrusca",
      description: "Frappé de limón 360 ml con ChillOut fruit mango, en copa escarchada con sal y decorada con limón.",
      keywords: "margarita de mango, chillout fruit mango, frappe limon, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'tiramisu-latte',
    intranetId: 157,
    sapIngredients: [
      { ingredient: "22.5 ml de jarabe Torani tiramisú", sap: "IJA-027", qty: 22.5, unit: "ml" },
      { ingredient: "60 ml de espresso con Mezcla especial No. 1", sap: "CPM-002", qty: 60, unit: "ml" },
      { ingredient: "50 g de cheese foam", sap: "IJA-004", qty: 50, unit: "g", confidence: "media" },
      { ingredient: "Cocoa en polvo", sap: "IBP-180", qty: 0, unit: "g", confidence: "media" }
    ],
    title: "Tiramisú",
    titleAccent: "latte",
    kicker: 'Otras bebidas',
    category: 'Bebidas de temporada',
    collection: 'otros',
    origin: 'calabaza', // fondo otono (antes origin: otros)
    summary: "Latte frío 480 ml con espresso, Torani tiramisú y cheese foam con cocoa.",
    image: `${ASSETS_BASE_URL}/images/recetas/navidad/tiramisu-latte.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/navidad/tiramisu-latte.webp`,
    tone: 'navy',
    brand: "Torani",
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Otras bebidas',
    ingredients: [
      "180 ml de leche",
      "22.5 ml de jarabe Torani tiramisú",
      "60 ml de espresso con Mezcla especial No. 1",
      "50 g de cheese foam",
      "4 o 5 hielos",
      "Cocoa en polvo"
    ],
    tools: ["Máquina de espresso", "Vaso"],
    steps: [
      {
        title: "Arma",
        text: "En el vaso agrega el hielo, la leche y el Torani tiramisú.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Espresso",
        text: "Vierte el espresso encima.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Corona",
        text: "Termina con cheese foam y cocoa en polvo.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Tiramisú latte 480 ml | Café Etrusca",
      description: "Latte frío 480 ml con espresso, Torani tiramisú y cheese foam con cocoa.",
      keywords: "tiramisu latte, torani tiramisu, cheese foam, iced latte, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'soda-italiana-480ml',
    intranetId: 87,
    sapIngredients: [
      { ingredient: "30 ml de ChillOut Jarabes sabor frutal", sap: "IJA-144", qty: 30, unit: "ml", confidence: "media" }
    ],
    title: "Soda",
    titleAccent: "italiana",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Soda italiana 480 ml en capas con ChillOut Jarabes sabor frutal, agua mineral y hielo, decorada con tu topping frutal favorito.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/soda-italiana-480ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/soda-italiana-480ml.webp`,
    tone: 'sky',
    brand: 'ChillOut',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "30 ml de ChillOut Jarabes sabor frutal",
      "300 ml de agua mineral",
      "3 piezas de hielo",
      "Topping frutal para decorar"
    ],
    tools: ["Vaso"],
    steps: [
      {
        title: "Arma",
        text: "Coloca en el vaso de tu elección el jarabe junto con el hielo.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Capas",
        text: "Vierte con cuidado el agua mineral sobre el hielo para que no se mezcle con el jarabe.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Decora con tu topping frutal favorito y disfruta.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Soda italiana 480 ml | ChillOut | Café Etrusca",
      description: "Soda italiana 480 ml en capas con ChillOut Jarabes sabor frutal, agua mineral y hielo, decorada con tu topping frutal favorito. Receta ChillOut de Café Etrusca.",
      keywords: "soda italiana, chillout jarabes, soda de sabores, agua mineral, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'espresso-chai-360ml',
    intranetId: 88,
    sapIngredients: [
      { ingredient: "60 ml de espresso doble preparado con Mezcla especial No. 1", sap: "CPM-002", qty: 60, unit: "ml" },
      { ingredient: "30 g de ChillOut Mix chai manzana canela", sap: "IBP-177", qty: 30, unit: "g" }
    ],
    title: "Espresso",
    titleAccent: "chai",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas calientes',
    collection: 'chillout',
    origin: 'calabaza', // fondo otono (antes origin: chillout)
    summary: "Dirty chai caliente 360 ml con espresso doble de Mezcla especial No. 1, ChillOut Mix chai manzana canela y leche espumada.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/espresso-chai-360ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/espresso-chai-360ml.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "60 ml de espresso doble preparado con Mezcla especial No. 1",
      "30 g de ChillOut Mix chai manzana canela",
      "240 ml de leche de tu elección"
    ],
    tools: ["Máquina de espresso", "Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Extrae",
        text: "Extrae el espresso y agrégalo al recipiente de tu elección.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Mezcla",
        text: "Agrega el polvo de chai y mezcla perfectamente.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Espuma",
        text: "Espuma la leche con la lanceta de vapor y viértela sobre la mezcla.",
        tone: 'blue',
        icon: ICO.finish
      },
      {
        title: "Decora",
        text: "Decora al gusto.",
        tone: 'green',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Espresso chai 360 ml | ChillOut | Café Etrusca",
      description: "Dirty chai caliente 360 ml con espresso doble de Mezcla especial No. 1, ChillOut Mix chai manzana canela y leche espumada. Receta ChillOut de Café Etrusca.",
      keywords: "espresso chai, dirty chai, chillout mix chai manzana canela, chai latte, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'moka-mazapan-360ml',
    intranetId: 90,
    sapIngredients: [
      { ingredient: "20 g de ChillOut Mix mazapán", sap: "IBP-172", qty: 20, unit: "g" },
      { ingredient: "20 g de ChillOut Mix xocolatl", sap: "ICP-002", qty: 20, unit: "g" }
    ],
    title: "Moka",
    titleAccent: "mazapán",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas calientes',
    collection: 'chillout',
    origin: 'calabaza', // fondo otono (antes origin: chillout)
    summary: "Bebida caliente 360 ml con ChillOut Mix mazapán y ChillOut Mix xocolatl, disueltos en agua caliente y cubiertos con leche espumada.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/moka-mazapan-360ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/moka-mazapan-360ml.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "20 g de ChillOut Mix mazapán",
      "20 g de ChillOut Mix xocolatl",
      "60 ml de agua caliente",
      "280 ml de leche"
    ],
    tools: ["Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Disuelve",
        text: "Agrega los polvos y el agua caliente al vaso de tu elección y mezcla perfectamente.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Espuma",
        text: "Espuma la leche con la lanceta de vapor y viértela sobre la mezcla.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Decora al gusto.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Moka mazapán 360 ml | ChillOut | Café Etrusca",
      description: "Bebida caliente 360 ml con ChillOut Mix mazapán y ChillOut Mix xocolatl, disueltos en agua caliente y cubiertos con leche espumada. Receta ChillOut de Café Etrusca.",
      keywords: "moka mazapan, chillout mix mazapan, xocolatl, chocolate caliente, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'moras-y-jamaica-smoothie-yogur-480ml',
    sapIngredients: [
      { ingredient: "30 g de ChillOut Mix yogur", sap: "IBP-034", qty: 30, unit: "g" }
    ],
    title: "Moras y",
    titleAccent: "jamaica",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Smoothie de yogur 480 ml con ChillOut Active moras jamaica y ChillOut Mix yogur, licuado con hielo.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/moras-y-jamaica-smoothie-yogur-480ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/moras-y-jamaica-smoothie-yogur-480ml.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "30 g de ChillOut Active moras jamaica",
      "30 g de ChillOut Mix yogur",
      "180 ml (6 oz) de agua",
      "1 vaso de 480 ml lleno de hielo"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Agrega los ingredientes a la licuadora, empezando por los líquidos.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Integra",
        text: "Licúa hasta obtener una consistencia uniforme.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve en el vaso de tu elección y decora al gusto.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Moras y jamaica 480 ml | ChillOut | Café Etrusca",
      description: "Smoothie de yogur 480 ml con ChillOut Active moras jamaica y ChillOut Mix yogur, licuado con hielo. Receta ChillOut de Café Etrusca.",
      keywords: "smoothie moras y jamaica, smoothie de yogur, chillout active, chillout mix yogur, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'curcuma-y-mandarina-soda-dorada-480ml',
    title: "Cúrcuma y",
    titleAccent: "mandarina",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Soda dorada 480 ml con ChillOut Active cúrcuma mandarina, agua mineral y hielo.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/curcuma-y-mandarina-soda-dorada-480ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/curcuma-y-mandarina-soda-dorada-480ml.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: '480 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "30 g de ChillOut Active cúrcuma mandarina",
      "4 cubos de hielo",
      "Agua mineral"
    ],
    tools: ["Vaso"],
    steps: [
      {
        title: "Hielo",
        text: "Agrega los cubos de hielo al vaso de tu preferencia.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Disuelve",
        text: "Disuelve el polvo con un poco de agua y agrégalo al vaso.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Completa",
        text: "Completa con agua mineral y decora al gusto.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Cúrcuma y mandarina 480 ml | ChillOut | Café Etrusca",
      description: "Soda dorada 480 ml con ChillOut Active cúrcuma mandarina, agua mineral y hielo. Receta ChillOut de Café Etrusca.",
      keywords: "soda dorada, curcuma y mandarina, chillout active, soda de curcuma, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'carajillo-de-mazapan-300ml',
    intranetId: 102,
    sapIngredients: [
      { ingredient: "60 ml de espresso preparado con Mezcla especial No. 1", sap: "CPM-002", qty: 60, unit: "ml" },
      { ingredient: "30 g de ChillOut Mix mazapán", sap: "IBP-172", qty: 30, unit: "g" },
      { ingredient: "15 ml de jarabe Torani crema irlandesa", sap: "IJA-017", qty: 15, unit: "ml" }
    ],
    title: "Carajillo de",
    titleAccent: "mazapán",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'calabaza', // fondo otono (antes origin: chillout)
    summary: "Carajillo frío sin alcohol 300 ml con espresso Mezcla especial No. 1, ChillOut Mix mazapán, Torani crema irlandesa y leche de almendra.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/carajillo-de-mazapan-300ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/carajillo-de-mazapan-300ml.webp`,
    tone: 'navy',
    brand: 'ChillOut',
    time: '5 min',
    yield: '300 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "60 ml de espresso preparado con Mezcla especial No. 1",
      "30 g de ChillOut Mix mazapán",
      "15 ml de jarabe Torani crema irlandesa",
      "150 ml de leche vegetal de almendra",
      "3 piezas de hielo",
      "Flores deshidratadas y especia en polvo para decorar"
    ],
    tools: ["Máquina de espresso", "Shaker", "Báscula digital La Fenice", "Cuchara medidora La Fenice", "Vaso de 300 ml"],
    steps: [
      {
        title: "Decora el vaso",
        text: "Haz una figura geométrica en el vaso con un poco de jarabe y cúbrela con la especia en polvo.",
        tone: 'yellow',
        icon: ICO.decor
      },
      {
        title: "Agita",
        text: "Agrega todos los ingredientes al shaker, empezando por los polvos, y agita vigorosamente hasta que se disuelvan.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve en el vaso decorado y adorna con la flor.",
        tone: 'blue',
        icon: ICO.finish
      },
      {
        title: "Presenta",
        text: "Si quieres, sirve un poco de especia o mazapán en polvo en una cuchara medidora.",
        tone: 'green',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Carajillo de mazapán 300 ml | ChillOut | Café Etrusca",
      description: "Carajillo frío sin alcohol 300 ml con espresso Mezcla especial No. 1, ChillOut Mix mazapán, Torani crema irlandesa y leche de almendra. Receta ChillOut de Café Etrusca.",
      keywords: "carajillo de mazapan, carajillo sin alcohol, chillout mix mazapan, torani crema irlandesa, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'fresa-primaveral-frio',
    intranetId: 116,
    sapIngredients: [
      { ingredient: "30 ml de ChillOut Jarabes fresa", sap: "IJA-144", qty: 30, unit: "ml" },
      { ingredient: "15 ml de ChillOut Fruit pétalos de rosa", sap: "IPC-024", qty: 15, unit: "ml" },
      { ingredient: "15 ml de jarabe de durazno", sap: "ICT-039", qty: 15, unit: "ml", confidence: "media" }
    ],
    title: "Fresa",
    titleAccent: "primaveral",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Bebida fría 360 ml de leche con ChillOut Jarabes fresa, ChillOut Fruit pétalos de rosa y jarabe de durazno.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/fresa-primaveral-frio.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/fresa-primaveral-frio.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "30 ml de ChillOut Jarabes fresa",
      "15 ml de ChillOut Fruit pétalos de rosa",
      "15 ml de jarabe de durazno",
      "296 ml de leche",
      "3 piezas de hielo"
    ],
    tools: ["Vaso"],
    steps: [
      {
        title: "Diluye",
        text: "Diluye el Fruit de rosas con un poco de agua caliente.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Arma",
        text: "En el recipiente de tu elección agrega la leche, el hielo y el jarabe de durazno.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Termina",
        text: "Agrega el jarabe de fresa junto con el de rosas. Mezcla antes de tomar.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Fresa primaveral 360 ml | ChillOut | Café Etrusca",
      description: "Bebida fría 360 ml de leche con ChillOut Jarabes fresa, ChillOut Fruit pétalos de rosa y jarabe de durazno. Receta ChillOut de Café Etrusca.",
      keywords: "fresa primaveral, chillout jarabes fresa, petalos de rosa, leche de fresa, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'jelly-soda',
    intranetId: 117,
    sapIngredients: [
      { ingredient: "40 ml de ChillOut Jarabes manzana verde", sap: "IJA-145", qty: 40, unit: "ml" },
      { ingredient: "30 g de ChillOut Jelly uva", sap: "ICT-018", qty: 30, unit: "g" }
    ],
    title: "Jelly",
    titleAccent: "soda",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Soda 360 ml con ChillOut Jarabes manzana verde, ChillOut Jelly uva, agua mineral y hielo.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/jelly-soda.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/jelly-soda.webp`,
    tone: 'lime',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "40 ml de ChillOut Jarabes manzana verde",
      "30 g de ChillOut Jelly uva",
      "300 ml de agua mineral",
      "3 piezas de hielo"
    ],
    tools: ["Vaso"],
    steps: [
      {
        title: "Arma",
        text: "Agrega al vaso de tu elección el jarabe, la jelly y el hielo.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Capas",
        text: "Vierte con cuidado el agua mineral sobre el hielo, evitando que se mezclen los ingredientes.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Mezcla",
        text: "Mezcla la bebida antes de consumirla.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Jelly soda 360 ml | ChillOut | Café Etrusca",
      description: "Soda 360 ml con ChillOut Jarabes manzana verde, ChillOut Jelly uva, agua mineral y hielo. Receta ChillOut de Café Etrusca.",
      keywords: "jelly soda, chillout jelly uva, jarabe manzana verde, soda italiana, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'pina-colada-frappe',
    sapIngredients: [
      { ingredient: "30 g de ChillOut Just Fruit piña colada", sap: "IBP-057", qty: 30, unit: "g" }
    ],
    title: "Piña colada",
    titleAccent: "frappé",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo verano (antes origin: chillout)
    summary: "Frappé 360 ml con ChillOut Just Fruit piña colada y leche, servido dentro de una piña y decorado con ralladura de coco.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/pina-colada-frappe.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/pina-colada-frappe.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "30 g de ChillOut Just Fruit piña colada",
      "148 ml de leche",
      "1 vaso de 480 ml lleno de hielo",
      "½ piña sin pulpa",
      "Ralladura de coco"
    ],
    tools: ["Licuadora"],
    steps: [
      {
        title: "Licúa",
        text: "Agrega todos los ingredientes a la licuadora, empezando por los líquidos, y licúa hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Sirve la bebida dentro de la piña.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Decora con ralladura de coco.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Piña colada frappé 360 ml | ChillOut | Café Etrusca",
      description: "Frappé 360 ml con ChillOut Just Fruit piña colada y leche, servido dentro de una piña y decorado con ralladura de coco. Receta ChillOut de Café Etrusca.",
      keywords: "piña colada frappe, chillout just fruit, frappe de piña, piña colada sin alcohol, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'blueberry-cheesecake',
    sapIngredients: [
      { ingredient: "20 g de ChillOut Jam blueberry", sap: "IPC-004", qty: 20, unit: "g" },
      { ingredient: "50 g de ChillOut Mix chocolate blanco", sap: "IBP-198", qty: 50, unit: "g" },
      { ingredient: "10 ml de ChillOut Fruit frambuesa", sap: "IPC-013", qty: 10, unit: "ml" }
    ],
    title: "Blueberry",
    titleAccent: "cheesecake",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Frappé 360 ml de chocolate blanco con ChillOut Fruit frambuesa, vaso marmoleado con ChillOut Jam blueberry y crema batida de frutos rojos.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/blueberry-cheesecake.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/blueberry-cheesecake.webp`,
    tone: 'navy',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "20 g de ChillOut Jam blueberry",
      "50 g de ChillOut Mix chocolate blanco",
      "10 ml de ChillOut Fruit frambuesa",
      "148 ml de leche",
      "1 vaso de 480 ml lleno de hielo",
      "Crema batida de frutos rojos"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Agrega a la licuadora la leche con el concentrado de frambuesa, después el polvo y los hielos; licúa hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Marmolea",
        text: "Marmolea el vaso con el jam de blueberry y sirve el frappé.",
        tone: 'pink',
        icon: ICO.decor
      },
      {
        title: "Corona",
        text: "Termina con un top de crema batida de frutos rojos.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Blueberry cheesecake 360 ml | ChillOut | Café Etrusca",
      description: "Frappé 360 ml de chocolate blanco con ChillOut Fruit frambuesa, vaso marmoleado con ChillOut Jam blueberry y crema batida de frutos rojos. Receta ChillOut de Café Etrusca.",
      keywords: "blueberry cheesecake frappe, chillout jam blueberry, chocolate blanco, frappe de frutos rojos, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'frappe-mexicano',
    intranetId: 120,
    sapIngredients: [
      { ingredient: "40 g de ChillOut Mix limón", sap: "IBP-215", qty: 40, unit: "g" },
      { ingredient: "30 ml de ChillOut Fruit limón", sap: "IPC-008", qty: 30, unit: "ml" },
      { ingredient: "35 ml de ChillOut Chamoy", sap: "ICT-053", qty: 35, unit: "ml" }
    ],
    title: "Frappé",
    titleAccent: "mexicano",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo verano (antes origin: chillout)
    summary: "Frappé de limón 360 ml con ChillOut Mix limón, ChillOut Chamoy y ChillOut Fruit limón, decorado con dulce de tamarindo y picante.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/frappe-mexicano.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/frappe-mexicano.webp`,
    tone: 'lime',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "40 g de ChillOut Mix limón",
      "30 ml de ChillOut Fruit limón",
      "35 ml de ChillOut Chamoy",
      "177 ml de agua",
      "1 vaso de 480 ml lleno de hielo",
      "Picante en polvo",
      "Dulce de tamarindo"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Agrega a la licuadora el agua, el polvo y los hielos; licúa hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Capas",
        text: "En el recipiente de tu elección agrega el chamoy, el frappé y, con cuidado, el concentrado de limón.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Decora con el dulce de tamarindo y el picante.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Frappé mexicano 360 ml | ChillOut | Café Etrusca",
      description: "Frappé de limón 360 ml con ChillOut Mix limón, ChillOut Chamoy y ChillOut Fruit limón, decorado con dulce de tamarindo y picante. Receta ChillOut de Café Etrusca.",
      keywords: "frappe mexicano, frappe de limon, chillout chamoy, chamoyada, tamarindo, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'frappe-de-moras-y-cereza',
    sapIngredients: [
      { ingredient: "40 g de ChillOut Mix base neutra sin azúcar", sap: "IBP-214", qty: 40, unit: "g" },
      { ingredient: "20 g de ChillOut Pearls cereza", sap: "ICT-019", qty: 20, unit: "g", confidence: "media" }
    ],
    title: "Frappé de",
    titleAccent: "moras y cereza",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Frappé 360 ml sin azúcar con ChillOut Mix base neutra, concentrado de tisana de moras y ChillOut Pearls cereza.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/frappe-de-moras-y-cereza.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/frappe-de-moras-y-cereza.webp`,
    tone: 'coral',
    brand: 'ChillOut',
    time: '5 min',
    yield: '360 ml',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "40 g de ChillOut Mix base neutra sin azúcar",
      "15 ml de concentrado de tisana de moras (10 g)",
      "20 g de ChillOut Pearls cereza",
      "148 ml de agua",
      "1 vaso de 480 ml lleno de hielo"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Infusiona",
        text: "Deja infusionar la tisana de moras.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Licúa",
        text: "Licúa todo excepto las perlas: primero el concentrado, luego el polvo y al final el hielo, hasta lograr textura frappé.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Coloca las perlas en el vaso y sirve la bebida.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Frappé de moras y cereza 360 ml | ChillOut | Café Etrusca",
      description: "Frappé 360 ml sin azúcar con ChillOut Mix base neutra, concentrado de tisana de moras y ChillOut Pearls cereza. Receta ChillOut de Café Etrusca.",
      keywords: "frappe de moras, chillout pearls cereza, tisana de moras, base neutra sin azucar, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'purple-frozen',
    sapIngredients: [
      { ingredient: "50 g de ChillOut Mix taro", sap: "IBP-025", qty: 50, unit: "g" },
      { ingredient: "30 ml de ChillOut Fruit rosas", sap: "IBP-039", qty: 30, unit: "ml", confidence: "media" },
      { ingredient: "20 ml de ChillOut Jam mango", sap: "IPC-002", qty: 20, unit: "ml" }
    ],
    title: "Purple",
    titleAccent: "frozen",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Frappé de taro con ChillOut Mix taro, ChillOut Fruit rosas y ChillOut Jam mango, en vaso escarchado con chispas de colores.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/purple-frozen.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/purple-frozen.webp`,
    tone: 'sky',
    brand: 'ChillOut',
    time: '5 min',
    yield: 'Bebida fría',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    escarchado: ["Chispas de colores"],
    ingredients: [
      "50 g de ChillOut Mix taro",
      "30 ml de ChillOut Fruit rosas",
      "20 ml de ChillOut Jam mango",
      "148 ml de leche",
      "1 vaso de 480 ml lleno de hielo",
      "Chispas de colores"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Agrega a la licuadora la leche, el taro y los hielos; licúa hasta obtener un frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Escarcha",
        text: "Escarcha el vaso con las chispas de colores.",
        tone: 'pink',
        icon: ICO.decor
      },
      {
        title: "Capas",
        text: "Sirve el frappé hasta la mitad, agrega el concentrado de rosas, completa con el frappé restante y termina con el jam de mango.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Purple frozen | ChillOut | Café Etrusca",
      description: "Frappé de taro con ChillOut Mix taro, ChillOut Fruit rosas y ChillOut Jam mango, en vaso escarchado con chispas de colores. Receta ChillOut de Café Etrusca.",
      keywords: "purple frozen, frappe de taro, chillout mix taro, chillout jam mango, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'super-maracuya',
    sapIngredients: [
      { ingredient: "1 cucharada de ChillOut Jelly maracuyá", sap: "ICT-017", qty: 1, unit: "cucharada" },
      { ingredient: "20 g de ChillOut Jam maracuyá", sap: "IPC-001", qty: 20, unit: "g" },
      { ingredient: "40 g de ChillOut Mix yogur", sap: "IBP-034", qty: 40, unit: "g" }
    ],
    title: "Super",
    titleAccent: "maracuyá",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo verano (antes origin: chillout)
    summary: "Frappé de yogur con ChillOut Jam maracuyá y ChillOut Mix yogur, servido sobre ChillOut Jelly maracuyá.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/super-maracuya.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/super-maracuya.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: 'Bebida fría',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "1 cucharada de ChillOut Jelly maracuyá",
      "20 g de ChillOut Jam maracuyá",
      "40 g de ChillOut Mix yogur",
      "150 ml de leche",
      "1 vaso de 480 ml lleno de hielo"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Licúa",
        text: "Licúa todo excepto la jelly: primero los líquidos, luego el polvo y al final el hielo, hasta lograr textura frappé.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Jelly",
        text: "Agrega 1 cucharada de jelly al vaso.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve la bebida sobre la jelly.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Super maracuyá | ChillOut | Café Etrusca",
      description: "Frappé de yogur con ChillOut Jam maracuyá y ChillOut Mix yogur, servido sobre ChillOut Jelly maracuyá. Receta ChillOut de Café Etrusca.",
      keywords: "super maracuya, frappe de maracuya, chillout jelly, chillout mix yogur, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'chai-caramel',
    sapIngredients: [
      { ingredient: "20 g de ChillOut Mix chai negro", sap: "IBP-035", qty: 20, unit: "g" },
      { ingredient: "30 ml de jarabe ChillOut caramelo", sap: "IJA-150", qty: 30, unit: "ml" }
    ],
    title: "Chai",
    titleAccent: "caramel",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas calientes',
    collection: 'chillout',
    origin: 'calabaza', // fondo otono (antes origin: chillout)
    summary: "Chai latte caliente con ChillOut Mix chai negro y jarabe ChillOut caramelo, calentado en la lanceta de vapor.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/chai-caramel.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/chai-caramel.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: 'Bebida caliente',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "20 g de ChillOut Mix chai negro",
      "30 ml de jarabe ChillOut caramelo",
      "260 ml de leche"
    ],
    tools: ["Jarra de acero", "Vaporizador", "Taza"],
    steps: [
      {
        title: "Integra",
        text: "Agrega a la jarra de acero la leche con el polvo de chai y el jarabe.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Calienta",
        text: "Calienta en la lanceta de vapor hasta la temperatura deseada.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve en el recipiente de tu elección.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Chai caramel | ChillOut | Café Etrusca",
      description: "Chai latte caliente con ChillOut Mix chai negro y jarabe ChillOut caramelo, calentado en la lanceta de vapor. Receta ChillOut de Café Etrusca.",
      keywords: "chai caramel, chai latte caramelo, chillout mix chai negro, jarabe caramelo, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'cappuccino-sin-culpa',
    sapIngredients: [
      { ingredient: "60 ml de espresso doble preparado con Mezcla especial No. 1", sap: "CPM-002", qty: 60, unit: "ml" },
      { ingredient: "30 g de ChillOut Mix base neutra light", sap: "IBP-032", qty: 30, unit: "g", confidence: "media" }
    ],
    title: "Cappuccino",
    titleAccent: "sin culpa",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Cappuccino frío light con espresso doble de Mezcla especial No. 1, leche vegetal y ChillOut Mix base neutra light.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/cappuccino-sin-culpa.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/cappuccino-sin-culpa.webp`,
    tone: 'navy',
    brand: 'ChillOut',
    time: '5 min',
    yield: 'Bebida fría',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "60 ml de espresso doble preparado con Mezcla especial No. 1",
      "300 ml de leche vegetal",
      "30 g de ChillOut Mix base neutra light",
      "3 piezas de hielo"
    ],
    tools: ["Máquina de espresso", "Licuadora", "Vaso"],
    steps: [
      {
        title: "Extrae",
        text: "Extrae el espresso doble.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Licúa",
        text: "Agrega todos los ingredientes a la licuadora y licúa hasta obtener una bebida fría.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve en el vaso de tu elección.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Cappuccino sin culpa | ChillOut | Café Etrusca",
      description: "Cappuccino frío light con espresso doble de Mezcla especial No. 1, leche vegetal y ChillOut Mix base neutra light. Receta ChillOut de Café Etrusca.",
      keywords: "cappuccino sin culpa, cappuccino light, cappuccino frio, leche vegetal, base neutra light, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'horchata-coco-fria',
    sapIngredients: [
      { ingredient: "50 g de ChillOut Mix horchata", sap: "IBP-062", qty: 50, unit: "g" }
    ],
    title: "Horchata de",
    titleAccent: "coco fría",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo verano (antes origin: chillout)
    summary: "Horchata fría con ChillOut Mix horchata, crema de coco, almendras y leche, en vaso escarchado con almendra y canela.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/horchata-coco-fria.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/horchata-coco-fria.webp`,
    tone: 'gold',
    brand: 'ChillOut',
    time: '5 min',
    yield: 'Bebida fría',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    escarchado: ["Almendras", "Canela"],
    ingredients: [
      "50 g de ChillOut Mix horchata",
      "30 ml de crema de coco",
      "5 almendras",
      "240 ml de leche",
      "3 piezas de hielo",
      "Almendra y canela para escarchar"
    ],
    tools: ["Licuadora", "Vaso"],
    steps: [
      {
        title: "Escarcha",
        text: "Escarcha el vaso con almendras y canela.",
        tone: 'yellow',
        icon: ICO.decor
      },
      {
        title: "Licúa",
        text: "Agrega todos los ingredientes a la licuadora y licúa hasta obtener una bebida fría.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Sirve",
        text: "Sirve en el vaso escarchado.",
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: "Receta Horchata de coco fría | ChillOut | Café Etrusca",
      description: "Horchata fría con ChillOut Mix horchata, crema de coco, almendras y leche, en vaso escarchado con almendra y canela. Receta ChillOut de Café Etrusca.",
      keywords: "horchata de coco, horchata fria, chillout mix horchata, crema de coco, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: 'te-helado-fresco',
    sapIngredients: [
      { ingredient: "30 g de ChillOut Jam kiwi", sap: "IPC-003", qty: 30, unit: "g" },
      { ingredient: "10 ml de jarabe ChillOut menta", sap: "IJA-147", qty: 10, unit: "ml" }
    ],
    title: "Té helado",
    titleAccent: "fresco",
    kicker: 'Recetas ChillOut',
    category: 'Bebidas frías',
    collection: 'chillout',
    origin: 'verano-2026', // fondo primavera (antes origin: chillout)
    summary: "Té verde helado con ChillOut Jam kiwi y jarabe ChillOut menta, agitado y decorado con menta fresca.",
    image: `${ASSETS_BASE_URL}/images/recetas/chillout/te-helado-fresco.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/chillout/te-helado-fresco.webp`,
    tone: 'lime',
    brand: 'ChillOut',
    time: '5 min',
    yield: 'Bebida fría',
    difficulty: 'Fácil',
    bubble: 'Recetario ChillOut',
    ingredients: [
      "30 g de ChillOut Jam kiwi",
      "10 ml de jarabe ChillOut menta",
      "180 ml de infusión de té verde (hoja entera)",
      "4 piezas de hielo",
      "Menta fresca para decorar"
    ],
    tools: ["Shaker", "Vaso"],
    steps: [
      {
        title: "Agita",
        text: "Agrega todos los ingredientes al shaker y agita vigorosamente hasta enfriar.",
        tone: 'yellow',
        icon: ICO.base
      },
      {
        title: "Sirve",
        text: "Sirve en el vaso de tu elección.",
        tone: 'pink',
        icon: ICO.blend
      },
      {
        title: "Decora",
        text: "Decora con menta fresca.",
        tone: 'blue',
        icon: ICO.decor
      }
    ],
    seo: {
      title: "Receta Té helado fresco | ChillOut | Café Etrusca",
      description: "Té verde helado con ChillOut Jam kiwi y jarabe ChillOut menta, agitado y decorado con menta fresca. Receta ChillOut de Café Etrusca.",
      keywords: "te helado fresco, te verde helado, chillout jam kiwi, jarabe menta, ChillOut, Café Etrusca"
    },
    published: true
  },
  {
    slug: "iced-coffee-coconut",
    intranetId: 58,
    sapIngredients: [
      { ingredient: "15 ml de Torani Crema Irlandesa", sap: "IJA-017", qty: 15, unit: "ml" }
    ],
    title: "Iced Coffee",
    titleAccent: "Coconut",
    kicker: 'Otras bebidas',
    category: 'Bebidas de temporada',
    collection: 'otros',
    origin: 'verano-2026', // fondo verano (antes origin: otros)
    summary: "Iced coffee 360 ml con Torani Crema Irlandesa y crema de coco Calahua.",
    image: `${ASSETS_BASE_URL}/images/recetas/calabaza/iced-coffee-coconut.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/calabaza/iced-coffee-coconut.webp`,
    tone: "sky",
    brand: "ChillOut",
    time: "5 min",
    yield: "360 ml",
    difficulty: 'Fácil',
    bubble: "Otras bebidas",
    ingredients: [
          "240 ml de iced coffee Mezcla Especial 1",
          "15 ml de Torani Crema Irlandesa",
          "30 ml de crema de coco Calahua",
          "Ralladura de coco",
          "4 hielos"
    ],
    tools: ["Vaso","Cuchara"],
    steps: [
      {
        title: "Arma",
        text: "En el vaso con hielos agrega el iced coffee, Torani Crema Irlandesa y crema de coco.",
        tone: "yellow",
        icon: ICO.base
      },
      {
        title: "Mezcla",
        text: "Mezcla bien y termina con ralladura de coco.",
        tone: "pink",
        icon: ICO.blend
      }
    ],
    seo: {
      title: "Receta Iced Coffee Coconut 360 ml | Café Etrusca",
      description: "Iced coffee con Torani Crema Irlandesa y crema de coco Calahua.",
      keywords: "iced coffee coconut, torani crema irlandesa, calahua, Café Etrusca"
    },
    published: true
  },
  {
    /* Migrada del blog anterior (/Blog/Detail/matcha, abr 2024). Texto verbatim: blog-anterior/matcha/content.md. */
    slug: 'matcha',
    title: 'Matcha',
    titleAccent: '300 ml',
    kicker: 'Recetario',
    category: 'Bebida fría',
    summary: 'Matcha nitro 300 ml con jarabe Torani® Durazno y limón.',
    image: `${ASSETS_BASE_URL}/images/recetas/matcha/matcha-300ml.webp`,
    banner: `${ASSETS_BASE_URL}/images/recetas/matcha/matcha-300ml.webp`,
    tone: 'lime',
    time: '15 min',
    yield: '300 ml',
    ingredients: [
      '30 ml de jarabe Torani® Durazno',
      '5 g de matcha marca Aiya® diluido en 400 ml de agua fría',
      '30 ml de jugo de limón amarillo natural',
      '4 piezas de hielo',
      '1 cápsula de nitro coffee Best Whip® con sifón de ½ l'
    ],
    tools: ['Sifón de ½ l'],
    steps: [
      {
        title: 'Paso 1',
        text: 'Coloca en el sifón el agua y matcha y mezcla hasta diluir, cierra correctamente y enseguida inyecta la capsula de nitrógeno.',
        tone: 'green',
        icon: ICO.base
      },
      {
        title: 'Paso 2',
        text: 'En el recipiente de tu elección coloca el jarabe junto con el jugo de limón.',
        tone: 'yellow',
        icon: ICO.blend
      },
      {
        title: 'Paso 3',
        text: 'Para finalizar agrega los hielos y el matcha nitrogenado. La bebida debe mezclarse antes de beberla.',
        tone: 'blue',
        icon: ICO.finish
      }
    ],
    seo: {
      title: 'Receta Matcha 300 ml | Café Etrusca',
      description: 'Receta de Matcha 300 ml con jarabe Torani® Durazno, matcha Aiya®, limón amarillo y cápsula de nitro coffee Best Whip®.',
      keywords: 'matcha, matcha nitro, torani durazno, matcha aiya, best whip, Café Etrusca'
    },
    datePublished: '2024-04-28',
    video: {
      youtubeId: 'ne27uFr3pb4',
      name: 'Matcha',
      uploadDate: '2021-03-31T11:12:01-07:00',
      thumbnailUrl: 'https://i.ytimg.com/vi/ne27uFr3pb4/hqdefault.jpg'
    },
    breadcrumbJsonLd: true,
    published: true
  }

];

export function recipeBySlug(slug: string | null): Recipe | null {
  if (!slug) return null;
  return RECIPES.find((r) => r.slug === slug) ?? null;
}

export function publishedRecipes(): Recipe[] {
  return RECIPES.filter((r) => r.published);
}

export function recipesByCollection(collection: string): Recipe[] {
  return RECIPES.filter((r) => r.published && r.collection === collection);
}

export function relatedRecipes(slug: string, limit = 3): Recipe[] {
  const current = recipeBySlug(slug);
  const pool = RECIPES.filter((r) => r.slug !== slug && r.published);
  if (!current) return pool.slice(0, limit);
  const same = pool.filter((r) => r.collection && r.collection === current.collection);
  const rest = pool.filter((r) => !same.includes(r));
  return [...same, ...rest].slice(0, limit);
}
