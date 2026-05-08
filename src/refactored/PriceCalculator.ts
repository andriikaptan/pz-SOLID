import { IPriceCalculator } from '../interfaces/IPriceCalculator';
import { IBook } from '../interfaces/IBook';

// ✅ SRP: тільки розрахунок ціни
// ✅ OCP: нова стратегія — новий клас, цей не змінюється
export class PriceCalculator implements IPriceCalculator {
  private discounts: Record<string, number> = {
    fiction: 0.1,
    science: 0.15,
  };

  calculate(book: IBook): number {
    const discount = this.discounts[book.genre] ?? 0;
    return book.price - book.price * discount;
  }
}

// ✅ OCP: розширення для акційних цін без зміни PriceCalculator
export class SalePriceCalculator implements IPriceCalculator {
  private discounts: Record<string, number> = {
    fiction: 0.3,
    science: 0.4,
  };

  calculate(book: IBook): number {
    const discount = this.discounts[book.genre] ?? 0;
    return book.price - book.price * discount;
  }
}
