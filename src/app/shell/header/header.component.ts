import { Component, HostListener, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';

export interface MegaCat {
  id: string;
  label: string;
  tone: 'lime' | 'yellow' | 'cyan' | 'pink';
  link: string;
}

export interface MegaLink {
  title: string;
  desc: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  isScrolled = false;
  isHome = true;
  productPanel = 'insumos';
  eduPanel = 'talleres';
  private sub: Subscription;

  productCats: MegaCat[] = [
    { id: 'cafe', label: 'Café', tone: 'lime', link: '/productos/cafe' },
    { id: 'insumos', label: 'Insumos', tone: 'yellow', link: '/insumos-para-cafeterias' },
    { id: 'accesorios', label: 'Accesorios', tone: 'cyan', link: '/productos/accesorios' },
    { id: 'maquinas', label: 'Máquinas', tone: 'pink', link: '/maquinaria-y-equipo-para-cafeterias' }
  ];

  cafeLinks: MegaLink[] = [
    { icon: '/assets/images/cafe/icon-premium.png', title: 'Café Premium', desc: 'Línea confiable y balanceada', link: '/productos/cafe/premium' },
    { icon: '/assets/images/cafe/icon-verde.png', title: 'Café en verde', desc: 'Materia prima con trazabilidad', link: '/productos/cafe/verde' }
  ];

  maquinaLinks: MegaLink[] = [
    { icon: '/assets/images/maquinas/cat-espresso.png', title: 'Espresso', desc: 'Máquinas Reneka para barra profesional', link: '/productos/maquinas/espresso' },
    { icon: '/assets/images/maquinas/cat-espresso.png', title: 'Autoservicio', desc: 'Equipos Melitta de alto volumen', link: '/productos/maquinas/autoservicio' },
    { icon: '/assets/images/maquinas/cat-licuadoras.png', title: 'Licuadoras', desc: 'Hamilton Beach y Blendtec para barra', link: '/productos/maquinas/licuadoras' },
    { icon: '/assets/images/maquinas/cat-molinos.png', title: 'Molinos', desc: 'Ceado, Eureka, Pietro, Fiorenzato y más', link: '/productos/maquinas/molinos' },
    { icon: '/assets/images/maquinas/cat-tostadores.png', title: 'Tostadores', desc: 'Tostadores Coffee Tech de laboratorio a tienda', link: '/productos/maquinas/tostadores' }
  ];

  insumoLinks: MegaLink[] = [
    { icon: '/assets/images/insumos/categorias/bases-en-polvo.png', title: 'Polvos', desc: 'Bases y sabores en polvo', link: '/productos/insumos/bases-en-polvo' },
    { icon: '/assets/images/insumos/categorias/pures.png', title: 'Purés y concentrados', desc: 'Textura y sabor', link: '/productos/insumos/pures' },
    { icon: '/assets/images/insumos/categorias/jarabes.png', title: 'Jarabes', desc: 'Variedad de sabores', link: '/productos/insumos/jarabes' },
    { icon: '/assets/images/insumos/categorias/toppings.png', title: 'Bubble tea', desc: 'Insumos para bubble tea', link: '/productos/insumos/toppings' },
    { icon: '/assets/images/insumos/categorias/salsas.png', title: 'Salsas', desc: 'Salsas para bebidas', link: '/productos/insumos/salsas' },
    { icon: '/assets/images/insumos/categorias/tisanas.png', title: 'Tisanas', desc: 'Mezclas para infusiones.', link: '/productos/insumos/tisanas' },
    { icon: '/assets/images/insumos/categorias/te.png', title: 'Tés y tisanas', desc: 'Tés', link: '/productos/insumos/te' },
    { icon: '/assets/images/insumos/categorias/tisanas.png', title: 'Bienestar', desc: 'Opciones sin azúcar, light y naturales', link: '/productos/insumos/te' }
  ];

  eduCats: MegaCat[] = [
    { id: 'cursos', label: 'Cursos', tone: 'lime', link: '/educacion/cursos' },
    { id: 'talleres', label: 'Talleres', tone: 'yellow', link: '/educacion/talleres' },
    { id: 'experiencias', label: 'Experiencias', tone: 'cyan', link: '/educacion/experiencias' },
    { id: 'sesiones', label: 'Sesiones', tone: 'pink', link: '/educacion/sesiones' }
  ];

  get activeProductCat() {
    return this.productCats.find((c) => c.id === this.productPanel) ?? this.productCats[1];
  }

  get activeEduCat() {
    return this.eduCats.find((c) => c.id === this.eduPanel) ?? this.eduCats[1];
  }

  constructor(private router: Router) {
    this.isHome = this.isHomeUrl(this.router.url);
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
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


  onMobileNavClick(ev: Event) {
    if (typeof window === 'undefined' || window.innerWidth >= 992) return;
    const a = (ev.target as HTMLElement | null)?.closest?.('a');
    if (!a) return;
    if (a.classList.contains('dropdown-toggle')) return;
    // Opción del submenú o ítem simple → cerrar
    this.closeMobileMenu();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
