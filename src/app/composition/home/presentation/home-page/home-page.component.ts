import { ASSETS_BASE_URL, absoluteAssetUrl } from '../../../../shared/kernel/config/assets-url';
import { apiUrl } from '../../../../shared/kernel/config/api-url';
﻿import { DISTRIBUTORS } from '../../../../domains/corporate/presentation/pages/contact-page/contacto.data';
import { Component, ElementRef, QueryList, ViewChildren, OnDestroy, OnInit, inject, afterNextRender } from '@angular/core';
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
  /** Hero: false = solo el slide "CAFE ETRUSCA" (sin dots/flechas/autoplay). true = reactiva los 7 slides. */
  protected readonly heroShowAllSlides = true; // LOCAL TEST slider 1x1 2026-11-09
  /** Desarrollo 2026-11-10: oculta del carrusel hero los slides de kits (La Fenice, Barista básico, Bubble Tea, Toddy 1 y 2) y, a petición de Héctor (t690u), también Hario. Poner true para reactivarlos. */
  protected readonly heroShowKitSlides = false;
  /** Índices de indicadores solo para slides visibles. Con kits y Hario ocultos: Promociones, Aromas de invierno, Recetario, CAFÉ ETRUSCA (4). Si heroShowKitSlides=true, son 10. */
  protected get heroIndicatorIndexes(): number[] {
    return this.heroShowKitSlides ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [0, 1, 2, 3];
  }
  private http = inject(HttpClient);

  homeRecipes: Recipe[] = /* Temporada actual: invierno (colección invierno-2024). Calabaza: ['pumpkin-cold-brew', 'dirty-pumpkin-chai', 'mokalabaza-latte', 'bubble-pumpkin'] */
    ['noche-de-invierno-latte', 'copito-de-chocolate-blanco', 'latte-de-noel', 'solsticio-de-lavanda-frio']
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
    `${ASSETS_BASE_URL}/images/mascota.webp`
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


  // Últimos videos: el sorteo corre en el navegador (afterNextRender) para que
  // cambie al recargar. En SSR/prerender se usa el primer elemento de cada lista.
  readonly ultimosTiktok: { url: string; image: string; title: string; alt: string }[] = [
    {
      url: 'https://www.tiktok.com/@cafe_etrusca/video/7707789202460527880',
      image: 'tiktok-equilibrar-gastos-urnex-dezcal.webp',
      title: '¡Las promociones llegaron!',
      alt: 'Hombre con lentes meditando sobre una mesa de madera con un bote Urnex Dezcal en la cabeza'
    },
    {
      url: 'https://www.tiktok.com/@cafe_etrusca/video/7707050055617776914',
      image: 'tiktok-conoces-nuestros-cursos.webp',
      title: '¿Ya conoces todos nuestros cursos?',
      alt: 'Mujer con mandil de Café Etrusca Cursos y Talleres sentada frente a un fondo de ladrillo'
    },
    {
      url: 'https://www.tiktok.com/@cafe_etrusca/video/7698404438922235154',
      image: 'tiktok-senal-para-emprender.webp',
      title: 'Esta es tu señal para comenzar a emprender.',
      alt: 'Hombre trabajando en una mesa con una caja de té Ten Zyu, un vaso de té y una computadora'
    },
    {
      url: 'https://www.tiktok.com/@cafe_etrusca/video/7696229075475533063',
      image: 'tiktok-pasado-presente-futuro-bebida.webp',
      title: 'Ayer fue un sueño. Hoy es una bebida que cobra vida.',
      alt: 'Tres momentos de una bebida ChillOut Chocomenta: insumos, preparación y cata'
    },
    {
      url: 'https://www.tiktok.com/@cafe_etrusca/video/7695081146052300050',
      image: 'tiktok-cuatro-propuestas-menu.webp',
      title: 'Cuatro propuestas para renovar tu menú',
      alt: 'Cuatro propuestas de menú sobre una mesa de madera: Dulce Matcha de calabaza frío, Otoñal de manzana dorada frío, Ancestral de cempasúchil frío y Choco spice frío'
    },
    {
      url: 'https://www.tiktok.com/@cafe_etrusca/video/7694744678234623250',
      image: 'tiktok-jarabe-calabaza-chai-chillout.webp',
      title: 'Te compartimos una idea para aprovechar al máximo nuestros insumos',
      alt: 'Primer plano de una botella de jarabe de agave ChillOut sabor calabaza chai'
    },
    {
      url: 'https://www.tiktok.com/@cafe_etrusca/video/7694369906170629383',
      image: 'tiktok-productos-en-descuento-catalogo.webp',
      title: 'Esto y más productos en descuento, pregunta por nuestro catálogo',
      alt: 'Mujer con cabello rosa sosteniendo dos latas ChillOut Mix de dulce de calabaza y chocomenta'
    }
  ];
  // Facebook e Instagram: los 5 y 6 más recientes (Instagram omite el post fijado).
  // barista-champ-global-coffee-awards-2026-silver.webp y taller-mixologia-cafe-etrusca.webp se conservan en R2; ya no entran en la rotación por no estar entre esos posts.
  readonly ultimosFacebook: { url: string; image: string; title: string; alt: string }[] = [
    {
      url: 'https://www.facebook.com/cafeetrusca/posts/pfbid02ApK68K3udPZcwu5hjLh9n1onV2mUJNdneRFndgf8wFkkCNpmZPxb4xrEXnsn3a3Bl',
      image: 'facebook-taller-mixologia-7-tecnicas.webp',
      title: '7 técnicas. Nuevas combinaciones.',
      alt: 'Mano sirviendo un cóctel rojo en copa, taller de mixología de Café Etrusca'
    },
    {
      url: 'https://www.facebook.com/cafeetrusca/videos/1194390896354141/',
      image: 'facebook-programa-24-marca-negocios-eventos.webp',
      title: 'Programa 24 | Tu marca en negocios o eventos corporativos',
      alt: 'Hombre en un escritorio de madera durante una transmisión de Café Etrusca'
    },
    {
      url: 'https://www.facebook.com/reel/2051234655566314/',
      image: 'instagram-todo-lo-que-tu-negocio-necesita.webp',
      title: '¡Todo lo que tu negocio necesita está a un clic de distancia!',
      alt: 'Mujer de cabello rosa junto a un anaquel de productos en una sucursal de Café Etrusca'
    },
    {
      url: 'https://www.facebook.com/cafeetrusca/posts/pfbid0AdHNVq5jTGYezQsMtjJ1fg9aihZKbr9b67zkNe1VfAhAviFeVk5Vby3PTJjW6Ewrl',
      image: 'facebook-etrusclass-haz-que-tu-marca-llegue.webp',
      title: '¡Haz que tu marca llegue más lejos!',
      alt: 'Cartel del webinar Etrusclass con Fernando Cruz, 19 de noviembre, de 2:00 a 2:30 p.m.'
    },
    {
      url: 'https://www.facebook.com/reel/1167640925608344/',
      image: 'instagram-etrusca-comercial-asesoria.webp',
      title: 'Desde café e insumos hasta equipos, accesorios, capacitación y asesoría',
      alt: 'Hombre con chaqueta del 30 aniversario de Café Etrusca y el texto Con Etrusca Comercial, no vayas a ciegas'
    }
  ];
  readonly ultimosInstagram: { url: string; image: string; title: string; alt: string }[] = [
    {
      url: 'https://www.instagram.com/p/Df-scoVCOTm/',
      image: 'instagram-limpieza-equipo-urnex.webp',
      title: '¿Sientes que tu café ya no sabe igual?',
      alt: 'Logo Urnex y texto sobre la limpieza del equipo de café, con un producto Urnex a la derecha'
    },
    {
      url: 'https://www.instagram.com/p/Df8lCe9FATq/',
      image: 'instagram-taller-mixologia-7-tecnicas.webp',
      title: '7 técnicas. Nuevas combinaciones.',
      alt: 'Mano con tatuaje de flor vertiendo de un shaker, arte del taller de mixología'
    },
    {
      url: 'https://www.instagram.com/reel/Df5_VdYk13V/',
      image: 'instagram-todo-lo-que-tu-negocio-necesita.webp',
      title: '¡Todo lo que tu negocio necesita está a un clic de distancia!',
      alt: 'Mujer de cabello rosa junto a un anaquel de productos en una sucursal de Café Etrusca'
    },
    {
      url: 'https://www.instagram.com/reel/Df3S0PPnH4N/',
      image: 'instagram-etrusca-comercial-asesoria.webp',
      title: 'Desde café e insumos hasta equipos, accesorios, capacitación y asesoría',
      alt: 'Hombre con chaqueta del 30 aniversario de Café Etrusca y el texto Con Etrusca Comercial, no vayas a ciegas'
    },
    {
      url: 'https://www.instagram.com/p/Df2obVdFMuX/',
      image: 'instagram-si-tuvieras-que-elegir-uno.webp',
      title: 'Si tuvieras que elegir uno…',
      alt: 'Mujer bebiendo de un vaso junto a un empaque ChillOut Mix cúrcuma latte'
    },
    {
      url: 'https://www.instagram.com/p/DfyNFt4CVKk/',
      image: 'instagram-interes-por-el-cafe-conocimientos.webp',
      title: '¿Te gustaría convertir tu interés por el café en nuevos conocimientos?',
      alt: 'Vertido de leche sobre un latte art de Café Etrusca'
    }
  ];
  selectedTiktok = this.ultimosTiktok[0];
  selectedFacebook = this.ultimosFacebook[0];
  selectedInstagram = this.ultimosInstagram[0];

  constructor() {
    afterNextRender(() => {
      const stem = (image: string) => image.replace(/^(tiktok|instagram|facebook)-/i, "").toLowerCase();
      const sameContent = (
        a: { image: string; title: string },
        b: { image: string; title: string }
      ) =>
        a.image === b.image ||
        stem(a.image) === stem(b.image) ||
        a.title.trim().toLowerCase() === b.title.trim().toLowerCase();
      const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];
      const pickAvoiding = <T extends { image: string; title: string }>(
        items: T[],
        taken: T[]
      ): T => {
        const available = items.filter((item) => !taken.some((t) => sameContent(item, t)));
        return pick(available.length ? available : items);
      };
      this.selectedInstagram = pick(this.ultimosInstagram);
      this.selectedFacebook = pickAvoiding(this.ultimosFacebook, [this.selectedInstagram]);
      this.selectedTiktok = pickAvoiding(this.ultimosTiktok, [
        this.selectedInstagram,
        this.selectedFacebook
      ]);
    });
  }

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
            'https://www.instagram.com/cafe.etrusca/',
            'https://www.youtube.com/@CafeEtrusca',
            'https://www.tiktok.com/@cafe_etrusca'
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

  private readonly contactUsUrl = apiUrl('ContactUs');

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
        apiUrl('newsletter'),
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