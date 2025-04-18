import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicContentComponent } from '../../shared/dynamic-content/dynamic-content.component';
import { ContentModel, ContentResponse } from '../../models/content.model';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule, DynamicContentComponent],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css',
})
export class DynamicPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  contentType: string = '';
  pageData: ContentModel | null = null;
  isLoading: boolean = true;
  notFound: boolean = false;

  ngOnInit() {
    this.loadPageData();
  }

  private loadPageData() {
    const resolvedData = this.route.snapshot.data[
      'dynamicPageData'
    ] as ContentResponse | null;

    if (resolvedData?.contentType && resolvedData?.data) {
      this.contentType = resolvedData.contentType;
      this.pageData = resolvedData.data;
      this.isLoading = false;
      this.notFound = this.contentType === 'unknown';
    } else {
      // Just set notFound to true and stop loading, without redirecting
      this.isLoading = false;
      this.notFound = true;

      // Extract the slug from URL for display purposes
      const urlSegments = this.route.snapshot.url;
      if (urlSegments.length > 0) {
        this.pageData = {
          slug: urlSegments[urlSegments.length - 1].path,
        } as ContentModel;
      }
    }
  }
}
