export interface MaqProduct {
  name: string;
  sku?: string;
  image?: string;
  specs: string[];
}

export interface MaqBrandBlock {
  brand: string;
  logo: string;
  text: string;
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
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

export const MAQ_HUB = '/maquinaria-y-equipo-para-cafeterias';

export const MAQ_NAV: MaqNavItem[] = [
  {
    id: 'espresso',
    label: 'Espresso',
    icon: '/assets/images/maquinas/cat-espresso.png',
    desc: 'Máquinas Reneka para barra profesional',
    link: '/productos/maquinas/espresso',
    seoTitle: 'Máquinas de espresso para cafeterías - Reneka | Café Etrusca',
    seoDescription:
      'Máquinas de espresso profesionales para cafetería. Reneka con instalación, preventivo y servicio para tu barra.',
    seoKeywords: 'máquinas de espresso, Reneka, espresso para cafetería, máquina de café profesional'
  },
  {
    id: 'autoservicio',
    label: 'Autoservicio',
    icon: '/assets/images/maquinas/cat-espresso.png',
    desc: 'Equipos Melitta de alto volumen',
    link: '/productos/maquinas/autoservicio',
    seoTitle: 'Máquinas de autoservicio para cafeterías - Melitta | Café Etrusca',
    seoDescription:
      'Equipos Melitta de autoservicio para cafeterías, oficinas y food service. Consistencia, rapidez y menú amplio.',
    seoKeywords: 'máquinas de autoservicio, Melitta, autoservicio cafetería, equipo self service café'
  },
  {
    id: 'licuadoras',
    label: 'Licuadoras',
    icon: '/assets/images/maquinas/cat-licuadoras.png',
    desc: 'Hamilton Beach y Blendtec para barra',
    link: '/productos/maquinas/licuadoras',
    seoTitle: 'Licuadoras para cafeterías - Hamilton Beach y Blendtec | Café Etrusca',
    seoDescription:
      'Licuadoras profesionales Hamilton Beach y Blendtec para barra, salsas, batidos y bebidas de cafetería.',
    seoKeywords: 'licuadoras para cafetería, Hamilton Beach, Blendtec, licuadora profesional barista'
  },
  {
    id: 'molinos',
    label: 'Molinos',
    icon: '/assets/images/maquinas/cat-molinos.png',
    desc: 'Ceado, Eureka, Pietro, Fiorenzato y más',
    link: '/productos/maquinas/molinos',
    seoTitle: 'Molinos de café para cafeterías - Ceado, Eureka, Pietro | Café Etrusca',
    seoDescription:
      'Molinos profesionales para espresso y filtro. Ceado, Eureka, Pietro, Comandante, Fiorenzato, Anfim y Mahlkönig.',
    seoKeywords: 'molinos de café, molino espresso, Ceado, Eureka, Pietro, Fiorenzato, Comandante, Mahlkönig'
  },
  {
    id: 'tostadores',
    label: 'Tostadores',
    icon: '/assets/images/maquinas/cat-tostadores.png',
    desc: 'Tostadores Coffee Tech de laboratorio a tienda',
    link: '/productos/maquinas/tostadores',
    seoTitle: 'Tostadores de café para cafeterías - Coffee Tech | Café Etrusca',
    seoDescription:
      'Tostadores Coffee Tech para laboratorio, tienda y producción. Del lote pequeño a la operación continua.',
    seoKeywords: 'tostadores de café, Coffee Tech, tostador para cafetería, tueste de café'
  }
];

export function findMaqNav(id: string): MaqNavItem | undefined {
  return MAQ_NAV.find((n) => n.id === id);
}

const img = (f: string) => `/assets/images/maquinas/${f}`;

export const MAQ_SECTIONS: MaqSection[] = [
  {
    id: 'espresso',
    kicker: 'Reneka',
    title: 'Máquinas para espresso',
    intro: 'Seleccionamos cada equipo por calidad, desempeño y durabilidad. Nuestros expertos te ayudan a elegir la que mejor se adapte a tu barra, y nos encargamos de instalación, preventivo y servicio.',
    brandLogo: img('logo-reneka.svg'),
    blocks: [
      {
        brand: 'Reneka',
        logo: img('logo-reneka.svg'),
        text: 'Máquinas de espresso profesionales, pensadas para operación diaria en cafetería.',
        products: [
          {
            name: 'VIVA',
            image: img('viva.webp'),
            specs: [
              '110 V · también 2 grupos a 220 V',
              'Aroma Perfect · Multicoffee system',
              'Pre-infusión en ciclos de 1 y 2 tazas',
              'Automática, lanceta de vapor y agua caliente',
              'Seguridad contra falta de agua'
            ]
          },
          {
            name: 'OEM',
            image: img('espresso-oem.webp'),
            specs: [
              '2 grupos · automática',
              'Depósito de agua: 11 L',
              '2 lancetas de vapor',
              '1 salida de agua caliente',
              'Peso: 60 kg'
            ]
          },
          {
            name: 'LIFE',
            image: img('life.webp'),
            specs: [
              '2 grupos · automática',
              'Aroma Perfect · LC Display',
              'Modo eco y limpieza automática',
              'Área de taza iluminada',
              'Lancetas de vapor y agua caliente'
            ]
          },
          {
            name: 'VIVA BASIC 2',
            image: img('viva-basic-2.webp'),
            specs: [
              '110 V',
              'Aroma Perfect · Multicoffee system',
              'Pre-infusión en ciclos de 1 y 2 tazas',
              'Automática, lanceta de vapor y agua caliente',
              'Seguridad contra falta de agua'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'autoservicio',
    kicker: 'Melitta',
    title: 'Máquinas de autoservicio',
    intro: 'Soluciones Melitta para operación de alto volumen: consistencia, rapidez y menú amplio en autoservicio.',
    brandLogo: img('logo-melitta.svg'),
    blocks: [
      {
        brand: 'Melitta',
        logo: img('logo-melitta.svg'),
        text: 'Equipos de autoservicio para cafeterías, oficinas y food service.',
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
    kicker: 'Hamilton Beach · Blendtec',
    title: 'Licuadoras',
    intro: 'Diseño vanguardista y versátil, ideales para salsas, batidos y bebidas de barra. Varios modelos cuentan con tecnología que lleva los ingredientes hacia la cuchilla, con menos manipulación y más seguridad.',
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
        text: 'Tecnología patentada que lleva los ingredientes hacia la cuchilla en lugar de girar en círculo.',
        products: [
          { name: 'CHEF 600', image: img('chef600.webp'), specs: ['Blendtec'] },
          { name: 'CONNOISSEUR 825', image: img('connoisseur-825.webp'), specs: ['Blendtec', '3.8 Hp · 110 V'] }
        ]
      }
    ]
  },
  {
    id: 'molinos',
    kicker: 'Ceado · Eureka · Pietro · Comandante · Fiorenzato · Anfim · Mahlkönig',
    title: 'Molinos',
    intro: 'Molienda precisa para espresso y filtro. Marcas italianas y alemanas seleccionadas por consistencia, durabilidad y ergonomía.',
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
        text: 'Molinillos profesionales italianos de alta precisión, con rendimiento, durabilidad y diseño ergonómico.',
        products: [
          { name: 'ZENITH 65 NEO', sku: 'MMO-095', image: img('eureka-zenith.webp'), specs: ['Negro · 110 V', 'Tolva 1.2 kg'] },
          { name: 'HELIOS 65', sku: 'MMO-096', image: img('eureka-helios.webp'), specs: ['Negro · 110 V', 'Tolva 1.2 kg'] },
          { name: 'ATOM 65', sku: 'MMO-097', image: img('eureka-atom.webp'), specs: ['Negro · 110 V', 'Tolva 1.2 kg'] },
          { name: 'PROMETHEUS', sku: 'MMO-098', image: img('eureka-prometheus.webp'), specs: ['Negro · 127 V', 'Tolva 1.2 kg'] }
        ]
      },
      {
        brand: 'Anfim',
        logo: img('logo-anfim.webp'),
        text: 'Diseño funcional y cultura del espresso italiano, para barra profesional y uso doméstico.',
        products: [
          { name: 'Caimano On Demand', image: img('anfim-caimano.webp'), specs: ['Negro · 110 V', 'Tolva 2000 g'] }
        ]
      },
      {
        brand: 'Mahlkönig',
        logo: img('logo-mahlkonig.webp'),
        text: 'Referente mundial en molienda premium. La elección de baristas en todo el mundo.',
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
          { name: 'FZ94 Pro-Lab', image: img('tostador-fz94.webp'), specs: ['Cap. de lote 20 kg', 'Ciclo 16–18 min', '220–240 V'] },
          { name: 'Solar Shop', image: img('tostador-solar.webp'), specs: ['Cap. de lote 0.1–2.4 kg', 'Ciclo 16–18 min', '220–240 V'] },
          { name: 'Silón ZR7', image: img('tostador-silon.webp'), specs: ['Cap. de lote 1–7 kg', 'Ciclo 11–17 min', '230–380 V'] }
        ]
      }
    ]
  }
];
