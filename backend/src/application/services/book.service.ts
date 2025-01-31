import { Injectable } from '@injectable-ts';
import { IBookRepository } from '../../core/interfaces/book.repository.interface';
import { Book } from '../../core/models/book.model';

// Single Responsibility Principle: Service handles business logic for books
@Injectable()
export class BookService {
  constructor(private readonly bookRepository: IBookRepository) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async getBook(id: string): Promise<Book | null> {
    return this.bookRepository.findById(id);
  }

  async createBook(bookData: Partial<Book>): Promise<Book> {
    return this.bookRepository.create(bookData);
  }

  async updateBook(id: string, bookData: Partial<Book>): Promise<Book | null> {
    return this.bookRepository.update(id, bookData);
  }

  async deleteBook(id: string): Promise<boolean> {
    return this.bookRepository.delete(id);
  }

  async updateBookStock(id: string, quantity: number): Promise<Book | null> {
    return this.bookRepository.updateStock(id, quantity);
  }
}