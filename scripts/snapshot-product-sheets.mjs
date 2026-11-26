// Snapshot de la lista de precios (https://intranet.cafeetrusca.com/api/v1/venta/lista_precio/1) →
// src/app/domains/catalog/presentation/product-sheets/product-sheets.data.ts
//
// Fichas de producto en la URL del sitio anterior: /Producto/Detalle/<CÓDIGO>/<SLUG>/ (ProductosController,
// [Route("/Producto/Detalle/{codigo}/{slug}")]; el slug es el nombre con "-" y la ficha se buscaba sólo por código).
// Una ficha por SKU con foto: image_thumbnail de la API (servida por /img/*, el mismo origen IIS que usa el sitio)
// o, si la API no trae foto, la foto oficial de la marca que ya publica el sitio (fotos de *.data.ts en R2).
// NO se guardan precios, promociones, existencias ni datos que la API no trae. Se excluyen los cursos (línea CURSOS).
//
// Uso (desde la raíz del repo):  node scripts/snapshot-product-sheets.mjs [--report <archivo.json>]
// Revisa el diff, corre node scripts/write-sitemap.mjs y luego el build.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { importTs } from './_load-ts.mjs';

const API = 'https://intranet.cafeetrusca.com/api/v1/venta/lista_precio/1';
/** Origen IIS detrás de /img/* (functions/img → _lib/api-proxy.js). Sólo para verificar las fotos. */
const IMG_ORIGIN = 'https://api-origin.cafeetrusca.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';
const OUT = fileURLToPath(new URL('../src/app/domains/catalog/presentation/product-sheets/product-sheets.data.ts', import.meta.url));
const reportArg = process.argv.indexOf('--report');
const REPORT = reportArg > 0 ? process.argv[reportArg + 1] : null;

const { storeSlug } = await importTs('src/app/domains/catalog/presentation/services/store-links.ts');
const { applyProductSheetOverride } = await importTs('src/app/domains/catalog/presentation/product-sheets/product-sheets.overrides.ts');

// ---------- texto
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', reg: '®', trade: '™', deg: '°' };
function decodeEntities(s) {
  let prev;
  do {
    prev = s;
    s = s
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
      .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m);
  } while (s !== prev);
  return s;
}
const clean = (v) => decodeEntities(String(v ?? '')).replace(/[\u00a0\u2007\u202f]/g, ' ').replace(/\s+/g, ' ').trim();

/** "SI (LÁCTEOS, SOYA)" → ["Lácteos", "Soya"]. "NO", "SI" sin lista o vacío → sin alérgenos publicados. */
function allergens(v) {
  const t = clean(v);
  if (!/^S[IÍ]\b/i.test(t)) return [];
  const inner = t.replace(/^S[IÍ]\s*/i, '').replace(/[()]/g, ' ');
  return [...new Set(inner.split(',').map((x) => x.trim()).filter(Boolean).map((x) => {
    const w = x.toLocaleLowerCase('es-MX');
    return /\d/.test(w) ? x.charAt(0) + x.slice(1).toLocaleLowerCase('es-MX') : w.charAt(0).toLocaleUpperCase('es-MX') + w.slice(1);
  }))];
}

/** GTIN sólo si el dígito verificador cuadra (EAN-8/UPC-12/EAN-13/GTIN-14). */
function gtin(v) {
  const d = String(v ?? '').replace(/\s/g, '');
  if (!/^\d{8}$|^\d{12,14}$/.test(d) || /^0+$/.test(d)) return null;
  const digits = d.split('').map(Number);
  const check = digits.pop();
  const sum = digits.reverse().reduce((a, n, i) => a + n * (i % 2 === 0 ? 3 : 1), 0);
  return (10 - (sum % 10)) % 10 === check ? d : null;
}

