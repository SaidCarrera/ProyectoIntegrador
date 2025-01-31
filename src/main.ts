import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app/app.component';

const routes: Routes = [
  // Lazy loading routes following best practices
  {
    path: 'books',
    loadComponent: () => import('./app/features/books/book-list/book-list.component')
      .then(m => m.BookListComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./app/features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  { path: '', redirectTo: '/books', pathMatch: 'full' }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
}).catch(err => console.error(err));