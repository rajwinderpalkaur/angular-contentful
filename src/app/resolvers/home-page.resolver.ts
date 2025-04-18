import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { HomePage } from '../models/contentful.models';
import { ContentfulService } from '../services/contentful.service';

export const homePageResolver: ResolveFn<Promise<HomePage | null>> = async (
  route
) => {
  const slug = route.paramMap.get('slug') || 'home';
  const contentfulService = inject(ContentfulService);
  const router = inject(Router);

  try {
    const data = await contentfulService.getEntryBySlug<HomePage>(
      'homePage',
      slug
    );

    if (!data) {
      // Redirect to not-found page if data is not available
      router.navigate(['/not-found']);
      return null;
    }

    return data;
  } catch (error) {
    router.navigate(['/not-found']);
    return null;
  }
};
