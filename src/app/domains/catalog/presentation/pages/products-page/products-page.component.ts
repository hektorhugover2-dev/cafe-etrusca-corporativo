import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompromisoComponent } from '../../../../../shared/ui/compromiso/compromiso.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink, CompromisoComponent],
  templateUrl: './products-page.component.html',
  styleUrls: ['../../insumos-theme.scss']
})
export class ProductsPageComponent {
  cats = [
    {
      slug: 'cafe',
      cls: 'cafe',
      title: 'café',
      text: 'Perfiles que despiertan los sentidos.',
      img: '/assets/images/insumos/cafe-bag.png'
    },
    {
      slug: 'insumos',
      cls: 'insumos',
      title: 'Insumos',
      text: 'Ingredientes que convierten ideas en experiencias.',
      img: '/assets/images/insumos/kiwi-hero.png'
    },
    {
      slug: 'maquinas',
      cls: 'maquinas',
      title: 'máquinas',
      text: 'Rendimiento y tecnología para tu operación.',
      img: '/assets/images/insumos/baristas.png'
    },
    {
      slug: 'accesorios',
      cls: 'accesorios',
      title: 'accesorios',
      text: 'Diseñados para facilitar cada preparación.',
      img: '/assets/images/insumos/hero-products-left.png'
    }
  ];

  traits = [
    { icon: '/assets/images/insumos/icon-medal.png', label: 'Calidad profesional' },
    { icon: '/assets/images/insumos/icon-idea.png', label: 'Innovación constante' },
    { icon: '/assets/images/insumos/icon-trust.png', label: 'Respaldo confiable' },
    { icon: '/assets/images/insumos/icon-heart.png', label: 'Pasión por lo que hacemos' }
  ];
}
