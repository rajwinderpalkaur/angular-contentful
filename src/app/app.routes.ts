import { Routes } from '@angular/router';
import { dynamicPageResolver } from './resolvers/dynamic-page.resolver';

export const routes: Routes = [
  // Root path (home) - also uses the dynamic page resolver
  {
    path: '',
    resolve: {
      dynamicPageData: dynamicPageResolver,
    },
    loadComponent: () =>
      import('./pages/dynamic-page/dynamic-page.component').then(
        (m) => m.DynamicPageComponent
      ),
  },
  // Dynamic route for all specific paths
  {
    path: ':slug',
    resolve: {
      dynamicPageData: dynamicPageResolver,
    },
    loadComponent: () =>
      import('./pages/dynamic-page/dynamic-page.component').then(
        (m) => m.DynamicPageComponent
      ),
  },
  // Wildcard route - must be last
  {
    path: '**',
    resolve: {
      dynamicPageData: dynamicPageResolver,
    },
    loadComponent: () =>
      import('./pages/dynamic-page/dynamic-page.component').then(
        (m) => m.DynamicPageComponent
      ),
  },
];
