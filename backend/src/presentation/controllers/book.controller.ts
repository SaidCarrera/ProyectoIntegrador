import { Request, Response } from 'express';
import { BookService } from '../../application/services/book.service';

// Single Responsibility Principle: Controller handles HTTP requests/responses
export class BookController {
  constructor(private readonly bookService: BookService) {}

  async getBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await this.bookService.getBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  }

  async getBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.getBook(req.params.id);
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch book' });
    }
  }

  async createBook(req: Request, res: Response): Promise<void> {
    try {
      const book = await this.bookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create book' });
    }
  }
}