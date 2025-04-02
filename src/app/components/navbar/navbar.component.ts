import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: ` <mat-toolbar color="primary">
    <span>SuperheroesApp</span>
    <span class="spacer"></span>
    <button mat-button routerLink="/heroes">Heroes list</button>
  </mat-toolbar>`,
  styles: [
    `
      .spacer {
        flex: 1;
      }
    `,
  ],
})
export class NavbarComponent {}
