import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroService } from './core/services/heroes.service';
import { Hero } from './core/models/hero.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private heroService = inject(HeroService);
  heroes: Hero[] = [];

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((data) => {
      this.heroes = data;
      console.log('Héroes:', this.heroes);
    });
  }
}
