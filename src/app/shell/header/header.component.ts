import { Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { coursesByKind, Course } from '../../domains/education/presentation/education.data';
import { coursePublicPath } from '../../domains/education/presentation/course-public-paths';
import { ASSETS_BASE_URL } from '../../shared/kernel/config/assets-url';

export interface MegaCat {
  id: string;
  label: string;
  tone: 'lime' | 'yellow' | 'cyan' | 'pink';
  link: string;
  icon?: string;
}

export interface MegaLink {
  title: string;
  desc: string;
  link: string;
  icon: string;  tone?: 'yellow' | 'lime' | 'cyan' | 'pink' | 'orange' | 'coral';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
  isScrolled = false;
  isHome = true;
  productPanel = 'insumos';
  eduPanel = 'cursos';
  /** true when URL is /educacion/:kind (or deeper). Hub uses the recommend layout. */
  isEduSection = false;
  private sub: Subscription;

  
  private syncEduFromUrl(url: string) {
    const path = (url || '').split('?')[0].split('#')[0];
    this.isEduSection = path.startsWith('/educacion/');
    if (path.startsWith('/educacion/cursos')) this.eduPanel = 'cursos';
    else if (path.startsWith('/educacion/talleres')) this.eduPanel = 'talleres';
    else if (path.startsWith('/educacion/experiencias')) this.eduPanel = 'experiencias';
    else if (path.startsWith('/educacion/sesiones')) this.eduPanel = 'sesiones';
  }

  private syncProductPanelFromUrl(url: string) {
    const path = (url || '').split('?')[0].split('#')[0];
    if (path.startsWith('/productos/cafe')) this.productPanel = 'cafe';
    else if (path.startsWith('/insumos-para-cafeterias') || path.startsWith('/productos/insumos')) this.productPanel = 'insumos';
    else if (path.startsWith('/accesorios-para-poner-una-cafeteria')) this.productPanel = 'accesorios';
    else if (path.startsWith('/maquinaria-y-equipo-para-cafeterias') || path.startsWith('/productos/maquinas')) this.productPanel = 'maquinas';
  }

  productCats: MegaCat[] = [
    { id: 'cafe', label: 'Café', tone: 'lime', link: '/productos/cafe', icon: `${ASSETS_BASE_URL}/images/productos/nav/cafe.png` },
    { id: 'insumos', label: 'Insumos', tone: 'yellow', link: '/insumos-para-cafeterias', icon: `${ASSETS_BASE_URL}/images/productos/nav/insumos.png` },
    { id: 'accesorios', label: 'Accesorios', tone: 'cyan', link: '/accesorios-para-poner-una-cafeteria', icon: `${ASSETS_BASE_URL}/images/productos/nav/accesorios.png` },
    { id: 'maquinas', label: 'Máquinas', tone: 'pink', link: '/maquinaria-y-equipo-para-cafeterias', icon: `${ASSETS_BASE_URL}/images/productos/nav/maquinas.png` }
  ];

    cafeLinks: MegaLink[] = [
    { icon: `${ASSETS_BASE_URL}/images/cafe/nav/premium.png`, title: 'Café premium', desc: 'Línea confiable y balanceada', link: '/productos/cafe/premium', tone: 'yellow' },
    { icon: `${ASSETS_BASE_URL}/images/cafe/nav/especialidad.png`, title: 'Café de especialidad', desc: 'Barista Champ, orígenes con historia', link: '/productos/cafe/especialidad', tone: 'orange' },
    { icon: `${ASSETS_BASE_URL}/images/cafe/nav/verde.png`, title: 'Café en verde', desc: 'Materia prima con trazabilidad', link: '/productos/cafe/verde', tone: 'lime' }
  ];

    maquinaLinks: MegaLink[] = [
  { icon: `${ASSETS_BASE_URL}/images/maquinas/nav/espresso.png`, title: 'Espresso', desc: 'Máquinas Reneka para barra profesional', link: '/maquinaria-y-equipo-para-cafeterias/espresso' },
  { icon: `${ASSETS_BASE_URL}/images/maquinas/nav/licuadoras.png`, title: 'Licuadoras', desc: 'Hamilton Beach para barra profesional', link: '/maquinaria-y-equipo-para-cafeterias/licuadoras' },
  { icon: `${ASSETS_BASE_URL}/images/maquinas/nav/molinos.png`, title: 'Molinos', desc: 'Ceado y Fiorenzato para espresso y filtro', link: '/maquinaria-y-equipo-para-cafeterias/molinos' },
  { icon: `${ASSETS_BASE_URL}/images/maquinas/nav/tostadores.png`, title: 'Tostadores', desc: 'Tostadores Coffee Tech de laboratorio a tienda', link: '/maquinaria-y-equipo-para-cafeterias/tostadores' }
];

    insumoLinks: MegaLink[] = [
    { icon: `${ASSETS_BASE_URL}/images/insumos/categorias/bases-en-polvo.png`, title: 'Polvos', desc: 'Bases y sabores en polvo', link: '/insumos-para-cafeterias/bases-en-polvo', tone: 'lime' },
    { icon: `${ASSETS_BASE_URL}/images/insumos/categorias/pures.png`, title: 'Purés y concentrados', desc: 'Textura y sabor', link: '/insumos-para-cafeterias/pures', tone: 'cyan' },
    { icon: `${ASSETS_BASE_URL}/images/insumos/categorias/jarabes.png`, title: 'Jarabes', desc: 'Variedad de sabores', link: '/insumos-para-cafeterias/jarabes', tone: 'yellow' },
    { icon: `${ASSETS_BASE_URL}/images/insumos/categorias/toppings.png`, title: 'Bubble tea', desc: 'Insumos para bubble tea', link: '/insumos-para-cafeterias/toppings', tone: 'coral' },
    { icon: `${ASSETS_BASE_URL}/images/insumos/categorias/salsas.png`, title: 'Salsas', desc: 'Salsas para bebidas', link: '/insumos-para-cafeterias/salsas', tone: 'lime' },
    { icon: `${ASSETS_BASE_URL}/images/insumos/categorias/tisanas.png`, title: 'Tisanas', desc: 'Mezclas para infusiones.', link: '/insumos-para-cafeterias/tisanas', tone: 'orange' },
    { icon: `${ASSETS_BASE_URL}/images/insumos/categorias/te.png`, title: 'Tés y tisanas', desc: 'Tés', link: '/insumos-para-cafeterias/te', tone: 'pink' },
    { icon: `${ASSETS_BASE_URL}/images/insumos/categorias/tisanas.png`, title: 'Bienestar', desc: 'Opciones sin azúcar, light y naturales', link: '/insumos-para-cafeterias/bienestar', tone: 'orange' }
  ];

  accesorioLinks: MegaLink[] = [
    { icon: `${ASSETS_BASE_URL}/images/accesorios/nav/barista-espresso.png`, title: 'Barista y espresso', desc: 'Herramientas para un espresso perfecto', link: '/accesorios-para-poner-una-cafeteria/barista-espresso', tone: 'cyan' },
    { icon: `${ASSETS_BASE_URL}/images/accesorios/nav/metodo-extraccion.png`, title: 'Método de extracción', desc: 'Elementos para métodos manuales', link: '/accesorios-para-poner-una-cafeteria/metodo-extraccion', tone: 'lime' },
    { icon: `${ASSETS_BASE_URL}/images/accesorios/nav/te-servicio.png`, title: 'Té y servicio', desc: 'Accesorios para cada infusión', link: '/accesorios-para-poner-una-cafeteria/te-servicio', tone: 'yellow' },
    { icon: `${ASSETS_BASE_URL}/images/accesorios/nav/bebidas-frias.png`, title: 'Bebidas frías y complementos', desc: 'Soluciones para bebidas frías y creativas', link: '/accesorios-para-poner-una-cafeteria/bebidas-frias', tone: 'orange' },
    { icon: `${ASSETS_BASE_URL}/images/accesorios/nav/catacion-medicion.png`, title: 'Catación y medición', desc: 'Precisión para mejores resultados', link: '/accesorios-para-poner-una-cafeteria/catacion-medicion', tone: 'pink' },
    { icon: `${ASSETS_BASE_URL}/images/accesorios/nav/limpieza.png`, title: 'Limpieza y mantenimiento', desc: 'Cuida tu equipo y alarga su vida útil', link: '/accesorios-para-poner-una-cafeteria/limpieza', tone: 'coral' }
  ];

  eduCats: MegaCat[] = [
    { id: 'cursos', label: 'Cursos', tone: 'lime', link: '/educacion/cursos', icon: '/assets/images/educacion/nav-linea/cat-cursos.png' },
    { id: 'talleres', label: 'Talleres', tone: 'yellow', link: '/educacion/talleres', icon: '/assets/images/educacion/nav-linea/cat-talleres.png' },
    { id: 'experiencias', label: 'Experiencias', tone: 'cyan', link: '/educacion/experiencias', icon: '/assets/images/educacion/nav-linea/cat-experiencias.png' },
    { id: 'sesiones', label: 'Sesiones', tone: 'pink', link: '/educacion/sesiones', icon: '/assets/images/educacion/nav-linea/cat-sesiones.png' }
  ];

  cursoLinks: MegaLink[] = [
    { icon: '/assets/images/educacion/nav-linea/formacion-de-emprendedores.svg', title: 'Formación de emprendedores', desc: 'Bases para abrir y operar tu cafetería', link: '/emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria', tone: 'lime' },
    { icon: '/assets/images/educacion/nav-linea/tostado-basico.svg', title: 'Tostado básico', desc: 'Etapas de tueste y curvas con criterio', link: '/taller-basico-de-tostado-de-cafe', tone: 'yellow' }
  ];

  tallerLinks: MegaLink[] = [
    { icon: '/assets/images/educacion/nav-linea/formacion-barista.svg', title: 'Formación para un barista', desc: 'Fundamentos de barra profesional', link: '/educacion/talleres/formacion-barista', tone: 'lime' },
    { icon: '/assets/images/educacion/nav-linea/arte-latte.svg', title: 'Arte latte', desc: 'Técnica y práctica de vertido', link: '/taller-de-arte-latte-nivel-basico', tone: 'yellow' },
    { icon: '/assets/images/educacion/nav-linea/metodos-de-extraccion.svg', title: 'Métodos de extracción', desc: 'Brewing con precisión', link: '/taller-de-brew-bar', tone: 'cyan' },
    { icon: '/assets/images/educacion/nav-linea/bebidas-frias.png', title: 'Bebidas frías', desc: 'Menú frío con giro de temporada', link: '/educacion/talleres/bebidas-frias', tone: 'orange' },
    { icon: '/assets/images/educacion/nav-linea/bubble-tea-iced-coffee.svg', title: 'Bubble tea e iced coffee', desc: 'Clásicos y variaciones', link: '/taller-de-bubble-tea-&-iced-coffee', tone: 'coral' },
    { icon: '/assets/images/educacion/nav-linea/barista-especializado.svg', title: 'Barista especializado', desc: 'Nivel avanzado de barra', link: '/taller-para-baristas-especializados', tone: 'lime' },
    { icon: '/assets/images/educacion/nav-linea/arte-latte-especializado.svg', title: 'Arte latte especializado', desc: 'Diseños y consistencia', link: '/taller-de-arte-latte-especializados', tone: 'yellow' },
    { icon: '/assets/images/educacion/nav-linea/bubble-tea-especializado.svg', title: 'Bubble tea especializado', desc: 'Nivel avanzado de bubble tea', link: '/taller-de-bubble-tea-especializado', tone: 'coral' },
    { icon: '/assets/images/educacion/nav-linea/mixologia.svg', title: 'Mixología', desc: 'Creatividad en bebidas', link: '/taller-de-mixologia-con-cafe-sin-alcohol', tone: 'pink' }
  ];

  private readonly eduNavIconBySlug: Record<string, string> = {
    'arte-creatividad-mixologia': '/assets/images/educacion/nav-linea/arte-creatividad-mixologia-negro.png',
    'coffee-lover-en-invierno': '/assets/images/educacion/nav-linea/coffee-lover-en-invierno-negro.png',
    'inmersiona-te': '/assets/images/educacion/nav-linea/inmersiona-te-negro.png',
    'pumpkin-vibes': '/assets/images/educacion/nav-linea/pumpkin-vibes-negro.png',
    'elixir-del-terror': '/assets/images/educacion/nav-linea/elixir-del-terror-negro.png',
    'un-otono-calido': '/assets/images/educacion/nav-linea/un-otono-calido-negro.png',
    'sorbos-de-chillout-en-otono': '/assets/images/educacion/nav-linea/sorbos-de-chillout-en-otono-negro.png',
    'cafe-de-temporada': '/assets/images/educacion/nav-linea/cafe-de-temporada-negro.png',
    'tisanas-para-las-posadas': '/assets/images/educacion/nav-linea/tisanas-para-las-posadas-negro.png',
    'nochebuena-calida': '/assets/images/educacion/nav-linea/nochebuena-calida-negro.png',
  };

  private readonly eduLinkTones: Array<MegaLink['tone']> = ['cyan', 'pink', 'orange', 'lime', 'yellow', 'coral'];

  private courseToEduMegaLink(c: Course, fallbackIcon: string, index: number): MegaLink {
    const desc = (c.summary || c.kicker || '').trim();
    return {
      icon: this.eduNavIconBySlug[c.slug] || fallbackIcon,
      title: c.title,
      desc: desc.length > 72 ? desc.slice(0, 69) + '...' : desc,
      link: coursePublicPath(c),
      tone: this.eduLinkTones[index % this.eduLinkTones.length],
    };
  }

  /** Experiencias vigentes: fechas actuales o futuras (misma regla que las cards). */
  get experienciaLinks(): MegaLink[] {
    return coursesByKind('experiencias').map((c, i) =>
      this.courseToEduMegaLink(c, '/assets/images/educacion/nav-linea/cat-experiencias.png', i)
    );
  }

  /** Sesiones vigentes: fechas actuales o futuras (misma regla que las cards). */
  get sesionLinks(): MegaLink[] {
    return coursesByKind('sesiones').map((c, i) =>
      this.courseToEduMegaLink(c, '/assets/images/educacion/nav-linea/cat-sesiones.png', i)
    );
  }


  get activeProductCat() {
    return this.productCats.find((c) => c.id === this.productPanel) ?? this.productCats[1];
  }

  get activeEduCat() {
    return this.eduCats.find((c) => c.id === this.eduPanel) ?? this.eduCats[0];
  }

  get eduLinks(): MegaLink[] {
    switch (this.eduPanel) {
      case 'cursos': return this.cursoLinks;
      case 'talleres': return this.tallerLinks;
      case 'experiencias': return this.experienciaLinks;
      case 'sesiones': return this.sesionLinks;
      default: return this.cursoLinks;
    }
  }

  get eduCtaLabel(): string {
    switch (this.eduPanel) {
      case 'cursos': return 'Ver todos los cursos';
      case 'talleres': return 'Ver todos los talleres';
      case 'experiencias': return 'Ver todas las experiencias';
      case 'sesiones': return 'Ver todas las sesiones';
      default: return 'Ver formación';
    }
  }

  constructor(private router: Router) {
    this.syncProductPanelFromUrl(this.router.url);
    this.syncEduFromUrl(this.router.url);
    this.isHome = this.isHomeUrl(this.router.url);
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
      this.syncProductPanelFromUrl(this.router.url);
        this.syncEduFromUrl(this.router.url);
        this.isHome = this.isHomeUrl(e.urlAfterRedirects);
      });
  }

  private isHomeUrl(url: string): boolean {
    const path = url.split('?')[0];
    return path === '/' || path === '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = typeof window !== 'undefined' && window.scrollY > 50;
  }

  /** Cierra el collapse de Bootstrap solo en viewport móvil (< lg). */
  closeMobileMenu() {
    if (typeof window === 'undefined' || window.innerWidth >= 992) return;
    const nav = document.getElementById('navbarNav');
    if (!nav || !nav.classList.contains('show')) return;

    const BS = (window as any).bootstrap;
    if (BS?.Collapse) {
      const instance = BS.Collapse.getInstance(nav) || new BS.Collapse(nav, { toggle: false });
      instance.hide();
      return;
    }

    nav.classList.remove('show');
    const toggler = document.querySelector('.navbar-toggler') as HTMLElement | null;
    toggler?.setAttribute('aria-expanded', 'false');
    toggler?.classList.add('collapsed');
  }

  /** En desktop navega al hub; en móvil solo abre/cierra el submenú. */
  onMegaRootClick(ev: MouseEvent) {
    if (typeof window !== 'undefined' && window.innerWidth < 992) {
      ev.preventDefault();
    }
  }

  onMobileNavClick(ev: Event) {
    if (typeof window === 'undefined' || window.innerWidth >= 992) return;
    const a = (ev.target as HTMLElement | null)?.closest?.('a');
    if (!a) return;
    if (a.classList.contains('dropdown-toggle') && !a.hasAttribute('data-nav-root')) return;
    this.closeMobileMenu();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}