import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AuthorComponent } from '../../components/author/author.component';
import {
  HomePage,
  HeroEntry,
  AuthorEntry,
} from '../../models/contentful.models';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeroComponent, AuthorComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private metaService = inject(MetaService);

  @Input() data: HomePage | null = null;

  homePage: HomePage | null = null;
  heroContent: HeroEntry | undefined;
  authorContent: AuthorEntry | undefined;

  ngOnInit() {
    this.setupPageData();
  }

  private setupPageData() {
    // If data is passed as an input, use it
    // Otherwise, get it from the resolver
    if (this.data) {
      this.homePage = this.data;
    } else {
      this.homePage = this.route.snapshot.data['homePageData'];
    }

    if (this.homePage) {
      // Set hero content
      this.heroContent = this.homePage.section1?.fields;

      // Set author content
      this.authorContent = this.homePage.section2?.fields;

      // Set meta data if available
      if (this.homePage.metaData?.fields) {
        const metaData = this.homePage.metaData.fields;
        this.metaService.setMetaData(metaData.title, metaData.description);
      } else {
        // Set default meta data if none available
        this.metaService.setMetaData('Home Page', 'Welcome to our website');
      }
    }
  }
}
