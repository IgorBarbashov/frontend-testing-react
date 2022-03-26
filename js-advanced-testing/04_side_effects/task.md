Протестируйте функцию, которая генерирует случайного пользователя. Пользователь, в данном случае, это объект с тремя полями:

- email
- firstName
- lastName

Для генерации данных используется библиотека [fakerator](https://github.com/icebob/fakerator)
```javascript
console.log(buildUser());
// {
//   email: 'Zion.Reichel12@yahoo.com',
//   firstName: 'Elizabeth',
//   lastName: 'Zulauf',
// }

// Если какой-то из параметров нужно задать точно, то его можно передать в функцию
console.log(buildUser({ firstName: 'Petya' }));
// {
//   email: 'Zion.Reichel12@yahoo.com',
//   firstName: 'Petya',
//   lastName: 'Zulauf',
// }
```
Вам нужно протестировать три ситуации:

- Что вызов `buildUser()` возвращает объект нужной структуры.
- Что каждый вызов `buildUser()` возвращает объект с другими данными.
- Что работает установка свойств через параметры.