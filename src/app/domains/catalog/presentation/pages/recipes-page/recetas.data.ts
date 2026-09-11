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
  published: boolean;
}

const ICO = {
  base: '/assets/images/recetas/icons/step-01.svg',
  blend: '/assets/images/recetas/icons/step-02.svg',
  decor: '/assets/images/recetas/icons/step-03.svg',
  finish: '/assets/images/recetas/icons/step-04.svg',
  tool: '/assets/images/recetas/icons/tool-licuadora.svg'
};

export const RECIPES: Recipe[] = [
  {
    slug: 'mangonada-chillout',
    title: 'CHAMOYADA',
    titleAccent: 'DE MANGO',
    kicker: 'Bebida fría',
    category: 'Bebidas frías',
    collection: 'chillout',
    summary:
      'Una bebida refrescante, picosita y llena de sabor, perfecta para disfrutar en cualquier momento.',
    image: '/assets/images/recetas/mangonada-card.webp',
    banner: '/assets/images/recetas/mangonada-lifestyle.webp',
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
        image: '/assets/images/insumos/cafe-bag.png',
        link: '/productos/insumos'
      },
      {
        label: 'ChillOut Jam Mango',
        description: 'Sabor intenso y auténtico.',
        image: '/assets/images/insumos/matcha-can.png',
        link: '/productos/insumos'
      },
      {
        label: 'Crystal Boba Mango',
        description: 'Textura única y divertida.',
        image: '/assets/images/insumos/product-tall-2.png',
        link: '/productos/insumos/toppings'
      },
      {
        label: 'ChillOut Chamoy',
        description: 'El toque picosito perfecto.',
        image: '/assets/images/insumos/salsas-bottle-chamoy.webp',
        link: '/productos/insumos/salsas'
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
    title: 'Miche',
    titleAccent: 'cero',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Michelada cero alcohol de 480 ml con escarchado de chamoy y chile, Jam mango ChillOut y Torani limón.',
    image: '/assets/images/recetas/temporada/miche-cero.webp',
    banner: '/assets/images/recetas/temporada/miche-cero.webp',
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
    title: 'Mi mero',
    titleAccent: 'mole',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Bebida fría de 300 ml con Mix xocolatl, espresso Mezcla especial No. 1, Torani canela y crema de banana.',
    image: '/assets/images/recetas/temporada/mi-mero-mole.webp',
    banner: '/assets/images/recetas/temporada/mi-mero-mole.webp',
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
    title: 'Diablito',
    titleAccent: 'de fresa',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Frappé de 480 ml con Jam fresa, Mix limón, Fruit chamoy y barrita de tamarindo.',
    image: '/assets/images/recetas/temporada/diablito-de-fresa.webp',
    banner: '/assets/images/recetas/temporada/diablito-de-fresa.webp',
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
    title: 'Nogada',
    titleAccent: 'clásica',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Frappé de granada 480 ml coronado con foam de leche evaporada, macadamia y Pearls granada.',
    image: '/assets/images/recetas/temporada/nogada-clasica.webp',
    banner: '/assets/images/recetas/temporada/nogada-clasica.webp',
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
    title: 'Margarita',
    titleAccent: '',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Cóctel de 300 ml con infusión Stash manzanilla, ChillOut Fruit limón y Torani piña.',
    image: '/assets/images/recetas/temporada/margarita.webp',
    banner: '/assets/images/recetas/temporada/margarita.webp',
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
    title: 'Marchanta',
    titleAccent: '',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Bebida de 300 ml con Torani lavanda y diamond, infusión de hierbas y top de tónica.',
    image: '/assets/images/recetas/temporada/marchanta.webp',
    banner: '/assets/images/recetas/temporada/marchanta.webp',
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
    title: 'Cate',
    titleAccent: 'de mi corazón',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Frappé de 300 ml con Mix limón, Fruit naranja enana, espresso y aguacate.',
    image: '/assets/images/recetas/temporada/cate-de-mi-corazon.webp',
    banner: '/assets/images/recetas/temporada/cate-de-mi-corazon.webp',
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
    title: 'Horchata',
    titleAccent: 'mexa',
    kicker: 'Fiestas Patrias 2026',
    category: 'Bebidas de temporada',
    collection: 'fiestas-patrias-2026',
    origin: 'septiembre-2026',
    summary:
      'Frappé de 480 ml con Mix horchata, Fruit azúcar morena, leche y canela.',
    image: '/assets/images/recetas/temporada/horchata-mexa.webp',
    banner: '/assets/images/recetas/temporada/horchata-mexa.webp',
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
    title: 'Lychee',
    titleAccent: 'Rose',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Bebida efervescente de 480 ml con Torani rosas, cold foam ChillOut fruit lichi, romero y tónica.',
    image: '/assets/images/recetas/verano/lychee-rose.webp',
    banner: '/assets/images/recetas/verano/lychee-rose.webp',
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
    title: 'Mojito',
    titleAccent: 'dragon fruit',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Mojito de 480 ml con Jam pitahaya, Stash green tea, Mix limón, menta y top de tónica.',
    image: '/assets/images/recetas/verano/mojito-dragon-fruit.webp',
    banner: '/assets/images/recetas/verano/mojito-dragon-fruit.webp',
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
    title: 'Dirty',
    titleAccent: 'soda',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Dirty soda de 480 ml con Torani galleta de mantequilla, foam Mix leche condensada y refresco cola.',
    image: '/assets/images/recetas/verano/dirty-soda.webp',
    banner: '/assets/images/recetas/verano/dirty-soda.webp',
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
    title: 'Orange cream',
    titleAccent: 'cold brew',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Cold brew 480 ml con Mezcla Especial n.º 1, foam Fruit naranja enana y Torani caramelo.',
    image: '/assets/images/recetas/verano/orange-cream-cold-brew.webp',
    banner: '/assets/images/recetas/verano/orange-cream-cold-brew.webp',
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
    title: 'Matcha',
    titleAccent: 'colada',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Frappé 480 ml con Mix matcha azul, Torani piña, foam Mix coco, leche e hielo.',
    image: '/assets/images/recetas/verano/matcha-colada.webp',
    banner: '/assets/images/recetas/verano/matcha-colada.webp',
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
    toolIcon: '/assets/images/recetas/icons/tool-licuadora.svg',
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
    title: 'Strawberry',
    titleAccent: 'matcha lemonade',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Limonada estratificada 480 ml con matcha ceremonial, tisana fresa kiwi y Mix limón.',
    image: '/assets/images/recetas/verano/strawberry-matcha-lemonade.webp',
    banner: '/assets/images/recetas/verano/strawberry-matcha-lemonade.webp',
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
    title: 'Tropical',
    titleAccent: 'cold brew',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Cold brew 480 ml con Mezcla Especial n.º 1, Torani coco, foam Jam mango, leche e hielo.',
    image: '/assets/images/recetas/verano/tropical-cold-brew.webp',
    banner: '/assets/images/recetas/verano/tropical-cold-brew.webp',
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
    title: 'Soda tropical',
    titleAccent: 'espumosa',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Soda 480 ml con Mix maracuyá, agua mineral, hielo, menta y limón.',
    image: '/assets/images/recetas/verano/soda-tropical-espumosa.webp',
    banner: '/assets/images/recetas/verano/soda-tropical-espumosa.webp',
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
    title: 'Sparkling',
    titleAccent: 'cherry',
    kicker: 'Verano 2026',
    category: 'Bebidas de temporada',
    collection: 'verano-2026',
    origin: 'verano-2026',
    summary:
      'Sparkling 480 ml con Torani cereza, Mix limón, cold foam piña colada y refresco lima-limón.',
    image: '/assets/images/recetas/verano/sparkling-cherry.webp',
    banner: '/assets/images/recetas/verano/sparkling-cherry.webp',
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
