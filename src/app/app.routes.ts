import { Routes } from '@angular/router';

import { eventBySlugResolver } from './domains/education/presentation/pages/event-detail-page/event-detail.resolver';

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

        path: 'contacto',

        loadComponent: () =>

          import('./domains/corporate/presentation/pages/contact-page/contact-page.component')

            .then(m => m.ContactPageComponent)

      },

      {

        path: 'Contacto',

        pathMatch: 'full',

        redirectTo: '/contacto'

      },

      {

        path: 'recetas',

        loadComponent: () =>

          import('./domains/catalog/presentation/pages/recipes-page/recipes-page.component')

            .then(m => m.RecipesPageComponent)

      },

      {

        path: 'recetas/:slug',

        loadComponent: () =>

          import('./domains/catalog/presentation/pages/recipes-page/recipe-detail-page.component')

            .then(m => m.RecipeDetailPageComponent)

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

        path: 'productos/cafe/:slug',

        loadComponent: () =>

          import('./domains/catalog/presentation/pages/cafe-category-page/cafe-category-page.component')

            .then(m => m.CafeCategoryPageComponent)

      },

      {

        path: 'productos/accesorios',

        loadComponent: () =>

          import('./domains/catalog/presentation/pages/product-hub-page/product-hub-page.component')

            .then(m => m.ProductHubPageComponent),

        data: { hub: 'accesorios' }

      },

      {

        path: 'maquinaria-y-equipo-para-cafeterias',

        loadComponent: () =>

          import('./domains/catalog/presentation/pages/maquinas-page/maquinas-page.component')

            .then(m => m.MaquinasPageComponent)

      },

      {

        path: 'productos/maquinas',

        pathMatch: 'full',

        redirectTo: '/maquinaria-y-equipo-para-cafeterias'

      },

      {
        path: 'Productos/maquinaria-y-equipo-para-cafeterias',
        pathMatch: 'full',
        redirectTo: '/maquinaria-y-equipo-para-cafeterias'
      },
      {
        path: 'productos/maquinas/:slug',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/maquinas-page/maquinas-page.component')
            .then(m => m.MaquinasPageComponent)
      },
      {
        path: 'insumos-para-cafeterias',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/insumos-page/insumos-page.component')
            .then(m => m.InsumosPageComponent)
      },
      {
        path: 'productos/insumos',
        pathMatch: 'full',
        redirectTo: '/insumos-para-cafeterias'
      },
      {
        path: 'Productos/insumos-para-cafeterias',
        pathMatch: 'full',
        redirectTo: '/insumos-para-cafeterias'
      },
      {
        path: 'productos/insumos-para-cafeterias',
        pathMatch: 'full',
        redirectTo: '/insumos-para-cafeterias'
      },
      {

        path: 'productos/insumos/:slug',

        loadComponent: () =>

          import('./domains/catalog/presentation/pages/insumos-category-page/insumos-category-page.component')

            .then(m => m.InsumosCategoryPageComponent)

      },

            {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent)

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-zona-rosa-cdmx',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'zona-rosa-cdmx' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-viaducto-cdmx',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'viaducto-cdmx' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-iztapalapa',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'iztapalapa' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-toluca',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'toluca' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-tijuana',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'tijuana' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-queretaro',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'queretaro' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-puebla',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'puebla' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-monterrey',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'monterrey' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-leon',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'leon' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-guadalajara',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'guadalajara' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-xalapa',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'xalapa' }

      },

      {

        path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-merida',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-branch-page/course-branch-page.component')

            .then(m => m.CourseBranchPageComponent),

        data: { city: 'merida' }

      },

      {

        path: 'cursos-y-talleres/:slug',

        loadComponent: () =>

          import('./domains/education/presentation/pages/event-detail-page/event-detail-page.component')

            .then(m => m.EventDetailPageComponent),

        resolve: { event: eventBySlugResolver }

      },

      {

        path: 'cursos-para-baristas-y-talleres-para-cafeterias',

        loadComponent: () =>

          import('./domains/education/presentation/pages/education-page/education-page.component')

            .then(m => m.EducationPageComponent)

      },

      {

        path: 'educacion',

        pathMatch: 'full',

        redirectTo: '/cursos-para-baristas-y-talleres-para-cafeterias'

      },

      {

        path: 'politicas-externas-cursos',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-policies-page/course-policies-page.component')

            .then(m => m.CoursePoliciesPageComponent)

      },

      {

        path: 'aviso-cursos',

        pathMatch: 'full',

        redirectTo: '/politicas-externas-cursos'

      },

      {

        path: 'aviso-de-privacidad',

        loadComponent: () =>

          import('./domains/corporate/presentation/pages/privacy-notice-page/privacy-notice-page.component')

            .then(m => m.PrivacyNoticePageComponent)

      },

      {

        path: 'aviso-de-privacidad-simplificado',

        loadComponent: () =>

          import('./domains/corporate/presentation/pages/privacy-notice-short-page/privacy-notice-short-page.component')

            .then(m => m.PrivacyNoticeShortPageComponent)

      },

      {

        path: 'terminos-y-condiciones',

        loadComponent: () =>

          import('./domains/corporate/presentation/pages/terms-page/terms-page.component')

            .then(m => m.TermsPageComponent)

      },

      {

        path: 'politica-de-productos-perecederos',

        loadComponent: () =>

          import('./domains/corporate/presentation/pages/perishable-products-page/perishable-products-page.component')

            .then(m => m.PerishableProductsPageComponent)

      },

      {

        path: 'politicas-externas-cursos-talleres',

        pathMatch: 'full',

        redirectTo: '/politicas-externas-cursos'

      },

      {

        path: 'educacion/:kind',

        loadComponent: () =>

          import('./domains/education/presentation/pages/education-category-page/education-category-page.component')

            .then(m => m.EducationCategoryPageComponent)

      },

      {

        path: 'educacion/:kind/:slug',

        loadComponent: () =>

          import('./domains/education/presentation/pages/course-detail-page/course-detail-page.component')

            .then(m => m.CourseDetailPageComponent)

      }

    ]

  },

  {

    path: '**',

    redirectTo: ''

  }

];

