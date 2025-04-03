import { Routes } from '@angular/router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { path: 'hero/new', component: FormComponent },
  { path: 'hero/edit/:id', component: FormComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: '**', redirectTo: '/heroes' },
];
