import {
  Component,
  Input,
  OnChanges,
  ViewContainerRef,
  SimpleChanges,
  Injector,
  ComponentRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ContentComponent,
  getComponentForContentType,
} from '../content-type-registry';
import { ContentModel } from '../../models/content.model';

@Component({
  selector: 'app-dynamic-content',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-container #container></ng-container>',
})
export class DynamicContentComponent implements OnChanges {
  @Input() contentType: string = '';
  @Input() data: ContentModel | null = null;

  private componentRef: ComponentRef<ContentComponent> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector
  ) {}

  ngOnChanges() {
    this.loadComponent();
  }

  private loadComponent() {
    // Clear previous component
    this.viewContainerRef.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    // Get the component type for this content type
    const componentType = getComponentForContentType(this.contentType);

    if (!componentType || !this.data) {
      return; // No component for this content type or no data
    }

    // Create and initialize the component
    this.componentRef = this.viewContainerRef.createComponent<ContentComponent>(
      componentType,
      { injector: this.injector }
    );
    this.componentRef.instance.data = this.data;
  }
}
