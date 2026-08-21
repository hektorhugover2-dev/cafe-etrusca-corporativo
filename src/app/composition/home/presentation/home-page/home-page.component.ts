import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Agregamos isPlatformBrowser
import { CompromisoComponent } from '../../../../shared/ui/compromiso/compromiso.component';
import { ScrollWaveComponent } from '../../../../shared/ui/scroll-wave/scroll-wave.component';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,CompromisoComponent,ScrollWaveComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements AfterViewInit, OnDestroy {
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

  filteredBranches: any[] = [];
  currentBranch: any = null;

  // Inyectamos PLATFORM_ID para saber si estamos en el Servidor o Navegador
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

 async ngAfterViewInit() {

    
    if (isPlatformBrowser(this.platformId)) {
      
      // ... (Aquí se queda igual tu código del Observer para los contadores) ...

      // LÓGICA DEL MAPA (Leaflet)
      const leafletModule = await import('leaflet');
      this.L = leafletModule.default || leafletModule;
      
      this.customIcon = this.L.icon({
        iconUrl: 'https://cafeetrusca.com/img/LOCATION-ETRUSCA.svg',
        iconSize: [42, 42],
        iconAnchor: [21, 42],
        popupAnchor: [0, -42]
      });

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
  private initMap() {
    this.map = this.L.map('map').setView([23.6345, -102.5528], 5);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.addMarkers(this.branches);
    
    const defaultBranch = this.branches.find(b => b.nombre === 'Café Etrusca CEDIS Vallejo');
    if (defaultBranch) this.currentBranch = defaultBranch;
  }

  private addMarkers(branchArray: any[]) {
    this.markers.forEach(marker => this.map?.removeLayer(marker));
    this.markers = [];

    branchArray.forEach(branch => {
      const popupContent = `<b>${branch.nombre}</b><br>${branch.direccion}`;
      if (this.map) {
         // Insertamos el PIN
         const marker = this.L.marker([branch.lat, branch.lng], { icon: this.customIcon }).addTo(this.map);
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
      this.filteredBranches = this.branches.filter(b => b.ciudad === selectedCity);
      const coords = this.cityCoordinates[selectedCity];
      
      if (coords && this.map) {
         this.map.setView(coords, 11);
         this.addMarkers(this.filteredBranches);
         if(this.filteredBranches.length > 0) this.currentBranch = this.filteredBranches[0];
      }
    } else {
      this.filteredBranches = [];
      this.currentBranch = null;
      if (this.map) {
        this.map.setView([23.6345, -102.5528], 5);
        this.addMarkers(this.branches);
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