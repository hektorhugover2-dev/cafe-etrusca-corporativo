import { ChangeDetectionStrategy, Component, computed, inject, input, model, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MapPlace, mapsDirectionsUrl, mapsEmbedUrl, placeLabel, placeMapQuery } from '../../kernel/utils/google-maps';

type Kind = 'sucursal' | 'distribuidor';

/** Estados mal capturados en los datos (p. ej. «Toluca» o «Xalapa» como estado) y «CDMX» → nombre completo. */
const REGION_FIX: Record<string, string> = {
  CDMX: 'Ciudad de México',
  Toluca: 'Estado de México',
  Xalapa: 'Veracruz'
};

const kindOf = (p: MapPlace): Kind => (p.tipo === 'distribuidor' ? 'distribuidor' : 'sucursal');
const regionOf = (p: MapPlace): string => {
  const raw = (p.estado || p.ciudad || '').trim();
  return REGION_FIX[raw] || raw;
};

/**
 * «Visítanos»: selectores Ciudad/Estado + ubicación + toggle Sucursal/Distribuidor, mapa de Google embebido
 * (sin API ni llave; las sedes se eligen con los chips en forma de pin) y panel de detalle.
 * SSR: el iframe se renderiza en el servidor con DomSanitizer.bypassSecurityTrustResourceUrl; no usa `window`.
 */
@Component({
  selector: 'app-sede-map',
  standalone: true,
  templateUrl: './sede-map.component.html',
  styleUrl: './sede-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SedeMapComponent {
  private sanitizer = inject(DomSanitizer);

  readonly places = input.required<ReadonlyArray<MapPlace>>();
  readonly selected = model<MapPlace | null>(null);
  /** Prefijo de ids (varios mapas en una misma página). */
  readonly idPrefix = input('sede');
  /** Destino de «Comprar en línea» (tienda ya usada en el sitio). */
  readonly storeUrl = input('https://tienda.cafeetrusca.com/');

  private readonly cityState = signal('all');

  readonly current = computed<MapPlace | null>(() => {
    const list = this.places();
    const sel = this.selected();
    return sel && list.includes(sel) ? sel : (list[0] ?? null);
  });
  readonly kind = computed<Kind>(() => {
    const c = this.current();
    return c ? kindOf(c) : 'sucursal';
  });
  /** Hay sedes de los dos tipos → se muestra el toggle. */
  readonly hasBothKinds = computed(() => {
    const l = this.places();
    return l.some((p) => kindOf(p) === 'sucursal') && l.some((p) => kindOf(p) === 'distribuidor');
  });
  private readonly ofKind = computed(() => this.places().filter((p) => kindOf(p) === this.kind()));
  readonly regions = computed(() => [...new Set(this.ofKind().map(regionOf).filter(Boolean))]);
  /** Ciudad/Estado efectivo (vuelve a «todos» si la sede elegida está en otro). */
  readonly city = computed(() => {
    const c = this.cityState();
    const cur = this.current();
    return c === 'all' || (cur && regionOf(cur) === c) ? c : 'all';
  });
  readonly visible = computed(() => {
    const c = this.city();
    return c === 'all' ? this.ofKind() : this.ofKind().filter((p) => regionOf(p) === c);
  });

  private readonly query = computed(() => {
    const c = this.current();
    return c ? placeMapQuery(c) : '';
  });
  readonly embedUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(mapsEmbedUrl(this.query())));
  readonly directionsUrl = computed(() => mapsDirectionsUrl(this.query()));

  readonly labelOf = placeLabel;
  readonly regionOf = regionOf;

  /** «Ciudad, Estado» (sin repetir cuando son iguales). */
  cityLine(p: MapPlace): string {
    const region = regionOf(p);
    const city = (p.ciudad || '').trim();
    return city && city !== region && region ? `${city}, ${region}` : region || city;
  }

  /** Primer teléfono → enlace tel: (varios teléfonos separados por «/»). */
  telHref(raw?: string): string | null {
    let d = (raw || '').split('/')[0].replace(/\D/g, '');
    if (d.startsWith('01') && d.length === 12) d = d.slice(2);
    return d.length === 10 ? 'tel:+52' + d : d ? 'tel:' + d : null;
  }

  pickKind(kind: Kind): void {
    if (kind === this.kind()) return;
    this.cityState.set('all');
    const first = this.places().find((p) => kindOf(p) === kind);
    if (first) this.selected.set(first);
  }

  pickCity(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.cityState.set(value);
    const first = (value === 'all' ? this.ofKind() : this.ofKind().filter((p) => regionOf(p) === value))[0];
    if (first) this.selected.set(first);
  }

  pickPlace(event: Event): void {
    const place = this.visible()[Number((event.target as HTMLSelectElement).value)];
    if (place) this.selected.set(place);
  }
}
