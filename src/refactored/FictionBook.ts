import { Book } from './Book';

// ✅ LSP: розширює Book без порушення контракту
export class FictionBook extends Book {
  constructor(title: string, price: number) {
    super(title, price, 'fiction');
  }
}
