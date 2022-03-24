## Подготовка данных
Большинство тестов на одну и ту же функциональность сильно похожи друг на друга. Особенно в части начальной подготовки данных. В прошлом уроке каждый тест начинался со строчки: `makeStack()`. Это ещё не дублирование, но уже шаг в эту сторону. Как правило, реальные тесты сложнее и включают в себя большую подготовительную работу.

Допустим, мы разрабатываем библиотеку [Lodash](https://lodash.com/docs/4.17.15) и хотим протестировать её функции для обработки коллекций:

- find
- filter
- includes
- и другие (всего их около 20 штук)

Для работы этих функций нужна заранее подготовленная коллекция. Проще всего придумать одну, которая подойдёт для тестирования большинства или даже всех функций:
```
import _ from 'lodash';
test('includes', () => {
// Подготовили коллекцию coll
const coll = ['One', true, 3, 10, 'cat', {}, '', 10, false];

// Используем coll для тестирования
expect(_.includes(coll, 3)).toBe(true);
expect(_.includes(coll, 11)).toBe(false);
});
```
Теперь представьте, что таких тестов несколько десятков (в реальности их сотни). Код начнёт кочевать из одного места в другое, порождая всё больше и больше копипасты.

Самый простой способ избежать этого — вынести определение коллекции на уровень модуля, вне тестовых функций:
```
import _ from 'lodash';

const coll = ['One', true, 3, 10, 'cat', {}, '', 10, false];

test('includes', () => {
expect(_.includes(coll, 3)).toBe(true);
expect(_.includes(coll, 11)).toBe(false);
});
```
Это простое решение убирает ненужное дублирование. Однако учтите, оно работает только в рамках одного модуля. Подобную коллекцию всё равно придётся определять в каждом тестовом модуле. И в нашем случае это скорее плюс, а не минус.

Дело в том, что излишнее обобщение, приводящее к полному устранению дублирования, вводит неявные зависимости в код. Изменение этой коллекции почти наверняка приведёт к поломке большинства тестов, которые завязаны на её структуру, на количество элементов и их значения:
```
import _ from 'lodash';

const coll = [1, 2, 3, 4];

test('filter', () => {
// Выбираем только чётные
expect(_.filter(coll, (v) => v % 2 === 0)).toEqual([2, 4])
});
```
Тест выше сломается, если мы добавим в нашу коллекцию еще одно чётное число. А коллекцию почти наверняка придётся расширять при добавлении новых тестов (для этой же или других функций).

Главный вывод из этого: устранять дублирование надо. Но важно не перейти границу, после которой обобщение начинает больше мешать, чем помогать.

Но далеко не всегда можно выносить константы на уровень модуля. В первую очередь это касается динамических данных. Представьте себе такой код:
```
const now = Date.now(); // текущий timestamp

test('first example', () => console.log(now));
test('second example', () => console.log(now));

//  console.log __tests__/index.test.js:3
//    1583871515943
//
//  console.log __tests__/index.test.js:4
//    1583871515943
```
Подвох тут в том, что модуль загружается в память ровно один раз. Это значит, что весь код, определённый на уровне модуля (включая константы), выполняется ровно один раз. В примере константа now определится до запуска всех тестов, и только затем jest начнёт выполнять тесты. И с каждым последующим тестом отставание значения константы now от текущего реального значения "сейчас" будет всё дальше и дальше.

Почему это может быть проблемой? Код, который работает с понятием "сейчас", может рассчитывать на то, что "сейчас" это почти моментальный снимок данного момента времени. Но в примере выше, сейчас начинает отставать от реального сейчас и чем больше тестов и чем они сложнее, тем большее отставание.

> Важно не забыть: функция test не запускает тест на выполнение. Она добавляет его внутрь Jest, а вот он уже решает, когда выполнить этот тест. Поэтому между загрузкой модуля и отработкой тестов проходит неопределённое время.

Для решения этой проблемы тестовые фреймворки предоставляют **хуки** — специальные функции, которые запускаются до или после тестов. Ниже пример того, как создавать дату перед каждым тестом:
```
let now;

// Запускается перед каждым тестом
beforeEach(() => {
now = Date.now(); // текущий timestamp
});

test('first example', () => console.log(now));
test('second example', () => console.log(now));

//  console.log __tests__/index.test.js:9
//    1583871515943
//
//  console.log __tests__/index.test.js:10
//    1583871515950
```
[https://repl.it/@hexlet/js-testing-setup-globals#index.test.js](https://repl.it/@hexlet/js-testing-setup-globals#index.test.js)

`beforeEach(callback)` принимает на вход функцию, внутри которой выполняется инициализирующее действие. Оно не обязательно приводит к созданию переменных. Возможно, инициализация заключается в подготовке файловой системы, например, создании файлов.

Но если она должна создать данные и сделать их доступными в тестах, то придётся использовать переменные, определённые на уровне модуля. Так как всё, что определяется внутри функций (колбека в нашем случае), остаётся внутри этой функции.

Даже если нам нужно выполнить код один раз перед всеми тестами, его все равно нужно выполнять не на уровне модуля, а внутри хука `beforeAll(callback)`. Этот хук запускается ровно один раз перед всеми тестами, расположенными в одном модуле.
```
import fs from 'fs';

let fileData;

beforeAll(() => {
fileData = fs.readFileSync('path/to/file');
});

// Такой вызов на уровне модуля (вне хуков), в общем случае, считается неправильным подходом
// fileData = fs.readFileSync('path/to/file');
```
Почему это важно? Чтобы ответить на этот вопрос, нам нужно знать немного больше про асинхронную природу JavaScript. Этот вопрос разбирается в курсах позже, а пока можно ограничиться вот чем: Jest должен контролировать происходящие процессы и побочные эффекты в тестах. Все, что вызывается на уровне модуля, отрабатывает вне Jest. Это значит, что Jest никак не может отследить, что происходит, и в какой момент можно запускать тесты.

## Дополнительные материалы
[Jest methods](https://jestjs.io/docs/api#methods)