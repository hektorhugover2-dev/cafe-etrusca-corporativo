import { ETRUSCA_LOCATIONS } from '../data/locations.data';

/**
 * Mapas de Google SIN API ni llave: iframe de https://www.google.com/maps?q=<dirección>&output=embed
 * y enlace «Cómo llegar» https://www.google.com/maps/dir/?api=1&destination=<dirección>.
 * Sin Leaflet ni `window`: solo construye cadenas, así que funciona igual en SSR.
 */
export interface MapPlace {
  nombre: string;
  direccion: string;
  ciudad?: string;
  estado?: string;
  telefono?: string;
  email?: string;
  horarios?: string;
  tipo?: 'sucursal' | 'distribuidor';
}

const norm = (s: string) =>
  (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/**
 * Nombre público de la sede (es lo que debe verse en el pin y en las tarjetas): «Sucursal Iztapalapa» pasa a
 * «Etrusca Iztapalapa». Los nombres que ya traen «Etrusca» («Café Etrusca CEDIS Vallejo») y los distribuidores
 * («Distribuidor Coyoacán») conservan su propio nombre.
 */
export function placeLabel(p: Pick<MapPlace, 'nombre'>): string {
  const n = (p.nombre || '').trim();
  return /^sucursal\s+/i.test(n) ? 'Etrusca ' + n.replace(/^sucursal\s+/i, '') : n;
}

/**
 * Dirección completa que se manda a Google. Las «Sucursal …» salen de locations.data.ts (snapshot de la API, con
 * colonia, alcaldía y C.P.; p. ej. Zona Rosa: 06600). El resto usa la dirección que ya muestra la página, más la
 * ciudad si la dirección no la trae.
 */
export function placeAddress(p: MapPlace): string {
  const loc = ETRUSCA_LOCATIONS.find((l) => l.courseVenue && l.name === p.nombre);
  if (loc) return loc.displayAddress;
  const base = (p.direccion || '').trim();
  const city = (p.ciudad || '').trim();
  return city && !norm(base).includes(norm(city)) ? base + ', ' + city : base;
}

/**
 * Consulta `q` / `destination`: «<Nombre de la sede>, <dirección completa>» (p. ej. «Etrusca Iztapalapa, Porfirio
 * Díaz 113, San Lucas, Iztapalapa, 09000 Ciudad de México, CDMX»). Con el nombre delante Google resuelve la ficha
 * del negocio y rotula el pin con su nombre; la dirección completa evita que lo confunda con otro punto.
 */
export function placeMapQuery(p: MapPlace): string {
  return placeLabel(p) + ', ' + placeAddress(p);
}

export function mapsEmbedUrl(query: string): string {
  return 'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&output=embed';
}

export function mapsDirectionsUrl(query: string): string {
  return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(query);
}

export function placeDirectionsUrl(p: MapPlace): string {
  return mapsDirectionsUrl(placeMapQuery(p));
}
