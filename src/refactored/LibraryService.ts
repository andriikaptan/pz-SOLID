import { IBook } from '../interfaces/IBook';
import { IPriceCalculator } from '../interfaces/IPriceCalculator';
import { IBookRepository } from '../interfaces/IBookRepository';
import { ILogger } from '../interfaces/ILogger';

// ✅ DIP: залежить від інтерфейсів, а не від конкретних класів
// ✅ SRP: координує процес, не реалізує деталі
export class LibraryService {
  constructor(
    private repository: IBookRepository,
    private calculator: IPriceCalculator,
    private logger: ILogger,
  ) {}

  addBook(book: IBook): void {
    this.repository.save(book);
    this.logger.log(`Нову книгу додано: ${book.title}`);
  }

  getFinalPrice(book: IBook): number {
    const price = this.calculator.calculate(book);
    this.logger.log(`Ціна книги "${book.title}": $${price}`);
    return price;
  }
}
