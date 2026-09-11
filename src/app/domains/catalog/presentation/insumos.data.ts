export interface InsumosCategory {
  slug: string;
  label: string;
  title: string;
  kicker?: string;
  subtitle: string;
  body: string;
  heroImage: string;
  heroAlt: string;
  layout: 'jarabes' | 'salsas' | 'pures' | 'te' | 'tisanas' | 'bases' | 'toppings' | 'generic';
  lines: ProductLine[];
  extra?: Record<string, unknown>;
}

export interface ProductLine {
  name: string;
  description: string;
  sabores: string;
  presentacion: string;
  rendimiento: string;
  image?: string;
  tone?: 'yellow' | 'lime' | 'cyan' | 'pink' | 'orange' | 'coral';
}

export const INSUMOS_NAV = [
  { slug: 'jarabes', label: 'Jarabes', icon: '/assets/images/insumos/categorias/jarabes.png' },
  { slug: 'salsas', label: 'Salsas', icon: '/assets/images/insumos/categorias/salsas.png' },
  { slug: 'pures', label: 'Purés', icon: '/assets/images/insumos/categorias/pures.png' },
  { slug: 'te', label: 'Té', icon: '/assets/images/insumos/categorias/te.png' },
  { slug: 'tisanas', label: 'Tisanas', icon: '/assets/images/insumos/categorias/tisanas.png' },
  { slug: 'bases-en-polvo', label: 'Bases en polvo', icon: '/assets/images/insumos/categorias/bases-en-polvo.png' },
  { slug: 'toppings', label: 'Toppings', icon: '/assets/images/insumos/categorias/toppings.png' }
];

export const INSPIRA_MENU = [
  { title: 'Soda italiana', image: '/assets/images/insumos/drink-soda.png' },
  { title: 'Pistache cósmico', image: '/assets/images/insumos/drink-pistache.png' },
  { title: 'Matcha frappé', image: '/assets/images/insumos/drink-frappe.png' }
];

export const MARCAS_DESTACADAS = [
  {
    name: 'Torani',
    text: 'Sabor que inspira posibilidades. Jarabes, salsas y purés con más de 100 años elevando la experiencia de bebidas en todo el mundo.',
    logo: '/assets/images/insumos/logo-torani.png',
    image: '/assets/images/insumos/product-cluster.png',
    link: '/productos/insumos/jarabes'
  },
  {
    name: 'ChillOut',
    text: 'Una marca mexicana con opciones para desarrollar, complementar y dar personalidad a bebidas frías y calientes.',
    logo: '/assets/images/insumos/logo-chillout.png',
    image: '/assets/images/insumos/salsa-chocolate.png',
    link: '/productos/insumos/salsas'
  },
  {
    name: 'Té y tisanas',
    text: 'Mezclas diseñadas para preparar bebidas aromáticas, cremosas y consistentes de manera práctica.',
    logo: '',
    image: '/assets/images/insumos/matcha-can.png',
    link: '/productos/insumos/te'
  },
  {
    name: 'Bases en polvo',
    text: 'Mezclas en polvo que ayudan a desarrollar frappés y bebidas especiales con sabor y textura consistentes.',
    logo: '',
    image: '/assets/images/insumos/bottle-cpm.png',
    link: '/productos/insumos/bases-en-polvo'
  }
];

