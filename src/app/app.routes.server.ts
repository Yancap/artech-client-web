import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client
  },
  {
    path: 'articles/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'articles/category/:category',
    renderMode: RenderMode.Client
  },
  {
    path: 'search',
    renderMode: RenderMode.Client
  }
];
