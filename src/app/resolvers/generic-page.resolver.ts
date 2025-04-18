import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';

/**
 * A generic resolver for fetching any Contentful content type by slug
 * @param contentType The Contentful content type to fetch
 * @param defaultSlug Optional default slug to use if no slug is in the route
 * @returns A resolver function for the specified content type
 */
export function createGenericResolver<T>(
  contentType: string,
  defaultSlug?: string
): ResolveFn<Promise<T | null>> {
  return async (route) => {
    const slug = route.paramMap.get('slug') || defaultSlug || 'default';
    const contentfulService = inject(ContentfulService);
    const router = inject(Router);

    try {
      const data = await contentfulService.getEntryBySlug<T>(contentType, slug);

      if (!data) {
        router.navigate(['/not-found']);
        return null;
      }

      return data;
    } catch (error) {
      router.navigate(['/not-found']);
      return null;
    }
  };
}

/**
 * A generic resolver for fetching multiple entries of a content type
 * @param contentType The Contentful content type to fetch
 * @param limit Maximum number of entries to fetch
 * @returns A resolver function for the specified content type
 */
export function createListResolver<T>(
  contentType: string,
  limit: number = 10
): ResolveFn<Promise<T[]>> {
  return async () => {
    const contentfulService = inject(ContentfulService);
    const router = inject(Router);

    try {
      const data = await contentfulService.getEntriesByContentType<T>(
        contentType,
        limit
      );

      if (!data || data.length === 0) {
        router.navigate(['/not-found']);
        return [];
      }

      return data;
    } catch (error) {
      router.navigate(['/not-found']);
      return [];
    }
  };
}
