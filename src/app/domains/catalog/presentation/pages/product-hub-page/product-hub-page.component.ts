import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

interface HubSubcat {
  title: string;
  desc: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-product-hub-page',
  standalone: true,
  imports: [RouterLink, InsumosCtaComponent],
  template: `
    <div class="ins-page">
      <section class="ins-hero">
        <div class="ins-hero-copy">
          <h1>{{ title }}</h1>
          <p class="lead">{{ lead }}</p>
          @if (hubKey === 'cafe' && subcats.length) {
            <p class="body">Explora nuestras líneas de café: Premium para barra diaria, Café de especialidad Barista Champ y Café en verde como materia prima con trazabilidad.</p>
          } @else {
            <p class="body">Estamos armando esta categoría con el mismo detalle que Insumos. Mientras tanto explora el catálogo o pide asesoría.</p>
            <a class="btn-catalog" routerLink="/insumos-para-cafeterias">Ver insumos</a>
          }
        </div>
        <div class="ins-hero-media">
          <img [src]="img" [alt]="title">
        </div>
      </section>

      @if (hubKey === 'cafe' && subcats.length) {
        <section class="ins-section" aria-label="Subcategorías de café">
          <h2>Líneas de café</h2>
          <div class="hub-subcats">
            @for (s of subcats; track s.link) {
              <a class="hub-subcat" [routerLink]="s.link">
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
    .hub-subcat:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(20, 17, 14, 0.08);
      color: inherit;
    }
    .hub-subcat img {
      width: 72px;
      height: 72px;
      object-fit: contain;
      flex: 0 0 auto;
    }
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
  img = '/assets/images/insumos/cafe-bag.png';
  hubKey = '';
  subcats: HubSubcat[] = [];

  private seo = inject(SeoService);

  constructor(route: ActivatedRoute) {
    const key = route.snapshot.data['hub'] as string;
    this.hubKey = key;
    const map: Record<string, { title: string; lead: string; img: string }> = {
      cafe: {
        title: 'CAFÉ',
        lead: 'Perfiles que despiertan los sentidos.',
        img: '/assets/images/insumos/cafe-bag.png'
      },
      accesorios: {
        title: 'ACCESORIOS',
        lead: 'Diseñados para facilitar cada preparación.',
        img: '/assets/images/insumos/hero-products-left.png'
      },
      maquinas: {
        title: 'MÁQUINAS',
        lead: 'Rendimiento y tecnología para tu operación.',
        img: '/assets/images/insumos/baristas.png'
      }
    };
    const v = map[key];
    if (v) {
      this.title = v.title;
      this.lead = v.lead;
      this.img = v.img;
    }

    if (key === 'cafe') {
      this.subcats = [
        {
          title: 'Café Premium',
          desc: 'Línea confiable y balanceada para espresso, leche y menú diario.',
          link: '/productos/cafe/premium',
          icon: '/assets/images/cafe/icon-premium.png'
        },
        {
          title: 'Café de especialidad',
          desc: 'Barista Champ: orígenes mexicanos con trazabilidad y más de 80 puntos SCA.',
          link: '/productos/cafe/especialidad',
          icon: '/assets/images/cafe/icon-especialidad.png'
        },
        {
          title: 'Café en verde',
          desc: 'Materia prima con trazabilidad y control de calidad para tueste.',
          link: '/productos/cafe/verde',
          icon: '/assets/images/cafe/icon-verde.png'
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
    if (seo) {
      this.seo.set({
        ...seo,
        image: this.img,
        canonical:
          key === 'accesorios'
            ? 'https://cafeetrusca.com/accesorios-para-poner-una-cafeteria'
            : key === 'cafe'
              ? 'https://cafeetrusca.com/productos/cafe'
              : undefined
      });
    }
  }
}
