import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HomePage } from '../models/contentful.models';
import { ContentfulService } from '../services/contentful.service';

export const homePageResolver: ResolveFn<Promise<HomePage | null>> = async (
  route
) => {
  const slug = route.paramMap.get('slug') || 'home';
  const contentfulService = inject(ContentfulService);

  try {
    return await contentfulService.getEntryBySlug<HomePage>('homePage', slug);
  } catch (error) {
    console.error('Error fetching home page data', error);
    return null;
  }
};
