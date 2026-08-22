import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';

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
          <p class="body">Estamos armando esta categoría con el mismo detalle que Insumos. Mientras tanto explora el catálogo o pide asesoría.</p>
          <a class="btn-catalog" routerLink="/productos/insumos">Ver insumos</a>
        </div>
        <div class="ins-hero-media">
          <img [src]="img" [alt]="title">
        </div>
      </section>
      <app-insumos-cta></app-insumos-cta>
    </div>
  `,
  styleUrls: ['../../insumos-theme.scss']
})
export class ProductHubPageComponent {
  title = 'Productos';
  lead = '';
  img = '/assets/images/insumos/cafe-bag.png';

  constructor(route: ActivatedRoute) {
    const key = route.snapshot.data['hub'] as string;
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
  }
}
