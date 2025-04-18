import { Component, Input } from '@angular/core';
import { HeroEntry } from '../../models/contentful.models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input() hero: HeroEntry | undefined;
}
