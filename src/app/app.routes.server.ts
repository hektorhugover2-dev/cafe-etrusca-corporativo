import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
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
        { kind: 'experiencias', slug: 'inmersiona-te' },
        { kind: 'talleres', slug: 'arte-latte' },
        { kind: 'sesiones', slug: 'sesion-sabatina' }
      ];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
