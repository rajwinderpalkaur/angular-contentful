import { Type } from '@angular/core';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { BlogPageComponent } from '../pages/blog-page/blog-page.component';
import { UnknownPageComponent } from '../pages/unknown-page/unknown-page.component';
import { ContentModel } from '../models/content.model';

// Base interface for components that can display content
export interface ContentComponent {
  data: ContentModel | null;
}

// Interface for content registry entries
export interface ContentTypeRegistryEntry {
  contentType: string;
  component: Type<ContentComponent>;
}

// Registry mapping Contentful content types directly to components
// Using the exact same content type IDs as defined in Contentful
export const CONTENT_TYPE_REGISTRY: ContentTypeRegistryEntry[] = [
  {
    contentType: 'homePage', // Matches Contentful content type ID
    component: HomePageComponent,
  },
  {
    contentType: 'blogPage', // Matches Contentful content type ID
    component: BlogPageComponent,
  },
  {
    contentType: 'unknown', // For handling unknown slugs
    component: UnknownPageComponent,
  },
  // Add more content types here as needed
];

// Helper function to get a component for a content type
export function getComponentForContentType(
  contentType: string
): Type<ContentComponent> | null {
  const entry = CONTENT_TYPE_REGISTRY.find(
    (entry) => entry.contentType === contentType
  );
  return entry ? entry.component : null;
}
