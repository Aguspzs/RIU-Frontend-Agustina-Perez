import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private http = inject(HttpClient);
  private heroes$ = new BehaviorSubject<Hero[]>([]);

  constructor() {
    // Obtenemos los héroes al iniciar la aplicación para almacenarlos y así simulamos una base de datos.
    this.loadHeroes();
  }

  private loadHeroes(): void {
    this.http.get<Hero[]>(API_CONFIG.HEROES_URL).subscribe((heroes) => this.heroes$.next(heroes));
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }

  getHeroById(id: number): Observable<Hero | undefined> {
    return this.getHeroes().pipe(map((heroes) => heroes.find((hero) => hero.id === id)));
  }

  searchHeroes(name: string): Observable<Hero[]> {
    return this.getHeroes().pipe(map((heroes) => heroes.filter((hero) => hero.name.toLowerCase().includes(name.toLowerCase()))));
  }

  addHero(newHero: Hero): void {
    const heroes = this.heroes$.getValue();
    this.heroes$.next([...heroes, newHero]);
  }

  updateHero(updatedHero: Hero): void {
    const heroes = this.heroes$.getValue().map((hero) => (hero.id === updatedHero.id ? updatedHero : hero));
    this.heroes$.next(heroes);
  }

  deleteHero(id: number): void {
    const heroes = this.heroes$.getValue().filter((hero) => hero.id !== id);
    this.heroes$.next(heroes);
  }
}
