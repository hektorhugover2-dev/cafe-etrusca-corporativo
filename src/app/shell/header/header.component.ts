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
    { id: 'insumos', label: 'Insumos', tone: 'yellow', link: '/productos/insumos' },
    { id: 'accesorios', label: 'Accesorios', tone: 'cyan', link: '/productos/accesorios' },
    { id: 'maquinas', label: 'Máquinas', tone: 'pink', link: '/productos/maquinas' }
  ];

  insumoLinks: MegaLink[] = [
    { icon: 'powder', title: 'Polvos', desc: 'Bases y sabores en polvo', link: '/productos/insumos/bases-en-polvo' },
    { icon: 'apple', title: 'Purés y concentrados', desc: 'Textura y sabor', link: '/productos/insumos/pures' },
    { icon: 'bottle', title: 'Jarabes', desc: 'Variedad de sabores', link: '/productos/insumos/jarabes' },
    { icon: 'cup', title: 'Bubble tea', desc: 'Insumos para bubble tea', link: '/productos/insumos/toppings' },
    { icon: 'bottle', title: 'Salsas', desc: 'Salsas para bebidas', link: '/productos/insumos/salsas' },
    { icon: 'leaf', title: 'Tisanas', desc: 'Mezclas para infusiones.', link: '/productos/insumos/tisanas' },
    { icon: 'leaf', title: 'Tés y tisanas', desc: 'Tés', link: '/productos/insumos/te' },
    { icon: 'leaf', title: 'Bienestar', desc: 'Opciones sin azúcar, light y naturales', link: '/productos/insumos/te' }
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

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
