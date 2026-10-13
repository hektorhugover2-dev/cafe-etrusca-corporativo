import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import {
  COURSE_VENUES,
  EtruscaLocation,
  locationById
} from '../../../../../shared/kernel/data/locations.data';
import { BRANCHES } from '../contact-page/contacto.data';
import { SedeMapComponent } from '../../../../../shared/ui/sede-map/sede-map.component';
import { MapPlace, placeDirectionsUrl, placeLabel } from '../../../../../shared/kernel/utils/google-maps';
import { canonicalOverride, primaryPath } from '../../../../education/presentation/primary-urls';

/**
 * /sucursales/ — directorio de sucursales (B3 de la revisión SEO 2026-09-25).
 * Datos: snapshot de /api/Location (locations.data.ts). El horario sale de contacto.data.ts
 * (mismo texto que ya muestra /contacto/); si una sede no lo tiene, no se muestra.
 */
export interface BranchPhone {
  label: string;
  href: string | null;
}

export interface BranchView {
  id: number;
  anchor: string;
  name: string;
  /** Nombre público: «Sucursal Iztapalapa» → «Etrusca Iztapalapa». */
  label: string;
  cityLabel: string;
  address: string;
  phones: BranchPhone[];
  email: string;
  schedule: string;
  mapsUrl: string;
  coursesPath: string | null;
  location: EtruscaLocation;
}

/** location id → nombre en contacto.data.ts BRANCHES (fuente del horario). */
const SCHEDULE_SOURCE: Record<number, string> = {
  1: 'Sucursal Zona Rosa',
  2: 'Sucursal Xalapa',
  3: 'Sucursal Viaducto',
  4: 'Sucursal Toluca',
  5: 'Sucursal Tijuana',
  6: 'Sucursal Querétaro',
  8: 'Sucursal Puebla',
  9: 'Sucursal Monterrey',
  11: 'Sucursal León',
  13: 'Sucursal Guadalajara',
  15: 'Centro de Tostión Etrusca Vallejo',
  44: 'Sucursal Mérida',
  51: 'Sucursal Iztapalapa'
};

/** Orden de las sucursales: CDMX primero, luego por ciudad. */
const VENUE_ORDER = [1, 3, 51, 13, 11, 44, 9, 8, 6, 5, 4, 2];
const OPERATIONS_IDS = [15, 49];

/** Nombre del estado para el JSON-LD (el campo state del API trae ciudades o erratas). */
const REGION_BY_ID: Record<number, string> = {
  1: 'CDMX', 3: 'CDMX', 51: 'CDMX', 15: 'CDMX',
  2: 'Veracruz', 4: 'Estado de México', 5: 'Baja California', 6: 'Querétaro',
  8: 'Puebla', 9: 'Nuevo León', 11: 'Guanajuato', 13: 'Jalisco', 44: 'Yucatán', 49: 'Jalisco'
};

/** Localidad para el JSON-LD. */
const LOCALITY_BY_ID: Record<number, string> = {
  1: 'Ciudad de México', 3: 'Ciudad de México', 51: 'Ciudad de México', 15: 'Ciudad de México',
  2: 'Xalapa', 4: 'Metepec', 5: 'Tijuana', 6: 'Querétaro', 8: 'Puebla',
  9: 'San Pedro Garza García', 11: 'León', 13: 'Guadalajara', 44: 'Mérida', 49: 'Zapopan'
};

