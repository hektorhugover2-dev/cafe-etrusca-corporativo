import { EtruscaLocation, locationById } from '../../../shared/kernel/data/locations.data';
import { CityCourse, CityPageRef, cityPageRef } from './legacy-city-matrix';
import { LegacyBlock, LegacyCoursePage, LegacySection, legacyCoursePage } from './legacy-course-pages.data';

/**
 * Resolves a legacy course URL: the pages migrated 1:1 from the old site first, then the
 * generated course × sucursal city pages (legacy-city-matrix.ts). Lazy (page chunk only).
 */
export interface ResolvedLegacyPage {
  page: LegacyCoursePage;
  /** Course × venue info when the URL is a city page (migrated or generated). */
  ref?: CityPageRef;
  /** Sucursal of the city page (locations.data.ts snapshot of /api/Location). */
  location?: EtruscaLocation;
  /** True for city pages that did not exist on the old site. */
  generated: boolean;
}

export function resolveLegacyPage(path: string | null | undefined): ResolvedLegacyPage | undefined {
  const key = String(path || '').replace(/^\/+|\/+$/g, '');
  const ref = cityPageRef(key);
  const migrated = legacyCoursePage(key);
  if (migrated) {
    const location = locationById(migrated.locationId ?? ref?.venue.id);
    return { page: migrated, ref, location, generated: false };
  }
  if (!ref) return undefined;
  const template = legacyCoursePage(ref.course.template);
  const location = locationById(ref.venue.id);
  if (!template) return undefined;
  const page = ref.course.templateCity?.length
    ? fromSibling(template, ref, ref.course.templateCity)
    : fromBase(template, ref);
  return { page, ref, location, generated: true };
}

/** Old sibling city page with the city swapped (same way the old site wrote its city pages). */
function fromSibling(t: LegacyCoursePage, ref: CityPageRef, cities: ReadonlyArray<string>): LegacyCoursePage {
  const label = ref.venue.label;
  const short = label.replace(/\s+CDMX$/i, '');
  const swap = (s: string) =>
    cities.reduce((acc, from, i) => acc.split(from).join(i === 0 ? label : short), s);
  return {
    ...t,
    path: ref.path,
    title: swap(t.title),
    description: swap(t.description),
    keywords: swap(t.keywords),
    h1: swap(t.h1),
    subtitle: t.subtitle ? swap(t.subtitle) : t.subtitle,
    city: label,
    locationId: ref.venue.id,
    sections: t.sections.map((s) => mapSection(s, swap))
  };
}

/** Base course page + " en <Ciudad>" where the old city pages put it. */
function fromBase(t: LegacyCoursePage, ref: CityPageRef): LegacyCoursePage {
  const c: CityCourse = ref.course;
  const city = ref.venue.label;
  const en = ` en ${city}`;
  return {
    ...t,
    path: ref.path,
    title: insertTitle(t.title, en),
    description: insertAfter(t.description, c.descAnchor, en) ?? `${c.crumb}${en}: ${t.description}`,
    keywords: c.keyword ? `${c.keyword}${en},${t.keywords}` : t.keywords,
    h1: `${t.h1}${en}`,
    city,
    locationId: ref.venue.id,
    sections: t.sections.map((s) => (s.calendar ? { ...s, heading: `${s.heading}${en}` } : s))
  };
}

function insertTitle(title: string, en: string): string {
  const m = title.match(/\s[-|]\s/);
  return m && m.index !== undefined ? title.slice(0, m.index) + en + title.slice(m.index) : title + en;
}

function insertAfter(text: string, anchor: string | undefined, en: string): string | null {
  if (!anchor) return null;
  const i = text.toLowerCase().indexOf(anchor.toLowerCase());
  if (i < 0) return null;
  const end = i + anchor.length;
  return text.slice(0, end) + en + text.slice(end);
}

function mapSection(s: LegacySection, f: (v: string) => string): LegacySection {
  return { ...s, heading: f(s.heading), blocks: s.blocks.map((b) => mapBlock(b, f)) };
}

function mapBlock(b: LegacyBlock, f: (v: string) => string): LegacyBlock {
  return {
    ...b,
    html: b.html !== undefined ? f(b.html) : undefined,
    alt: b.alt !== undefined ? f(b.alt) : undefined,
    label: b.label !== undefined ? f(b.label) : undefined,
    items: b.items?.map((it) => ({ html: f(it.html), sub: it.sub?.map(f) }))
  };
}
