import { DISTRIBUTORS } from '../../../../domains/corporate/presentation/pages/contact-page/contacto.data';
import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Agregamos isPlatformBrowser
import { CompromisoComponent } from '../../../../shared/ui/compromiso/compromiso.component';
import { SeoService } from '../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../shared/ui/scroll-wave/scroll-wave.component';
import { RouterLink } from '@angular/router';
import { Recipe, publishedRecipes } from '../../../../domains/catalog/presentation/pages/recipes-page/recetas.data';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CompromisoComponent, ScrollWaveComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  homeRecipes: Recipe[] = ['miche-cero', 'mi-mero-mole', 'diablito-de-fresa', 'horchata-mexa']
    .map((slug) => publishedRecipes().find((r) => r.slug === slug))
    .filter((r): r is Recipe => !!r);

  displayTitle(r: Recipe): string {
    return [r.title, r.titleAccent].filter(Boolean).join(' ');
  }

  btnClass(i: number): string {
    return ['btn-rosa', 'btn-rosa', 'btn-verde', 'btn-amarillo'][i % 4];
  }

  subtitleClass(i: number): string {
    return ['sub-rosa', 'sub-rosa', 'sub-verde', 'sub-amarillo'][i % 4];
  }

  private seo = inject(SeoService);

  // ==========================================
  // VARIABLES ESTADÍSTICAS Y AYUDA
  // ==========================================
  @ViewChildren('counter') counters!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;
  activeOption: 'suscribir' | 'duda' | null = null;

  // ==========================================
  // VARIABLES MAPA
  // ==========================================
  private map: any;
  private markers: any[] = [];
  private L: any; // Instancia dinámica de Leaflet
  private customIcon: any; // Pin personalizado

  private cityCoordinates: { [key: string]: [number, number] } = {
    'Ciudad de México': [19.4326, -99.1332],
    'Guadalajara': [20.66651, -103.37203],
    'Monterrey': [25.6866, -100.3161],
    'Puebla': [19.0414, -98.2063],
    'Querétaro': [20.5881, -100.3880],
    'Tijuana': [32.5149, -117.0382],
    'León': [21.1606, -101.7116],
    'Toluca': [19.2826, -99.6557],
    'Yucatán': [21.0568604, -89.644909],
    'Xalapa': [19.530488, -96.934478] 
  };

  branches = [
    {
      lat: 19.4923666, lng: -99.1578552, nombre: 'Café Etrusca CEDIS Vallejo',
      direccion: 'Pte. 134 413, Industrial Vallejo, Azcapotzalco, 02300 Ciudad de México, CDMX',
      email: "atencion@cafeetrusca.com", telefono: "55 41 66 8777",
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', ciudad: "Ciudad de México", estado: "CDMX"
    },
    {
      lat: 19.4257134, lng: -99.16132894907378, nombre: 'Sucursal Zona Rosa',
      direccion: 'Liverpool #91, Colonia Juárez, CDMX', horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
      email: "zonarosa@cafeetrusca.com", telefono: "(55) 5533 9402 / 04 / 05 / 06", ciudad: "Ciudad de México", estado: "CDMX"
    },
    {
      lat: 19.399054, lng: -99.134663, nombre: 'Sucursal Viaducto',
      direccion: 'Miguel Ángel #2-A, Colonia Moderna, CDMX', horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
      email: "viaducto@cafeetrusca.com", telefono: "(55) 5579 9981 / 5579 9251", ciudad: "Ciudad de México", estado: "CDMX"
    },
    {
      lat: 19.25494, lng: -99.6149, nombre: 'Sucursal Toluca',
      direccion: 'Calle Pedro Ascencio #529 Edificio 2 Local 1, Barrio de Santa Cruz, Metepec, Estado de México',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', email: "toluca@cafeetrusca.com",
      telefono: "(722) 238 2566 / (01 722) 238 2567", ciudad: "Toluca", estado: "Toluca"
    },
    {
      lat: 32.506225, lng: -116.979203, nombre: 'Sucursal Tijuana',
      direccion: 'Plaza Ximena, Local 5, Boulevard Díaz Ordaz #13601, Col. López Lucio',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', telefono: "(664) 681 6600 / 11 ",
      email: "tijuana@cafeetrusca.com", ciudad: "Tijuana", estado: "Baja California"
    },
    {
      lat: 20.588084, lng: -100.403696, nombre: 'Sucursal Querétaro',
      direccion: 'Tecnológico Sur #10, Colonia Niños Héroes', horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
      email: "queretaro@cafeetrusca.com", telefono: "(442) 234 5077 / 7152 / 3562 ", ciudad: "Querétaro", estado: "Querétaro"
    },
    {
      lat: 19.05133, lng: -98.226499, nombre: 'Sucursal Puebla',
      direccion: 'Boulevard Atlixco #1520, Col. La Paz, Local 1', horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
      email: "puebla@cafeetrusca.com", telefono: "(222) 230 5300 / 5896", ciudad: "Puebla", estado: "Puebla"
    },
    {
      lat: 25.661205, lng: -100.399708, nombre: 'Sucursal Monterrey',
      direccion: 'Centro comercial Los Mezquites, Av. Vasconcelos #501, Interior 1 Poniente, esquina con Zaragoza, Col. Centro, Nuevo León',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', email: "monterrey@cafeetrusca.com",
      telefono: "(81) 8338 1383 / 1857", ciudad: "Monterrey", estado: "Nuevo León"
    },
    {
      lat: 21.099884, lng: -101.67006, nombre: 'Sucursal León',
      direccion: 'Local E, Plaza San Rafael, Boulevard Juan José Torres Landa, Oriente #1005, Col. Puerta de San Rafael, Ciudad de León, Guanajuato',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', telefono: "(477) 212 3798 / 3800 / 962 221",
      email: "leon@cafeetrusca.com", ciudad: "León", estado: "Guanajuato"
    },
    {
      lat: 20.66651, lng: -103.37203, nombre: 'Sucursal Guadalajara',
      direccion: 'Av Niños Héroes 2161, Americana, Moderna, 44190 Guadalajara, Jal.',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', email: "guadalajara@cafeetrusca.com",
      telefono: "(33) 3827 5286 / 3827 5287", ciudad: "Guadalajara", estado: "Jalisco"
    },
    {
      lat: 19.492441, lng: -99.155717, nombre: 'Centro de Tostión Etrusca Vallejo',
      direccion: 'Av. Poniente 134 #413, Bodega B2, entrada por un lado de las vías del tren, Industrial Vallejo, Azcapotzalco, Ciudad de México, CDMX',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', telefono: "(55) 5579 9860 / (55) 5590 5407 / (55) 5604 1159",
      email: "atencion@cafeetrusca.com", ciudad: "Ciudad de México", estado: "CDMX"
    },
    {
      lat: 19.530488, lng: -96.934478, nombre: 'Sucursal Xalapa',
      direccion: 'Plaza del Teatro, Local 5 Avenida Ignacio de la llave #35, Col. Guadalupe Rodríguez',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', telefono: "(228) 812 0130 / 0660 ",
      email: "xalapa@cafeetrusca.com", ciudad: "Xalapa", estado: "Xalapa"
    },
    {
      lat: 21.056040, lng: -89.642618, nombre: 'Sucursal Mérida',
      direccion: 'Av. Maquiladoras 501, Col 27, 97302 Mérida, Yuc.',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', telefono: "9986740024",
      email: "merida@cafeetrusca.com", ciudad: "Yucatán", estado: "Yucatán"
    },
    {
      lat: 19.3571004, lng: -99.0946023, nombre: 'Sucursal Iztapalapa',
      direccion: 'Calle Porfirio Díaz, número 113, Col. San Lucas, Alcaldía Iztapalapa, C.P. 09000, Ciudad de México',
      horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', telefono: "5541668737",
      email: "iztapalapa@cafeetrusca.com", ciudad: "Ciudad de México", estado: "CDMX"
    }
  ];

  mapKind: 'sucursal' | 'distribuidor' = 'sucursal';
  filteredBranches: any[] = [];
  currentBranch: any = null;

  // Inyectamos PLATFORM_ID para saber si estamos en el Servidor o Navegador
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

 ngOnInit() {
    const brand = 'Café Etrusca';
    this.seo.set({
      title: brand + ' | Todo Para Tu Cafetería - (55) 4166 8777',
      description:
        brand +
        ' Todo Para Tu Cafetería: Cursos para Baristas, Talleres para Cafeterías, Insumos, Maquinaria, Equipo, Accesorios y más para potenciar tu negocio',
      keywords:
        'arte latte,Brew Bar,Cold Brew,Mezcla Personalizada,Cafés especiales,Mezclas especiales,Café Etrusca,insumos,cafeterías,equipo para cafetería,barras de café,cursos para barista,maquinas de espresso,certificaciones',
      image: 'https://cafeetrusca.com/img/1920X1080_BANNER_HOME_LA_FENICE.webp',
      ogType: 'website',
      jsonLd: ({ origin }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': origin + '/#organization',
          name: brand,
          url: origin + '/',
          logo: 'https://cafeetrusca.com/img/logo_etrusca.webp',
          telephone: '+52-55-4166-8777',
          email: 'atencion@cafeetrusca.com',
          sameAs: [
            'https://www.facebook.com/CafeEtrusca',
            'https://www.instagram.com/cafeetrusca',
            'https://www.youtube.com/@CafeEtrusca',
            'https://www.tiktok.com/@cafeetrusca'
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': origin + '/#website',
          name: brand,
          url: origin + '/',
          inLanguage: 'es-MX',
          publisher: { '@id': origin + '/#organization' }
        }
      ]
    });
    this.applyDefaultCity();
  }

  async ngAfterViewInit() {

    
    if (isPlatformBrowser(this.platformId)) {
      
      // ... (Aquí se queda igual tu código del Observer para los contadores) ...

      // LÓGICA DEL MAPA (Leaflet)
      const leafletModule = await import('leaflet');
      this.L = leafletModule.default || leafletModule;
      
      this.customIcon = this.makeMarkerIcon(0);

      this.initMap();

      // TRUCO: Disparamos la actualización del tamaño en dos momentos diferentes
      // para asegurar que Bootstrap ya haya terminado de pintar la cuadrícula.
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 100);

      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 1000); // 1 segundo después asegura que todo cargó al 100%
    }
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
  }

  // ==========================================
  // LÓGICA DEL MAPA
  // ==========================================
  
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
    const city = this.places.some((b) => b.ciudad === 'Ciudad de México')
      ? 'Ciudad de México'
      : (this.mapCities[0] || '');
    this.applyCity(city);
  }

  private applyCity(city: string) {
    this.filteredBranches = city ? this.places.filter((b) => b.ciudad === city) : [];
    this.currentBranch = this.filteredBranches[0] || null;
    if (this.map) {
      this.addMarkers(this.filteredBranches);
      this.fitToBranches(this.filteredBranches);
    }
  }

