// ❌ Порушення SOLID — навмисно поганий код

// ❌ ISP: великий інтерфейс з непотрібними методами
interface IBookAll {
  title: string;
  price: number;
  genre: string;
  calculatePrice(): number;
  saveToDatabase(): void;
  sendNotification(): void;
}

// ❌ SRP: клас робить все — дані, збереження, email, ціна
// ❌ DIP: залежить від конкретики, не від абстракцій
class Book implements IBookAll {
  title: string;
  price: number;
  genre: string;

  constructor(title: string, price: number, genre: string) {
    this.title = title;
    this.price = price;
    this.genre = genre;
  }

  // ❌ OCP: щоб додати жанр — треба змінювати цей метод
  calculatePrice(): number {
    if (this.genre === 'fiction') {
      return this.price * 0.9;
    } else if (this.genre === 'science') {
      return this.price * 0.85;
    } else {
      return this.price;
    }
  }

  // ❌ SRP: збереження не повинно бути в класі книги
  saveToDatabase(): void {
    console.log(`Saving book "${this.title}" to database...`);
  }

  // ❌ SRP: надсилання повідомлень — окрема відповідальність
  sendNotification(): void {
    console.log(`Sending notification for book "${this.title}"...`);
  }
}

// ❌ LSP: клас-нащадок порушує контракт базового класу
class DigitalBook extends Book {
  calculatePrice(): number {
    // ❌ LSP: кидає виняток замість повернення числа
    throw new Error('Digital books have no price calculation');
  }
}