// ---------- categoría (por prefijo del código) y página de marca del sitio
const CAT = {
  IJA: ['Jarabes', '/insumos-para-cafeterias/jarabes'],
  ISA: ['Salsas', '/insumos-para-cafeterias/salsas'],
  IPC: ['Purés', '/insumos-para-cafeterias/pures'],
  IBP: ['Bases en polvo', '/insumos-para-cafeterias/bases-en-polvo'],
  ICP: ['Bases en polvo', '/insumos-para-cafeterias/bases-en-polvo'],
  ITE: ['Té', '/insumos-para-cafeterias/te'],
  ITB: ['Té', '/insumos-para-cafeterias/te'],
  ITI: ['Tisanas', '/insumos-para-cafeterias/tisanas'],
  ICT: ['Toppings', '/insumos-para-cafeterias/toppings'],
  CPM: ['Café premium', '/productos/cafe/premium'],
  CES: ['Café de especialidad', '/productos/cafe/especialidad'],
  CVE: ['Café verde', '/productos/cafe/verde'],
  MCA: ['Máquinas de espresso', '/maquinaria-y-equipo-para-cafeterias/espresso'],
  MMO: ['Molinos', '/maquinaria-y-equipo-para-cafeterias/molinos'],
  MLI: ['Licuadoras', '/maquinaria-y-equipo-para-cafeterias/licuadoras'],
  MTO: ['Tostadores', '/maquinaria-y-equipo-para-cafeterias/tostadores'],
  MCO: ['Maquinaria y equipo', '/maquinaria-y-equipo-para-cafeterias'],
  RMA: ['Refacciones', '/maquinaria-y-equipo-para-cafeterias'],
  ABC: ['Métodos de extracción', '/accesorios-para-poner-una-cafeteria/metodo-extraccion'],
  AAB: ['Barista y espresso', '/accesorios-para-poner-una-cafeteria/barista-espresso'],
  AJT: ['Té y servicio', '/accesorios-para-poner-una-cafeteria/te-servicio'],
  ABA: ['Catación y medición', '/accesorios-para-poner-una-cafeteria/catacion-medicion'],
  ALM: ['Limpieza', '/accesorios-para-poner-una-cafeteria/limpieza'],
  AAC: ['Accesorios', '/accesorios-para-poner-una-cafeteria'],
};
const MAQ = '/maquinaria-y-equipo-para-cafeterias/';
/** Línea (marca) de la API → landing de la marca en el sitio. Sin landing → se enlaza la categoría. */
function brandPage(linea, prefix) {
  const l = clean(linea).toUpperCase();
  if (l === 'TORANI') return '/insumos-para-cafeterias/jarabes/torani';
  if (l === 'CHILLOUT') {
    if (prefix === 'ITI') return '/insumos-para-cafeterias/tisanas/chillout';
    if (prefix === 'IBP' || prefix === 'ICP') return '/insumos-para-cafeterias/bases-en-polvo/chillout';
    return null;
  }
  if (l === 'DAVID RIO') return '/insumos-para-cafeterias/bases-en-polvo/david-rio';
  if (l === 'MOCAFE') return '/insumos-para-cafeterias/bases-en-polvo/mocafe';
  if (l === 'COOL CAPPS') return '/insumos-para-cafeterias/bases-en-polvo/cool-capps';
  const maq = { FIORENZATO: 'fiorenzato', EUREKA: 'eureka', COMANDANTE: 'comandante', 'ANFIM SRL': 'anfim', ANFIM: 'anfim', MAHLKONIG: 'mahlkonig', BLENDTEC: 'blendtec', MELITTA: 'melitta' }[l];
  return maq ? MAQ + maq : null;
}

// ---------- fotos oficiales de marca ya publicadas en el sitio (sólo si la API no trae foto)
async function brandPhotos() {
  const names = ['torani', 'chillout', 'cool-capps', 'david-rio', 'mocafe', 'tisanas-chillout', 'bienestar', 'maquinas', 'grinders'];
  const files = [];
  (function walk(d) {
    for (const f of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, f.name);
      if (f.isDirectory()) walk(p);
      else if (names.some((n) => f.name === n + '.data.ts')) files.push(p.replace(/\\/g, '/'));
    }
  })('src/app');
  const out = {};
  const CODE = /^[A-Z]{3}-\d{3}$/;
  const isImg = (v) => typeof v === 'string' && /^https?:\/\/.+\.(webp|png|jpe?g|avif)(\?|$)/i.test(v);
  const visit = (v, seen) => {
    if (!v || typeof v !== 'object' || seen.has(v)) return;
    seen.add(v);
    if (Array.isArray(v)) return v.forEach((x) => visit(x, seen));
    const code = [v.code, v.sku, v.codigo].find((x) => typeof x === 'string' && CODE.test(x.trim()));
    const img = [v.image, v.img, v.photo, v.imagen, v.src].find(isImg);
    if (code && img && !out[code.trim()]) out[code.trim()] = img;
    for (const [k, x] of Object.entries(v)) {
      if (CODE.test(k) && isImg(x) && !out[k]) out[k] = x;
      visit(x, seen);
    }
  };
  for (const f of files.sort()) {
    const mod = await importTs(f);
    for (const v of Object.values(mod)) visit(v, new Set());
  }
  return out;
}

// ---------- medidas reales de la foto (cabecera WebP / PNG / JPEG)
function imageSize(buf) {
  const b = Buffer.from(buf);
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const kind = b.toString('ascii', 12, 16);
    if (kind === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
    if (kind === 'VP8L') { const v = b.readUInt32LE(21); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
    if (kind === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  }
  if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
      i += 2 + b.readUInt16BE(i + 2);
    }
  }
  return null;
}
async function probe(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
      if (!res.ok) return { error: `HTTP ${res.status}` };
      const type = res.headers.get('content-type') || '';
      if (!/^image\//i.test(type)) return { error: `no es imagen (${type || 'sin content-type'})` };
      const size = imageSize(await res.arrayBuffer());
      return size ? { w: size[0], h: size[1] } : { error: 'medidas ilegibles' };
    } catch (e) {
      if (attempt === 2) return { error: String(e?.message || e) };
    }
  }
}
async function pool(items, n, fn) {
  const out = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]); } }));
  return out;
}

