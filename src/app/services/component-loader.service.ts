import { Injectable, Type } from '@angular/core';
import { ContentModel } from '../models/content.model';

// Base interface for components that can display content
export interface ContentComponent {
  data: ContentModel | null;
}

@Injectable({
  providedIn: 'root',
})
export class ComponentLoaderService {
  // Map of content types to component import functions
  private readonly componentMap: Record<string, () => Promise<any>> = {
    homePage: () =>
      import('../pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    blogPage: () =>
      import('../pages/blog-page/blog-page.component').then(
        (m) => m.BlogPageComponent
      ),
    // Add more content types here as needed
  };

  /**
   * Get all available content types
   */
  getAvailableContentTypes(): string[] {
    return Object.keys(this.componentMap);
  }

  /**
   * Load a component dynamically based on content type
   */
  async getComponentForContentType(
    contentType: string
  ): Promise<Type<ContentComponent> | null> {
    // If no import function for this content type, return null
    if (!this.componentMap[contentType]) {
      console.warn(`No component registered for content type: ${contentType}`);
      return null;
    }

    try {
      // Load the component dynamically
      return await this.componentMap[contentType]();
    } catch (error) {
      console.error(`Error loading component for ${contentType}:`, error);
      return null;
    }
  }

  /**
   * Register a new content type component
   */
  registerComponent(contentType: string, importFn: () => Promise<any>): void {
    this.componentMap[contentType] = importFn;
  }
}
