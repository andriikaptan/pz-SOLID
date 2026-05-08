import { Book } from '../src/refactored/Book';
import { FictionBook } from '../src/refactored/FictionBook';
import { ScienceBook } from '../src/refactored/ScienceBook';
import { PriceCalculator, SalePriceCalculator } from '../src/refactored/PriceCalculator';
import { BookRepository } from '../src/refactored/BookRepository';
import { ConsoleLogger } from '../src/refactored/ConsoleLogger';
import { LibraryService } from '../src/refactored/LibraryService';

describe('Book', () => {
  test('creates book with correct fields', () => {
    const b = new Book('Dune', 20, 'fiction');
    expect(b.title).toBe('Dune');
    expect(b.price).toBe(20);
    expect(b.genre).toBe('fiction');
  });
});

describe('FictionBook', () => {
  test('has genre fiction', () => {
    const b = new FictionBook('1984', 15);
    expect(b.genre).toBe('fiction');
  });
});

describe('ScienceBook', () => {
  test('has genre science', () => {
    const b = new ScienceBook('A Brief History of Time', 25);
    expect(b.genre).toBe('science');
  });
});

describe('PriceCalculator', () => {
  const calc = new PriceCalculator();

  test('applies 10% discount for fiction', () => {
    const b = new FictionBook('Dune', 100);
    expect(calc.calculate(b)).toBe(90);
  });

  test('applies 15% discount for science', () => {
    const b = new ScienceBook('Cosmos', 100);
    expect(calc.calculate(b)).toBe(85);
  });

  test('no discount for unknown genre', () => {
    const b = new Book('Unknown', 50, 'travel');
    expect(calc.calculate(b)).toBe(50);
  });
});

describe('SalePriceCalculator', () => {
  const calc = new SalePriceCalculator();

  test('applies 30% discount for fiction on sale', () => {
    const b = new FictionBook('Hobbit', 100);
    expect(calc.calculate(b)).toBe(70);
  });

  test('applies 40% discount for science on sale', () => {
    const b = new ScienceBook('Physics', 100);
    expect(calc.calculate(b)).toBe(60);
  });
});

describe('BookRepository', () => {
  test('saves and finds book by title', () => {
    const repo = new BookRepository();
    const b = new FictionBook('Dune', 20);
    repo.save(b);
    const found = repo.findByTitle('Dune');
    expect(found).toBeDefined();
    expect(found?.title).toBe('Dune');
  });

  test('returns undefined if book not found', () => {
    const repo = new BookRepository();
    expect(repo.findByTitle('Missing')).toBeUndefined();
  });

  test('getAll returns all saved books', () => {
    const repo = new BookRepository();
    repo.save(new Book('A', 10, 'x'));
    repo.save(new Book('B', 20, 'y'));
    expect(repo.getAll()).toHaveLength(2);
  });
});

describe('LibraryService', () => {
  test('addBook saves book and logs message', () => {
    const repo = new BookRepository();
    const calc = new PriceCalculator();
    const logger = new ConsoleLogger();
    const service = new LibraryService(repo, calc, logger);

    const b = new FictionBook('Dune', 20);
    service.addBook(b);

    expect(repo.findByTitle('Dune')).toBeDefined();
  });

  test('getFinalPrice returns correct price', () => {
    const repo = new BookRepository();
    const calc = new PriceCalculator();
    const logger = new ConsoleLogger();
    const service = new LibraryService(repo, calc, logger);

    const b = new FictionBook('1984', 100);
    const price = service.getFinalPrice(b);
    expect(price).toBe(90);
  });

  test('works with SalePriceCalculator without changing service', () => {
    const repo = new BookRepository();
    const calc = new SalePriceCalculator();
    const logger = new ConsoleLogger();
    const service = new LibraryService(repo, calc, logger);

    const b = new ScienceBook('Cosmos', 100);
    const price = service.getFinalPrice(b);
    expect(price).toBe(60);
  });
});