export const INSUMOS_CATEGORIES: InsumosCategory[] = [
  {
    slug: 'jarabes',
    label: 'Jarabes',
    title: 'JARABES',
    subtitle: 'Sabor y versatilidad para cada bebida',
    body: 'Los jarabes ofrecen una solución práctica para estandarizar recetas, diversificar el menú y elevar la experiencia de consumo en negocios de café y bebidas.',
    heroImage: '/assets/images/insumos/jarabe-lifestyle.png',
    heroAlt: 'Jarabe ChillOut',
    layout: 'jarabes',
    lines: [
      {
        name: 'ChillOut',
      tone: 'yellow',
      description: 'Una marca mexicana con opciones para desarrollar, complementar y dar personalidad a bebidas frías y calientes.',
        sabores: '14 opciones',
        presentacion: '1 L',
        rendimiento: 'Aprox. 30 bebidas de 450 ml',
        image: '/assets/images/insumos/logo-chillout.png'
      },
      {
        name: 'Clásico',
      tone: 'lime',
      description: 'Jarabe con una amplia variedad de sabores para agregar sabor a cafés, cócteles, postres y más.',
        sabores: '60 opciones',
        presentacion: '750 ml',
        rendimiento: 'Aprox. 25 bebidas de 450 ml'
      },
      {
        name: 'Sugar Free',
      tone: 'cyan',
      description: 'Formulación sin azúcar para cafés, coctelería y postres con el mismo perfil de sabor.',
        sabores: '17 opciones',
        presentacion: '750 ml',
        rendimiento: 'Aprox. 25 bebidas de 450 ml'
      },
      {
        name: 'Puremade',
      tone: 'pink',
      description: 'Ingredientes naturales, sin conservadores ni colorantes artificiales.',
        sabores: '2 opciones',
        presentacion: '750 ml',
        rendimiento: 'Aprox. 25 bebidas de 450 ml'
      }
    ],
    extra: {
      compare: [
        { linea: 'ChillOut', formulacion: 'Agave azul', caracteristica: 'Menor índice glucémico que el azúcar', aplicaciones: 'Cafés, coctelería y postres' },
        { linea: 'Sugar Free', formulacion: 'Sucralosa', caracteristica: 'Sin azúcar', aplicaciones: 'Cafés, coctelería y postres' },
        { linea: 'Puremade', formulacion: 'Ingredientes naturales', caracteristica: 'Sin conservadores ni colorantes artificiales', aplicaciones: 'Cafés, coctelería y postres' },
        { linea: 'Clásico', formulacion: 'Azúcar de caña', caracteristica: 'Línea versátil para saborizar', aplicaciones: 'Cafés, coctelería y postres' }
      ],
      note: 'Gracias a su fácil integración, permiten desarrollar preparaciones consistentes, atractivas y adaptables a distintas temporadas, conceptos y perfiles de cliente.'
    }
  },
  {
    slug: 'salsas',
    label: 'Salsas',
    title: 'SALSAS',
    subtitle: 'Textura y sabor para dar el toque final',
    body: 'Soluciones versátiles para integrar, complementar y decorar cafés, frappés, bebidas y postres con resultados consistentes en cada preparación.',
    heroImage: '/assets/images/insumos/salsas-hero-drink.png',
    heroAlt: 'Salsa sobre bebida',
    layout: 'salsas',
    lines: [
      {
        name: 'Salsas ChillOut',
      tone: 'lime',
      description: 'Salsas de textura suave y sabor intenso para mezclar, complementar y decorar bebidas y postres.',
        sabores: 'Chocolate y caramelo',
        presentacion: '1.89 L y 443 ml',
        rendimiento: 'Según dosificación',
        image: '/assets/images/insumos/salsas-bottle-hollander.png'
      },
      {
        name: 'Chamoy',
      tone: 'yellow',
      description: 'El chamoy de ChillOut tiene un sabor equilibrado entre lo ácido, dulce y salado. Ideal para dar ese toque de sabor en tus bebidas.',
        sabores: 'Único sabor',
        presentacion: '1 L',
        rendimiento: 'Aprox. 33 bebidas de 480 ml',
        image: '/assets/images/insumos/salsas-bottle-chamoy.png'
      },
      {
        name: 'Sugar Free',
        tone: 'cyan',
        description: 'Salsas sin azúcar para aportar sabor, textura y decoración a bebidas y postres.',
        sabores: 'Caramelo, chocolate oscuro y chocolate blanco',
        presentacion: '1.89 L',
        rendimiento: 'Aprox. 63 bebidas de 480 ml',
        image: '/assets/images/insumos/salsas-bottle-sugarfree.png'
      },
      {
        name: 'Puremade',
        tone: 'lime',
        description: 'Línea de salsas para complementar, mezclar y decorar bebidas y postres.',
        sabores: 'Caramelo, chocolate oscuro, chocolate blanco y chocolate y avellana',
        presentacion: '1.89 L y 488 ml',
        rendimiento: 'Hasta 63 bebidas aprox. en 1.89 L',
        image: '/assets/images/insumos/salsas-bottle-puremade.png'
      }
    ],
    extra: {
      seasonal: {
        title: 'Salsa de calabaza',
        text: 'El sabor otoñal que tus clientes esperan. Perfecta para lattes, bebidas frías y postres especiales que evocan el calor del hogar.',
        tag: 'Disponible por tiempo limitado',
        image: '/assets/images/insumos/salsas-seasonal.png'
      },
      steps: [
        { n: '1', title: 'Integra', text: 'Mezcla la salsa con tu bebida para aportar sabor y una textura sedosa que envuelve el paladar desde el primer sorbo.', image: '/assets/images/insumos/salsas-step-1.png' },
        { n: '2', title: 'Decora', text: 'Corona con creatividad: espirales, líneas o diseños que sorprenden a tus comensales y los invitan a capturar el momento.', image: '/assets/images/insumos/salsas-step-2.png' },
        { n: '3', title: 'Sirve', text: 'Presenta, sorprende y convierte cada taza o plato en una experiencia premium.', image: '/assets/images/insumos/salsas-step-3.png' }
      ]
    }
  },
  {
    slug: 'pures',
    label: 'Purés',
    title: 'Purés y concentrados',
    kicker: 'Purés y',
    subtitle: 'Soluciones líquidas y purés de fruta que elevan el sabor, aportan consistencia y te permiten crear bebidas únicas y personalizadas.',
    body: 'Sabor auténtico y consistente. Altamente concentrados.',
    heroImage: '/assets/images/insumos/pures-hero-photo.png',
    heroAlt: 'Purés y concentrados',
    layout: 'pures',
    lines: [
      {
        name: 'Concentrados',
      tone: 'yellow',
      description: 'Concentrados líquidos para preparar bebidas con sabores intensos de forma rápida y práctica.',
        sabores: '6 opciones',
        presentacion: '5 kg',
        rendimiento: 'Hasta 167 bebidas aprox.',
        image: '/assets/images/insumos/pures-drink-1.png'
      },
      {
        name: 'ChillOut Jam',
      tone: 'lime',
      description: 'Preparados de fruta con textura parecida a la mermelada. Incluye trozos de fruta que aportan más sabor.',
        sabores: '9 opciones',
        presentacion: '4.5 kg, 4.2 kg, 1.3 kg, 1.2 kg y 1.1 kg',
        rendimiento: 'Desde 24 hasta 100 bebidas aprox.'
      },
      {
        name: 'Purée Blend',
      tone: 'pink',
      description: 'Mezcla de fruta cocida y colada con textura espesa y sabor intenso para bebidas y coctelería.',
        sabores: '5 opciones',
        presentacion: '1.89 L',
        rendimiento: 'Hasta 66 bebidas aprox.'
      },
      {
        name: 'Smoothie Mix',
      tone: 'cyan',
      description: 'Preparados de fruta con consistencia homogénea, ideales para smoothies, frappés y bebidas frutales.',
        sabores: '6 opciones',
        presentacion: '1.89 L',
        rendimiento: 'Hasta 63 bebidas aprox.'
      }
    ],
    extra: {
      yieldNote: '*Rendimiento estimado con una dosificación de 30 ml por bebida. Puede variar según la preparación y la presentación.',
      jamTable: [
        { presentacion: '4.5 kg', rendimiento: '100 bebidas', sabores: 'Fresa, Mango, Maracuyá' },
        { presentacion: '4.2 kg', rendimiento: '93 bebidas', sabores: 'Maracuyá, Mango, Kiwi, Mora azul, Fresa' },
        { presentacion: '1.3 kg', rendimiento: '29 bebidas', sabores: 'Mango, Durazno' },
        { presentacion: '1.2 kg', rendimiento: '27 bebidas', sabores: 'Mora azul, Pitahaya, Manzana verde, Cereza' },
        { presentacion: '1.1 kg', rendimiento: '24 bebidas', sabores: 'Maracuyá, Fresa' }
      ],
      enjoy: ['Frappés', 'Smoothies', 'Sodas italianas']
    }
  },
  {
    slug: 'te',
    label: 'Té',
    title: 'TÉS',
    subtitle: 'Aromas y perfiles para disfrutar en cada taza',
    body: 'Soluciones de té que elevan el sabor, aportan consistencia y te permiten crear bebidas únicas y personalizadas.',
    heroImage: '/assets/images/insumos/te/hero-teapot.webp',
    heroAlt: 'Tetera y taza de té',
    layout: 'te',
    lines: [
      {
        name: 'Euro Te',
        tone: 'yellow',
        description: 'Euro te ofrece tés con combinaciones de ingredientes que aportan variedad de perfiles y sabores.',
        sabores: '9 opciones',
        presentacion: '250 g y 1 kg',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/te/line-vector.webp'
      },
      {
        name: 'Stash Descafeinado',
        tone: 'coral',
        description: 'Stash ofrece una variedad de perfiles y sabores para quienes prefieren disfrutar de una bebida libre de cafeína.',
        sabores: 'Según catálogo',
        presentacion: '18 y 20 sobres',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/te/line-frame.webp'
      },
      {
        name: 'Stash',
        tone: 'cyan',
        description: 'Tés Stash con sabor intenso para armar cartas calientes y frías con perfiles consistentes.',
        sabores: 'Según catálogo',
        presentacion: '18 y 20 sobres',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/te/hero-teapot.webp'
      }
    ],
    extra: {
      compare: [
        { linea: 'Euro Te', formulacion: 'Mezclas de té e ingredientes', caracteristica: 'Perfiles variados', aplicaciones: 'Té caliente, helado y con leche' },
        { linea: 'Stash Descafeinado', formulacion: 'Té descafeinado / libre de cafeína', caracteristica: 'Sin cafeína', aplicaciones: 'Té caliente y helado' },
        { linea: 'Stash', formulacion: 'Té en sobres', caracteristica: 'Sabores clásicos e intensos', aplicaciones: 'Té caliente y helado' }
      ],
      enjoy: [
        'Té caliente',
        'Té helado',
        'Té con leche',
        'Servicio en mesa',
        'Mixología con té'
      ]
    }
  },
  {
    slug: 'tisanas',
    label: 'Tisanas',
    title: 'TISANAS',
    subtitle: 'Mezclas que llenan de sabor cada infusión',
    body: 'Infusiones de frutas, hierbas y flores, naturalmente deliciosas y generalmente sin cafeína.',
    heroImage: '/assets/images/insumos/tisanas/hero-drinks.webp',
    heroAlt: 'Bebidas de tisana',
    layout: 'tisanas',
    lines: [
      {
        name: 'ChillOut Tisana',
        tone: 'coral',
        description: 'Mezclas frutales y herbales vibrantes, creadas para inspirar momentos de bienestar, sabor y equilibrio.',
        sabores: 'Según catálogo',
        presentacion: 'Bolsa 250 g',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/tisanas/line-a.webp'
      },
      {
        name: 'Euro Te Tisana',
        tone: 'yellow',
        description: 'Euro te desarrolla tisanas combinando frutas, flores y hierbas seleccionadas, ofreciendo mezclas originales sin cafeína con una amplia variedad de perfiles aromáticos.',
        sabores: 'Según catálogo',
        presentacion: 'Bolsa 250 g',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/tisanas/line-b.webp'
      }
    ],
    extra: {
      compare: [
        { linea: 'ChillOut Tisana', formulacion: 'Mezclas frutales y herbales', caracteristica: 'Sabores vibrantes', aplicaciones: 'Infusión caliente y fría' },
        { linea: 'Euro Te Tisana', formulacion: 'Frutas, flores y hierbas', caracteristica: 'Sin cafeína', aplicaciones: 'Infusión caliente y fría' }
      ],
      enjoy: ['Infusión caliente', 'Infusión fría', 'Servicio en mesa', 'Bienestar']
    }
  },
  {
    slug: 'bases-en-polvo',
    label: 'Bases en polvo',
    title: 'BASES EN POLVO',
    subtitle: 'Una base, muchas posibilidades',
    body: 'Los polvos y premezclas permiten incorporar sabor y consistencia a diferentes preparaciones. Dentro de nuestra selección encontrarás alternativas para bebidas de café, chai, matcha, chocolate, frappés y otras especialidades.',
    heroImage: '/assets/images/insumos/bases/hero-drink.webp',
    heroAlt: 'Bebida preparada con base en polvo',
    layout: 'bases',
    lines: [
      {
        name: 'ChillOut',
        tone: 'coral',
        description: 'Línea de polvos saborizados con gran variedad de opciones para crear tus propias recetas especiales.',
        sabores: '31 sabores',
        presentacion: '2 kg y 700 g',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/bases/logo-chillout.webp'
      },
      {
        name: 'ChillOut Just Fruit',
        tone: 'yellow',
        description: 'ChillOut Just Fruit deshidratada para bebidas naturales, refrescantes y llenas de sabor frutal intenso.',
        sabores: '3 sabores',
        presentacion: '2 kg y 700 g',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/bases/logo-chillout-2.webp'
      },
      {
        name: 'David Rio Chai',
        tone: 'cyan',
        description: 'Mezclas premium de chai, té e infusiones con especias y sabores excepcionales reconocidos mundialmente.',
        sabores: '9 sabores',
        presentacion: 'Desde 398 g',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/bases/logo-2.webp'
      },
      {
        name: 'MoCafé',
        tone: 'lime',
        description: 'Bases en polvo para una amplia variedad de bebidas frías y calientes de café y especialidades.',
        sabores: '24 sabores',
        presentacion: '1.360 kg',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/bases/logo-3.webp'
      },
      {
        name: 'Cool Capps',
        tone: 'coral',
        description: 'Bases para frappés, smoothies y bebidas frías cremosas con gran rendimiento en barra comercial.',
        sabores: '12 sabores',
        presentacion: '1.580 kg',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/bases/logo-4.webp'
      },
      {
        name: 'Cappuccine',
        tone: 'yellow',
        description: 'Premezclas para bebidas de rápida preparación: lattes, cappuccinos, mocha y más opciones deliciosas.',
        sabores: '16 sabores',
        presentacion: '1.360 kg',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/bases/logo-5.webp'
      },
      {
        name: 'Hollander',
        tone: 'cyan',
        description: 'Chocolate en polvo elaborado con cacao de alta calidad para bebidas calientes y frías de autor.',
        sabores: '1 sabor',
        presentacion: '1.130 kg',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/bases/logo-6.webp'
      },
      {
        name: 'Don Gustavo',
        tone: 'lime',
        description: 'Chocolate Don Gustavo, chocolate tradicional mexicano con cerca de 100 años de historia.',
        sabores: '1 sabor',
        presentacion: 'Diferentes formatos',
        rendimiento: 'Según preparación',
        image: '/assets/images/insumos/bottle-cpm.png'
      }
    ],
    extra: {
      compare: [
        { linea: 'ChillOut', formulacion: 'Polvos saborizados', caracteristica: 'Gran variedad', aplicaciones: 'Recetas especiales' },
        { linea: 'David Rio Chai', formulacion: 'Chai e infusiones', caracteristica: 'Perfil especiado', aplicaciones: 'Caliente y frío' },
        { linea: 'MoCafé', formulacion: 'Bases de café', caracteristica: 'Especialidades', aplicaciones: 'Frías y calientes' },
        { linea: 'Cool Capps', formulacion: 'Bases para frappé', caracteristica: 'Alto rendimiento', aplicaciones: 'Frappés y smoothies' }
      ],
      enjoy: ['Smoothies', 'Frappé', 'Matcha', 'Chai', 'Chocolate', 'Café']
    }
  },
  {
    slug: 'toppings',
    label: 'Toppings',
    title: 'TOPPINGS',
    subtitle: 'Textura y sabor para dar el toque final',
    body: 'Perlas, jellies, tapiocas y complementos para aportar textura, sabor y un toque visual único a bebidas frías, bubble tea, frappés y especialidades.',
    heroImage: '/assets/images/insumos/toppings/hero-drink.webp',
    heroAlt: 'Bebida con toppings',
    layout: 'toppings',
    lines: [
      { name: 'Popping Boba', tone: 'coral', description: 'Perlas con cubierta gelatinosa y relleno líquido de diferentes sabores.', sabores: '14 opciones', presentacion: '3.4 kg', rendimiento: 'Hasta 113 bebidas aprox.*', image: '/assets/images/insumos/toppings/line-1.webp' },
      { name: 'POP', tone: 'yellow', description: 'Perlas con o sin relleno que aportan sabor y textura en cada preparación.', sabores: '14 opciones y 4 rellenas', presentacion: '1.25 kg y rellenas 850 g', rendimiento: 'Hasta 43 bebidas aprox.*', image: '/assets/images/insumos/toppings/line-2.webp' },
      { name: 'Perlas explosivas', tone: 'cyan', description: 'Perlas rellenas de líquido sabor a frutas. Ideales para complementar bebidas frías.', sabores: '3 opciones', presentacion: '3.2 kg', rendimiento: 'Hasta 106 bebidas aprox.*', image: '/assets/images/insumos/toppings/line-3.webp' },
      { name: 'Crystal Boba', tone: 'lime', description: 'Perlas de konjac semitransparentes y suaves para agregar textura y un toque visual único.', sabores: '6 opciones', presentacion: '2 kg y 1 kg', rendimiento: 'Hasta 66 bebidas aprox.*', image: '/assets/images/insumos/toppings/line-4.webp' },
      { name: 'Jelly', tone: 'coral', description: 'Gelatinas pequeñas con consistencia firme, agregando sabor y textura.', sabores: '8 opciones', presentacion: '3.85 kg', rendimiento: 'Hasta 128 bebidas aprox.*', image: '/assets/images/insumos/toppings/logo-chillout.webp' },
      { name: 'Trozos de jalea', tone: 'yellow', description: 'Trozos de jalea versátiles para aportar textura y dulzura natural a bebidas y postres.', sabores: '5 opciones', presentacion: '4 kg', rendimiento: 'Hasta 133 bebidas aprox.*', image: '/assets/images/insumos/toppings/logo-teazone.webp' },
      { name: 'Tapioca', tone: 'cyan', description: 'Tapioca en perlas para bubble tea. Cocidas adquieren una textura gelatinosa.', sabores: 'Según preparación', presentacion: '3 kg y 1 kg', rendimiento: 'Hasta 100 / 33 bebidas aprox.*', image: '/assets/images/insumos/toppings/logo-chillout-1.webp' },
      { name: 'Tapioca instantánea', tone: 'lime', description: 'Tapioca instantánea en porciones individuales. Lista tras un minuto de calentado.', sabores: 'Según preparación', presentacion: 'Caja 50 sobres de 50 g', rendimiento: '50 bebidas (1 sobre por bebida)', image: '/assets/images/insumos/toppings/logo-chillout-2.webp' }
    ],
    extra: {
      compare: [
        { linea: 'Popping Boba', formulacion: 'Perlas con relleno líquido', caracteristica: 'Explosión de sabor', aplicaciones: 'Bebidas frías y bubble tea' },
        { linea: 'Crystal Boba', formulacion: 'Perlas de konjac', caracteristica: 'Toque visual', aplicaciones: 'Fríos y especialidades' },
        { linea: 'Jelly', formulacion: 'Gelatina firme', caracteristica: 'Textura definida', aplicaciones: 'Bebidas y postres' },
        { linea: 'Tapioca', formulacion: 'Perlas de yuca', caracteristica: 'Masticable', aplicaciones: 'Bubble tea' }
      ],
      enjoy: ['Smoothies', 'Frappé', 'Tés con leche', 'Coctelería']
    }
  }
];

export function findCategory(slug: string | null) {
  return INSUMOS_CATEGORIES.find(c => c.slug === slug) ?? null;
}
