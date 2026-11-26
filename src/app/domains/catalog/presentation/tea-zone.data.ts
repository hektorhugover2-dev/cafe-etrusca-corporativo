/**
 * Página de marca Tea Zone (brief SEO 2026-11-26): /insumos-para-cafeterias/toppings/tea-zone/.
 * Datos de producto de la lista de precios (intranet, 26-nov-2026) SIN precios, promos ni existencias.
 * Misma plantilla que Hollander / Cappuccine / Don Gustavo (powder-brand-page).
 * LOCAL: las fotos viven en public/assets/images/insumos/tea-zone/ hasta que Héctor apruebe subirlas a R2.
 *
 * PENDIENTES DE HÉCTOR (no confirmados; esta página los muestra de forma provisional):
 *  1. PESO de las jaleas (4 kg en la API vs 3.8 kg en teazone.mx): cambiar SOLO TZ_NET_G (abajo); la presentación,
 *     el rendimiento y las tablas se recalculan solos.
 *  2. Dosis de concentrados, polvo de taro y endulzantes: «Según preparación» (sin dato en API ni etiqueta MX).
 *  3. Alérgenos / vegano que no cuadran (TZ_CONSULT): se muestra «Consulta la etiqueta» y no se publica vegano/vegetariano.
 *  4. Líneas opcionales (concentrados, taro, endulzantes, accesorios): quitar sus entradas de TZ_LINES para sacarlas de la página.
 *  5. 30 g por bebida (jaleas, perlas explosivas, tapioca): catálogo de Etrusca / teazone.mx; ICT-027 (110 porciones de 30 g) es de la etiqueta MX.
 */
import type { PbBrand, PbLine, PbLink, PbProduct } from './powder-brands.data';

const TZ_PATH = '/insumos-para-cafeterias/toppings/tea-zone';
const TOPPINGS = '/insumos-para-cafeterias/toppings';
const IMG = '/assets/images/insumos/tea-zone/';
const DATE = '2026-11-26';
const BRAND = 'Tea Zone';

/** Dosis por bebida (g) de jaleas, perlas explosivas y tapioca. Fuente: catálogo de Etrusca (toppings) y teazone.mx. */
export const TZ_DOSE_G = 30;

/**
 * CONTENIDO NETO por envase, tomado del nombre en la lista de precios (API, 26-nov-2026). g para sólidos, ml para líquidos.
 * ÚNICO lugar para corregir el peso de las jaleas (pendiente: 4 kg de la API vs 3.8 kg de teazone.mx).
 */
export const TZ_NET_G: Record<string, number> = {
  'ICT-009': 2720,
  'ICT-021': 4000, 'ICT-022': 4000, 'ICT-024': 4000, 'ICT-057': 3800, 'ICT-026': 3850, 'ICT-027': 3300,
  'ICT-041': 3200, 'ICT-046': 3200, 'ICT-048': 3200,
  'IBP-148': 1000
};
export const TZ_NET_ML: Record<string, number> = {
  'IPC-042': 1900, 'IPC-044': 1900, 'IPC-045': 1900, 'IPC-047': 1900, 'IPC-049': 1900, 'IPC-050': 1900,
  'IPC-051': 1900, 'IPC-052': 1900, 'IPC-053': 1900, 'IPC-054': 1900, 'IPC-056': 1900,
  'IPC-073': 3700, 'IPC-115': 2170, 'IPC-116': 3600
};

/** Claves cuyos alérgenos/vegano no cuadran con los ingredientes (brief): solo «Consulta la etiqueta», sin vegano/vegetariano ni ingredientes. */
export const TZ_CONSULT = new Set(['IPC-042', 'ICT-026', 'ICT-027', 'ICT-041', 'ICT-046', 'ICT-048', 'IBP-148']);
/** Claves sin rendimiento publicado (Héctor: «no calcular» ICT-026). */
const TZ_NO_YIELD = new Set(['ICT-026']);

type Kind = 'tapioca' | 'jalea' | 'explosiva' | 'concentrado' | 'taro' | 'endulzante' | 'accesorio';

interface Spec {
  code: string;
  apiName: string;
  kind: Kind;
  /** Nombre en la página. */
  name: string;
  /** Sabor para armar descripción (minúsculas). */
  flavor?: string;
  gtin: string | null;
  slug: string;
  ingredients?: string;
  /** Declaraciones del campo «alergenos» de la API cuando es «SI (…)». */
  decl?: string[];
  /** Dato vegetariano y vegano (API = SÍ / SÍ). */
  diet?: boolean;
  /** API con alérgenos = NO. */
  noDecl?: boolean;
  presentation?: string;
}

