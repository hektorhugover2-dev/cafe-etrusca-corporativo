export type GrinderSpec = [string, string];

export interface GrinderColor {
  name: string;
  hex: string;
  img: string;
  titulo?: string;
  descripcion?: string;
  sku?: string;
  ficha?: GrinderSpec[];
}

export interface GrinderSlide {
  titulo: string;
  descripcion: string;
  sku?: string;
  img: string;
  colores: GrinderColor[];
  ficha: GrinderSpec[];
}

export interface GrinderBrand {
  id: string;
  name: string;
  marquee: string;
  lead: string;
  bg: string;
  leadColor: string;
  logo?: string;
  api?: string;
  slides: GrinderSlide[];
}

const img = (file: string) => `/assets/images/maquinas/${file}`;

function specRows(brand: string, name: string, sku: string | undefined, specs: string[]): GrinderSpec[] {
  const rows: GrinderSpec[] = [['Marca', brand], ['Modelo', name]];
  if (sku) rows.push(['SKU', sku]);
  for (const s of specs) {
    if (s.includes(':')) {
      const i = s.indexOf(':');
      rows.push([s.slice(0, i).trim(), s.slice(i + 1).trim()]);
    } else if (/tolva/i.test(s)) rows.push(['Tolva', s.replace(/tolva\s*/i, '').trim()]);
    else if (/cap\.?\s*de lote/i.test(s)) rows.push(['Capacidad de lote', s.replace(/cap\.?\s*de lote\s*/i, '').trim()]);
    else if (/ciclo/i.test(s)) rows.push(['Ciclo', s.replace(/ciclo\s*/i, '').trim()]);
    else if (/\bhp\b/i.test(s)) rows.push(['Potencia', s]);
    else if (/\d+\s*v/i.test(s)) rows.push(['Voltaje', s]);
    else rows.push(['Detalle', s]);
  }
  return rows;
}

function slidesFromProducts(
  brand: string,
  lead: string,
  products: Array<{ name: string; sku?: string; image?: string; specs: string[] }>
): GrinderSlide[] {
  return products.map((p) => ({
    titulo: p.name.toUpperCase(),
    descripcion: lead,
    sku: p.sku,
    img: p.image || '',
    colores: [],
    ficha: specRows(brand, p.name, p.sku, p.specs)
  }));
}

const THEMES: Record<string, { bg: string; leadColor: string }> = {
  Reneka: { bg: '#D4B06A', leadColor: '#5c3a10' },
  Melitta: { bg: '#E07A6A', leadColor: '#6b2218' },
  'Hamilton Beach': { bg: '#7EB6D9', leadColor: '#16324a' },
  Blendtec: { bg: '#E8C44A', leadColor: '#5a4308' },
  'Coffee Tech': { bg: '#C49A6C', leadColor: '#4a3014' },
  Ceado: { bg: '#DDB07A', leadColor: '#6b3b12' },
  Eureka: { bg: '#E07A5F', leadColor: '#6b2410' },
  Anfim: { bg: '#8FA0B5', leadColor: '#243044' },
  Mahlkönig: { bg: '#E57373', leadColor: '#6b1212' }
};

export function sliderFromBlock(block: {
  brand: string;
  logo: string;
  text: string;
  products: Array<{ name: string; sku?: string; image?: string; specs: string[] }>;
}): GrinderBrand {
  const theme = THEMES[block.brand] || { bg: '#C8B89A', leadColor: '#3d2a14' };
  const id = block.brand
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
  return {
    id,
    name: block.brand,
    marquee: block.brand.toUpperCase(),
    lead: block.text,
    bg: theme.bg,
    leadColor: theme.leadColor,
    logo: block.logo,
    slides: slidesFromProducts(block.brand, block.text, block.products)
  };
}

const PIETRO_COLORS: GrinderColor[] = [
  { name: 'black', hex: '#0b0b0b', img: img('pietro-negro.webp'), titulo: 'MOLINO MANUAL PIETRO B-MODAL NEGRO', descripcion: 'Molino Manual Vertical para café de origen Italiano. Fresas verticales planas de 58 mm.', sku: 'AAB-211' },
  { name: 'white', hex: '#DDDDDD', img: img('pietro-blanco.webp'), titulo: 'MOLINO MANUAL PIETRO B-MODAL BLANCO', descripcion: 'Versión blanca con igual desempeño y fresas de 58 mm.', sku: 'AAB-209' },
  { name: 'green', hex: '#136D26', img: img('pietro-verde.webp'), titulo: 'MOLINO MANUAL PIETRO B-MODAL VERDE', descripcion: 'Edición verde bosque. Geometría de fresas diseñada para extracción perfecta.', sku: 'AAB-210' }
];

