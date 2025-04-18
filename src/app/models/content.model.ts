import { BlogPage, HomePage } from './contentful.models';

/**
 * Union type for all possible content types
 */
export type ContentModel = HomePage | BlogPage;

/**
 * Interface for the content response from resolvers
 */
export interface ContentResponse {
  contentType: string;
  data: ContentModel;
}
