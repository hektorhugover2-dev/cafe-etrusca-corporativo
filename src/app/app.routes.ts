import { Routes } from '@angular/router';

import { eventBySlugResolver } from './domains/education/presentation/pages/event-detail-page/event-detail.resolver';
import {
  COURSE_LEGACY_REDIRECTS,
  EMPRENDE_COURSE_SLUG,
  COURSE_PUBLIC_PATH_BY_SLUG,
} from './domains/education/presentation/course-public-paths';

import { SiteLayoutComponent } from './shell/site-layout/site-layout.component';
import { LEGACY_COURSE_PATHS } from './domains/education/presentation/legacy-course-paths';
import { PRIMARY_REDIRECTS } from './domains/education/presentation/primary-urls';




/**
 * Legacy flat course URLs (/taller-basico-para-baristas, /experiencia-..., /sesion-...) now
 * redirect to the canonical /educacion/<kind>/<slug>. Real 301s for crawlers are served by
 * server.ts (Node) or deploy/iis/web.config (static host); this keeps in-app links working.
 */
const courseLegacyRedirectRoutes: Routes = COURSE_LEGACY_REDIRECTS.map(({ from, to }) => ({
  path: from.replace(/^\//, ''),
  pathMatch: 'full' as const,
  redirectTo: to
}));

/**
 * Synonym URLs → their primary URL (SEO review A1/D4/D5, primary-urls.ts). The crawler-facing 301s
 * come from server.ts / deploy/iis/web.config; these keep in-app navigation and old links working.
 * No HTML file is prerendered for them.
 */
const primaryRedirectRoutes: Routes = Object.entries(PRIMARY_REDIRECTS).map(([from, to]) => ({
  path: from.replace(/^\//, ''),
  pathMatch: 'full' as const,
  redirectTo: to
}));

/**
 * Old cafeetrusca.com course/taller URLs (CursoController) rendered again at the same path by one
 * data-driven component. Not in the menu; prerendered and listed in the sitemap.
 */
const legacyCourseRoutes: Routes = LEGACY_COURSE_PATHS.map((path) => ({
  path,
  pathMatch: 'full' as const,
  data: { legacyPath: path },
  loadComponent: () =>
    import('./domains/education/presentation/pages/legacy-course-page/legacy-course-page.component')
      .then(m => m.LegacyCoursePageComponent)
}));

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
        path: 'sucursales',
        loadComponent: () =>
          import('./domains/corporate/presentation/pages/branches-page/branches-page.component')
            .then(m => m.BranchesPageComponent)
      },
      {

        path: 'Contacto',

        pathMatch: 'full',

        redirectTo: '/contacto'

      },

      {
        path: 'videoteca',
        loadComponent: () =>
          import('./domains/corporate/presentation/pages/videoteca-page/videoteca-page.component')
            .then(m => m.VideotecaPageComponent)
      },

      {
        path: 'calculadora-de-precios',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/price-calculator-page/price-calculator-page.component')
            .then(m => m.PriceCalculatorPageComponent)
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
        // Guías /blog/<slug>/ (briefs SEO 20 oct 2026). Sin índice /blog/ ni enlaces en menú, home o footer.
        path: 'blog/:slug',
        loadComponent: () =>
          import('./domains/blog/presentation/pages/blog-article-page/blog-article-page.component')
            .then(m => m.BlogArticlePageComponent)
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
        path: 'Productos/Cafe',
        pathMatch: 'full',
        redirectTo: '/productos/cafe'
      },
      {
        path: 'Productos/cafe',
        pathMatch: 'full',
        redirectTo: '/productos/cafe'
      },
      {
        path: 'Productos/Cafe/:slug',
        redirectTo: '/productos/cafe/:slug'
      },
      {
        path: 'Productos/cafe/:slug',
        redirectTo: '/productos/cafe/:slug'
      },

      {
        path: 'accesorios-para-poner-una-cafeteria',
        pathMatch: 'full',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/accesorios-page/accesorios-page.component')
            .then(m => m.AccesoriosPageComponent)
      },
      {
        // Métodos de extracción: página propia (PDF "Métodos de extracción"); el resto de
        // subcategorías sigue en el hub de Accesorios.
        path: 'accesorios-para-poner-una-cafeteria/metodo-extraccion',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/metodos-extraccion-page/metodos-extraccion-page.component')
            .then(m => m.MetodosExtraccionPageComponent)
      },
      {
        // Resto de subcategorías: página propia con la estructura de Métodos de extracción.
        path: 'accesorios-para-poner-una-cafeteria/:slug',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/accesorios-subcat-page/accesorios-subcat-page.component')
            .then(m => m.AccesoriosSubcatPageComponent)
      },
      {
        path: 'productos/accesorios',
        pathMatch: 'full',
        redirectTo: '/accesorios-para-poner-una-cafeteria'
      },
      {
        path: 'productos/accesorios/:slug',
        redirectTo: '/accesorios-para-poner-una-cafeteria/:slug'
      },

      {
        path: 'maquinaria-y-equipo-para-cafeterias',
        pathMatch: 'full',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/maquinas-page/maquinas-page.component')
            .then(m => m.MaquinasPageComponent)
      },
      {
        path: 'maquinaria-y-equipo-para-cafeterias/:slug',
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
        path: 'productos/maquinas/:slug',
        redirectTo: '/maquinaria-y-equipo-para-cafeterias/:slug'
      },
      {
        path: 'Productos/maquinaria-y-equipo-para-cafeterias',
        pathMatch: 'full',
        redirectTo: '/maquinaria-y-equipo-para-cafeterias'
      },
      {
        path: 'productos/maquinaria-y-equipo-para-cafeterias',
        pathMatch: 'full',
        redirectTo: '/maquinaria-y-equipo-para-cafeterias'
      },
      {
        path: 'Productos/maquinaria-y-equipo-para-cafeterias/:slug',
        redirectTo: '/maquinaria-y-equipo-para-cafeterias/:slug'
      },
      {
        path: 'productos/maquinaria-y-equipo-para-cafeterias/:slug',
        redirectTo: '/maquinaria-y-equipo-para-cafeterias/:slug'
      },
      {
        path: 'insumos-para-cafeterias',
        pathMatch: 'full',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/insumos-page/insumos-page.component')
            .then(m => m.InsumosPageComponent)
      },
      {
        path: 'insumos-para-cafeterias/jarabes/torani',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/torani-page/torani-page.component')
            .then(m => m.ToraniPageComponent)
      },
      {
        path: 'insumos-para-cafeterias/tisanas/chillout',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/tisanas-chillout-page/tisanas-chillout-page.component')
            .then(m => m.TisanasChilloutPageComponent)
      },
      {
        path: 'insumos-para-cafeterias/bases-en-polvo/chillout',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/chillout-page/chillout-page.component')
            .then(m => m.ChilloutPageComponent)
      },
      {
        path: 'insumos-para-cafeterias/:slug',
        loadComponent: () =>
          import('./domains/catalog/presentation/pages/insumos-category-page/insumos-category-page.component')
            .then(m => m.InsumosCategoryPageComponent)
      },
      {
        path: 'productos/insumos',
        pathMatch: 'full',
        redirectTo: '/insumos-para-cafeterias'
      },
      {
        path: 'productos/insumos/:slug',
        redirectTo: '/insumos-para-cafeterias/:slug'
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
        path: 'Productos/insumos-para-cafeterias/:slug',
        redirectTo: '/insumos-para-cafeterias/:slug'
      },
      {
        path: 'productos/insumos-para-cafeterias/:slug',
        redirectTo: '/insumos-para-cafeterias/:slug'
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

      ...primaryRedirectRoutes,

      ...legacyCourseRoutes,

      ...courseLegacyRedirectRoutes,

      {
        path: `educacion/cursos/${EMPRENDE_COURSE_SLUG}`,
        pathMatch: 'full',
        redirectTo: COURSE_PUBLIC_PATH_BY_SLUG[EMPRENDE_COURSE_SLUG]
      },

      {
        // Canonical course detail page: /educacion/<kind>/<slug>
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

