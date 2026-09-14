import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'productos/cafe/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'premium' },
        { slug: 'verde' }
      ];
    }
  },
  {
    path: 'productos/insumos/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'jarabes' },
        { slug: 'salsas' },
        { slug: 'pures' },
        { slug: 'te' },
        { slug: 'tisanas' },
        { slug: 'bases-en-polvo' },
        { slug: 'toppings' }
      ];
    }
  },
  {
    path: 'productos/maquinas/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { slug: 'espresso' },
        { slug: 'autoservicio' },
        { slug: 'licuadoras' },
        { slug: 'molinos' },
        { slug: 'tostadores' }
      ];
    }
  },
  {
    path: 'educacion/:kind',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { kind: 'cursos' },
        { kind: 'experiencias' },
        { kind: 'talleres' },
        { kind: 'sesiones' }
      ];
    }
  },
  {
    path: 'educacion/:kind/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [
        { kind: 'cursos', slug: 'formacion-de-emprendedores' },
        { kind: 'cursos', slug: 'tostado-basico' },
        { kind: 'cursos', slug: 'formacion-barista' },
        { kind: 'experiencias', slug: 'inmersiona-te' },
        { kind: 'experiencias', slug: 'experiencia-sensorial' },
        { kind: 'experiencias', slug: 'catacion-de-cafe' },
        { kind: 'talleres', slug: 'arte-latte' },
        { kind: 'talleres', slug: 'metodos-de-extraccion' },
        { kind: 'sesiones', slug: 'sesion-sabatina' }
      ];
    }
  },
    {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-zona-rosa-cdmx',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-viaducto-cdmx',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-iztapalapa',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-toluca',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-tijuana',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-queretaro',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-puebla',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-monterrey',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-leon',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-guadalajara',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-xalapa',
    renderMode: RenderMode.Server
  },
  {
    path: 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria-en-merida',
    renderMode: RenderMode.Server
  },
  {
    path: 'recetas',
    renderMode: RenderMode.Server
  },
  {
    path: 'recetas/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: 'cursos-y-talleres/:slug',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
