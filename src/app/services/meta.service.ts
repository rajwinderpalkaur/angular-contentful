import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  /**
   * Set page title and description meta tag
   */
  setMetaData(title: string, description: string): void {
    this.titleService.setTitle(title);
    this.metaService.updateTag({
      name: 'description',
      content: description,
    });
  }

  /**
   * Set multiple meta tags
   */
  setMetaTags(tags: { name: string; content: string }[]): void {
    tags.forEach((tag) => {
      this.metaService.updateTag({
        name: tag.name,
        content: tag.content,
      });
    });
  }
}
