## Фикстуры
Представьте себе функцию, которая принимает на вход HTML в виде строки, извлекает из него все ссылки и возвращает как массив:
```html
// Для тестирования подобной функции, желательно взять HTML-код, близкий к реальному.
// Он хоть и не гарантирует работоспособности функции, но по крайней мере даёт хорошее разнообразие по структуре документа.
// HTML взят из нашего проекта cv.hexlet.io
const html = `
<div class="card mb-3"><div class="card-body"><div class="d-flex flex-column flex-sm-row">
<div class="d-flex flex-column mr-4"><div class="text-muted text-center mb-3">
<div class="h2 mb-0 font-weight-lighter">1</div><div class="small">Ответ</div></div>
<div class="text-muted text-center mb-3"><div class="h2 mb-0 font-weight-lighter">7</div>
<div class="small">Просмотров</div></div></div><div><h5 class="card-title">
<a href="/resumes/1">Backend Software Engineer</a></h5><div class="card-text">
<p>Программист-самоучка, избравший путь постоянного самосовершенствования.
Ценю красивый и лаконичный код, люблю функциональное программирование 
(великая троица <code>map</code>, <code>filter</code>, <code>reduce</code>).</p>
<p>Использую JS, Ruby, PHP, Python, Elixir, Clojure в разной степени мастерства.</p>
<p>Восхищаюсь семейством LISP-языков, пишу свой интерпретатор LISP на Elixir.
В настоящий момент углубляюсь в ОС Unix, чтобы в дальнейшем улучшить навыки DevOps.</p>
</div><div class="text-right small"><span class="mr-3 text-muted">12 дней</span>
<a href="/users/6">Улугбек Туйчиев</a></div></div></div></div></div>
`;

const links = extractLinks(html);
console.log(links);
// => ['/resumes/1', '/users/6']
```
Кусок HTML в начале теста выглядит страшно. Он большой и состоит из нагромождения тегов. Конечно, можно постараться и отформатировать его, но это будет ручная работа. Для любого редактора это просто строка в JavaScript. Но дело не только в форматировании, у такого способа работы с большими кусками данных есть и другие недостатки:

- При обновлениях очень легко допустить ошибку, которую сложно обнаружить визуально. Редактор ничем не сможет помочь.
- Чем больше таких данных в тестах, тем сложнее их читать и отделять логику от самих данных.

Было бы гораздо удобнее, если бы HTML хранился как обычный HTML в своём собственном файле. Это несложно сделать. В таком случае тест будет выглядеть так:
```javascript
import fs from 'fs';

    // Jest поддерживает функции с async/await
    test('extractLinks', async () => {
        // HTML находится в файле withLinks.html в директории __fixtures__
        // При чтении текстовых файлов, в конце может добавляться пустая строка.
        // Она удаляется с помощью метода `trim`, если нужно
        // __dirname – директория, в которой находится данный файл с тестами
        const html = await fs.readFile(`${__dirname}/../__fixtures__/withLinks.html`, 'utf-8');
        // Теперь с HTML удобно работать и он не загромождает тесты.
        const links = extractLinks(html);
        expect(links).toEqual(['/resumes/1', '/users/6']);
});
```
Данные, которые нужны во время запуска тестов, называются фикстурами. Это не обязательно текстовые данные. Фикстурами могут быть картинки, JSON- и XML-файлы, записи в базе данных и многое другое. Иногда частью фикстур может быть и код, но это довольно редкая ситуация. [Подобные фикстуры](https://github.com/eslint/eslint/tree/main/tests/fixtures) нужны при тестировании различных анализаторов кода, таких как ESLint или Babel.

Обычно фикстуры хранятся в отдельных файлах в своей директории. В Jest для этого рекомендуется создавать директорию `__fixtures__` в корне проекта. Затем они читаются и по необходимости используются в тестах.

Пример:
```
tree __fixtures__

├── after.ini
├── after.json
├── after.yml
├── before.ini
├── before.json
├── before.yml
└── result.txt
```
Когда фикстур больше одной, то в коде тестов начинает появляться много похожих вызовов, считывающих файлы:
```javascript
// Где-то в тестах или в хуках
const html = await fs.readFile(`${__dirname}/../__fixtures__/withLinks.html`, 'utf-8');
const json = await fs.readFile(`${__dirname}/../__fixtures__/somethingElse.json`, 'utf-8');
```
В таком случае лучше вынести построение пути в отдельную функцию, а заодно воспользоваться правильным способом склеивания путей:
```javascript
import path from 'path';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename), 'utf-8');

// Само чтение файлов нужно выполнять либо внутри тестов, либо внутри хуков, например `beforeAll` или `beforeEach`.
// Не стоит этого делать на уровне модуля, вне функций.
const html = await readFile('withLinks.html');
const json = await readFile('somethingElse.json');
```
## Дополнительные материалы
- [Что такое __dirname в JavaScript](https://ru.hexlet.io/blog/posts/chto-takoe-__dirname-v-javascript)