private applyDefaultCity() {
    const defaultBranch = this.branches.find(b => b.nombre.indexOf('CEDIS') !== -1) || this.branches[0];
    this.currentBranch = defaultBranch || null;
    this.filteredBranches = defaultBranch
      ? this.places.filter((b) => b.ciudad === defaultBranch.ciudad)
      : [];
  }

  private makeMarkerIcon(offsetX = 0, blue = false) {
    return this.L.divIcon({
      className: 'etrusca-map-marker',
      html: '<span class="etrusca-map-marker__hit"><img src="' + (blue ? '/assets/images/pin-distribuidor.svg' : 'https://cafeetrusca.com/img/LOCATION-ETRUSCA.svg') + '" alt=""></span>',
      iconSize: [40, 48],
      iconAnchor: [20 - offsetX, 48],
      popupAnchor: [offsetX, -48]
    });
  }

  private markerOffsets(branchArray: any[]): number[] {
    const n = branchArray.length;
    const offsets = new Array(n).fill(0);
    const close = 0.003;
    const used = new Set();
    for (let i = 0; i < n; i++) {
      if (used.has(i)) continue;
      const group = [i];
      used.add(i);
      for (let j = i + 1; j < n; j++) {
        if (used.has(j)) continue;
        const dlat = branchArray[i].lat - branchArray[j].lat;
        const dlng = branchArray[i].lng - branchArray[j].lng;
        if ((dlat * dlat + dlng * dlng) < (close * close)) {
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

  private fitToBranches(branchArray: any[]) {
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
    const start = this.currentBranch || this.branches[0];
    this.map = this.L.map('map', { zoomControl: true }).setView(
      start ? [start.lat, start.lng] : [23.6345, -102.5528],
      start ? 15 : 5
    );

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.addMarkers(this.filteredBranches.length ? this.filteredBranches : []);
    if (start) this.map.setView([start.lat, start.lng], 15);
  }

  private addMarkers(branchArray: any[]) {
    this.markers.forEach(marker => this.map?.removeLayer(marker));
    this.markers = [];
    const offsets = this.markerOffsets(branchArray);

    branchArray.forEach((branch, index) => {
      const popupContent = '<b>' + branch.nombre + '</b><br>' + branch.direccion;
      if (this.map) {
         const marker = this.L.marker([branch.lat, branch.lng], {
           icon: this.makeMarkerIcon(offsets[index], branch.tipo === 'distribuidor'),
           title: branch.nombre,
           alt: branch.nombre,
           keyboard: true
         }).addTo(this.map);
         marker.bindPopup(popupContent);
         marker.on('click', () => {
             this.currentBranch = branch;
         });
         this.markers.push(marker);
      }
    });
  }

  onCityChange(event: Event) {
    const selectedCity = (event.target as HTMLSelectElement).value;
    
    if (selectedCity) {
      this.filteredBranches = this.places.filter((b) => b.ciudad === selectedCity);
      this.addMarkers(this.filteredBranches);
      if (this.filteredBranches.length > 0) this.currentBranch = this.filteredBranches[0];
      this.fitToBranches(this.filteredBranches);
    } else {
      this.filteredBranches = [];
      this.currentBranch = null;
      if (this.map) {
        this.map.setView([23.6345, -102.5528], 5);
        this.addMarkers([]);
      }
    }
  }

  onBranchChange(event: Event) {
    const selectedBranchName = (event.target as HTMLSelectElement).value;
    if(selectedBranchName) {
        const branch = this.filteredBranches.find(b => b.nombre === selectedBranchName);
        if(branch && this.map) {
            this.currentBranch = branch;
            this.map.setView([branch.lat, branch.lng], 15);
            
            const marker = this.markers.find(m => m.getLatLng().lat === branch.lat && m.getLatLng().lng === branch.lng);
            if(marker) marker.openPopup();
        }
    }
  }

  // ==========================================
  // OTRAS SECCIONES
  // ==========================================
  toggleOption(option: 'suscribir' | 'duda') {
    this.activeOption = this.activeOption === option ? null : option;
  }


}