export interface InsumosCategory {
  slug: string;
  label: string;
  title: string;
  kicker?: string;
  subtitle: string;
  body: string;
  heroImage: string;
  heroAlt: string;
  layout: 'jarabes' | 'salsas' | 'pures' | 'generic';
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
}

export const INSUMOS_NAV = [
  { slug: 'jarabes', label: 'Jarabes' },
  { slug: 'salsas', label: 'Salsas' },
  { slug: 'pures', label: 'Purés' },
  { slug: 'te', label: 'Té' },
  { slug: 'tisanas', label: 'Tisanas' },
  { slug: 'bases-en-polvo', label: 'Bases en polvo' },
  { slug: 'toppings', label: 'Toppings' }
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
        description: 'Una marca mexicana con opciones para desarrollar, complementar y dar personalidad a bebidas frías y calientes.',
        sabores: '14 opciones',
        presentacion: '1 L',
        rendimiento: 'Aprox. 30 bebidas de 450 ml',
        image: '/assets/images/insumos/logo-chillout.png'
      },
      {
        name: 'Clásico',
        description: 'Jarabe con una amplia variedad de sabores para agregar sabor a cafés, cócteles, postres y más.',
        sabores: '60 opciones',
        presentacion: '750 ml',
        rendimiento: 'Aprox. 25 bebidas de 450 ml'
      },
      {
        name: 'Sugar Free',
        description: 'Formulación sin azúcar para cafés, coctelería y postres con el mismo perfil de sabor.',
        sabores: '17 opciones',
        presentacion: '750 ml',
        rendimiento: 'Aprox. 25 bebidas de 450 ml'
      },
      {
        name: 'Puremade',
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
    heroImage: '/assets/images/insumos/salsas-hero.png',
    heroAlt: 'Salsa sobre bebida',
    layout: 'salsas',
    lines: [
      {
        name: 'Salsas ChillOut',
        description: 'Salsas de textura suave y sabor intenso para mezclar, complementar y decorar bebidas y postres.',
        sabores: 'Chocolate y caramelo',
        presentacion: '1.89 L y 443 ml',
        rendimiento: 'Según dosificación',
        image: '/assets/images/insumos/salsa-ija-105.png'
      },
      {
        name: 'Chamoy',
        description: 'El chamoy de ChillOut tiene un sabor equilibrado entre lo ácido, dulce y salado. Ideal para dar ese toque de sabor en tus bebidas.',
        sabores: 'Único sabor',
        presentacion: '1 L',
        rendimiento: 'Aprox. 33 bebidas de 480 ml',
        image: '/assets/images/insumos/salsa-ija-144.png'
      },
      {
        name: 'Sugar Free',
        description: 'Salsas sin azúcar para aportar sabor, textura y decoración a bebidas y postres.',
        sabores: 'Caramelo, chocolate oscuro y chocolate blanco',
        presentacion: '1.89 L',
        rendimiento: 'Aprox. 63 bebidas de 480 ml'
      },
      {
        name: 'Puremade',
        description: 'Línea de salsas para complementar, mezclar y decorar bebidas y postres.',
        sabores: 'Caramelo, chocolate oscuro, chocolate blanco y chocolate y avellana',
        presentacion: '1.89 L y 488 ml',
        rendimiento: 'Hasta 63 bebidas aprox. en 1.89 L'
      }
    ],
    extra: {
      seasonal: {
        title: 'Salsa de calabaza',
        text: 'El sabor otoñal que tus clientes esperan. Perfecta para lattes, bebidas frías y postres especiales que evocan el calor del hogar.',
        tag: 'Disponible por tiempo limitado',
        image: '/assets/images/insumos/salsa-calabaza.png'
      },
      steps: [
        { n: '1', title: 'Integra', text: 'Mezcla la salsa con tu bebida para aportar sabor y una textura sedosa que envuelve el paladar desde el primer sorbo.', image: '/assets/images/insumos/step-1.png' },
        { n: '2', title: 'Decora', text: 'Corona con creatividad: espirales, líneas o diseños que sorprenden a tus comensales y los invitan a capturar el momento.', image: '/assets/images/insumos/step-2.png' },
        { n: '3', title: 'Sirve', text: 'Presenta, sorprende y convierte cada taza o plato en una experiencia premium.', image: '/assets/images/insumos/step-3.png' }
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
        description: 'Concentrados líquidos para preparar bebidas con sabores intensos de forma rápida y práctica.',
        sabores: '6 opciones',
        presentacion: '5 kg',
        rendimiento: 'Hasta 167 bebidas aprox.',
        image: '/assets/images/insumos/pures-drink-1.png'
      },
      {
        name: 'ChillOut Jam',
        description: 'Preparados de fruta con textura parecida a la mermelada. Incluye trozos de fruta que aportan más sabor.',
        sabores: '9 opciones',
        presentacion: '4.5 kg, 4.2 kg, 1.3 kg, 1.2 kg y 1.1 kg',
        rendimiento: 'Desde 24 hasta 100 bebidas aprox.'
      },
      {
        name: 'Purée Blend',
        description: 'Mezcla de fruta cocida y colada con textura espesa y sabor intenso para bebidas y coctelería.',
        sabores: '5 opciones',
        presentacion: '1.89 L',
        rendimiento: 'Hasta 66 bebidas aprox.'
      },
      {
        name: 'Smoothie Mix',
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
    title: 'TÉ',
    subtitle: 'Mezclas aromáticas para menús calientes y fríos',
    body: 'Mezclas diseñadas para preparar bebidas aromáticas, cremosas y consistentes de manera práctica.',
    heroImage: '/assets/images/insumos/matcha-can.png',
    heroAlt: 'Té matcha',
    layout: 'generic',
    lines: []
  },
  {
    slug: 'tisanas',
    label: 'Tisanas',
    title: 'TISANAS',
    subtitle: 'Infusiones con carácter para tu carta',
    body: 'Opciones de tisanas para crear bebidas de especialidad, calientes o over ice, con un perfil aromático consistente.',
    heroImage: '/assets/images/insumos/drink-matcha.png',
    heroAlt: 'Tisana',
    layout: 'generic',
    lines: []
  },
  {
    slug: 'bases-en-polvo',
    label: 'Bases en polvo',
    title: 'BASES EN POLVO',
    subtitle: 'Frappés y bebidas especiales con textura consistente',
    body: 'Mezclas en polvo que ayudan a desarrollar frappés y bebidas especiales con sabor y textura consistentes.',
    heroImage: '/assets/images/insumos/bottle-cpm.png',
    heroAlt: 'Bases en polvo',
    layout: 'generic',
    lines: []
  },
  {
    slug: 'toppings',
    label: 'Toppings',
    title: 'TOPPINGS',
    subtitle: 'El detalle que cierra la experiencia',
    body: 'Toppings, jellies y perlas para decorar y dar textura a bebidas frías y de especialidad.',
    heroImage: '/assets/images/insumos/kiwi-hero.png',
    heroAlt: 'Toppings',
    layout: 'generic',
    lines: []
  }
];

export function findCategory(slug: string | null) {
  return INSUMOS_CATEGORIES.find(c => c.slug === slug) ?? null;
}
