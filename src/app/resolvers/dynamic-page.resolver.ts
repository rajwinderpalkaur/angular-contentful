import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';
import { CONTENT_TYPE_REGISTRY } from '../shared/content-type-registry';
import { ContentModel, ContentResponse } from '../models/content.model';

/**
 * Generic resolver that loads content based on the slug
 * Tries to find content with the provided slug across all registered content types
 */
export const dynamicPageResolver: ResolveFn<
  Promise<ContentResponse | null>
> = async (route) => {
  const slug = route.paramMap.get('slug') || '';
  const contentfulService = inject(ContentfulService);
  const router = inject(Router);

  // Special case for not-found route
  if (slug === 'not-found') {
    return null;
  }

  // Try to find content with this slug across all registered content types
  for (const registryEntry of CONTENT_TYPE_REGISTRY) {
    const contentType = registryEntry.contentType;

    try {
      const data = await contentfulService.getEntryBySlug<ContentModel>(
        contentType,
        slug
      );

      if (data) {
        return { contentType, data };
      }
    } catch (error) {
      // Continue to next content type
    }
  }

  // Return null for unknown slugs
  return null;
};
