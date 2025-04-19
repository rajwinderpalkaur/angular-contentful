import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SlugMappingService {
  // Map of URL patterns to content types
  private slugToTypeMap: Record<string, string> = {
    // Direct mappings
    home: 'homePage',
    blog: 'blogPage',

    // Pattern-based mappings (can be expanded as needed)
    'home-*': 'homePage',
    'blog-*': 'blogPage', // All blog posts
  };

  /**
   * Get the content type for a given slug
   */
  getContentType(slug: string): string | null {
    // First check exact matches
    if (this.slugToTypeMap[slug]) {
      return this.slugToTypeMap[slug];
    }

    // Then check pattern matches
    for (const pattern in this.slugToTypeMap) {
      if (pattern.endsWith('*')) {
        const prefix = pattern.slice(0, -1);
        if (slug.startsWith(prefix)) {
          return this.slugToTypeMap[pattern];
        }
      }
    }

    // Default content type for unknown slugs
    // You can change this to null if you want to show "not found"
    return 'blogPage';
  }

  /**
   * Add a new mapping
   */
  addMapping(slug: string, contentType: string): void {
    this.slugToTypeMap[slug] = contentType;
  }

  /**
   * Get all mappings
   */
  getAllMappings(): Record<string, string> {
    return { ...this.slugToTypeMap };
  }
}
