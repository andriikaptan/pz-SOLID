import { ILogger } from '../interfaces/ILogger';

// ✅ SRP: тільки виведення повідомлень
export class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}
