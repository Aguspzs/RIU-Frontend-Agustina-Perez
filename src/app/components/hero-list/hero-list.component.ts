import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { HeroService } from '../../core/services/heroes.service';
import { Hero } from '../../core/models/hero.model';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit, AfterViewInit {
  private heroService = inject(HeroService);
  heroes = signal<Hero[]>([]);
  filteredHeroes = signal<Hero[]>([]);
  columns: string[] = ['id', 'name', 'alignment', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 5;
  pageIndex = 0;

  ngOnInit() {
    this.loadHeroes();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.applyPagination();
    });
  }

  loadHeroes() {
    this.heroService.getHeroes().subscribe((data) => {
      this.heroes.set(data);
      this.applyPagination();
    });
  }

  applyPagination() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.filteredHeroes.set(this.heroes().slice(start, end));
  }

  filterHeroes(e: Event) {
    const input = e.target as HTMLInputElement;
    const value = input.value.trim().toLowerCase();
    const filtered = this.heroes().filter((hero) => hero.name.toLowerCase().includes(value));
    this.filteredHeroes.set(filtered.slice(0, this.pageSize));
    this.pageIndex = 0;
  }

  editHero(hero: Hero) {
    console.log('Editar', hero);
  }

  deleteHero(id: number) {
    this.heroService.deleteHero(id);
  }
}
