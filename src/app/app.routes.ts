import { Routes } from '@angular/router';
import { homePageResolver } from './resolvers/home-page.resolver';
import { createGenericResolver } from './resolvers/generic-page.resolver';
import { HomePage } from './models/contentful.models';

export const routes: Routes = [
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
  {
    path: ':slug',
    resolve: {
      homePageData: createGenericResolver<HomePage>('homePage'),
    },
    loadComponent: () =>
      import('./pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
];
