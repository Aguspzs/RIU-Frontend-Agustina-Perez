import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroService } from './core/services/heroes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeroListComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private heroService = inject(HeroService);

  ngOnInit(): void {
    this.heroService.loadHeroes();
  }
}
