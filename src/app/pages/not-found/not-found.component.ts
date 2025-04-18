import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        The page you are looking for does not exist or is no longer available.
      </p>
      <a routerLink="/" class="home-link">Return to Home</a>
    </div>
  `,
  styles: `
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      padding: 0 1rem;
    }
    
    h1 {
      font-size: 6rem;
      margin: 0;
      color: #e74c3c;
    }
    
    h2 {
      font-size: 2.5rem;
      margin: 0.5rem 0 1rem;
      color: #333;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #666;
      max-width: 500px;
    }
    
    .home-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .home-link:hover {
      background-color: #2980b9;
    }
  `,
})
export class NotFoundComponent {}
