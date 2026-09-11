import {
  Component,
  Inject,
  PLATFORM_ID,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import {
  BRANCHES,
  CITIES,
  LOCATORS,
  type Branch,
  type Locator, DISTRIBUTORS } from './contacto.data';

const CONTACT_US_URL = 'https://cafeetrusca.com/api/ContactUs';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ScrollWaveComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private http = inject(HttpClient);
  private document = inject(DOCUMENT);

  readonly cities = CITIES;
  readonly branches = BRANCHES;
  readonly locators = LOCATORS;
  readonly locatorKinds: Array<'Todos' | Locator['kind']> = [
    'Todos',
    'Sucursal',
    'CEDIS',
    'Distribuidor'
  ];

  locatorFilter: 'Todos' | Locator['kind'] = 'Todos';
  selectedCity = '';

  mapKind: 'sucursal' | 'distribuidor' = 'sucursal';
  filteredBranches: Branch[] = [];
  currentBranch: Branch | null = null;

  name = '';
  telephone = '';
  email = '';
  message = '';
  ocupacion = '0';
  nickname = '';
  privacy = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  luckyWriting = false;

  private map: any;
  private markers: any[] = [];
  private L: any;
  private resizeHandler: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    const brand = 'Café Etrusca';
    this.seo.set({
      title: 'Contacto | ' + brand + ' — Sucursales y asesores',
      description:
        'Contacta a ' + brand + ': sucursales, distribuidores y CEDIS. Escríbenos y un asesor te atiende. Tel. (55) 4166 8777.',
      keywords:
        'contacto Café Etrusca, sucursales, distribuidores, CEDIS Vallejo, atención a clientes, mapa sucursales',
      image: 'https://cafeetrusca.com/img/1920X1080_BANNER_HOME_LA_FENICE.webp',
      ogType: 'website',
      jsonLd: ({ origin, url }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': url + '#contact',
          name: 'Contacto | ' + brand,
          url,
          description:
            'Sucursales, distribuidores y formulario de contacto de Café Etrusca.',
          isPartOf: { '@id': origin + '/#website' },
          about: { '@id': origin + '/#organization' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': origin + '/#organization',
          name: brand,
          url: origin + '/',
          telephone: '+52-55-4166-8777',
          email: 'atencion@cafeetrusca.com',
          logo: 'https://cafeetrusca.com/img/logo_etrusca.webp',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+52-55-4166-8777',
            contactType: 'customer service',
            areaServed: 'MX',
            availableLanguage: ['es']
          }
        }
      ]
    });
    this.applyDefaultCity();
  }

  async ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const leafletModule = await import('leaflet');
    this.L = leafletModule.default || leafletModule;
    this.initMap();
    const resize = () => this.map?.invalidateSize();
    this.resizeHandler = resize;
    setTimeout(resize, 100);
    setTimeout(resize, 1000);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  get visibleLocators(): Locator[] {
    if (this.locatorFilter === 'Todos') return this.locators;
    return this.locators.filter((row) => row.kind === this.locatorFilter);
  }

  onCityChange(event: Event) {
    const selectedCity = (event.target as HTMLSelectElement).value;
    this.applyCity(selectedCity);
  }

  onBranchChange(event: Event) {
    const selectedBranchName = (event.target as HTMLSelectElement).value;
    if (!selectedBranchName) return;
    const branch = this.filteredBranches.find((b) => b.nombre === selectedBranchName);
    if (branch && this.map) {
      this.currentBranch = branch;
      this.map.setView([branch.lat, branch.lng], 15);
      const marker = this.markers.find(
        (m) => m.getLatLng().lat === branch.lat && m.getLatLng().lng === branch.lng
      );
      if (marker) marker.openPopup();
    }
  }

  telHref(phone: string): string {
    const digits = (phone || '').replace(/[^\d+]/g, '');
    return digits ? 'tel:' + digits : '';
  }

  cityLabel(city: string): string {
    return city === 'Yucatán' ? 'Mérida' : city;
  }

  
  onFormTouch() {
    this.luckyWriting = [this.name, this.telephone, this.email, this.message].some((value) =>
      (value || '').trim().length > 0
    );
  }
