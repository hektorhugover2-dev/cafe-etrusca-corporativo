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
  id: 'pietro' | 'comandante' | 'fiorenzato';
  name: string;
  marquee: string;
  lead: string;
  bg: string;
  leadColor: string;
  api?: string;
  slides: GrinderSlide[];
}

const img = (file: string) => `/assets/images/maquinas/${file}`;

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
    id: 'pietro',
    name: 'Pietro',
    marquee: 'PIETRO GRINDERS',
    lead: 'Pietro no es simplemente un molinillo de café manual; es un estilo que brinda a los amantes del café la máxima libertad de expresión.',
    bg: '#E3B27A',
    leadColor: '#ac6112',
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
