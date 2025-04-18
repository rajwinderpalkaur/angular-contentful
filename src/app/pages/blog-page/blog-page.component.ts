import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlogPage } from '../../models/contentful.models';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css',
})
export class BlogPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private metaService = inject(MetaService);

  @Input() data: BlogPage | null = null;

  blogPage: BlogPage | null = null;

  ngOnInit() {
    this.setupPageData();
  }

  private setupPageData() {
    // If data is passed as an input, use it
    // Otherwise, get it from the resolver
    if (this.data) {
      this.blogPage = this.data;
    } else {
      this.blogPage = this.route.snapshot.data['blogPageData'];
    }

    if (this.blogPage) {
      // Set meta data if available
      if (this.blogPage.metaData?.fields) {
        const metaData = this.blogPage.metaData.fields;
        this.metaService.setMetaData(metaData.title, metaData.description);
      } else if (this.blogPage.blogTitle && this.blogPage.blogDescription) {
        // Use blog title and description as fallback for meta data
        this.metaService.setMetaData(
          this.blogPage.blogTitle,
          this.blogPage.blogDescription
        );
      } else {
        // Set default meta data if nothing available
        this.metaService.setMetaData('Blog', 'Read our latest blog post');
      }
    }
  }
}
