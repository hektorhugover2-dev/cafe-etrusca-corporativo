import { ASSETS_BASE_URL, absoluteAssetUrl } from '../../../../shared/kernel/config/assets-url';
﻿import { DISTRIBUTORS } from '../../../../domains/corporate/presentation/pages/contact-page/contacto.data';
import { Component, ElementRef, QueryList, ViewChildren, OnDestroy, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { swalToast } from '../../../../shared/kernel/utils/swal-toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompromisoComponent } from '../../../../shared/ui/compromiso/compromiso.component';
import { SeoService } from '../../../../shared/kernel/services/seo.service';
import { ScrollWaveComponent } from '../../../../shared/ui/scroll-wave/scroll-wave.component';
import { HomeHelpFormComponent } from '../home-help-form/home-help-form.component';
import { SedeMapComponent } from '../../../../shared/ui/sede-map/sede-map.component';
import { RouterLink } from '@angular/router';
import { Recipe, publishedRecipes } from '../../../../domains/catalog/presentation/pages/recipes-page/recetas.data';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule, CompromisoComponent, ScrollWaveComponent, RouterLink, SedeMapComponent, HomeHelpFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit, OnDestroy {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  private http = inject(HttpClient);

  homeRecipes: Recipe[] = ['pumpkin-cold-brew', 'dirty-pumpkin-chai', 'mokalabaza-latte', 'bubble-pumpkin']
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
  ayudaLuckySrc = '';
  private readonly luckyNewsletter = `${ASSETS_BASE_URL}/images/lucky-newsletter.webp`;
  private readonly luckyPool = [
    `${ASSETS_BASE_URL}/images/lucky-idle.webp`,
    `${ASSETS_BASE_URL}/images/lucky-writing.webp`,
    `${ASSETS_BASE_URL}/images/mascota.png`
  ];
  private luckyRotateTimer: ReturnType<typeof setInterval> | null = null;

  // Mapa: Google Maps embebido (sin API ni llave), ver SedeMapComponent. Sin Leaflet.

  branches = [
    {
      lat: 19.4923666, lng: -99.1578552, nombre: 'Café Etrusca CEDIS Vallejo', nota: 'sin venta al público',
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

  /** Sedes del mapa «Visítanos»: sucursales + distribuidores (el componente filtra por tipo y estado). */
  readonly mapPlaces: any[] = [
    ...this.branches.map((b) => ({ ...b, tipo: 'sucursal' })),
    ...DISTRIBUTORS
  ];
  currentBranch: any = null;

 ngOnInit() {
    const brand = 'Café Etrusca';
    this.seo.set({
      title: brand + ' | Todo Para Tu Cafetería - (55) 4166 8777',
      description:
        brand +
        ' Todo Para Tu Cafetería: Cursos para Baristas, Talleres para Cafeterías, Insumos, Maquinaria, Equipo, Accesorios y más para potenciar tu negocio',
      keywords:
        'arte latte,Brew Bar,Cold Brew,Mezcla Personalizada,Cafés especiales,Mezclas especiales,Café Etrusca,insumos,cafeterías,equipo para cafetería,barras de café,cursos para barista,maquinas de espresso,certificaciones',
      image: `${ASSETS_BASE_URL}/images/home/banners/banner_home_la_fenice.webp`,
      ogType: 'website',
      jsonLd: ({ origin }) => [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          '@id': origin + '/#organization',
          name: brand,
          url: origin + '/',
          logo: absoluteAssetUrl('images/logo-etrusca.webp'),
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

  ngOnDestroy() {
    this.stopLuckyRotate();
    if (this.observer) this.observer.disconnect();
  }

  // ==========================================
  // LÓGICA DEL MAPA
  // ==========================================
  
  private applyDefaultCity() {
    this.currentBranch = this.mapPlaces.find((b) => b.nombre.indexOf('CEDIS') !== -1) || this.mapPlaces[0] || null;
  }

  // ==========================================
  // OTRAS SECCIONES
  // ==========================================
  
  newsletterName = '';
  newsletterEmail = '';
  newsletterSubmitting = false;

  
  dudaName = '';
  dudaEmail = '';
  dudaTelephone = '';
  dudaSubject = '';
  dudaMessage = '';
  dudaPrivacy = false;
  dudaSubmitting = false;

  private readonly contactUsUrl = 'https://cafeetrusca.com/api/ContactUs';

  sendHomeContact() {
    const name = (this.dudaName || '').trim();
    const email = (this.dudaEmail || '').trim();
    const telephone = (this.dudaTelephone || '').trim();
    const subject = (this.dudaSubject || '').trim();
    const messageBody = (this.dudaMessage || '').trim();

    if (!name || !email || !messageBody) {
      void swalToast('info', 'Por favor, completa nombre, correo y mensaje.');
      return;
    }
    if (!this.dudaPrivacy) {
      void swalToast('info', 'Debes aceptar el aviso de privacidad.');
      return;
    }

    const subjectLabel: Record<string, string> = {
      productos: 'Información de productos',
      pedidos: 'Dudas sobre mi pedido',
      soporte: 'Soporte técnico de máquinas',
      otro: 'Otro comentario'
    };
    const message = subject
      ? '[' + (subjectLabel[subject] || subject) + '] ' + messageBody
      : messageBody;

    const payload = {
      name,
      fatherlastname: 'vacio',
      motherlastname: 'vacio',
      email,
      telephone: telephone || '0',
      ocupacion: '0',
      url: typeof window !== 'undefined' ? window.location.href : '',
      message
    };

    this.dudaSubmitting = true;

    const finishOk = () => {
      void swalToast('success', 'Gracias por tus datos, en un momento un asesor se comunicará contigo.');
      this.dudaName = '';
      this.dudaEmail = '';
      this.dudaTelephone = '';
      this.dudaSubject = '';
      this.dudaMessage = '';
      this.dudaPrivacy = false;
      this.dudaSubmitting = false;
    };

    const host = (typeof window !== 'undefined' ? window.location.hostname : '').toLowerCase();
    const isLocal =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.endsWith('.local');

    if (isLocal) {
      console.info('[ContactUs/home] POST skipped on local hostname', host, payload);
      finishOk();
      return;
    }

    this.http
      .post(this.contactUsUrl, payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe({
        next: () => finishOk(),
        error: (err) => {
          console.error(err);
          void swalToast('error', 'No pudimos enviar tu mensaje. Inténtalo de nuevo más tarde.');
          this.dudaSubmitting = false;
        }
      });
  }

  sendNewsletter() {
    const first_name = (this.newsletterName || '').trim();
    const email = (this.newsletterEmail || '').trim();
    const last_name = '';

    if (!first_name || !email) {
      void swalToast('info', 'Por favor, completa tu nombre y correo electrónico.');
      return;
    }

    this.newsletterSubmitting = true;

    const finishOk = () => {
      void swalToast('success', '¡Gracias por suscribirte!');
      this.newsletterName = '';
      this.newsletterEmail = '';
      this.newsletterSubmitting = false;
    };

    const host = (typeof window !== 'undefined' ? window.location.hostname : '').toLowerCase();
    const isLocal =
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.endsWith('.local');

    if (isLocal) {
      console.info('[Newsletter] POST skipped on local hostname', host);
      finishOk();
      return;
    }

    this.http
      .post(
        'https://cafeetrusca.com/api/newsletter',
        { first_name, last_name, email },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .subscribe({
        next: () => finishOk(),
        error: (err) => {
          console.error(err);
          void swalToast('error', 'Ocurrió un error al enviar tu información.');
          this.newsletterSubmitting = false;
        }
      });
  }


  onHelpModeChange(mode: 'newsletter' | 'contact' | null) {
    this.activeOption = mode === 'newsletter' ? 'suscribir' : mode === 'contact' ? 'duda' : null;
  }

  onHelpFormTouch(ev: { mode: 'newsletter' | 'contact' | null; filling: boolean }) {
    this.stopLuckyRotate();
    if (ev.mode === 'newsletter') {
      this.ayudaLuckySrc = ev.filling ? this.luckyNewsletter : '';
      return;
    }
    if (ev.mode === 'contact') {
      if (!ev.filling) {
        this.ayudaLuckySrc = '';
        return;
      }
      this.pickRandomLucky();
      this.luckyRotateTimer = setInterval(() => this.pickRandomLucky(), 2800);
      return;
    }
    this.ayudaLuckySrc = '';
  }
  toggleOption(option: 'suscribir' | 'duda') {
    this.activeOption = this.activeOption === option ? null : option;
    this.onAyudaFormTouch();
  }

  onAyudaFormTouch() {
    this.stopLuckyRotate();
    if (this.activeOption === 'suscribir') {
      const filling = [this.newsletterName, this.newsletterEmail].some((v) => (v || '').trim().length > 0);
      this.ayudaLuckySrc = filling ? this.luckyNewsletter : '';
      return;
    }
    if (this.activeOption === 'duda') {
      const filling = [this.dudaName, this.dudaEmail, this.dudaTelephone, this.dudaSubject, this.dudaMessage].some(
        (v) => (v || '').trim().length > 0
      );
      if (!filling) {
        this.ayudaLuckySrc = '';
        return;
      }
      this.pickRandomLucky();
      this.luckyRotateTimer = setInterval(() => this.pickRandomLucky(), 2800);
      return;
    }
    this.ayudaLuckySrc = '';
  }

  private pickRandomLucky() {
    const pool = this.luckyPool;
    if (!pool.length) return;
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) {
      let guard = 0;
      while (next === this.ayudaLuckySrc && guard++ < 8) {
        next = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    this.ayudaLuckySrc = next;
  }

  private stopLuckyRotate() {
    if (this.luckyRotateTimer) {
      clearInterval(this.luckyRotateTimer);
      this.luckyRotateTimer = null;
    }
  }


}