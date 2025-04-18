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
  // Example route for a potential future blog page:
  // {
  //   path: 'blog/:slug',
  //   resolve: {
  //     blogPageData: createGenericResolver<BlogPage>('blogPage'),
  //   },
  //   loadComponent: () =>
  //     import('./pages/blog-page/blog-page.component').then(
  //       (m) => m.BlogPageComponent
  //     ),
  // },
];
