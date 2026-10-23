import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, PLATFORM_ID, afterNextRender, computed, effect, inject,
  input, model, signal, untracked, viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type * as Leaflet from 'leaflet';
import { ETRUSCA_LOCATIONS } from '../../kernel/data/locations.data';
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
/** Coordenadas reales de los datos (lat/lng del lugar o, si no trae, las de locations.data.ts por nombre). Nunca inventadas. */
const coordsOf = (p: MapPlace): [number, number] | null => {
  if (Number.isFinite(p.lat) && Number.isFinite(p.lng)) return [p.lat as number, p.lng as number];
  const loc = ETRUSCA_LOCATIONS.find((l) => l.name === p.nombre);
  const lat = loc ? parseFloat(loc.latitude) : NaN;
  const lng = loc ? parseFloat(loc.longitude) : NaN;
  return Number.isFinite(lat) && Number.isFinite(lng) ? [lat, lng] : null;
};
/** Iconos del pin (SVG del sitio anterior, cafeetrusca.com/img/LOCATION-ETRUSCA.svg): sucursal naranja original,
 * distribuidor recoloreado a navy #192966. Proporción del SVG 288×409 → 28×40 px, ancla en la punta inferior. */
const PIN_URL: Record<Kind, string> = {
  sucursal: '/assets/images/mapa/location-etrusca.svg',
  distribuidor: '/assets/images/mapa/location-etrusca-azul.svg'
};
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
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private destroyRef = inject(DestroyRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly places = input.required<ReadonlyArray<MapPlace>>();
  readonly selected = model<MapPlace | null>(null);
  /** Prefijo de ids (varios mapas en una misma página). */
  readonly idPrefix = input('sede');
  /** Muestra la leyenda nota de la sede (Visitanos/contacto). Apagado por defecto (p. ej. cursos). */
  readonly showNotes = input(false);
  noteOf(p: MapPlace | null | undefined): string { return this.showNotes() && p?.nota ? p.nota : ''; }
  withNote(p: MapPlace): string { const n = this.noteOf(p); return placeLabel(p) + (n ? ' (' + n + ')' : ''); }
  /** Destino de «Comprar en línea» (tienda ya usada en el sitio). */
  readonly storeUrl = input('https://tienda.cafeetrusca.com/');

  private readonly cityState = signal('all');
  /** Vista inicial: mapa de pines (Leaflet). Al elegir una sede se pasa al iframe de Google + tarjeta. */
  readonly pinsMode = signal(true);
  private readonly kindState = signal<Kind>('sucursal');
  private readonly pinsEl = viewChild<ElementRef<HTMLElement>>('pins');
  private L: typeof Leaflet | null = null;
  private map: Leaflet.Map | null = null;
  private layer: Leaflet.LayerGroup | null = null;

  readonly current = computed<MapPlace | null>(() => {
    const list = this.places();
    const sel = this.selected();
    return sel && list.includes(sel) ? sel : (list[0] ?? null);
  });
  readonly kind = computed<Kind>(() => {
    if (this.pinsMode()) return this.kindState();
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
    return c === 'all' || this.pinsMode() || (cur && regionOf(cur) === c) ? c : 'all';
  });
  readonly visible = computed(() => {
    const c = this.city();
    return c === 'all' ? this.ofKind() : this.ofKind().filter((p) => regionOf(p) === c);
  });

  /** Pines del filtro actual (tipo + ciudad) con coordenadas. */
  readonly pins = computed(() =>
    this.visible().flatMap((p) => {
      const c = coordsOf(p);
      return c ? [{ place: p, latlng: c }] : [];
    })
  );
  readonly pinsLabel = computed(
    () => `Mapa de ${this.kind() === 'distribuidor' ? 'distribuidores' : 'sucursales'} Café Etrusca` +
      (this.city() !== 'all' ? ` en ${this.city()}` : ' en México') + ` (${this.pins().length} ubicaciones). ` +
      'Usa el selector de ubicación para elegir una sede.'
  );

  constructor() {
    // Cambio de sede desde fuera (p. ej. «Ver en el mapa» de /sucursales) tras la carga → vista de detalle.
    let first = true;
    effect(() => {
      const s = this.selected();
      untracked(() => {
        if (!first && s) this.pinsMode.set(false);
        first = false;
      });
    });
    // Pines se re-dibujan con el filtro.
    // El contenedor #pins sale y entra con @if (pinsMode): cuando aparece uno nuevo se recrea el mapa sobre el y
    // se redibujan los pines (antes dependia de un setTimeout que podia correr antes del render => mapa azul vacio).
    effect(() => {
      const el = this.pinsEl()?.nativeElement;
      this.pins();
      const on = this.pinsMode();
      untracked(() => { if (on && el && this.L) this.ensureMap(); });
    });
    // Leaflet solo en el navegador, con import dinámico y cuando el mapa entra al viewport.
    afterNextRender(() => {
      if (!this.isBrowser) return;
      const io = typeof IntersectionObserver === 'function'
        ? new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) { io?.disconnect(); this.loadLeaflet(); }
          }, { rootMargin: '200px' })
        : null;
      if (io) io.observe(this.host.nativeElement); else this.loadLeaflet();
      this.destroyRef.onDestroy(() => { io?.disconnect(); this.map?.remove(); this.map = null; });
    });
  }

  private async loadLeaflet(): Promise<void> {
    if (this.L) return;
    const mod: any = await import('leaflet');
    this.L = (mod.default ?? mod) as typeof Leaflet;
    if (this.pinsMode()) this.ensureMap();
  }

  /** Crea el mapa (si el contenedor existe) y pinta los pines actuales. */
  private ensureMap(): void {
    const L = this.L;
    const el = this.pinsEl()?.nativeElement;
    if (!L || !el) return;
    if (this.map && this.map.getContainer() !== el) { this.map.remove(); this.map = null; }
    if (!this.map) {
      this.map = L.map(el, { center: [23.6, -102.5], zoom: 5, scrollWheelZoom: false, attributionControl: true });
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);
      this.layer = L.layerGroup().addTo(this.map);
    }
    const m = this.map;
    requestAnimationFrame(() => { if (this.map === m) m.invalidateSize(); });
    this.drawPins(this.pins());
  }

  private drawPins(pins: { place: MapPlace; latlng: [number, number] }[]): void {
    const L = this.L;
    if (!L) return;
    if (!this.map || this.map.getContainer() !== this.pinsEl()?.nativeElement) { if (this.pinsEl()) this.ensureMapLater(); return; }
    this.map.invalidateSize();
    this.layer!.clearLayers();
    for (const { place, latlng } of pins) {
      const icon = L.icon({ iconUrl: PIN_URL[kindOf(place)], iconSize: [28, 40], iconAnchor: [14, 40], tooltipAnchor: [0, -34], className: 'vm-pin' });
      L.marker(latlng, { icon, title: placeLabel(place), alt: placeLabel(place), keyboard: true })
        .bindTooltip(this.withNote(place), { direction: 'top' })
        .on('click', () => this.choose(place))
        .addTo(this.layer!);
    }
    if (pins.length === 1) this.map.setView(pins[0].latlng, 13);
    else if (pins.length) this.map.fitBounds(L.latLngBounds(pins.map((p) => p.latlng)), { padding: [36, 36], maxZoom: 12 });
    else this.map.setView([23.6, -102.5], 5);
  }

  /** El contenedor de pines aparece de nuevo tras «Ver todas»: se espera al render. */
  private ensureMapLater(): void {
    setTimeout(() => this.ensureMap());
  }

  private choose(place: MapPlace): void {
    this.selected.set(place);
    this.pinsMode.set(false);
  }

  /** «Ver todas en el mapa»: vuelve al mapa de pines con el tipo y la ciudad actuales. */
  showAll(): void {
    this.kindState.set(this.kind());
    this.cityState.set(this.city());
    this.pinsMode.set(true);
    if (this.L) this.ensureMapLater();
  }

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
    if (this.pinsMode()) { this.kindState.set(kind); return; }
    const first = this.places().find((p) => kindOf(p) === kind);
    if (first) this.selected.set(first);
  }

  pickCity(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.cityState.set(value);
    if (this.pinsMode()) return;
    const first = (value === 'all' ? this.ofKind() : this.ofKind().filter((p) => regionOf(p) === value))[0];
    if (first) this.selected.set(first);
  }

  pickPlace(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value === '') { this.showAll(); return; }
    const place = this.visible()[Number(value)];
    if (place) this.choose(place);
  }
}