const PIETRO_FICHA: GrinderSpec[] = [
  ['Marca', 'Pietro'],
  ['Modelo', 'B-Modal'],
  ['Material', 'Acero inoxidable y plástico'],
  ['Dimensiones', '20 × 12 × 30 cm'],
  ['Peso', '1.5 kg'],
  ['Capacidad', '30 g de café']
];

const COMANDANTE_COLORS: GrinderColor[] = [
  { name: 'black', hex: '#0b0b0b', img: img('comandante-negro.webp'), titulo: 'MOLINO MANUAL DE COMANDANTE NEGRO', descripcion: 'Molino manual robusto de alta precisión. Hecho en Alemania.', sku: 'AAB-054' },
  { name: 'red', hex: '#e44f4f', img: img('comandante-rojo.webp'), titulo: 'MOLINO MANUAL DE COMANDANTE ROJO', descripcion: 'Juego de fresas ajustables de acero inoxidable extra afiladas.', sku: 'AAB-053' },
  { name: 'cherry', hex: '#f4c48b', img: img('comandante-cherry.webp'), titulo: 'MOLINO MANUAL DE COMANDANTE CHERRY', descripcion: 'Cuerpo de acero con capa de madera pulida. Frasco de 40 g.', sku: 'AAB-052' }
];

const COMANDANTE_FICHA: GrinderSpec[] = [
  ['Marca', 'Comandante'],
  ['Materiales', 'Acero inoxidable, madera y vidrio'],
  ['Capacidad frasco', '40 g'],
  ['Rodamientos', 'Micro bolas de acero inoxidable'],
  ['Origen', 'Alemania']
];

