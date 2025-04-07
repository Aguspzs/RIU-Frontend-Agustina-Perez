import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private http = inject(HttpClient);
  private heroes = new BehaviorSubject<Hero[]>([]);
  heroes$ = this.heroes.asObservable();

  loadHeroes(): void {
    this.http.get<Hero[]>(API_CONFIG.HEROES_URL).subscribe({
      next: (heroes) => this.heroes.next(heroes),
      error: (err) => console.error('Error loading heroes:', err),
    });
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroes$;
  }

  getHeroById(id: number): Hero | undefined {
    return this.heroes.getValue().find((hero) => hero.id === id);
  }

  searchHeroes(searchTerm: string): Hero[] {
    return this.heroes.getValue().filter((hero) => hero.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  addHero(hero: Hero): void {
    const currentHeroes = this.heroes.getValue();
    const newHero = { ...hero, id: this.generateId(currentHeroes) };
    this.heroes.next([...currentHeroes, newHero]);
  }

  private generateId(heroes: Hero[]): number {
    return heroes.length ? Math.max(...heroes.map((h) => h.id)) + 1 : 1;
  }

  updateHero(updatedHero: Hero): void {
    console.log(updatedHero);
    const currentHeroes = this.heroes.getValue().map((hero) => (hero.id === updatedHero.id ? { ...hero, ...updatedHero } : hero));
    this.heroes.next(currentHeroes);
  }

  deleteHero(id: number): void {
    const filteredHeroes = this.heroes.getValue().filter((hero) => hero.id !== id);
    this.heroes.next(filteredHeroes);
  }
}
