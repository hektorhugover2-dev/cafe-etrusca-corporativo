import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompromisoComponent } from '../../../../../shared/ui/compromiso/compromiso.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink, CompromisoComponent, ScrollWaveComponent],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  /** Base de imágenes/videos (CDN R2 o /assets local). Ver assets-url.ts */
  protected readonly assetsBase = ASSETS_BASE_URL;
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
      img: `${ASSETS_BASE_URL}/images/productos/cat-cafe.webp`,
      alt: 'Bolsa de Café Etrusca de 1 kg'
    },
    {
      slug: 'insumos',
      link: '/insumos-para-cafeterias',
      title: 'Insumos',
      text: 'Ingredientes que convierten ideas en experiencias.',
      img: `${ASSETS_BASE_URL}/images/productos/cat-insumos.webp`,
      alt: 'Bebida de matcha con hielo'
    },
    {
      slug: 'maquinas',
      link: '/maquinaria-y-equipo-para-cafeterias',
      title: 'Máquinas',
      text: 'Rendimiento y tecnología para tu operación.',
      img: `${ASSETS_BASE_URL}/images/productos/cat-maquinas.webp`,
      alt: 'Molino profesional para café'
    },
    {
      slug: 'accesorios',
      link: '/accesorios-para-poner-una-cafeteria',
      title: 'Accesorios',
      text: 'Diseñados para facilitar cada preparación.',
      img: `${ASSETS_BASE_URL}/images/productos/cat-accesorios.webp`,
      alt: 'Prensa francesa de cobre'
    }
  ];

  brands = [
    { src: `${ASSETS_BASE_URL}/images/productos/logo-reneka.webp`, alt: 'Reneka' },
    { src: `${ASSETS_BASE_URL}/images/productos/logo-torani.webp`, alt: 'Torani' },
    { src: `${ASSETS_BASE_URL}/images/productos/logo-pietro.webp`, alt: 'Pietro Grinders' },
    { src: `${ASSETS_BASE_URL}/images/productos/logo-lafenice.webp`, alt: 'La Fenice' },
    { src: `${ASSETS_BASE_URL}/images/productos/logo-chillout.webp`, alt: 'Chill Out' }
  ];

  traits = [
    { key: 'calidad', label: 'Calidad Profesional' },
    { key: 'innovacion', label: 'Innovación Constante' },
    { key: 'respaldo', label: 'Respaldo Confiable' },
    { key: 'pasion', label: 'Pasión por lo que hacemos' }
  ];
}
