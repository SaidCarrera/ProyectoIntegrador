import { IRepository } from './repository.interface';
import { Book } from '../models/book.model';

// Interface Segregation Principle: Specific interface for book operations
export interface IBookRepository extends IRepository<Book> {
  findByCategory(category: string): Promise<Book[]>;
  updateStock(id: string, quantity: number): Promise<Book | null>;
}