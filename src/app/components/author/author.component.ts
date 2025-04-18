import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorEntry } from '../../models/contentful.models';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="author-section" *ngIf="author">
      <h2>{{ author.authorTitle }}</h2>
      <p>{{ author.authorName }}</p>
    </div>
  `,
  styles: `
    .author-section {
      padding: 2rem;
      margin: 1rem 0;
      background-color: #f9f9f9;
      border-radius: 8px;
    }
    
    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    p {
      font-size: 1.2rem;
      color: #666;
    }
  `,
})
export class AuthorComponent {
  @Input() author: AuthorEntry | undefined;
}
