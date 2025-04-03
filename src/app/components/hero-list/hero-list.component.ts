import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild, AfterViewInit, OnInit, computed } from '@angular/core';
import { RouterModule, RouterLink, Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

import { HeroService } from '../../core/services/heroes.service';
import { Hero } from '../../core/models/hero.model';
import { Subscription } from 'rxjs';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatIconModule, MatInputModule, RouterModule, RouterLink],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.scss',
})
export class HeroListComponent implements OnInit, AfterViewInit {
  private heroService = inject(HeroService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  private heroesSubscription: Subscription = new Subscription();

  heroes = signal<Hero[]>([]);
  columns: string[] = ['id', 'name', 'alignment', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = signal(5);
  pageIndex = signal(0);

  filteredHeroes = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.heroes().slice(start, end);
  });

  ngOnInit() {
    this.loadHeroes();
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex.set(event.pageIndex);
      this.pageSize.set(event.pageSize);
    });
  }

  loadHeroes() {
    this.heroesSubscription = this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes.set(heroes);
    });
  }

  filterHeroes(e: Event) {
    const input = e.target as HTMLInputElement;
    const value = input.value.trim().toLowerCase();
    const filtered = this.heroService.searchHeroes(value);
    this.heroes.set(filtered);
    this.pageIndex.set(0);
  }

  goToCreateHero() {
    this.router.navigate(['/hero/new']);
  }

  goToEditHero(heroId: number) {
    this.router.navigate(['/hero/edit', heroId]);
  }

  deleteHero(id: number) {
    const dialogRef = this.dialog.open(DeleteAlertComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.heroService.deleteHero(id);
      }
    });
  }

  ngOnDestroy() {
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }
}