function formatPhone(raw: string): BranchPhone {
  const label = raw.trim();
  let digits = label.replace(/\D/g, '');
  if (digits.startsWith('01') && digits.length === 12) digits = digits.slice(2);
  if (digits.length !== 10) return { label, href: null };
  const pretty = /^\(/.test(label)
    ? label
    : /^(55|33|81)/.test(digits)
      ? `(${digits.slice(0, 2)}) ${digits.slice(2, 6)} ${digits.slice(6)}`
      : `(${digits.slice(0, 3)}) ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return { label: pretty, href: `tel:+52${digits}` };
}

function scheduleFor(id: number): string {
  const name = SCHEDULE_SOURCE[id];
  const raw = name ? BRANCHES.find((b) => b.nombre === name)?.horarios || '' : '';
  const m = raw.match(/^L-V\s+(\d{2}:\d{2})-(\d{2}:\d{2})\s+HRS\s+S[AÁ]BADO\s+(\d{2}:\d{2})-(\d{2}:\d{2})\s+HRS$/i);
  if (!m) return raw;
  return `Lunes a viernes ${m[1]}–${m[2]} h · Sábado ${m[3]}–${m[4]} h`;
}

/** openingHoursSpecification solo si el horario tiene el formato conocido. */
function openingHours(id: number): any[] | undefined {
  const name = SCHEDULE_SOURCE[id];
  const raw = name ? BRANCHES.find((b) => b.nombre === name)?.horarios || '' : '';
  const m = raw.match(/^L-V\s+(\d{2}:\d{2})-(\d{2}:\d{2})\s+HRS\s+S[AÁ]BADO\s+(\d{2}:\d{2})-(\d{2}:\d{2})\s+HRS$/i);
  if (!m) return undefined;
  return [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: m[1],
      closes: m[2]
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: m[3], closes: m[4] }
  ];
}

/** Barista course of the sede, always the primary URL (CDMX sedes → /curso-de-barista-cdmx/). */
function primaryCoursesPath(venueSlug: string): string {
  const p = `/taller-basico-para-baristas-en-${venueSlug}`;
  return (canonicalOverride(p) ?? primaryPath(p)) + '/';
}

function toView(loc: EtruscaLocation): BranchView {
  return {
    id: loc.id,
    anchor: loc.venueSlug || loc.slug,
    name: loc.name,
    label: placeLabel({ nombre: loc.name }),
    cityLabel: LOCALITY_BY_ID[loc.id] || loc.city,
    address: loc.displayAddress || loc.address,
    phones: String(loc.telephone || '')
      .split('/')
      .map((p) => p.trim())
      .filter(Boolean)
      .map(formatPhone),
    email: loc.email,
    schedule: scheduleFor(loc.id),
    mapsUrl: loc.mapsUrl,
    coursesPath: loc.courseVenue && loc.venueSlug ? primaryCoursesPath(loc.venueSlug) : null,
    location: loc
  };
}

function pick(ids: number[], pool: ReadonlyArray<EtruscaLocation>): BranchView[] {
  const byId = ids.map((id) => pool.find((l) => l.id === id)).filter((l): l is EtruscaLocation => !!l);
  const rest = pool.filter((l) => !ids.includes(l.id));
  return [...byId, ...rest].map(toView);
}

export const BRANCH_VIEWS: BranchView[] = pick(VENUE_ORDER, COURSE_VENUES);
export const OPERATION_VIEWS: BranchView[] = OPERATIONS_IDS.map((id) => locationById(id))
  .filter((l): l is EtruscaLocation => !!l)
  .map(toView);

@Component({
  selector: 'app-branches-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SedeMapComponent],
  templateUrl: './branches-page.component.html',
  styleUrl: './branches-page.component.scss'
})
export class BranchesPageComponent implements OnInit {
  private seo = inject(SeoService);
  private doc = inject(DOCUMENT);

  readonly branches = BRANCH_VIEWS;
  readonly operations = OPERATION_VIEWS;

  /** Sedes del mapa de Google (mismo componente que el home y /contacto); un MapPlace por tarjeta. */
  private readonly placeById = new Map<number, MapPlace>(
    [...BRANCH_VIEWS, ...OPERATION_VIEWS].map((b) => [
      b.id,
      {
        nombre: b.name,
        direccion: b.address,
        ciudad: b.cityLabel,
        estado: REGION_BY_ID[b.id],
        telefono: b.phones.map((p) => p.label).join(' / '),
        email: b.email,
        horarios: b.schedule
      } as MapPlace
    ])
  );
  readonly mapPlaces: MapPlace[] = [...this.placeById.values()];
  mapSelected: MapPlace | null = null;

  /** «Ver en el mapa»: cambia la sede del mapa y sube a él (solo se ejecuta tras un clic en el navegador). */
  showOnMap(b: BranchView): void {
    this.mapSelected = this.placeById.get(b.id) ?? null;
    this.doc.getElementById('br-mapa')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /** «Cómo llegar»: https://www.google.com/maps/dir/?api=1&destination=<nombre, dirección completa>. */
  directionsUrl(b: BranchView): string {
    const p = this.placeById.get(b.id);
    return p ? placeDirectionsUrl(p) : b.mapsUrl;
  }

  ngOnInit(): void {
    const count = this.branches.length;
    const title = 'Sucursales Café Etrusca en México | Direcciones y teléfonos';
    const description =
      `Las ${count} sucursales de Café Etrusca: dirección, teléfono, correo, horario y cómo llegar ` +
      'en CDMX, Guadalajara, Monterrey, Puebla, Querétaro, León, Mérida y más.';
    const all = [...this.branches, ...this.operations];

    this.seo.set({
      title,
      description,
      keywords: 'sucursales Café Etrusca,Café Etrusca cerca de mí,tienda insumos cafetería,Café Etrusca CDMX,Café Etrusca Guadalajara,Café Etrusca Monterrey',
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          '@id': url + '#webpage',
          name: 'Sucursales Café Etrusca',
          url,
          description,
          isPartOf: { '@id': origin + '/#website' },
          about: { '@id': origin + '/#organization' },
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: all.length,
            itemListElement: all.map((b, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: { '@id': `${url}#${b.anchor}` }
            }))
          }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: origin + '/' },
            { '@type': 'ListItem', position: 2, name: 'Sucursales', item: url }
          ]
        },
        ...all.map((b) => {
          const loc = b.location;
          const lat = Number(loc.latitude);
          const lng = Number(loc.longitude);
          const phone = b.phones.find((p) => p.href);
          const node: Record<string, any> = {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': `${url}#${b.anchor}`,
            name: `Café Etrusca ${b.name}`,
            url: `${url}#${b.anchor}`,
            image: origin + '/assets/images/logo-etrusca.webp',
            parentOrganization: { '@id': origin + '/#organization' },
            address: {
              '@type': 'PostalAddress',
              streetAddress: loc.address,
              addressLocality: LOCALITY_BY_ID[loc.id] || loc.city,
              addressRegion: REGION_BY_ID[loc.id] || undefined,
              postalCode: loc.postalCode || undefined,
              addressCountry: 'MX'
            }
          };
          if (phone?.href) node['telephone'] = phone.href.replace('tel:', '');
          if (b.email) node['email'] = b.email;
          if (Number.isFinite(lat) && Number.isFinite(lng) && lat && lng) {
            node['geo'] = { '@type': 'GeoCoordinates', latitude: lat, longitude: lng };
          }
          if (b.mapsUrl) node['hasMap'] = b.mapsUrl;
          const hours = openingHours(loc.id);
          if (hours) node['openingHoursSpecification'] = hours;
          return node;
        })
      ]
    });
  }
}
