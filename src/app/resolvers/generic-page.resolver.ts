import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';

/**
 * A generic resolver for fetching any Contentful content type by slug
 * @param contentType The Contentful content type to fetch
 * @returns A resolver function for the specified content type
 */
export function createGenericResolver<T>(
  contentType: string
): ResolveFn<Promise<T | null>> {
  return async (route) => {
    const slug = route.paramMap.get('slug') || 'default';
    const contentfulService = inject(ContentfulService);

    try {
      return await contentfulService.getEntryBySlug<T>(contentType, slug);
    } catch (error) {
      console.error(`Error fetching ${contentType} data`, error);
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

    try {
      return await contentfulService.getEntriesByContentType<T>(
        contentType,
        limit
      );
    } catch (error) {
      console.error(`Error fetching ${contentType} list data`, error);
      return [];
    }
  };
}
