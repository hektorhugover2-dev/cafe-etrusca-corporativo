import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';
export interface MaqProduct {
  name: string;
  sku?: string;
  image?: string;
  description?: string;
  specs: string[];
}

export interface MaqBrandBlock {
  brand: string;
  logo: string;
  text: string;
  /** Marca fuera de catálogo activo: se oculta del hub/listados; la página de marca sigue viva. */
  discontinued?: boolean;
  products: MaqProduct[];
}

export interface MaqSection {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  brandLogo?: string;
  blocks: MaqBrandBlock[];
}

export interface MaqNavItem {
  id: string;
  label: string;
  icon: string;
  desc: string;
  link: string;
  catalogUrl?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  /** Si es false, no aparece en menú / chips (la ruta puede seguir viva). */
  showInNav?: boolean;
}

export const MAQ_HUB = '/maquinaria-y-equipo-para-cafeterias';
export const MAQ_CATALOG_HUB = 'https://equipos-accesorios.cafeetrusca.com';

/** Marcas descontinuadas con página propia indexable (además de la categoría). */
export const MAQ_DISCONTINUED_BRAND_IDS = [
  'melitta',
  'blendtec',
  'eureka',
  'comandante',
  'anfim',
  'mahlkonig'
] as const;

export const MAQ_NAV: MaqNavItem[] = [
  {
    id: 'espresso',
    label: 'Espresso',
    icon: `${ASSETS_BASE_URL}/images/maquinas/nav/espresso.png`,
    desc: 'Máquinas Reneka para barra profesional',
    link: '/maquinaria-y-equipo-para-cafeterias/espresso',
    catalogUrl: 'https://equipos-accesorios.cafeetrusca.com/#page/43',
    seoTitle: 'Máquinas de espresso para cafeterías - Reneka | Café Etrusca',
    seoDescription:
      'Máquinas de espresso profesionales para cafetería. Reneka con instalación, preventivo y servicio para tu barra.',
    seoKeywords: 'máquinas de espresso, Reneka, espresso para cafetería, máquina de café profesional'
  },
  {
    id: 'autoservicio',
    label: 'Autoservicio',
    icon: `${ASSETS_BASE_URL}/images/maquinas/nav/autoservicio.png`,
    desc: 'Equipos de autoservicio para alto volumen',
    link: '/maquinaria-y-equipo-para-cafeterias/autoservicio',
    catalogUrl: 'https://equipos-accesorios.cafeetrusca.com/#page/57',
    showInNav: false,
    seoTitle: 'Máquinas de autoservicio para cafeterías | Café Etrusca',
    seoDescription:
      'Información sobre equipos de autoservicio para cafeterías. Asesoría de servicio, mantenimiento y alternativas vigentes.',
    seoKeywords: 'máquinas de autoservicio, autoservicio cafetería, equipo self service café'
  },
  {
    id: 'licuadoras',
    label: 'Licuadoras',
    icon: `${ASSETS_BASE_URL}/images/maquinas/nav/licuadoras.png`,
    desc: 'Hamilton Beach para barra profesional',
    link: '/maquinaria-y-equipo-para-cafeterias/licuadoras',
    catalogUrl: 'https://equipos-accesorios.cafeetrusca.com/#page/48',
    seoTitle: 'Licuadoras para cafeterías - Hamilton Beach | Café Etrusca',
    seoDescription:
      'Licuadoras profesionales Hamilton Beach para barra, salsas, batidos y bebidas de cafetería.',
    seoKeywords: 'licuadoras para cafetería, Hamilton Beach, licuadora profesional barista'
  },
  {
    id: 'molinos',
    label: 'Molinos',
    icon: `${ASSETS_BASE_URL}/images/maquinas/nav/molinos.png`,
    desc: 'Ceado y Fiorenzato para espresso y filtro',
    link: '/maquinaria-y-equipo-para-cafeterias/molinos',
    catalogUrl: 'https://equipos-accesorios.cafeetrusca.com/#page/44',
    seoTitle: 'Molinos de café para cafeterías - Ceado y Fiorenzato | Café Etrusca',
    seoDescription:
      'Molinos profesionales para espresso y filtro. Ceado y Fiorenzato, con asesoría para tu barra.',
    seoKeywords: 'molinos de café, molino espresso, Ceado, Fiorenzato, molino para cafetería'
  },
  {
    id: 'tostadores',
    label: 'Tostadores',
    icon: `${ASSETS_BASE_URL}/images/maquinas/nav/tostadores.png`,
    desc: 'Tostadores Coffee Tech de laboratorio a tienda',
    link: '/maquinaria-y-equipo-para-cafeterias/tostadores',
    catalogUrl: 'https://equipos-accesorios.cafeetrusca.com/#page/52',
    seoTitle: 'Tostadores de café para cafeterías - Coffee Tech | Café Etrusca',
    seoDescription:
      'Tostadores Coffee Tech para laboratorio, tienda y producción. Del lote pequeño a la operación continua.',
    seoKeywords: 'tostadores de café, Coffee Tech, tostador para cafetería, tueste de café'
  }
];

