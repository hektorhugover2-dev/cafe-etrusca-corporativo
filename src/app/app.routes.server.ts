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
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
