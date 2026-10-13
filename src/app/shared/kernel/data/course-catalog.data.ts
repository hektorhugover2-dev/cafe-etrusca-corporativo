/**
 * OFFICIAL course table (SAP), sent by Héctor on 25 sep 2026. Single source for price, schedule,
 * effective hours and SAP clave of every course page, legacy page (CursoController), course×sede
 * page, event page and the Course / Event JSON-LD. It overrides older values in education.data.ts
 * and legacy-course-pages.data.ts. Edit HERE when SAP changes; nothing else hardcodes these values.
 *
 * Mapping to the site:
 *  - categoryIds: /api/Event categoryId (also the categoryId of the old per-course pages).
 *  - courseSlugs: education.data.ts course slugs (/educacion/<kind>/<slug>/).
 * Courses NOT in the table keep their current data (catación, sesiones, experiencia de servicio al
 * cliente has categoryId 31 and IS mapped to Experiencias).
 */
export interface CatalogCourse {
  /** Clave SAP (e.g. TYC-005). Shown as "Clave: TYC-005" and used as schema.org courseCode. */
  clave: string;
  /** Name in the SAP table. */
  name: string;
  /** Cost in MXN (IVA as in SAP; the table does not say otherwise). */
  price: number;
  /** Schedule as a single display line. */
  schedule: string;
  /** Effective hours ("horas efectivas"). */
  hours: number;
  /** Number of days (from the schedule: "Día 1 / Día 2" = 2). */
  days: number;
  categoryIds: ReadonlyArray<number>;
  courseSlugs: ReadonlyArray<string>;
  /** Combo (básico + especializado) this course belongs to. */
  combo?: string;
}

export interface CatalogCombo {
  clave: string;
  name: string;
  price: number;
  /** Claves of the courses included. */
  courses: ReadonlyArray<string>;
  /** Cities where the combo does NOT apply (sucursal city, as in locations.data.ts). */
  excludedCities: ReadonlyArray<string>;
}

export const COURSE_CATALOG: ReadonlyArray<CatalogCourse> = [
  { clave: 'TYC-001', name: 'Formación de emprendedores', price: 4000, schedule: 'Día 1: 9:00 a 17:30 hrs · Día 2: 9:00 a 15:30 hrs', hours: 14, days: 2, categoryIds: [10], courseSlugs: ['formacion-de-emprendedores'] },
  { clave: 'TYC-003', name: 'Tostado básico', price: 4000, schedule: 'Día 1: 9:00 a 17:30 hrs · Día 2: 9:00 a 17:30 hrs', hours: 14, days: 2, categoryIds: [5], courseSlugs: ['tostado-basico'] },
  { clave: 'TYC-005', name: 'Formación para un barista básico', price: 2500, schedule: '10:00 a 17:00 hrs', hours: 6, days: 1, categoryIds: [1], courseSlugs: ['formacion-barista'], combo: 'C07' },
  { clave: 'TYC-006', name: 'Formación para un barista especializado', price: 2500, schedule: '10:00 a 17:00 hrs', hours: 6, days: 1, categoryIds: [16], courseSlugs: ['formacion-barista-especializado'], combo: 'C07' },
  { clave: 'TYC-007', name: 'Arte latte básico', price: 2500, schedule: '10:00 a 17:00 hrs', hours: 6, days: 1, categoryIds: [2], courseSlugs: ['arte-latte'], combo: 'C23' },
  { clave: 'TYC-008', name: 'Arte latte especializado', price: 3000, schedule: '10:00 a 17:00 hrs', hours: 6, days: 1, categoryIds: [26], courseSlugs: ['arte-latte-especializado'], combo: 'C23' },
  { clave: 'TYC-009', name: 'Brew & Cold Brew', price: 2000, schedule: '10:00 a 17:00 hrs', hours: 6, days: 1, categoryIds: [4], courseSlugs: ['metodos-de-extraccion'] },
  { clave: 'TYC-014', name: 'Mixología', price: 1500, schedule: '10:00 a 14:00 hrs', hours: 4, days: 1, categoryIds: [9], courseSlugs: ['mixologia'] },
  { clave: 'TYC-021', name: 'Bubble Tea básico', price: 2000, schedule: '10:00 a 15:00 hrs', hours: 5, days: 1, categoryIds: [7], courseSlugs: ['bubble-tea-iced-coffee'], combo: 'C01' },
  { clave: 'TYC-031', name: 'Bubble Tea especializado', price: 2000, schedule: '10:00 a 15:00 hrs', hours: 5, days: 1, categoryIds: [12], courseSlugs: ['bubble-tea-especializado'], combo: 'C01' },
  { clave: 'TYC-037', name: 'Básico de bebidas frías', price: 2000, schedule: '10:00 a 15:00 hrs', hours: 5, days: 1, categoryIds: [38], courseSlugs: ['bebidas-frias'] },
  // Experiencias (3 h): inmersiona-té 21, coffee lovers 27, crear mezcla 37, servicio al cliente 31,
  // arte y creatividad mixología 34, oasis bebidas frías 23 (categoryIds of the old pages);
  // 2026 experiences (BD event_category): coffee lover en invierno 40, inmersiona-té navidad 41, mixología 42.
  {
    clave: 'TYC-015',
    name: 'Experiencias',
    price: 800,
    schedule: '10:00 a 13:00 hrs',
    hours: 3,
    days: 1,
    categoryIds: [21, 27, 37, 31, 34, 23, 40, 41, 42],
    courseSlugs: ['inmersiona-te', 'arte-creatividad-mixologia', 'coffee-lover-en-invierno', 'experiencia-sensorial', 'crear-mezcla-de-cafe', 'oasis-bebidas-frias']
  }
];

