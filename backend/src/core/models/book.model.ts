import { Schema, model } from 'mongoose';

// Single Responsibility Principle: Book model only handles book-related data
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  stock: number;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
}, {
  timestamps: true
});

export const BookModel = model<Book>('Book', bookSchema);