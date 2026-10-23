import { HeroCrumbsComponent, HeroCrumb, breadcrumbJsonLd } from '../../../../../shared/ui/hero-crumbs/hero-crumbs.component';
import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CafeNavComponent } from '../../components/cafe-nav/cafe-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

interface HubSubcat {
  title: string;
  desc: string;
  link: string;
  icon: string;
}

/**
 * SEO propio de cada subcategoría de accesorios (/accesorios-para-poner-una-cafeteria/<slug>/).
 * Derivado solo de los nombres/descripciones existentes de cada tarjeta (sin claims nuevos).
 * Estas páginas aún comparten el cuerpo del hub (sin productos propios), por eso NO están en el sitemap.
 */
const ACCESORIOS_SUBCAT_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  'barista-espresso': {
    title: 'Accesorios de barista y espresso | Café Etrusca',
    description:
      'Accesorios de barista y espresso para tu cafetería: herramientas para preparar espresso en barra. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios de barista, accesorios para espresso, accesorios para cafetería, Café Etrusca'
  },
  'metodo-extraccion': {
    title: 'Accesorios para métodos de extracción | Café Etrusca',
    description:
      'Accesorios y elementos para métodos de extracción manual en tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para métodos de extracción, métodos manuales, accesorios para cafetería, Café Etrusca'
  },
  'te-servicio': {
    title: 'Accesorios para té y servicio | Café Etrusca',
    description:
      'Accesorios para té y servicio en tu cafetería, para disfrutar cada infusión. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para té, accesorios de servicio, accesorios para cafetería, Café Etrusca'
  },
  'bebidas-frias': {
    title: 'Accesorios para bebidas frías y complementos | Café Etrusca',
    description:
      'Accesorios y complementos para bebidas frías y creativas en tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para bebidas frías, complementos para cafetería, accesorios para cafetería, Café Etrusca'
  },
  'catacion-medicion': {
    title: 'Accesorios de catación y medición | Café Etrusca',
    description:
      'Accesorios de catación y medición para tu cafetería, con precisión en cada preparación. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios de catación, medición de café, accesorios para cafetería, Café Etrusca'
  },
  limpieza: {
    title: 'Accesorios de limpieza y mantenimiento | Café Etrusca',
    description:
      'Accesorios de limpieza y mantenimiento para cuidar el equipo de tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'limpieza de máquinas de café, mantenimiento, accesorios para cafetería, Café Etrusca'
  }
};

