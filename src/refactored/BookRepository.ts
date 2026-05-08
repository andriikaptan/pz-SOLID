import { IBookRepository } from '../interfaces/IBookRepository';
import { IBook } from '../interfaces/IBook';

// ✅ SRP: тільки зберігання та пошук книг
export class BookRepository implements IBookRepository {
  private books: IBook[] = [];

  save(book: IBook): void {
    this.books.push(book);
    console.log(`[DB] Збережено: ${book.title}`);
  }

  findByTitle(title: string): IBook | undefined {
    return this.books.find(b => b.title === title);
  }

  getAll(): IBook[] {
    return [...this.books];
  }
}
