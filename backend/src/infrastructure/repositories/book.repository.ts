import { Injectable } from '@injectable-ts';
import { BookModel, Book } from '../../core/models/book.model';
import { IBookRepository } from '../../core/interfaces/book.repository.interface';

// Dependency Inversion Principle: High-level modules depend on abstractions
@Injectable()
export class BookRepository implements IBookRepository {
  async findById(id: string): Promise<Book | null> {
    return BookModel.findById(id).exec();
  }

  async findAll(): Promise<Book[]> {
    return BookModel.find().exec();
  }

  async create(data: Partial<Book>): Promise<Book> {
    return BookModel.create(data);
  }

  async update(id: string, data: Partial<Book>): Promise<Book | null> {
    return BookModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await BookModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findByCategory(category: string): Promise<Book[]> {
    return BookModel.find({ category }).exec();
  }

  async updateStock(id: string, quantity: number): Promise<Book | null> {
    return BookModel.findByIdAndUpdate(
      id,
      { $inc: { stock: quantity } },
      { new: true }
    ).exec();
  }
}