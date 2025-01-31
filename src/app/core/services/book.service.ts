import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // Implementing Open/Closed Principle (OCP)
  // New book operations can be added without modifying existing code
  
  getBooks(): Observable<Book[]> {
    // TODO: Implement actual API call
    return of([]);
  }

  getBook(id: string): Observable<Book> {
    // TODO: Implement actual API call
    return of({} as Book);
  }

  createBook(book: Book): Observable<Book> {
    // TODO: Implement actual API call
    return of(book);
  }

  updateBook(id: string, book: Book): Observable<Book> {
    // TODO: Implement actual API call
    return of(book);
  }

  deleteBook(id: string): Observable<void> {
    // TODO: Implement actual API call
    return of(void 0);
  }
}