// ---------- main
const res = await fetch(API, { headers: { Accept: 'application/json', 'User-Agent': UA }, signal: AbortSignal.timeout(120000) });
if (!res.ok) throw new Error(`${API} → HTTP ${res.status}`);
const rows = (await res.json())?.data;
if (!Array.isArray(rows) || rows.length < 100) throw new Error('lista_precio sin datos');

const official = await brandPhotos();
const failed = [];
const candidates = [];
const seen = new Set();
for (const r of rows) {
  const code = clean(r.codigo).toUpperCase();
  if (!/^[A-Z0-9]+-[A-Z0-9]+$/.test(code) || seen.has(code)) continue;
  seen.add(code);
  const name = clean(r.nombre);
  const linea = clean(r.linea);
  if (linea.toUpperCase() === 'CURSOS') { failed.push({ codigo: code, nombre: name, motivo: 'curso (línea CURSOS), no es producto' }); continue; }
  if (!name) { failed.push({ codigo: code, nombre: '', motivo: 'sin nombre en la API' }); continue; }
  const thumb = clean(r.image_thumbnail);
  const img = thumb ? (thumb.startsWith('/') ? thumb : '/' + thumb) : official[code] || null;
  if (!img) { failed.push({ codigo: code, nombre: name, motivo: 'sin foto (la API no trae image_thumbnail y el sitio no tiene foto oficial de la marca)' }); continue; }
  const slug = storeSlug(name);
  if (!slug) { failed.push({ codigo: code, nombre: name, motivo: 'nombre sin caracteres válidos para la URL' }); continue; }
  const prefix = code.split('-')[0];
  const cat = CAT[prefix];
  if (!cat) { failed.push({ codigo: code, nombre: name, motivo: `sin categoría conocida para el prefijo ${prefix}` }); continue; }
  candidates.push({ r, code, name, linea, img, slug, prefix, cat, photo: thumb ? 'api' : 'marca' });
}

const sizes = await pool(candidates, 12, (c) => probe(c.img.startsWith('/') ? IMG_ORIGIN + c.img : c.img));
const sheets = [];
candidates.forEach((c, i) => {
  const s = sizes[i];
  if (!s || s.error) { failed.push({ codigo: c.code, nombre: c.name, motivo: `la foto no responde (${s?.error || 'error'}): ${c.img}` }); return; }
  const sheet = { c: c.code, s: c.slug, n: c.name, b: c.linea || '', cl: c.cat[0], cp: c.cat[1], img: c.img, w: s.w, h: s.h };
  const bp = c.linea ? brandPage(c.linea, c.prefix) : null;
  if (bp) sheet.bp = bp;
  const g = gtin(c.r.CodeBears);
  if (g) sheet.g = g;
  const ing = clean(c.r.ingredientes);
  if (ing) sheet.i = ing;
  const alg = allergens(c.r.alergenos);
  if (alg.length) sheet.a = alg;
  sheets.push(applyProductSheetOverride(sheet));
});
sheets.sort((a, b) => a.c.localeCompare(b.c));
failed.sort((a, b) => a.codigo.localeCompare(b.codigo));

const today = new Date().toISOString().slice(0, 10);
const NL = '\r\n';
const body = [
  '// GENERADO por scripts/snapshot-product-sheets.mjs (lista_precio/1) — no editar a mano.',
  '// Tras generar se aplican PRODUCT_SHEET_OVERRIDES (p. ej. ingredientes de ICP-001 según la etiqueta).',
  '// Sin precios, promociones ni existencias. Sólo lo importan el servidor/prerender, el sitemap y app.config.server.ts',
  '// (el navegador recibe la ficha de la página por TransferState).',
  "import type { ProductSheet } from './product-sheet.model';",
  '',
  `export const PRODUCT_SHEETS_SNAPSHOT_DATE = '${today}';`,
  '',
  'export const PRODUCT_SHEETS: ProductSheet[] = [',
  ...sheets.map((s) => '  ' + JSON.stringify(s) + ','),
  '];',
  ''
].join(NL);
writeFileSync(OUT, body, 'utf8');

const byReason = {};
for (const f of failed) { const k = f.motivo.replace(/:.*$/, '').replace(/\(HTTP.*$/, '').trim(); byReason[k] = (byReason[k] || 0) + 1; }
console.log(`lista_precio: ${rows.length} filas, ${seen.size} códigos`);
console.log(`fichas: ${sheets.length} (foto API ${candidates.filter((c) => c.photo === 'api').length}, foto oficial de marca ${candidates.filter((c) => c.photo === 'marca').length})`);
console.log(`sin ficha: ${failed.length}`, byReason);
console.log('escrito', OUT);
if (REPORT) writeFileSync(REPORT, JSON.stringify({ date: today, sheets: sheets.length, failed }, null, 1), 'utf8');
