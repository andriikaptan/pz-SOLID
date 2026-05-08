import { IBook } from '../interfaces/IBook';

// ✅ SRP: тільки дані книги
export class Book implements IBook {
  constructor(
    public title: string,
    public price: number,
    public genre: string,
  ) {}
}