const kg = (g: number) => `${+(g / 1000).toFixed(3)} kg`;
const lt = (ml: number) => `${+(ml / 1000).toFixed(3)} L`;
const n0 = (n: number) => n.toLocaleString('en-US');
const list = (a: string[]) => (a.length <= 1 ? a.join('') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`);

const SPECS: Spec[] = [
  { code: 'ICT-009', apiName: 'TEA ZONE PERLAS DE TAPIOCA BOLSA 2.720 kg', kind: 'tapioca', name: 'Perlas de tapioca', gtin: '877183000468', slug: 'perlas-de-tapioca-bolsa-2720-g', diet: true, noDecl: true,
    ingredients: 'Almidón, agua, color caramelo clase IV, sorbato de potasio, goma xantana, CMC, polifosfato de sodio, saborizante natural.' },
  { code: 'ICT-021', apiName: 'TEA ZONE JELLY SABOR LICHI BOTE 4 kg', kind: 'jalea', name: 'Trozos de jalea de coco y lichi', flavor: 'lichi', gtin: '897116000273', slug: 'jalea-de-coco-lichi-bote-4-kg', diet: true, noDecl: true,
    ingredients: 'Coco, azúcares añadidos (maltosa, jarabe de alta fructosa y azúcar de caña), ácido málico, citrato de sodio, goma xantana, sorbato de potasio y saborizante artificial.' },
  { code: 'ICT-022', apiName: 'TEA ZONE JELLY SABOR MANZANA VERDE BOTE 4kg', kind: 'jalea', name: 'Trozos de jalea de coco y manzana verde', flavor: 'manzana verde', gtin: '815812011546', slug: 'jalea-de-coco-manzana-verde-bote-4-kg', diet: true, decl: ['tartrazina'],
    ingredients: 'Coco, azúcares añadidos (maltosa, jarabe de alta fructosa y azúcar de caña), ácido málico, citrato de sodio, goma xantana, sorbato de potasio, saborizante artificial, amarillo 5 (tartrazina) y azul 1. Contiene tartrazina.' },
  { code: 'ICT-057', apiName: 'TEA ZONE JELLY SABOR MANZANA VERDE BOTE 3800g', kind: 'jalea', name: 'Trozos de jalea de coco y manzana verde', flavor: 'manzana verde', gtin: null, slug: 'jalea-de-coco-manzana-verde-bote-3800-g', diet: true, decl: ['tartrazina'],
    ingredients: 'Coco, azúcares añadidos (maltosa, jarabe de alta fructosa y azúcar de caña), ácido málico, citrato de sodio, goma xantana, sorbato de potasio, saborizante artificial, amarillo 5 (tartrazina) y azul 1. Contiene tartrazina.' },
  { code: 'ICT-024', apiName: 'TEA ZONE JELLY SABOR MANGO BOTE 4 kg', kind: 'jalea', name: 'Trozos de jalea de coco y mango', flavor: 'mango', gtin: '815812011706', slug: 'jalea-de-coco-mango-bote-4-kg', diet: true, decl: ['tartrazina'],
    ingredients: 'Coco, azúcares añadidos (maltosa, jarabe de alta fructosa y azúcar de caña), ácido málico, citrato de sodio, goma xantana, sorbato de potasio, saborizante artificial y amarillo 5 (tartrazina). Contiene tartrazina.' },
  { code: 'ICT-026', apiName: 'TEA ZONE JELLY SABOR MIX YOGO TROPICAL BOTE 3.85kg', kind: 'jalea', name: 'Trozos de jalea de coco y frutas tropicales (mix yogo)', flavor: 'frutas tropicales (mix yogo)', gtin: '897116000259', slug: 'jalea-de-coco-mix-yogo-tropical-bote-3850-g' },
  { code: 'ICT-027', apiName: 'TEA ZONE JELLY SABOR CAFÉ BOTE 3.3kg', kind: 'jalea', name: 'Trozos de jalea de coco y café', flavor: 'café', gtin: '897116000297', slug: 'jalea-de-coco-cafe-bote-3300-g' },
  { code: 'ICT-041', apiName: 'TEA ZONE PERLAS EXPLOSIVAS SABOR MANGO BOTE 3.2 kg', kind: 'explosiva', name: 'Perlas explosivas de mango', flavor: 'mango', gtin: '815812010945', slug: 'perlas-explosivas-mango-bote-3200-g' },
  { code: 'ICT-046', apiName: 'TEA ZONE PERLAS EXPLOSIVAS SABOR MORA AZUL BOTE 3.2 kg', kind: 'explosiva', name: 'Perlas explosivas de mora azul', flavor: 'mora azul', gtin: '815812014228', slug: 'perlas-explosivas-mora-azul-bote-3200-g' },
  { code: 'ICT-048', apiName: 'TEA ZONE PERLAS EXPLOSIVAS SABOR MANZANA VERDE BOTE 3.2 kg', kind: 'explosiva', name: 'Perlas explosivas de manzana verde', flavor: 'manzana verde', gtin: '815812014301', slug: 'perlas-explosivas-manzana-verde-bote-3200-g' },
  { code: 'IPC-042', apiName: 'TEA ZONE CONCENTRADO SABOR MANZANA VERDE GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de manzana verde', flavor: 'manzana verde', gtin: '897116000457', slug: 'concentrado-manzana-verde-garrafa-1900-ml' },
  { code: 'IPC-044', apiName: 'TEA ZONE CONCENTRADO SABOR LICHI GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de lichi', flavor: 'lichi', gtin: '897116000501', slug: 'concentrado-lichi-garrafa-1900-ml', diet: true, decl: ['edulcorantes'],
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa, jugo de lichi, azúcar de caña), goma xantana, saborizante artificial, ácido málico, acesulfame K (200 mg/100 g), citrato de sodio y sorbato de potasio.' },
  { code: 'IPC-045', apiName: 'TEA ZONE CONCENTRADO SABOR MARACUYÁ GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de maracuyá', flavor: 'maracuyá', gtin: '897116000549', slug: 'concentrado-maracuya-garrafa-1900-ml', diet: true, decl: ['tartrazina'],
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa, jugo de fruta de la pasión, azúcar de caña), goma xantana, ácido málico, saborizante artificial, citrato de sodio, ácido cítrico, sorbato de potasio, amarillo 5 (tartrazina) y amarillo 6. Contiene tartrazina.' },
  { code: 'IPC-047', apiName: 'TEA ZONE CONCENTRADO SABOR LIMÓN GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de limón', flavor: 'limón', gtin: '897116000495', slug: 'concentrado-limon-garrafa-1900-ml', diet: true, noDecl: true,
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa y jugo de limón), goma xantana, ácido málico, saborizante artificial, ácido cítrico y sorbato de potasio.' },
  { code: 'IPC-049', apiName: 'TEA ZONE CONCENTRADO SABOR FRAMBUESA GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de frambuesa', flavor: 'frambuesa', gtin: '897116000600', slug: 'concentrado-frambuesa-garrafa-1900-ml', diet: true, decl: ['edulcorantes', 'rojo 40'],
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa y jugo de frambuesa), ácido cítrico, saborizante artificial, goma xantana, sorbato de potasio, acesulfame K (27 mg/100 g), rojo 40 y sucralosa (11.4 mg/100 g). Contiene rojo 40.' },
  { code: 'IPC-050', apiName: 'TEA ZONE CONCENTRADO SABOR SANDÍA GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de sandía', flavor: 'sandía', gtin: '897116000631', slug: 'concentrado-sandia-garrafa-1900-ml', diet: true, decl: ['edulcorantes', 'rojo 40', 'tartrazina'],
    ingredients: 'Azúcares añadidos (azúcar de caña), saborizante artificial, agente enturbiante (agua destilada, almidón modificado, glicerina, sorbitol (2 mg/100 g), propilenglicol, ácido cítrico anhidro), acesulfame K (27 mg/100 g), sucralosa (11.4 mg/100 g), rojo 40, amarillo 5 (tartrazina) y sorbato de potasio. Contiene tartrazina y rojo 40. Contiene sorbitol, el consumo excesivo de este edulcorante puede causar efectos laxantes.' },
  { code: 'IPC-051', apiName: 'TEA ZONE CONCENTRADO SABOR KIWI GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de kiwi', flavor: 'kiwi', gtin: '897116000488', slug: 'concentrado-kiwi-garrafa-1900-ml', diet: true, decl: ['tartrazina'],
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa, jugo de kiwi, azúcar de caña), goma xantana, saborizante artificial, ácido cítrico, citrato de sodio, sorbato de potasio, amarillo 5 (tartrazina) y azul 1. Contiene tartrazina.' },
  { code: 'IPC-052', apiName: 'TEA ZONE CONCENTRADO SABOR MANGO GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de mango', flavor: 'mango', gtin: '897116000518', slug: 'concentrado-mango-garrafa-1900-ml', diet: true, decl: ['edulcorantes', 'tartrazina'],
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa, jugo de mango, azúcar de caña), ácido málico, goma xantana, saborizante artificial, acesulfame K (200 mg/100 g), sorbato de potasio y amarillo 5 (tartrazina). Contiene tartrazina.' },
  { code: 'IPC-053', apiName: 'TEA ZONE CONCENTRADO SABOR FRESA GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de fresa', flavor: 'fresa', gtin: '897116000624', slug: 'concentrado-fresa-garrafa-1900-ml', diet: true, decl: ['rojo 40'],
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa, jugo de fresa, azúcar de caña), goma xantana, saborizante artificial, ácido málico, sorbato de potasio, citrato de sodio, ácido cítrico, rojo 3 y rojo 40. Contiene rojo 40.' },
  { code: 'IPC-054', apiName: 'TEA ZONE CONCENTRADO SABOR PIÑA GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de piña', flavor: 'piña', gtin: '897116000570', slug: 'concentrado-pina-garrafa-1900-ml', diet: true, decl: ['tartrazina'],
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa, jugo de piña y azúcar de caña), goma xantana, ácido cítrico, saborizante artificial, citrato de sodio, sorbato de potasio, amarillo 5 (tartrazina) y amarillo 6. Contiene tartrazina.' },
  { code: 'IPC-056', apiName: 'TEA ZONE CONCENTRADO DE MORA AZUL GARRAFA 1.9 l', kind: 'concentrado', name: 'Concentrado de mora azul', flavor: 'mora azul', gtin: '814756023646', slug: 'concentrado-mora-azul-garrafa-1900-ml', diet: true, decl: ['edulcorantes', 'rojo 40'],
    ingredients: 'Azúcares añadidos (jarabe de alta fructosa), agua, ácido cítrico, saborizante artificial, CMC, agente enturbiador (agua, almidón octenil succinato sódico, ésteres de glicerina de ácidos grasos, sorbitol (19.5 mg/100 g), propilenglicol, ácido cítrico), sorbato de potasio, goma xantana, rojo 40, acesulfame K (8 mg/100 g), sucralosa (4 mg/100 g) y azul 1. Contiene rojo 40. Contiene sorbitol, el consumo excesivo de este edulcorante puede causar efectos laxantes.' },
  { code: 'IBP-148', apiName: 'TEA ZONE BASE EN POLVO SABOR TARO BOLSA 1kg', kind: 'taro', name: 'Base en polvo sabor taro', flavor: 'taro', gtin: '897116000891', slug: 'base-en-polvo-taro-bolsa-1000-g' },
  { code: 'IPC-073', apiName: 'TEA ZONE CONCENTRADO SABOR AZUCAR MORENA GARRAFA 3.7l', kind: 'endulzante', name: 'Concentrado de azúcar morena', gtin: '814756021703', slug: 'concentrado-azucar-morena-garrafa-3700-ml' },
  { code: 'IPC-115', apiName: 'TEA ZONE CONCENTRADO MIEL DE LONGAN GARRAFA 2.17l', kind: 'endulzante', name: 'Concentrado de miel de longan', gtin: '877183005531', slug: 'concentrado-miel-de-longan-garrafa-2170-ml' },
  { code: 'IPC-116', apiName: 'TEA ZONE FRUCTOSA GARRAFA 3.6l', kind: 'endulzante', name: 'Fructosa', gtin: '814756024803', slug: 'fructosa-garrafa-3600-ml' },
  { code: 'AAC-130', apiName: 'TEA ZONE CUCHARA DE METAL PARA PERLAS', kind: 'accesorio', name: 'Cuchara de metal para perlas', gtin: '7503049358703', slug: 'cuchara-de-metal-para-perlas', presentation: 'Pieza' },
  { code: 'AAC-258', apiName: 'TEA ZONE POLIETILENO CLARO EN ROLLO 98mm', kind: 'accesorio', name: 'Polietileno claro en rollo de 98 mm (para sellar vasos)', gtin: null, slug: 'polietileno-claro-rollo-98-mm', presentation: 'Rollo de 98 mm' },
  { code: 'AAC-259', apiName: 'TEA ZONE POLIETILENO IMPRESO EN ROLLO 98mm', kind: 'accesorio', name: 'Polietileno impreso en rollo de 98 mm (para sellar vasos)', gtin: null, slug: 'polietileno-impreso-rollo-98-mm', presentation: 'Rollo de 98 mm' }
];

const LINE_OF: Record<Kind, string> = {
  tapioca: 'perlas-de-tapioca', jalea: 'trozos-de-jalea', explosiva: 'perlas-explosivas', concentrado: 'concentrados',
  taro: 'polvo-para-frappe-taro', endulzante: 'endulzantes', accesorio: 'accesorios-tea-zone'
};

function presentationOf(s: Spec): string {
  if (s.presentation) return s.presentation;
  const g = TZ_NET_G[s.code];
  const ml = TZ_NET_ML[s.code];
  const noun = s.kind === 'tapioca' || s.kind === 'taro' ? 'Bolsa' : s.kind === 'jalea' || s.kind === 'explosiva' ? 'Bote' : 'Garrafa';
  return g ? `${noun} ${kg(g)}` : `${noun} ${lt(ml)}`;
}

/** Contenido neto en la unidad del producto y en g/ml (para la tabla de presentaciones). */
function contentOf(s: Spec): string {
  const g = TZ_NET_G[s.code];
  const ml = TZ_NET_ML[s.code];
  if (g) return `${kg(g)} (${n0(g)} g)`;
  if (ml) return `${lt(ml)} (${n0(ml)} ml)`;
  return '';
}

/** Rendimiento y dosis solo donde hay dato: tapioca, jaleas y perlas explosivas (30 g por bebida). */
function yieldOf(s: Spec): { dose?: string; yield?: string } {
  if (!['tapioca', 'jalea', 'explosiva'].includes(s.kind) || TZ_NO_YIELD.has(s.code)) return {};
  const n = Math.floor(TZ_NET_G[s.code] / TZ_DOSE_G);
  const unit = s.kind === 'tapioca' ? 'bolsa' : 'bote';
  if (s.code === 'ICT-027') return { dose: `Porción de ${TZ_DOSE_G} g`, yield: `aprox. ${n} porciones de ${TZ_DOSE_G} g por ${unit}` };
  return { dose: `${TZ_DOSE_G} g por bebida`, yield: `${TZ_DOSE_G} g por bebida (aprox. ${n} bebidas por ${unit})` };
}

function descriptionOf(s: Spec): string {
  switch (s.kind) {
    case 'tapioca': return 'Perlas de tapioca para bubble tea. Se cocinan antes de servir.';
    case 'jalea': return `Trozos de jalea de coco con sabor a ${s.flavor}, listos para usar en bebidas frías y postres.`;
    case 'explosiva': return `Perlas rellenas de líquido con sabor a ${s.flavor}, listas para usar en bubble tea y postres.`;
    case 'concentrado': return `Concentrado líquido sabor ${s.flavor} para slushes, smoothies, aguas de sabores y tés saborizados.`;
    case 'taro': return 'Base en polvo sabor taro para bebidas frías y frappés.';
    case 'endulzante': return s.code === 'IPC-116' ? 'Fructosa líquida para endulzar bebidas, tapioca y postres.' : `${s.name}: endulzante líquido para bebidas, tapioca y postres.`;
    default: return s.code === 'AAC-130' ? 'Cuchara de metal para servir perlas.' : `${s.name.split(' (')[0]} para sellar vasos.`;
  }
}

function allergensOf(s: Spec): string | null {
  if (TZ_CONSULT.has(s.code)) return 'Consulta la etiqueta.';
  if (s.decl) return `Declaraciones de la etiqueta: contiene ${list(s.decl)}.`;
  if (s.noDecl) return 'La ficha no declara alérgenos.';
  return null;
}

function toProduct(s: Spec): PbProduct {
  const consult = TZ_CONSULT.has(s.code);
  const pres = presentationOf(s);
  const y = yieldOf(s);
  const desc = descriptionOf(s);
  const photo = `${IMG}tea-zone-${s.slug}-${s.code.toLowerCase()}-${DATE}.webp`;
  return {
    code: s.code,
    apiName: s.apiName,
    name: s.name,
    official: null,
    line: LINE_OF[s.kind],
    description: desc,
    presentation: pres,
    ingredients: consult ? null : s.ingredients ?? null,
    allergens: allergensOf(s),
    gtin: s.gtin,
    photo,
    photoAlt: `Tea Zone ${s.name}, ${pres.charAt(0).toLowerCase()}${pres.slice(1)}`,
    ldName: `Tea Zone ${s.name}`,
    ldDescription: `${desc} Presentación: ${pres.charAt(0).toLowerCase()}${pres.slice(1)}.`,
    ...(y.yield ? { yield: y.yield, dose: y.dose } : {}),
    ...(s.kind === 'accesorio' ? { hideYield: true } : {}),
    ...(s.diet && !consult ? { vegetarian: true, vegan: true } : {})
  };
}

export const TEA_ZONE_PRODUCTS: PbProduct[] = SPECS.map(toProduct);
const prod = (code: string) => TEA_ZONE_PRODUCTS.find((p) => p.code === code)!;

/** Texto de rango para tarjetas de línea (calculado, no a mano). */
function range(vals: number[], fmt: (n: number) => string, joiner = ' a '): string {
  const u = [...new Set(vals)].sort((a, b) => a - b);
  return u.length === 1 ? fmt(u[0]) : `${fmt(u[0])}${joiner}${fmt(u[u.length - 1])}`;
}
const jalG = SPECS.filter((s) => s.kind === 'jalea').map((s) => TZ_NET_G[s.code]);
const jalYield = SPECS.filter((s) => s.kind === 'jalea' && !TZ_NO_YIELD.has(s.code)).map((s) => Math.floor(TZ_NET_G[s.code] / TZ_DOSE_G));
const endMl = SPECS.filter((s) => s.kind === 'endulzante').map((s) => TZ_NET_ML[s.code]);

/**
 * LÍNEAS. Para sacar una línea opcional de la página (concentrados, taro, endulzantes, accesorios) basta con borrar su entrada aquí:
 * los productos de esa línea dejan de mostrarse y de entrar al JSON-LD.
 */
export const TZ_LINES: PbLine[] = [
  { anchor: 'perlas-de-tapioca', name: 'Tea Zone', sub: 'PERLAS DE TAPIOCA', tone: 'coral', cover: 'ICT-009', noModal: true,
    description: 'Perlas de tapioca para bubble tea; se cocinan antes de servir. Bolsa de 2.72 kg.',
    presentationLabel: kg(TZ_NET_G['ICT-009']), yieldLabel: `Aprox. ${Math.floor(TZ_NET_G['ICT-009'] / TZ_DOSE_G)} bebidas por bolsa`,
    moreLink: { t: 'Tapioca para bubble tea', route: TOPPINGS } },
  { anchor: 'trozos-de-jalea', name: 'Tea Zone', sub: 'TROZOS DE JALEA', tone: 'yellow', cover: 'ICT-024',
    description: 'Trozos de jalea de coco con sabor a fruta o café, listos para usar en té con leche, té de frutas, frappés, smoothies y postres fríos.',
    presentationLabel: range(jalG, kg), yieldLabel: `Aprox. ${range(jalYield, String)} bebidas por bote` },
  { anchor: 'perlas-explosivas', name: 'Tea Zone', sub: 'PERLAS EXPLOSIVAS', tone: 'lime', cover: 'ICT-046',
    description: 'Perlas rellenas de líquido con sabor a fruta, listas para usar, para bubble tea, sodas, frappés y postres.',
    presentationLabel: kg(TZ_NET_G['ICT-041']), yieldLabel: `Aprox. ${Math.floor(TZ_NET_G['ICT-041'] / TZ_DOSE_G)} bebidas por bote` },
  { anchor: 'concentrados', name: 'Tea Zone', sub: 'CONCENTRADOS', tone: 'cyan', cover: 'IPC-050',
    description: 'Concentrados líquidos de fruta para slushes, smoothies, aguas de sabores, tés saborizados, frozen yogurt, raspados y cocteles (usos que indica la marca).',
    presentationLabel: lt(1900) },
  { anchor: 'polvo-para-frappe-taro', name: 'Tea Zone', sub: 'POLVO PARA FRAPPÉ: TARO', tone: 'coral', cover: 'IBP-148', noModal: true,
    description: 'Base en polvo sabor taro, en bolsa de 1 kg, para bebidas frías y frappés.',
    presentationLabel: kg(TZ_NET_G['IBP-148']) },
  { anchor: 'endulzantes', name: 'Tea Zone', sub: 'ENDULZANTES', tone: 'yellow', cover: 'IPC-115', noModal: true,
    description: 'Endulzantes líquidos para bebidas, tapioca y postres: azúcar morena, miel de longan y fructosa.',
    presentationLabel: range(endMl, lt) },
  { anchor: 'accesorios-tea-zone', name: 'Tea Zone', sub: 'ACCESORIOS', tone: 'lime', cover: 'AAC-130', noModal: true,
    description: 'Cuchara de metal para perlas y polietileno en rollo de 98 mm para sellar vasos.',
    presentationLabel: 'Pieza y rollo de 98 mm', yieldLabel: '',
    moreLink: { t: 'Ver accesorios para cafetería', route: '/accesorios-para-poner-una-cafeteria' } }
];

const lineName = (anchor: string) => TZ_LINES.find((l) => l.anchor === anchor)?.sub ?? '';
const cap = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

/** Productos visibles = los de las líneas que sigan en TZ_LINES. */
const SHOWN = TEA_ZONE_PRODUCTS.filter((p) => TZ_LINES.some((l) => l.anchor === p.line));

/** Tabla «Presentaciones»: una fila por línea y presentación (g/ml entre paréntesis). */
function presentationRows() {
  const rows: { line: string; presentation: string; content: string; codes: string }[] = [];
  for (const p of SHOWN) {
    const s = SPECS.find((x) => x.code === p.code)!;
    const line = cap(lineName(p.line));
    const hit = rows.find((r) => r.line === line && r.presentation === p.presentation);
    if (hit) hit.codes += `, ${p.code}`;
    else rows.push({ line, presentation: p.presentation, content: contentOf(s) || '—', codes: p.code });
  }
  return rows;
}

/** Tabla «Cuánto usar por bebida»: dosis y rendimiento solo donde hay dato; el resto «Según preparación». */
function doseRows() {
  const rows: { line: string; presentation: string; dose: string; yield: string }[] = [];
  const MERGE = new Set(['concentrados', 'polvo-para-frappe-taro', 'endulzantes']);
  for (const p of SHOWN.filter((x) => x.line !== 'accesorios-tea-zone')) {
    const line = cap(lineName(p.line));
    const dose = p.dose ?? 'Según preparación';
    const yld = p.yield ? p.yield.replace(/^.*?\(/, '').replace(/\)$/, '').replace(/^aprox\./, 'Aprox.').replace(/^./, (c) => c.toUpperCase()) : 'Según preparación';
    const flavorNote = p.code === 'ICT-027' ? ' (café)' : p.code === 'ICT-026' ? ' (mix yogo tropical)' : '';
    const pres = p.presentation + flavorNote;
    if (MERGE.has(p.line)) {
      const hit = rows.find((r) => r.line === line);
      if (hit) { if (!hit.presentation.split(' · ').includes(pres)) hit.presentation += ` · ${pres}`; }
      else rows.push({ line, presentation: pres, dose, yield: yld });
      continue;
    }
    if (!rows.some((r) => r.line === line && r.presentation === pres && r.dose === dose && r.yield === yld)) rows.push({ line, presentation: pres, dose, yield: yld });
  }
  return rows;
}

const kgBote = (code: string) => kg(TZ_NET_G[code]);
const conc = SPECS.filter((s) => s.kind === 'concentrado').map((s) => s.flavor!);
const jalCount = SPECS.filter((s) => s.kind === 'jalea').length;

const ALSO_TZ: PbLink[] = [
  { t: 'Toppings para bubble tea', route: TOPPINGS },
  { t: 'ChillOut (bases en polvo)', route: '/insumos-para-cafeterias/bases-en-polvo/chillout' },
  { t: 'Accesorios para cafetería', route: '/accesorios-para-poner-una-cafeteria' }
];

export const TEA_ZONE_BRAND: PbBrand = {
  id: 'tea-zone',
  brandName: BRAND,
  path: TZ_PATH,
  title: 'Tea Zone para bubble tea: jaleas, perlas y jarabes | Etrusca',
  description: 'Tea Zone en Café Etrusca: perlas de tapioca, jaleas, perlas explosivas, concentrados de fruta, taro y endulzantes para bubble tea y bebidas frías.',
  keywords: 'tea zone, tea zone méxico, tapioca tea zone, perlas explosivas tea zone, jalea tea zone, concentrado tea zone, polvo de taro tea zone, miel de longan, fructosa tea zone, cuchara para perlas, bubble tea, Café Etrusca',
  datePublished: DATE,
  logo: { src: 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/toppings/logo-teazone.webp', alt: 'Tea Zone', width: 239, height: 35 },
  h1Main: 'Tea Zone ',
  h1Sub: 'para bubble tea y cafetería',
  leadAccent: 'Perlas, jaleas y concentrados',
  leadRest: ' para bubble tea y bebidas frías',
  body:
    'Tea Zone® es una marca estadounidense de insumos para bubble tea, smoothies y bebidas de especialidad, respaldada por Karat® by Lollicup™. ' +
    `En Café Etrusca hay ${SHOWN.length} productos Tea Zone: perlas de tapioca, trozos de jalea, perlas explosivas, concentrados de fruta, polvo de taro, endulzantes y accesorios para servir.`,
  facts: [{ n: String(SHOWN.length), label: 'productos' }, { n: String(TZ_LINES.length), label: 'líneas' }, { n: String(conc.length), label: 'sabores de concentrado' }],
  single: false,
  linesTitle: 'Productos Tea Zone',
  lines: TZ_LINES,
  products: SHOWN,
  heroCodes: ['ICT-024', 'ICT-046', 'ICT-027'],
  presentationTitle: 'Presentaciones de Tea Zone',
  presentationText: 'Cada línea de Tea Zone viene en su propia presentación. Aquí ves el contenido neto de cada una, en kilogramos o litros y en gramos o mililitros.',
  presentationChips: [],
  presentationPhoto: 'ICT-048',
  presentationRows: presentationRows(),
  prepTitle: 'Cómo se usan',
  prepIntro:
    'Las jaleas y las perlas explosivas vienen listas para usar; la tapioca se cocina antes de servir. Para concentrados, polvo de taro y endulzantes la dosis es según preparación: un asesor te ayuda a calcularla para el tamaño de tu vaso.',
  prepCards: [
    { h: 'Perlas de tapioca', p: 'Se cocinan antes de servir: según la marca, se hierven 30 minutos, se dejan reposar tapadas otros 30 minutos y se enjuagan. La proporción de agua está en la etiqueta del producto.' },
    { h: 'Jaleas y perlas explosivas', p: 'Vienen listas para usar: se agregan directo a la bebida o al postre. La marca recomienda popote de 1 cm de diámetro.' },
    { h: 'Concentrados, taro y endulzantes', p: 'Dosis según preparación. Pregunta a un asesor cuánto usar para tu receta y el tamaño de tu vaso.' }
  ],
  doseTable: {
    title: 'Cuánto usar por bebida',
    intro:
      `Para jaleas, perlas explosivas y tapioca tomamos ${TZ_DOSE_G} g por bebida (catálogo de Café Etrusca; la etiqueta MX de la jalea de café indica porciones de ${TZ_DOSE_G} g). ` +
      'El rendimiento es aproximado y sale de dividir el contenido neto entre la dosis. Para concentrados, polvo de taro y endulzantes la dosis es según preparación.',
    head: ['Línea', 'Presentación', 'Dosis', 'Rendimiento'],
    rows: doseRows(),
    note: 'Sin dato publicado: se muestra «Según preparación».'
  },
  storage: 'Conservar en un lugar fresco y seco, evitar la luz directa del sol.',
  ideasText:
    'Receta del sitio con Tea Zone: Sandía on fire, un granizado de 480 ml con 40 ml de Tea Zone sandía, ChillOut fruit chamoy, base cristal y jelly heart (esa es la dosis de la receta, no una regla general). También tenemos una guía para armar tu menú de bubble tea.',
  ideasLinks: [
    { t: 'Sandía on fire', route: '/recetas/sandia-on-fire' },
    { t: 'Ver todas las recetas', route: '/recetas' },
    { t: 'Guía: bubble tea para tu cafetería', route: '/blog/bubble-tea-para-cafeteria-insumos' }
  ],
  extraBlock: {
    title: '¿Quieres aprender a prepararlo?',
    text: 'Café Etrusca imparte talleres de bubble tea:',
    links: [
      { t: 'Taller de Bubble Tea & Iced Coffee', route: '/taller-de-bubble-tea-&-iced-coffee' },
      { t: 'Taller de Bubble Tea Especializado', route: '/taller-de-bubble-tea-especializado' }
    ]
  },
  calcTitle: '¿Cuánto cobrar por un bubble tea?',
  calcText: 'Usa la calculadora de precios de Café Etrusca con el costo de tu presentación y el tamaño de tu vaso para calcular el costo por vaso y tu precio de venta.',
  alsoTitle: 'Más toppings y bases para bubble tea',
  alsoLinks: ALSO_TZ,
  category: { name: 'Bubble tea', path: TOPPINGS, backLabel: 'Ver todos los toppings' },
  showYieldChip: false,
  ctaTitle: '¿Buscas Tea Zone para tu negocio?',
  ctaText: 'Compra en línea o habla con un asesor para mayoreo y para armar el menú de bubble tea, frappés y bebidas frías (B2B y B2C).',
  faq: [
    { q: '¿Qué es Tea Zone?', a: 'Tea Zone es una marca estadounidense de insumos para bubble tea, smoothies y bebidas de especialidad, respaldada por Karat® by Lollicup™. En Café Etrusca hay perlas de tapioca, trozos de jalea, perlas explosivas, concentrados de fruta, polvo de taro, endulzantes y accesorios.' },
    { q: '¿Qué productos Tea Zone hay en Café Etrusca?',
      a: `Al 26 de noviembre de 2026, ${SHOWN.length} productos: perlas de tapioca (bolsa de ${kgBote('ICT-009')}), ${jalCount} presentaciones de trozos de jalea (${range(jalG, kg)}), tres perlas explosivas (bote de ${kgBote('ICT-041')}), ${conc.length} concentrados de fruta (garrafa de 1.9 L), polvo de taro (${kgBote('IBP-148')}), tres endulzantes y tres accesorios.` },
    { q: '¿Cuánto topping lleva una bebida?',
      a: `Para trozos de jalea y perlas explosivas tomamos ${TZ_DOSE_G} g por bebida. Un bote de jalea de ${kgBote('ICT-021')} rinde aprox. ${Math.floor(TZ_NET_G['ICT-021'] / TZ_DOSE_G)} bebidas y uno de perlas explosivas de ${kgBote('ICT-041')}, aprox. ${Math.floor(TZ_NET_G['ICT-041'] / TZ_DOSE_G)}. En concentrados, polvo de taro y endulzantes la dosis es según preparación.` },
    { q: '¿Cómo se sirven las jaleas y las perlas explosivas?', a: 'Vienen listas para usar: se agregan directo a la bebida o al postre. La marca recomienda popote de 1 cm de diámetro.' },
    { q: '¿Las perlas de tapioca se cocinan?', a: 'Sí, hay que cocinarlas antes de servir: según la marca, se hierven 30 minutos, se dejan reposar tapadas otros 30 minutos y se enjuagan. La proporción de agua está en la etiqueta del producto.' },
    { q: '¿Qué sabores de concentrado Tea Zone hay?', a: `${list(conc).replace(/^./, (c) => c.toUpperCase())}, en garrafa de 1.9 L. La marca los recomienda para slushes, smoothies, aguas de sabores, tés saborizados, frozen yogurt, raspados y cocteles.` },
    { q: '¿Son veganos? ¿Qué declaran?', a: 'Según nuestra ficha, las perlas de tapioca y las jaleas de lichi, manzana verde y mango figuran como veganas (manzana verde y mango declaran tartrazina), y los concentrados de lichi, maracuyá, limón, frambuesa, sandía, kiwi, mango, fresa, piña y mora azul figuran como vegetarianos y veganos, con declaraciones por sabor (tartrazina, rojo 40, edulcorantes). Para los demás productos, consulta la etiqueta.' },
    { q: '¿Cuánto cobrar por un bubble tea?', a: 'Usa la calculadora de precios de Café Etrusca con el costo de tu presentación y el tamaño de tu vaso.' },
    { q: '¿Cómo se conserva Tea Zone?', a: 'Conservar en un lugar fresco y seco, evitar la luz directa del sol.' },
    { q: '¿Dónde compro Tea Zone?', a: 'En sucursales Café Etrusca, en la tienda en línea y con asesoría para negocios en etrusca.biz o en la página de contacto. Mayoreo y menudeo.' }
  ],
  storeUrl: 'https://tienda.cafeetrusca.com/productos?search=TEA%20ZONE',
  nutrition: null,
  ogPhoto: `${IMG}tea-zone-perlas-explosivas-mora-azul-bote-3200-g-ict-046-${DATE}.webp`,
  ldBrand: { description: 'Marca estadounidense de insumos para bubble tea, smoothies y bebidas de especialidad, respaldada por Karat by Lollicup.', logo: 'https://imagenes.cafeetrusca.com/corporativo/assets/images/insumos/toppings/logo-teazone.webp' }
};
