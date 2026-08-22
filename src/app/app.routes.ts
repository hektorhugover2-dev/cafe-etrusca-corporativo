import { Routes } from '@angular/router';
import { SiteLayoutComponent } from './shell/site-layout/site-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./composition/home/presentation/home-page/home-page.component')
            .then(m => m.HomePageComponent)
      },
      {
        path: 'nosotros',
        loadComponent: () =>
          import('./domains/corporate/presentation/pages/about-page/about-page.component')
            .then(m => m.AboutPageComponent)
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/products-page/products-page.component')
            .then(m => m.ProductsPageComponent)
      },
      {
        path: 'productos/cafe',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/product-hub-page/product-hub-page.component')
            .then(m => m.ProductHubPageComponent),
        data: { hub: 'cafe' }
      },
      {
        path: 'productos/accesorios',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/product-hub-page/product-hub-page.component')
            .then(m => m.ProductHubPageComponent),
        data: { hub: 'accesorios' }
      },
      {
        path: 'productos/maquinas',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/product-hub-page/product-hub-page.component')
            .then(m => m.ProductHubPageComponent),
        data: { hub: 'maquinas' }
      },
      {
        path: 'productos/insumos',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/insumos-page/insumos-page.component')
            .then(m => m.InsumosPageComponent)
      },
      {
        path: 'productos/insumos/:slug',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/insumos-category-page/insumos-category-page.component')
            .then(m => m.InsumosCategoryPageComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
