import { IBook } from './IBook';

// ✅ ISP: тільки розрахунок ціни
export interface IPriceCalculator {
  calculate(book: IBook): number;
}