export const GRINDER_BRANDS: GrinderBrand[] = [
  {
    id: 'ceado',
    name: 'Ceado',
    marquee: 'CEADO',
    lead: 'Marca italiana líder en equipos profesionales para café. Precisión e innovación para resaltar el sabor en cada taza.',
    bg: '#DDB07A',
    leadColor: '#6b3b12',
    logo: img('logo-ceado.svg'),
    slides: slidesFromProducts('Ceado', 'Marca italiana líder en equipos profesionales para café. Precisión e innovación para resaltar el sabor en cada taza.', [
      { name: 'E37Z', sku: 'MMO-105', image: img('ceado-e37z.webp'), specs: ['Negro · 110 V', 'Tolva 1.2 kg'] },
      { name: 'E37S', sku: 'MMO-104', image: img('ceado-e37s.webp'), specs: ['Negro · 110 V', 'Tolva 1.6 kg'] },
      { name: 'LEON 800', sku: 'MMO-107', image: img('ceado-leon800.webp'), specs: ['Negro · 110 V', 'Tolva 1.6 kg'] },
      { name: 'LEON 800 RS', sku: 'MMO-108', image: img('ceado-leon800rs.webp'), specs: ['Negro · 110 V', 'Tolva 1.6 kg'] },
      { name: 'LEON 700', sku: 'MMO-106', image: img('ceado-leon700.webp'), specs: ['Negro · 110 V', 'Tolva 1.6 kg'] }
    ])
  },
  {
    id: 'eureka',
    name: 'Eureka',
    marquee: 'EUREKA',
    lead: 'Molinillos profesionales italianos de alta precisión, con rendimiento, durabilidad y diseño ergonómico.',
    bg: '#E07A5F',
    leadColor: '#6b2410',
    logo: img('logo-eureka.webp'),
    slides: slidesFromProducts('Eureka', 'Molinillos profesionales italianos de alta precisión, con rendimiento, durabilidad y diseño ergonómico.', [
      { name: 'ZENITH 65 NEO', sku: 'MMO-095', image: img('eureka-zenith.webp'), specs: ['Negro · 110 V', 'Tolva 1.2 kg'] },
      { name: 'HELIOS 65', sku: 'MMO-096', image: img('eureka-helios.webp'), specs: ['Negro · 110 V', 'Tolva 1.2 kg'] },
      { name: 'ATOM 65', sku: 'MMO-097', image: img('eureka-atom.webp'), specs: ['Negro · 110 V', 'Tolva 1.2 kg'] },
      { name: 'PROMETHEUS', sku: 'MMO-098', image: img('eureka-prometheus.webp'), specs: ['Negro · 127 V', 'Tolva 1.2 kg'] }
    ])
  },
  {
    id: 'pietro',
    name: 'Pietro',
    marquee: 'PIETRO GRINDERS',
    lead: 'Pietro no es simplemente un molinillo de café manual; es un estilo que brinda a los amantes del café la máxima libertad de expresión.',
    bg: '#E3B27A',
    leadColor: '#ac6112',
    logo: img('logo-pietro-white.svg'),
    slides: [
      {
        titulo: 'MOLINO MANUAL PIETRO B-MODAL NEGRO',
        descripcion: 'Molino Manual Vertical para café de origen Italiano. Fresas verticales planas de 58 mm.',
        sku: 'AAB-211',
        img: img('pietro-negro.webp'),
        colores: PIETRO_COLORS,
        ficha: PIETRO_FICHA
      },
      {
        titulo: 'MOLINO MANUAL PIETRO B-MODAL BLANCO',
        descripcion: 'Versión color Blanco con el mismo desempeño profesional.',
        sku: 'AAB-209',
        img: img('pietro-blanco.webp'),
        colores: PIETRO_COLORS,
        ficha: PIETRO_FICHA
      },
      {
        titulo: 'MOLINO MANUAL PIETRO B-MODAL VERDE',
        descripcion: 'Edición verde bosque. Geometría de fresas diseñada para extracción perfecta.',
        sku: 'AAB-210',
        img: img('pietro-verde.webp'),
        colores: PIETRO_COLORS,
        ficha: PIETRO_FICHA
      }
    ]
  },
  {
    id: 'comandante',
    name: 'Comandante',
    marquee: 'COMANDANTE',
    lead: 'COMANDANTE® se especializa en el desarrollo y fabricación de molinillos de café de alto rendimiento.',
    bg: '#8CC03D',
    leadColor: '#3d5203',
    logo: img('logo-comandante.webp'),
    slides: [
      {
        titulo: 'MOLINO MANUAL DE COMANDANTE NEGRO',
        descripcion: 'Molino manual robusto de alta precisión. Hecho en Alemania.',
        sku: 'AAB-054',
        img: img('comandante-negro.webp'),
        colores: COMANDANTE_COLORS,
        ficha: COMANDANTE_FICHA
      },
      {
        titulo: 'MOLINO MANUAL DE COMANDANTE CHERRY',
        descripcion: 'Cuerpo de acero con capa de madera pulida. Frasco de 40 g.',
        sku: 'AAB-052',
        img: img('comandante-cherry.webp'),
        colores: COMANDANTE_COLORS,
        ficha: COMANDANTE_FICHA
      },
      {
        titulo: 'MOLINO MANUAL DE COMANDANTE ROJO',
        descripcion: 'Juego de fresas ajustables de acero inoxidable extra afiladas.',
        sku: 'AAB-053',
        img: img('comandante-rojo.webp'),
        colores: COMANDANTE_COLORS,
        ficha: COMANDANTE_FICHA
      }
    ]
  },
  {
    id: 'fiorenzato',
    name: 'Fiorenzato',
    marquee: 'FIORENZATO',
    lead: 'Preciso, fiable, fácil de usar. Fiorenzato se ha diseñado para simplificar el trabajo de los baristas y obtener resultados perfectos.',
    bg: '#9595F1',
    leadColor: '#0c1d68',
    logo: img('logo-fiorenzato.webp'),
    api: 'https://lista-de-precios.cafeetrusca.com/api/v1/ficha-tecnica/Fiorenzato',
    slides: [
      {
        titulo: 'MOLINO F4E',
        descripcion: 'Preciso, fiable y fácil de usar. Diseñado para simplificar el trabajo del barista.',
        img: img('fiorenzato-f4e.webp'),
        colores: [{ name: 'negro', hex: '#0b0b0b', img: img('fiorenzato-f4e.webp') }],
        ficha: [
          ['Marca', 'Fiorenzato'],
          ['Modelo', 'F4E'],
          ['Origen', 'Italia']
        ]
      },
      {
        titulo: 'MOLINO F4 EVO',
        descripcion: 'Molino profesional Fiorenzato para barra de espresso.',
        img: img('fiorenzato-f4evo.webp'),
        colores: [{ name: 'negro', hex: '#0b0b0b', img: img('fiorenzato-f4evo.webp') }],
        ficha: [
          ['Marca', 'Fiorenzato'],
          ['Modelo', 'F4 EVO'],
          ['Voltaje', '110 V'],
          ['Capacidad tolva', '500 g']
        ]
      }
    ]
  },
  {
    id: 'anfim',
    name: 'Anfim',
    marquee: 'ANFIM',
    lead: 'Diseño funcional y cultura del espresso italiano, para barra profesional y uso doméstico.',
    bg: '#8FA0B5',
    leadColor: '#243044',
    logo: img('logo-anfim.webp'),
    slides: slidesFromProducts('Anfim', 'Diseño funcional y cultura del espresso italiano, para barra profesional y uso doméstico.', [
      { name: 'Caimano On Demand', image: img('anfim-caimano.webp'), specs: ['Negro · 110 V', 'Tolva 2000 g'] }
    ])
  },
  {
    id: 'mahlkonig',
    name: 'Mahlkönig',
    marquee: 'MAHLKÖNIG',
    lead: 'Referente mundial en molienda premium. La elección de baristas en todo el mundo.',
    bg: '#E57373',
    leadColor: '#6b1212',
    logo: img('logo-mahlkonig.webp'),
    slides: slidesFromProducts('Mahlkönig', 'Referente mundial en molienda premium. La elección de baristas en todo el mundo.', [
      { name: 'E65S', image: img('mahlkonig-e65s.webp'), specs: ['Molino profesional Mahlkönig'] },
      { name: 'E65S GbW', image: img('mahlkonig-e65s-gbw.webp'), specs: ['Negro/blanco · 110 V', 'Tolva 1.2 kg'] },
      { name: 'EK43', image: img('mahlkonig-ek43.webp'), specs: ['Negro · 110 V', 'Tolva 1.5 kg'] },
      { name: 'EK43S', image: img('mahlkonig-ek43s.webp'), specs: ['Molino profesional Mahlkönig'] }
    ])
  }
];

