import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSelectModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Book Catalog</h1>
        <mat-form-field>
          <mat-label>Category</mat-label>
          <mat-select [(value)]="selectedCategory" (selectionChange)="filterBooks()">
            <mat-option value="">All Categories</mat-option>
            <mat-option *ngFor="let category of categories" [value]="category">
              {{category}}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <mat-card *ngFor="let book of filteredBooks" class="book-card">
          <mat-card-header>
            <mat-card-title>{{book.title}}</mat-card-title>
            <mat-card-subtitle>{{book.author}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Category: {{book.category}}</p>
            <p>Price: ${{book.price}}</p>
            <p>Available: {{book.stock}} in stock</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" [routerLink]="['/books', book.id]">
              View Details
            </button>
            <button mat-button color="accent" 
                    (click)="reserveBook(book.id)"
                    [disabled]="!book.available">
              Reserve
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .book-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    mat-card-actions {
      margin-top: auto;
      padding: 16px;
    }
  `]
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  categories: string[] = [];
  selectedCategory: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
      this.categories = [...new Set(books.map(book => book.category))];
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.selectedCategory
      ? this.books.filter(book => book.category === this.selectedCategory)
      : this.books;
  }

  reserveBook(bookId: string): void {
    // TODO: Implement reservation logic
  }
}