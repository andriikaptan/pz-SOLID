import { IBook } from './IBook';

// ✅ ISP: тільки збереження та пошук
export interface IBookRepository {
  save(book: IBook): void;
  findByTitle(title: string): IBook | undefined;
  getAll(): IBook[];
}