@Component({
  selector: 'app-product-hub-page',
  standalone: true,
  imports: [HeroCrumbsComponent, RouterLink, InsumosCtaComponent, ScrollWaveComponent, CafeNavComponent],
  template: `
    <div class="ins-page">
      <section class="ins-hero hub-hero" [style.background]="heroBg">
        @if (hubKey === 'cafe') {
          <img class="hub-hero-blob" src="/assets/images/insumos/blob-hero-navy.webp" alt="" aria-hidden="true">
        }
        <div class="ins-hero-copy">
          @if (crumbs.length) { <app-hero-crumbs [items]="crumbs" /> }
          <h1>{{ title }}</h1>
          <p class="lead">{{ lead }}</p>
          @if (hubKey === 'cafe' && subcats.length) {
            <p class="body">Explora nuestras líneas de café: Premium para barra diaria, Café de especialidad Barista Champ y Café en verde como materia prima con trazabilidad.</p>
          } @else if (hubKey === 'accesorios' && subcats.length) {
            <p class="body">Herramientas para preparar, medir, servir y mantener tu barra. Equipa tu negocio con accesorios de calidad para llevar cada taza al siguiente nivel.</p>
            <a class="btn-catalog" href="#categorias-accesorios">Explorar accesorios</a>
          } @else {
            <p class="body">Estamos armando esta categoría con el mismo detalle que Insumos. Mientras tanto explora el catálogo o pide asesoría.</p>
            <a class="btn-catalog" routerLink="/insumos-para-cafeterias">Ver insumos</a>
          }
        </div>
        <div class="ins-hero-media">
          <img [src]="img" [alt]="title">
        </div>
        <app-scroll-wave position="bottom" [fillColor]="heroBg"></app-scroll-wave>
      </section>

      @if (hubKey === 'cafe') {
        <app-cafe-nav [allColor]="true"></app-cafe-nav>
      }

      @if ((hubKey === 'cafe' || hubKey === 'accesorios') && subcats.length) {
        <section class="ins-section" [attr.id]="hubKey === 'accesorios' ? 'categorias-accesorios' : null" [attr.aria-label]="hubKey === 'accesorios' ? 'Categorías de accesorios' : 'Subcategorías de café'">
          <h2 class="section-title-center">{{ hubKey === 'accesorios' ? 'Categorías' : 'Líneas de café' }}</h2>
          <div class="hub-subcats">
            @for (s of subcats; track s.link) {
              <a class="hub-subcat" [class.is-active]="s.link === activeLink" [routerLink]="s.link" [attr.aria-current]="s.link === activeLink ? 'page' : null">
                <img [src]="s.icon" alt="" width="72" height="72">
                <div>
                  <strong>{{ s.title }}</strong>
                  <span>{{ s.desc }}</span>
                </div>
              </a>
            }
          </div>
        </section>
      }

      <app-insumos-cta></app-insumos-cta>
    </div>
  `,
  styles: [`
    /* cafe-blob: mismo blob que el hero de jarabes */
    .hub-hero-blob {
      position: absolute; right: 0; bottom: 0;
      height: min(94%, 760px); width: auto; max-width: 62%;
      object-fit: contain; object-position: right bottom;
      z-index: 2; pointer-events: none; user-select: none;
    }
    .hub-hero .ins-hero-copy { position: relative; z-index: 3; }
    @media (max-width: 800px) {
      .hub-hero-blob { height: auto; max-height: 52%; max-width: 92%; }
    }

    /* hub-h2-home-sep */
    .ins-section > h2 {
      margin: 0 0 0.35rem;
      font-weight: 700;
      font-size: 2.2rem;
      letter-spacing: normal;
      text-transform: none;
      color: var(--etrusca-navy-900, #283039);
      line-height: 1.15;
      text-align: center;
    }
    .ins-section > h2::after {
      content: "";
      display: block;
      width: min(549px, 80%);
      height: 30px;
      margin: 0.35rem auto 1.6rem;
      background: url('https://imagenes.cafeetrusca.com/corporativo/assets/images/separador.png') center / contain no-repeat;
    }

    .hub-subcats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .hub-subcat {
      display: flex;
      gap: 1rem;
      align-items: center;
      text-decoration: none;
      color: inherit;
      background: #f7f3ec;
      border: 1.5px solid #eadcc8;
      border-radius: 22px;
      padding: 1.15rem 1.2rem;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .hub-subcat.is-active {
      border-color: var(--etrusca-navy-900, #283039);
      box-shadow: 0 0 0 2px var(--etrusca-navy-900, #283039) inset;
    }
    .hub-subcat:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(20, 17, 14, 0.08);
      color: inherit;
    }
    .hub-subcat img {
      width: 84px;
      height: 84px;
      object-fit: contain;
      flex: 0 0 auto;
      border-radius: 50%;
      background: #e8e8e8;
      padding: 14px;
      box-sizing: border-box;
    }
    .hub-subcat:nth-child(1) img { background: #f6e27a; }
    .hub-subcat:nth-child(2) img { background: #ffd19a; }
    .hub-subcat:nth-child(3) img { background: #c6f08a; }
    .hub-subcat strong {
      display: block;
      font-weight: 900;
      font-size: 1.15rem;
      color: var(--etrusca-navy-900, #283039);
      margin-bottom: 0.25rem;
    }
    .hub-subcat span {
      display: block;
      font-size: 0.95rem;
      line-height: 1.4;
      color: rgba(20, 17, 14, 0.75);
    }
    @media (max-width: 640px) {
      .hub-subcats { grid-template-columns: 1fr; }
    }
  `],
  styleUrls: ['../../insumos-theme.scss']
})
export class ProductHubPageComponent {
  title = 'Productos';
  lead = '';
  img = `/assets/images/insumos/cafe-bag-sin-fondo.webp`;
  heroBg = '#f4eee4';
  hubKey = '';
  subcats: HubSubcat[] = [];
  activeLink = '';
  crumbs: HeroCrumb[] = [];

  private seo = inject(SeoService);