export const COURSE_COMBOS: ReadonlyArray<CatalogCombo> = [
  { clave: 'C01', name: 'Bubble tea (básico + especializado)', price: 3000, courses: ['TYC-021', 'TYC-031'], excludedCities: ['Tijuana'] },
  { clave: 'C07', name: 'Formación para un barista (básico + especializado)', price: 4500, courses: ['TYC-005', 'TYC-006'], excludedCities: ['Tijuana'] },
  { clave: 'C23', name: 'Arte latte (básico + especializado)', price: 5000, courses: ['TYC-007', 'TYC-008'], excludedCities: ['Tijuana'] }
];

export function catalogByClave(clave: string | null | undefined): CatalogCourse | undefined {
  return clave ? COURSE_CATALOG.find((c) => c.clave === clave) : undefined;
}

export function catalogByCategory(categoryId: number | null | undefined): CatalogCourse | undefined {
  const id = Number(categoryId);
  return id ? COURSE_CATALOG.find((c) => c.categoryIds.includes(id)) : undefined;
}

export function catalogByCourseSlug(slug: string | null | undefined): CatalogCourse | undefined {
  return slug ? COURSE_CATALOG.find((c) => c.courseSlugs.includes(slug)) : undefined;
}

/** Combo of a course, unless the page's sucursal city is excluded (Tijuana). */
export function comboFor(course: CatalogCourse | undefined, city?: string | null): CatalogCombo | undefined {
  if (!course?.combo) return undefined;
  const combo = COURSE_COMBOS.find((c) => c.clave === course.combo);
  if (!combo) return undefined;
  if (city && combo.excludedCities.some((x) => norm(x) === norm(city))) return undefined;
  return combo;
}

/** 2500 → "$2,500 MXN". */
export function formatMXN(amount: number): string {
  return '$' + new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(amount) + ' MXN';
}

export function daysLabel(c: CatalogCourse): string {
  return c.days === 1 ? '1 día' : `${c.days} días`;
}

export function hoursLabel(c: CatalogCourse): string {
  return `${c.hours} horas efectivas`;
}

/** One line for the combo note: "Combo básico + especializado: $4,500 MXN (clave C07) · No aplica en Tijuana". */
export function comboNote(combo: CatalogCombo): string {
  const excl = combo.excludedCities.length ? ` · No aplica en ${combo.excludedCities.join(', ')}` : '';
  return `Combo básico + especializado: ${formatMXN(combo.price)} (clave ${combo.clave})${excl}`;
}

/** schema.org Offer for a catalog course (price in MXN). */
export function catalogOffer(c: CatalogCourse, url: string) {
  return {
    '@type': 'Offer',
    url,
    price: c.price,
    priceCurrency: 'MXN',
    category: 'Paid',
    sku: c.clave,
    availability: 'https://schema.org/InStock'
  };
}

/** Start/end times per day parsed from the schedule ("Día 1: 9:00 a 17:30 hrs · Día 2: …") as HH:MM. */
export function catalogTimes(c: CatalogCourse): Array<[string, string]> {
  const pad = (t: string) => (t.length === 4 ? '0' + t : t);
  return [...c.schedule.matchAll(/(\d{1,2}:\d{2})\s*a\s*(\d{1,2}:\d{2})/g)].map((m) => [pad(m[1]), pad(m[2])] as [string, string]);
}

function amPm(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'pm' : 'am'}`;
}

/** Calendar-card hours from the table ("10:00 am a 2:00 pm"; two-day courses per day). */
export function catalogHoursLabel(c: CatalogCourse): string {
  const t = catalogTimes(c);
  if (!t.length) return '';
  if (t.length === 1) return `${amPm(t[0][0])} a ${amPm(t[0][1])}`;
  return t.map(([a, b], i) => `Día ${i + 1}: ${amPm(a)} a ${amPm(b)}`).join(' · ');
}

/** ISO-8601 duration of the effective hours (schema.org timeRequired). */
export function catalogDuration(c: CatalogCourse): string {
  return `PT${c.hours}H`;
}

function norm(v: string): string {
  return v.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
}
