import { Injectable } from '@angular/core';
import {
  createClient,
  Entry,
  EntryCollection,
  EntrySkeletonType,
} from 'contentful';
import { ContentfulResponse, HomePage } from '../models/contentful.models';
import { environment } from '../../environments/environment';

// Valid include depths for Contentful (0-10)
type IncludeDepth = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
    environment: environment.contentful.environment,
  });

  /**
   * Get a specific entry by content type and slug
   */
  async getEntryBySlug<T>(
    contentType: string,
    slug: string,
    includeLevel: IncludeDepth = 3
  ): Promise<T | null> {
    try {
      const response = await this.client.getEntries({
        content_type: contentType,
        'fields.slug': slug,
        include: includeLevel,
      });

      const contentfulResponse = response as unknown as ContentfulResponse<T>;

      if (contentfulResponse.items.length === 0) {
        return null;
      }
      return contentfulResponse.items[0].fields;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get entries by content type
   */
  async getEntriesByContentType<T>(
    contentType: string,
    limit: number = 10,
    skip: number = 0,
    includeLevel: IncludeDepth = 3
  ): Promise<T[]> {
    try {
      const response = await this.client.getEntries({
        content_type: contentType,
        limit,
        skip,
        include: includeLevel,
      });

      const contentfulResponse = response as unknown as ContentfulResponse<T>;
      return contentfulResponse.items.map((item) => item.fields);
    } catch (error) {
      return [];
    }
  }

  /**
   * Get an entry by ID
   */
  async getEntryById<T>(
    entryId: string,
    includeLevel: IncludeDepth = 3
  ): Promise<T | null> {
    try {
      const entry = await this.client.getEntry(entryId, {
        include: includeLevel,
      });
      return entry.fields as T;
    } catch (error) {
      return null;
    }
  }
}
