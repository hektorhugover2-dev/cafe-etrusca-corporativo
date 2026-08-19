import { Routes } from '@angular/router';
import { SiteLayoutComponent } from './shell/site-layout/site-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent, // Este componente tiene tu Header y Footer
    children: [
      {
        path: '', 
        loadComponent: () => 
          import('./composition/home/presentation/home-page/home-page.component')
            .then(m => m.HomePageComponent)
      },
      {
        path: 'nosotros', // Esta es la ruta que configuramos en el Header
        loadComponent: () => 
          import('./domains/corporate/presentation/pages/about-page/about-page.component')
            .then(m => m.AboutPageComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];