/** Ítems visibles en menú, mega menú y chips de categoría. */
export function maqNavVisible(): MaqNavItem[] {
  return MAQ_NAV.filter((n) => n.showInNav !== false);
}

export function findMaqNav(id: string): MaqNavItem | undefined {
  return MAQ_NAV.find((n) => n.id === id);
}

export const MAQ_HERO_FALLBACK = `${ASSETS_BASE_URL}/images/maquinas/maq-hero-viva-black-2g-transparente-2026-11-06.webp`;

/** First product image in a section (first active block → first product with image), else fallback. */
export function firstMaqProductImage(
  sec: MaqSection | undefined | null,
  fallback: string = MAQ_HERO_FALLBACK
): string {
  if (!sec) return fallback;
  for (const block of sec.blocks) {
    if (block.discontinued) continue;
    for (const p of block.products) {
      if (p.image) return p.image;
    }
  }
  for (const block of sec.blocks) {
    for (const p of block.products) {
      if (p.image) return p.image;
    }
  }
  return fallback;
}

const img = (f: string) => `${ASSETS_BASE_URL}/images/maquinas/${f}`;

export const MAQ_SECTIONS: MaqSection[] = [
  {
    id: 'espresso',
    kicker: 'Reneka',
    title: 'Máquinas para espresso',
    intro:
      'Seleccionamos cada equipo por su calidad, desempeño y durabilidad. Nuestros expertos te ayudarán a elegir el equipo que mejor se adapte a las necesidades de tu barra, y también nos encargamos de la instalación, el servicio preventivo y el servicio mayor, alargando con ello la vida útil de tu inversión.',
    brandLogo: img('logo-reneka.svg'),
    blocks: [
      {
        brand: 'Reneka',
        logo: img('logo-reneka.svg'),
        text: 'Máquinas de espresso profesionales, pensadas para operación diaria en cafetería.',
        products: [
          {
            name: 'Viva Basic 1 Grupo',
            sku: 'MCA-001',
            image: img('viva.webp'),
            description: 'Cafetera Reneka Viva Basic de 1 grupo, AP 110 V.',
            specs: [
              '1 grupo · AP 110 V',
              'Aroma Perfect · Multicoffee system',
              'Pre-infusión en ciclos de 1 y 2 tazas',
              'Automática, lanceta de vapor y agua caliente',
              'Seguridad contra falta de agua'
            ]
          },
          {
            name: 'Viva 2 Grupos',
            sku: 'MCA-002',
            image: img('maq-hero-viva-black-2g-transparente-2026-11-06.webp'),
            description: 'Cafetera Reneka Viva de 2 grupos, AP 220 V.',
            specs: [
              '2 grupos · AP 220 V',
              'Aroma Perfect · Multicoffee system',
              'Pre-infusión en ciclos de 1 y 2 tazas',
              'Automática, lanceta de vapor y agua caliente',
              'Seguridad contra falta de agua'
            ]
          },
          {
            name: 'Viva Basic 2 Grupos',
            sku: 'MCA-049',
            image: img('viva-basic-2.webp'),
            description: 'Cafetera Reneka Viva Basic de 2 grupos, AP negra 220 V.',
            specs: [
              '2 grupos · AP 220 V · Negra',
              'Aroma Perfect · Multicoffee system',
              'Pre-infusión en ciclos de 1 y 2 tazas',
              'Automática, lanceta de vapor y agua caliente',
              'Seguridad contra falta de agua'
            ]
          },
          {
            name: 'OEM 2 Grupos',
            sku: 'MCA-004',
            image: img('espresso-oem.webp'),
            description: 'Cafetera Reneka OEM de 2 grupos, 220 V.',
            specs: [
              '2 grupos · automática · 220 V',
              'Depósito de agua: 11 L',
              '2 lancetas de vapor',
              '1 salida de agua caliente',
              'Peso: 60 kg'
            ]
          },
          {
            name: 'Life 2 Grupos',
            sku: 'MCA-003',
            image: img('life.webp'),
            description: 'Cafetera Reneka Life de 2 grupos, AP 220 V.',
            specs: [
              '2 grupos · automática · AP 220 V',
              'Aroma Perfect · LC Display',
              'Modo eco y limpieza automática',
              'Área de taza iluminada',
              'Lancetas de vapor y agua caliente'
            ]
          },
          {
            name: 'Life Touch 2 Grupos',
            sku: 'MCA-051',
            image: img('maq-life-touch-2g-2026-11-05.webp'),
            description: 'Cafetera Reneka Life Touch de 2 grupos, AP 220 V, con pantalla táctil.',
            specs: [
              '2 grupos · AP 220 V',
              'Pantalla táctil (serie Life Touch)',
              'Control PID de temperatura de caldera',
              'Aroma Perfect · Latte Art opcional',
              'Fuente: ficha Reneka Life Touch / código MCA-051'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'autoservicio',
    kicker: 'Autoservicio',
    title: 'Máquinas de autoservicio',
    intro:
      'Este equipo ya no forma parte de nuestro catálogo activo. Te asesoramos en servicio, mantenimiento y en la elección de un equipo vigente.',
    brandLogo: img('logo-melitta.svg'),
    blocks: [
      {
        brand: 'Melitta',
        logo: img('logo-melitta.svg'),
        text: 'Equipos de autoservicio Melitta (ya no comercializados).',
        discontinued: true,
        products: [
          { name: 'XT-6', image: img('xt-6.webp'), specs: ['Autoservicio Melitta', 'Ideal para operación continua'] },
          { name: 'CT-8', image: img('ct-8.webp'), specs: ['Autoservicio Melitta', 'Mayor capacidad de menú'] },
          { name: 'XT-8F', image: img('xt-8f.webp'), specs: ['Autoservicio Melitta', 'Formato compacto de alto rendimiento'] }
        ]
      }
    ]
  },
  {
    id: 'licuadoras',
    kicker: 'Hamilton Beach',
    title: 'Licuadoras',
    intro:
      'Diseño vanguardista y versátil, ideales para salsas, batidos y bebidas de barra. Varios modelos cuentan con tecnología que lleva los ingredientes hacia la cuchilla, con menos manipulación y más seguridad.',
    blocks: [
      {
        brand: 'Hamilton Beach',
        logo: img('logo-hamilton.webp'),
        text: 'Licuadoras profesionales para barra y cocina.',
        products: [
          { name: 'HBH455', image: img('hbh455.webp'), specs: ['Hamilton Beach Tango', '2.4 Hp · 120 V'] },
          { name: 'HBH650', image: img('hbh650.webp'), specs: ['Hamilton Beach Tempest', '3 Hp · 120 V'] },
          { name: 'HBH755', image: img('hbh755.webp'), specs: ['Hamilton Beach Eclipse', '3 Hp · 120 V'] },
          { name: 'HBH950', image: img('hbh950.webp'), specs: ['Hamilton Beach Quantum'] },
          { name: '55000', image: img('hb-55000.webp'), specs: ['Proctor Silex', '2.4 Hp · 120 V'] },
          { name: 'HBH850', image: img('hbh850.webp'), specs: ['Hamilton Beach Summit', '3 Hp · 120 V'] },
          { name: 'HBB908R', image: img('hbb908r.webp'), specs: ['Hamilton Beach'] },
          { name: 'HBH510', image: img('hbh510.webp'), specs: ['Hamilton Beach'] }
        ]
      },
      {
        brand: 'Blendtec',
        logo: img('logo-blendtec.webp'),
        text: 'Tecnología patentada Blendtec (ya no comercializada en nuestro catálogo).',
        discontinued: true,
        products: [
          { name: 'CHEF 600', image: img('chef600.webp'), specs: ['Blendtec'] },
          { name: 'CONNOISSEUR 825', sku: 'MLI-017', image: img('connoisseur-825.webp'), specs: ['Blendtec', '3.8 Hp · 110 V'] }
        ]
      }
    ]
  },
  {
    id: 'molinos',
    kicker: 'Ceado · Fiorenzato',
    title: 'Molinos',
    intro:
      'Molienda precisa para espresso y filtro. Ceado y Fiorenzato (incluye el molino manual Pietro) seleccionados por consistencia, durabilidad y ergonomía.',
    blocks: [
      {
        brand: 'Ceado',
        logo: img('logo-ceado.svg'),
        text: 'Marca italiana líder en equipos profesionales para café. Precisión e innovación para resaltar el sabor en cada taza.',
        products: [
          { name: 'E37Z', sku: 'MMO-105', image: img('ceado-e37z.webp'), specs: ['Negro · 110 V', 'Tolva 1.2 kg'] },
          { name: 'E37S', sku: 'MMO-104', image: img('ceado-e37s.webp'), specs: ['Negro · 110 V', 'Tolva 1.6 kg'] },
          { name: 'LEON 800', sku: 'MMO-107', image: img('ceado-leon800.webp'), specs: ['Negro · 110 V', 'Tolva 1.6 kg'] },
          { name: 'LEON 800 RS', sku: 'MMO-108', image: img('ceado-leon800rs.webp'), specs: ['Negro · 110 V', 'Tolva 1.6 kg'] },
          { name: 'LEON 700', sku: 'MMO-106', image: img('ceado-leon700.webp'), specs: ['Negro · 110 V', 'Tolva 1.6 kg'] }
        ]
      },
      {
        brand: 'Eureka',
        logo: img('logo-eureka.webp'),
        text: 'Molinillos profesionales italianos (ya no comercializados en nuestro catálogo).',
        discontinued: true,
        products: [
          { name: 'ZENITH 65 NEO', sku: 'MMO-095', image: img('eureka-zenith.webp'), specs: ['Color: Negro', '110 V', 'Tolva 1.2 kg'] },
          { name: 'HELIOS 65', sku: 'MMO-096', image: img('eureka-helios.webp'), specs: ['Color: Negro', '110 V', 'Tolva 1.2 kg'] },
          { name: 'ATOM 65', sku: 'MMO-097', image: img('eureka-atom.webp'), specs: ['Color: Negro', '110 V', 'Tolva 1.2 kg'] },
          { name: 'PROMETHEUS', sku: 'MMO-098', image: img('eureka-prometheus.webp'), specs: ['Color: Negro', '127 V', 'Tolva 1.2 kg'] }
        ]
      },
      {
        brand: 'Anfim',
        logo: img('logo-anfim.webp'),
        text: 'Diseño funcional italiano (ya no comercializado en nuestro catálogo).',
        discontinued: true,
        products: [
          { name: 'Caimano On Demand', image: img('anfim-caimano.webp'), specs: ['Negro · 110 V', 'Tolva 2000 g'] }
        ]
      },
      {
        brand: 'Mahlkönig',
        logo: img('logo-mahlkonig.webp'),
        text: 'Molienda premium (ya no comercializada en nuestro catálogo).',
        discontinued: true,
        products: [
          { name: 'E65S', image: img('mahlkonig-e65s.webp'), specs: ['Molino profesional Mahlkönig'] },
          { name: 'E65S GbW', image: img('mahlkonig-e65s-gbw.webp'), specs: ['Negro/blanco · 110 V', 'Tolva 1.2 kg'] },
          { name: 'EK43', image: img('mahlkonig-ek43.webp'), specs: ['Negro · 110 V', 'Tolva 1.5 kg'] },
          { name: 'EK43S', image: img('mahlkonig-ek43s.webp'), specs: ['Molino profesional Mahlkönig'] }
        ]
      }
    ]
  },
  {
    id: 'tostadores',
    kicker: 'Coffee Tech',
    title: 'Tostadores',
    intro: 'El estándar de oro en tecnología de tostado de café, del laboratorio a la tienda.',
    brandLogo: img('logo-coffeetech.webp'),
    blocks: [
      {
        brand: 'Coffee Tech',
        logo: img('logo-coffeetech.webp'),
        text: 'Tostadores para laboratorio, shop y producción.',
        products: [
          {
            name: 'FZ94 Pro-Lab 2.4 kg',
            sku: 'MTO-001',
            image: img('tostador-fz94.webp'),
            specs: [
              'Materiales: 100% Estructura de metal',
              'Capacidad de lote: 0.1–2.4 kg',
              'Ciclos de tostado: 16-18 minutos para un lote completo (después del precalentamiento)',
              '220–240 V'
            ]
          },
          {
            name: 'Solar Automático 2 kg',
            sku: 'MTO-002',
            image: img('tostador-solar.webp'),
            specs: ['Cap. de lote 0.1–2.4 kg', 'Ciclo 16–18 min', '220–240 V']
          },
          {
            name: 'Silón Automático 7 kg',
            sku: 'MTO-003',
            image: img('tostador-silon.webp'),
            specs: ['Cap. de lote 1–7 kg', 'Ciclo 11–17 min', '230–380 V']
          }
        ]
      }
    ]
  }
];
