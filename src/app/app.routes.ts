import { Routes } from '@angular/router';
import { homePageResolver } from './resolvers/home-page.resolver';
import { dynamicPageResolver } from './resolvers/dynamic-page.resolver';

export const routes: Routes = [
  // Root path - uses home page resolver
  {
    path: '',
    resolve: {
      homePageData: homePageResolver,
    },
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  // Not found route
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
  // Dynamic route for all other paths
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
    redirectTo: 'not-found',
  },
];
