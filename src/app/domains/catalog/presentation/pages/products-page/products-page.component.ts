import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompromisoComponent } from '../../../../../shared/ui/compromiso/compromiso.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink, CompromisoComponent, ScrollWaveComponent],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.set({
      title: 'Productos para cafeterías | Café Etrusca',
      description: 'Café, insumos, maquinaria, equipo y accesorios para poner, renovar o innovar tu cafetería.',
      keywords: 'productos para cafetería,café de especialidad,insumos,maquinaria,accesorios,Café Etrusca'
    });
  }

  cats = [
    {
      slug: 'cafe',
      title: 'Café',
      text: 'Perfiles que despiertan sentidos.',
      img: '/assets/images/productos/cat-cafe.webp',
      alt: 'Bolsa de Café Etrusca de 1 kg'
    },
    {
      slug: 'insumos',
      title: 'Insumos',
      text: 'Ingredientes que convierten ideas en experiencias.',
      img: '/assets/images/productos/cat-insumos.webp',
      alt: 'Bebida de matcha con hielo'
    },
    {
      slug: 'maquinas',
      link: '/maquinaria-y-equipo-para-cafeterias',
      title: 'Máquinas',
      text: 'Rendimiento y tecnología para tu operación.',
      img: '/assets/images/productos/cat-maquinas.webp',
      alt: 'Molino profesional para café'
    },
    {
      slug: 'accesorios',
      link: '/accesorios-para-poner-una-cafeteria',
      title: 'Accesorios',
      text: 'Diseñados para facilitar cada preparación.',
      img: '/assets/images/productos/cat-accesorios.webp',
      alt: 'Prensa francesa de cobre'
    }
  ];

  brands = [
    { src: '/assets/images/productos/logo-reneka.webp', alt: 'Reneka' },
    { src: '/assets/images/productos/logo-torani.webp', alt: 'Torani' },
    { src: '/assets/images/productos/logo-pietro.webp', alt: 'Pietro Grinders' },
    { src: '/assets/images/productos/logo-lafenice.webp', alt: 'La Fenice' },
    { src: '/assets/images/productos/logo-chillout.webp', alt: 'Chill Out' }
  ];

  traits = [
    { key: 'calidad', label: 'Calidad Profesional' },
    { key: 'innovacion', label: 'Innovación Constante' },
    { key: 'respaldo', label: 'Respaldo Confiable' },
    { key: 'pasion', label: 'Pasión por lo que hacemos' }
  ];
}
