import { Book } from './Book';

// ✅ LSP: розширює Book без порушення контракту
export class ScienceBook extends Book {
  constructor(title: string, price: number) {
    super(title, price, 'science');
  }
}