  constructor(route: ActivatedRoute) {
    const key = route.snapshot.data['hub'] as string;
    this.hubKey = key;
    const map: Record<string, { title: string; lead: string; img: string; heroBg: string }> = {
      cafe: {
        title: 'CAFÉ',
        lead: 'Perfiles que despiertan los sentidos.',
        img: `/assets/images/insumos/cafe-bag-sin-fondo.webp`,
        heroBg: '#f4eee4'
      },
      accesorios: {
        title: 'ACCESORIOS',
        lead: 'Herramientas para preparar, medir, servir y mantener tu barra.',
        img: `${ASSETS_BASE_URL}/images/insumos/hero-products-left.png`,
        heroBg: '#283039'
      },
      maquinas: {
        title: 'MÁQUINAS',
        lead: 'Rendimiento y tecnología para tu operación.',
        img: `${ASSETS_BASE_URL}/images/insumos/baristas.png`,
        heroBg: '#f4eee4'
      }
    };
    const v = map[key];
    if (v) {
      this.title = v.title;
      this.lead = v.lead;
      this.img = v.img;
      this.heroBg = v.heroBg;
    }

    if (key === 'cafe') {
      this.subcats = [
        {
          title: 'Café Premium',
          desc: 'Línea confiable y balanceada para espresso, leche y menú diario.',
          link: '/productos/cafe/premium',
          icon: `${ASSETS_BASE_URL}/images/cafe/nav/premium.png`
        },
        {
          title: 'Café de especialidad',
          desc: 'Barista Champ: orígenes mexicanos con trazabilidad y más de 80 puntos SCA.',
          link: '/productos/cafe/especialidad',
          icon: `${ASSETS_BASE_URL}/images/cafe/nav/especialidad.png`
        },
        {
          title: 'Café en verde',
          desc: 'Materia prima con trazabilidad y control de calidad para tueste.',
          link: '/productos/cafe/verde',
          icon: `${ASSETS_BASE_URL}/images/cafe/nav/verde.png`
        }
      ];
    }

    if (key === 'accesorios') {
      this.subcats = [
        {
          title: 'Barista y Espresso',
          desc: 'Herramientas para un espresso perfecto.',
          link: '/accesorios-para-poner-una-cafeteria/barista-espresso',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/barista-espresso.png`
        },
        {
          title: 'Método de extracción',
          desc: 'Elementos para métodos manuales.',
          link: '/accesorios-para-poner-una-cafeteria/metodo-extraccion',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/metodo-extraccion.png`
        },
        {
          title: 'Té y servicio',
          desc: 'Accesorios para disfrutar cada infusión.',
          link: '/accesorios-para-poner-una-cafeteria/te-servicio',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/te-servicio.png`
        },
        {
          title: 'Bebidas frías y Complementos',
          desc: 'Soluciones para bebidas frías y creativas.',
          link: '/accesorios-para-poner-una-cafeteria/bebidas-frias',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/bebidas-frias.png`
        },
        {
          title: 'Catación y medición',
          desc: 'Precisión para mejores resultados.',
          link: '/accesorios-para-poner-una-cafeteria/catacion-medicion',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/catacion-medicion.png`
        },
        {
          title: 'Limpieza y mantenimiento',
          desc: 'Cuida tu equipo y alarga su vida útil.',
          link: '/accesorios-para-poner-una-cafeteria/limpieza',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/limpieza.png`
        }
      ];
    }

    const seoMap: Record<string, { title: string; description: string; keywords: string }> = {
      cafe: {
        title: 'Cafés Especiales: Mezclas especiales y Café de Especialidad Mexicano',
        description:
          'Cafés especiales de alta calidad, de buenas prácticas agrícolas, procesos muy bien cuidados y de trabajo directo en campo junto con los productores.',
        keywords: 'Café,Premium,Mezcla,Especial,cafeteria,cafe puro,tueste'
      },
      accesorios: {
        title: 'Accesorios para poner una cafetería - Encuentra todo lo que necesitas',
        description:
          'Accesorios para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
        keywords: 'Accesorios para poner una cafetería, equipo para barista, jarras, molinos, Café Etrusca'
      },
      maquinas: {
        title: 'Maquina y Equipo para poner una cafetería - Encuentra todo lo que necesitas',
        description:
          'Maquina y Equipo para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
        keywords: 'Maquina y Equipo para poner una cafetería, cafeteria,como iniciar una cafeteria,como poner una cafeteria'
      }
    };
    const seo = seoMap[key];
    const hubTitle = this.title;
    const hubLead = this.lead;
    // The component is reused between /accesorios-para-poner-una-cafeteria/:slug pages: react to the param.
    route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      const sub = key === 'accesorios' && slug ? this.subcats.find((s) => s.link.endsWith('/' + slug)) : undefined;
      const subSeo = sub ? ACCESORIOS_SUBCAT_SEO[slug] : undefined;
      this.activeLink = sub ? sub.link : '';
      const hubPath = key === 'cafe' ? '/productos/cafe' : '';
      const hubLabel = key === 'cafe' ? 'Café' : '';
      this.crumbs = hubPath ? [{ label: 'Inicio', path: '/' }, { label: hubLabel, path: hubPath }] : [];
      this.title = sub ? sub.title.toUpperCase() : hubTitle;
      this.lead = sub ? sub.desc : hubLead;
      const meta = subSeo || seo;
      if (meta) {
        this.seo.set({
          ...meta,
          image: this.img,
          ...(this.crumbs.length ? { jsonLd: () => [breadcrumbJsonLd(this.crumbs)] } : {})
        });
      }
    });
  }
}
