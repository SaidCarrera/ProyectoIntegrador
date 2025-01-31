import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Library Management System</span>
      <span class="spacer"></span>
      <button mat-button routerLink="/books">Books</button>
      <button mat-button routerLink="/login">Login</button>
    </mat-toolbar>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      padding: 20px;
    }
  `]
})
export class App {
  title = 'Library Management System';
}