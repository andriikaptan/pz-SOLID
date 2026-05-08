# Practical lesson pz-SOLID  
# Практична реалізація SOLID принципів  

> У цьому занятті студенти отримують практичні навички застосування SOLID принципів під час рефакторингу існуючого коду.  
> Мета — створити гнучку, масштабовану та чисту архітектуру шляхом застосування SRP, OCP, LSP, ISP та DIP.

---

## What need to do:
* Провести аналіз вихідного «анти-SOLID» коду  
* Визначити порушення кожного SOLID принципу  
* Виконати рефакторинг згідно з:
  * SRP — Single Responsibility Principle  
  * OCP — Open/Closed Principle  
  * LSP — Liskov Substitution Principle  
  * ISP — Interface Segregation Principle  
  * DIP — Dependency Inversion Principle  
* Створити відповідні інтерфейси й абстракції  
* Усунути зайві або циклічні залежності  
* Додати мінімальний набір unit-тестів після рефакторингу  

---

## Acceptance criteria
* Реалізація на мові Typescript 
* Студент розуміє кожен SOLID принцип та пояснює його застосування  
* Увесь вихідний код проаналізовано  
* Усі порушення SOLID знайдено та описано  
* Після рефакторингу:
  * Кожен клас має одну відповідальність (SRP)  
  * Код розширюється через нові класи, а не редагування існуючих (OCP)  
  * Класи-нащадки повністю заміщають базові (LSP)  
  * Інтерфейси невеликі й специфічні (ISP)  
  * Залежності реалізовані через абстракції (DIP)  
* Код структурований, логічний та зрозумілий  
* Усі тести проходять успішно  
* Звіт оформлений у Markdown (README.md)

## Directory Structure
```
├── pz-SOLID
│   ├── src
│   │   ├── original          # код із навмисними порушеннями SOLID
│   │   ├── refactored        # код після рефакторингу
│   │   ├── interfaces        # абстракції та інтерфейси
│   ├── tests
│   │   ├── refactored.spec.ts
│   ├── .editorconfig
│   ├── .gitignore
│   ├── jest.config.js
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
└──
```

## Аналіз порушень SOLID у вихідному коді

### Вихідний код: `src/original/Book.ts`

**SRP — порушення:**  
Клас `Book` відповідає одразу за збереження даних, розрахунок ціни, запис в базу даних і відправку повідомлень — це 4 різні відповідальності.

**OCP — порушення:**  
Метод `calculatePrice()` використовує `if/else` для жанрів. Додавання нового жанру потребує зміни існуючого класу.

**LSP — порушення:**  
`DigitalBook` перевизначає `calculatePrice()` і кидає виняток. Клас не може замінити батьківський `Book`.

**ISP — порушення:**  
Інтерфейс `IBookAll` поєднує розрахунок ціни, збереження і сповіщення. Реалізатори змушені реалізовувати непотрібні методи.

**DIP — порушення:**  
`Book` напряму викликає `console.log` і не залежить від жодних абстракцій.

---

## Рефакторинг

### SRP
- `Book` — тільки дані книги  
- `BookRepository` — тільки зберігання  
- `ConsoleLogger` — тільки логування  
- `PriceCalculator` — тільки розрахунок ціни  
- `LibraryService` — координація всіх операцій  

### OCP
- `PriceCalculator` — стандартна ціна  
- `SalePriceCalculator` — знижена ціна (новий клас, не змінює PriceCalculator)  

### LSP
- `FictionBook` і `ScienceBook` повністю замінюють `Book` без порушення поведінки  

### ISP
- `IBook` — тільки поля книги  
- `IPriceCalculator` — тільки `calculate()`  
- `IBookRepository` — тільки `save()`, `findByTitle()`, `getAll()`  
- `ILogger` — тільки `log()`  

### DIP
- `LibraryService` залежить від `IBookRepository`, `IPriceCalculator`, `ILogger` — не від конкретних класів  

---

## Useful links

[SOLID Principles Explained](https://www.baeldung.com/solid-principles)

[SOLID: The First 5 Principles of Object-Oriented Design](https://www.freecodecamp.org/news/solid-principles-explained-in-plain-english/)

[JavaScript SOLID: Реалізація принципів](https://khalilstemmler.com/articles/solid-principles/)

[Clean Code Concepts Adapted for JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

[Dependency Injection in JavaScript](https://javascript.plainenglish.io/dependency-injection-in-javascript-1b82a8101c1a)
