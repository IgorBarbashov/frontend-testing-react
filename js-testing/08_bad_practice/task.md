Напишите тесты для корзины интернет-магазина. Интерфейс:

1. `makeCart()` – создаёт новую пустую корзину (объект).
2. `addItem(good, count)` – добавляет в корзину товары и их количество. Товар – это объект с двумя свойствами: `name` (имя) и `price` (стоимость).
3. `getItems()` – возвращает список товаров в формате `[{ good, count }, { good, count }, ...]`
4. `getCost()` – возвращает стоимость корзины. Стоимость корзины высчитывается как сумма всех добавленных товаров с учётом их количества.
5. `getCount()` – возвращает количество товаров в корзине.
```
const cart = makeCart();
cart.addItem({ name: 'car', price: 3 }, 5);
cart.addItem({ name: 'house', price: 10 }, 2);
cart.getItems().length; // 2
cart.getCost(); // 35
cart.addItem({ name: 'house', price: 10 }, 1);
cart.getItems().length; // 3
cart.getCost(); // 45
```