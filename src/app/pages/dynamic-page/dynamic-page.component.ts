import {
  Component,
  OnInit,
  ViewContainerRef,
  Injector,
  ComponentRef,
  ChangeDetectionStrategy,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContentModel, ContentResponse } from '../../models/content.model';
import {
  ComponentLoaderService,
  ContentComponent,
} from '../../services/component-loader.service';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private viewContainerRef = inject(ViewContainerRef);
  private injector = inject(Injector);
  private componentLoader = inject(ComponentLoaderService);
  private cdr = inject(ChangeDetectorRef);

  isLoading: boolean = true;
  hasContent: boolean = false;
  notFound: boolean = false;
  currentSlug: string = '';

  private componentRef: ComponentRef<ContentComponent> | null = null;

  ngOnInit() {
    this.loadPageData();
    // Get the current slug from the URL
    this.currentSlug = this.route.snapshot.paramMap.get('slug') || '';
  }

  private async loadPageData() {
    const resolvedData = this.route.snapshot.data[
      'dynamicPageData'
    ] as ContentResponse | null;

    this.isLoading = false;

    if (resolvedData?.contentType && resolvedData?.data) {
      await this.renderComponent(resolvedData.contentType, resolvedData.data);
      this.cdr.markForCheck();
    } else {
      // No content found, show not found state
      this.notFound = true;
      this.cdr.markForCheck();
    }
  }

  private async renderComponent(contentType: string, data: ContentModel) {
    // Clear previous component
    this.viewContainerRef.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.hasContent = false;

    // Get the component type for this content type
    const componentType = await this.componentLoader.getComponentForContentType(
      contentType
    );

    if (!componentType || !data) {
      this.notFound = true;
      return; // No component for this content type or no data
    }

    // Create and initialize the component
    this.componentRef = this.viewContainerRef.createComponent<ContentComponent>(
      componentType,
      { injector: this.injector }
    );
    this.componentRef.instance.data = data;
    this.hasContent = true;
  }
}
