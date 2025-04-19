import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContentfulService } from '../services/contentful.service';
import { SlugMappingService } from '../services/slug-mapping.service';
import { ContentModel, ContentResponse } from '../models/content.model';

/**
 * Generic resolver that loads content based on the slug
 * Uses a simple mapping approach
 */
export const dynamicPageResolver: ResolveFn<
  Promise<ContentResponse | null>
> = async (route, state) => {
  try {
    // Get slug from route or use 'home' for the root path
    const slug = route.paramMap.get('slug') || 'home';
    const contentfulService = inject(ContentfulService);
    const slugMapping = inject(SlugMappingService);

    // Get the content type from our mapping service
    const contentType = slugMapping.getContentType(slug);

    // If we don't have a mapping for this slug, return null (not found)
    if (!contentType) {
      return null;
    }

    // Fetch content using the content type and slug
    const data = await contentfulService.getEntryBySlug<ContentModel>(
      contentType,
      slug
    );

    // If content exists, return it with the content type
    if (data) {
      return { contentType, data };
    }

    // Content not found
    return null;
  } catch (error) {
    console.error('Error in dynamic page resolver:', error);
    return null; // Return null on any error
  }
};