onSubmit(form: NgForm) {
    this.successMessage = '';
    this.errorMessage = '';
    if (this.nickname.trim()) return;
    if (!this.privacy || form.invalid) {
      this.errorMessage = 'Revisa los campos e acepta el aviso de privacidad.';
      return;
    }

    const payload = {
      name: this.name.trim(),
      fatherlastname: 'vacio',
      motherlastname: 'vacio',
      email: this.email.trim(),
      telephone: this.telephone.trim(),
      ocupacion: this.ocupacion || '0',
      url: this.document.location?.href || '',
      message: this.message.trim()
    };

    this.submitting = true;

    if (this.isLocalHost()) {
      console.info('[ContactUs] POST skipped on local hostname', this.document.location?.hostname);
      this.submitting = false;
      this.successMessage =
        'Gracias por tus datos, en un momento un asesor se comunicará contigo.';
      form.resetForm({ ocupacion: '0', privacy: false, nickname: '' });
      this.ocupacion = '0';
      return;
    }

    this.http
      .post(CONTACT_US_URL, payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe({
        next: () => {
          this.submitting = false;
          this.successMessage =
            'Gracias por tus datos, en un momento un asesor se comunicará contigo.';
          form.resetForm({ ocupacion: '0', privacy: false, nickname: '' });
          this.ocupacion = '0';
        },
        error: () => {
          this.submitting = false;
          this.errorMessage = 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.';
        }
      });
  }

  
  get places() {
    return this.mapKind === 'distribuidor' ? DISTRIBUTORS : this.branches;
  }

  get mapCities(): string[] {
    return [...new Set(this.places.map((b) => b.ciudad))];
  }

  
  get placeSelectLabel(): string {
    return this.mapKind === 'distribuidor' ? 'Seleccione un distribuidor' : 'Selecciona la sucursal';
  }

  get placeSelectHint(): string {
    return this.mapKind === 'distribuidor'
      ? 'Seleccione un distribuidor para ver la dirección.'
      : 'Selecciona una sucursal para ver la dirección.';
  }
setMapKind(kind: 'sucursal' | 'distribuidor') {
    if (this.mapKind === kind) return;
    this.mapKind = kind;
    this.applyCity('');
  }

  private applyCity(city: string) {
    this.selectedCity = city;
    this.filteredBranches = city
      ? this.places.filter((b) => b.ciudad === city)
      : [...this.places];
    this.currentBranch = city ? this.filteredBranches[0] || null : null;
    if (this.map) {
      this.addMarkers(this.filteredBranches);
      this.fitToBranches(this.filteredBranches);
    }
  }

private applyDefaultCity() {
    this.selectedCity = '';
    this.filteredBranches = [...this.places];
    this.currentBranch = null;
  }

  private makeMarkerIcon(offsetX = 0, blue = false) {
    return this.L.divIcon({
      className: 'etrusca-map-marker',
      html:
        '<span class="etrusca-map-marker__hit"><img src="' + (blue ? '/assets/images/pin-distribuidor.svg' : 'https://cafeetrusca.com/img/LOCATION-ETRUSCA.svg') + '" alt=""></span>',
      iconSize: [40, 48],
      iconAnchor: [20 - offsetX, 48],
      popupAnchor: [offsetX, -48]
    });
  }

  private markerOffsets(branchArray: Branch[]): number[] {
    const n = branchArray.length;
    const offsets = new Array(n).fill(0);
    const close = 0.003;
    const used = new Set<number>();
    for (let i = 0; i < n; i++) {
      if (used.has(i)) continue;
      const group = [i];
      used.add(i);
      for (let j = i + 1; j < n; j++) {
        if (used.has(j)) continue;
        const dlat = branchArray[i].lat - branchArray[j].lat;
        const dlng = branchArray[i].lng - branchArray[j].lng;
        if (dlat * dlat + dlng * dlng < close * close) {
          group.push(j);
          used.add(j);
        }
      }
      if (group.length > 1) {
        group.forEach((idx, k) => {
          offsets[idx] = (k - (group.length - 1) / 2) * 64;
        });
      }
    }
    return offsets;
  }

  private fitToBranches(branchArray: Branch[]) {
    if (!this.map || !branchArray.length) return;
    if (branchArray.length === 1) {
      this.map.setView([branchArray[0].lat, branchArray[0].lng], 15);
      return;
    }
    const bounds = this.L.latLngBounds(branchArray.map((b) => [b.lat, b.lng]));
    this.map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15 });
  }

  private initMap() {
    this.applyDefaultCity();
    this.map = this.L.map('contacto-map', { zoomControl: true }).setView(
      [23.6345, -102.5528],
      5
    );
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
    this.addMarkers(this.filteredBranches);
    this.fitToBranches(this.filteredBranches);
  }

  private addMarkers(branchArray: Branch[]) {
    this.markers.forEach((marker) => this.map?.removeLayer(marker));
    this.markers = [];
    if (!this.map) return;
    const offsets = this.markerOffsets(branchArray);
    branchArray.forEach((branch, index) => {
      const marker = this.L.marker([branch.lat, branch.lng], {
        icon: this.makeMarkerIcon(offsets[index], branch.tipo === 'distribuidor'),
        title: branch.nombre,
        alt: branch.nombre,
        keyboard: true
      }).addTo(this.map);
      marker.bindPopup('<b>' + branch.nombre + '</b><br>' + branch.direccion);
      marker.on('click', () => {
        this.currentBranch = branch;
      });
      this.markers.push(marker);
    });
  }

  private isLocalHost(): boolean {
    const host = (this.document.location?.hostname || '').toLowerCase();
    return (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host === '[::1]' ||
      host.endsWith('.local')
    );
  }
}