function guessHexFromColorName(n = ''): string {
  const s = n.toLowerCase();
  if (s.includes('negro')) return '#0b0b0b';
  if (s.includes('blanco')) return '#ffffff';
  if (s.includes('gris')) return '#c8c8cf';
  if (s.includes('nardo')) return '#6d7179';
  if (s.includes('aperlado')) return '#efefef';
  if (s.includes('rojo')) return '#e3342f';
  return '#ffffff';
}

export function mapFiorenzatoApi(data: any[]): GrinderSlide[] {
  if (!Array.isArray(data) || !data.length) return [];
  return data.map((m) => {
    const firstPhoto =
      (m.Fotos && m.Fotos[0]) ||
      (m.ColoresDisponibles && m.ColoresDisponibles[0]?.Fotos?.[0]) ||
      img('fiorenzato-f4e.webp');
    const colores: GrinderColor[] = (m.ColoresDisponibles || []).map((c: any) => ({
      name: c.Color || 'color',
      hex: guessHexFromColorName(c.Color),
      img: (c.Fotos && c.Fotos[0]) || firstPhoto
    }));
    const ficha = (
      [
        ['Marca', m.Marca?.Nombre || 'Fiorenzato'],
        ['Modelo', m.Modelo],
        ['Origen', m.PaisOrigen],
        ['Ajuste de molido', m.AjusteMolido],
        ['Regulación de dosis', m.RegulacionDosis],
        ['Tipo de muelas', m.TipoMuelas],
        ['Diámetro muelas', m.DiametroMuelasMM ? m.DiametroMuelasMM + ' mm' : ''],
        ['Potencia', m.PotenciaVatios ? m.PotenciaVatios + ' W' : ''],
        ['Capacidad tolva', m.CapacidadTolvaKg ? m.CapacidadTolvaKg + ' kg' : ''],
        ['Dimensiones', m.DimensionesMM || ''],
        ['Peso', m.PesoNetoKg ? m.PesoNetoKg + ' kg' : '']
      ] as GrinderSpec[]
    ).filter(([, v]) => v && String(v).trim() !== '');
    return {
      titulo: `MOLINO ${m.Modelo || ''}`.trim().toUpperCase(),
      descripcion: m.Descripcion || m.Marca?.Descripcion || '',
      img: firstPhoto,
      sku: m.CodigoSAP,
      colores: colores.length ? colores : [{ name: 'negro', hex: '#0b0b0b', img: firstPhoto }],
      ficha
    };
  });
}

export function fiorenzatoLeadFromApi(data: any[]): string | null {
  const desc = data?.[0]?.Marca?.Descripcion;
  return desc ? String(desc) : null;
}
