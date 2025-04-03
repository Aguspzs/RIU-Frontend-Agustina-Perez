import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgOptimizedImage, Location } from '@angular/common';
import { HeroService } from '../../core/services/heroes.service';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatButtonModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit {
  private location = inject(Location);
  route = inject(ActivatedRoute);
  heroService = inject(HeroService);
  hero: any;
  noImage: string = 'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg';
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const hero = this.heroService.getHeroById(Number(id));
      if (hero) {
        this.hero = hero;
        console.log(hero);
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
