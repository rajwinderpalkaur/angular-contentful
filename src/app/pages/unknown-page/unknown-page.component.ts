import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentModel } from '../../models/content.model';

@Component({
  selector: 'app-unknown-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="unknown-page">
      <h1>Unknown Page</h1>
      <p>
        The page with slug "{{ slug }}" was not found in our content system.
      </p>
    </div>
  `,
  styles: `
    .unknown-page {
      padding: 2rem;
      text-align: center;
    }
  `,
})
export class UnknownPageComponent {
  @Input() data: ContentModel | null = null;

  get slug(): string {
    return this.data?.['slug'] || 'unknown';
  }
}
