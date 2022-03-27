Протестируйте функцию `sort()`, которая сортирует массив целых чисел по возрастанию. Функция возвращает новый отсортированный массив. При тестировании используйте `property-based` подход.
```javascript
const numbers = [3, 1, 0, 7, 5];
const sorted = sort(numbers);
console.log(sorted); // => [0, 1, 3, 5, 7]
```

## Подсказки
- Используйте для тестирования фреймворк [fast-check](https://github.com/dubzzz/fast-check)
- Чтобы проверить, что массив отсортирован, используйте [матчер toBeSorted](https://github.com/P-Copley/jest-sorted)

```javascript
expect([1, 2, 3]).toBeSorted();
```