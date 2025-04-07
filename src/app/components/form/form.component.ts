import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { HeroService } from '../../core/services/heroes.service';
import { Hero } from '../../core/models/hero.model';
import { UppercaseNameDirective } from '../../shared/directives/uppercase-name.directive';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatCardModule, UppercaseNameDirective],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  private heroService = inject(HeroService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  heroForm!: FormGroup;
  heroId: number | null = null;

  alignments = ['good', 'bad', 'neutral'];

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      biography: this.fb.group({
        alignment: [''],
        fullName: [''],
        firstAppearance: [''],
      }),
      connections: this.fb.group({
        groupAffiliation: [''],
      }),
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.heroId = +id;
        this.loadHero(this.heroId);
      }
    });
  }

  loadHero(id: number) {
    const hero = this.heroService.getHeroById(id);
    if (hero) {
      this.heroForm.patchValue(hero);
    }
  }

  onSubmit() {
    if (this.heroForm.invalid) return;

    const heroData = this.heroForm.value as Hero;
    if (this.heroId) {
      this.heroService.updateHero({ ...heroData, id: this.heroId });
      this.router.navigate(['/']);
    } else {
      this.heroService.addHero(heroData);
      this.router.navigate(['/']);
    }
  }

  cancel() {
    this.router.navigate(['']);
  }
}
