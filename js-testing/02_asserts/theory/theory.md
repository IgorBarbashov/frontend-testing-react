##Утверждения (Asserts)
Каждую проверку, которую мы написали для функции `capitalize()`, в тестировании принято называть `утверждением (assert)`. Утверждения — ключевая часть тестов. Именно они проверяют функциональность кода:
```
import capitalize from '../src/capitalize.js';

// Первое утверждение (проверка на пустую строку)
if (capitalize('') !== '') {
throw new Error('Функция работает неверно!');
}

// Второе утверждение (проверка на слово)
if (capitalize('hello') !== 'Hello') {
throw new Error('Функция работает неверно!');
}
```
Можно заметить, что все проверки строятся одинаковым способом: условие => исключение. Node.js поставляется с модулем `assert`, в котором есть несколько функций, упрощающих написание утверждений:
```
// Такой необычный импорт связан с тем,
// что assert, экспортируемый по умолчанию, считается устаревшим
// Правильно использовать strict
import { strict as assert } from 'assert';
import capitalize from '../src/capitalize.js';

// Проверка сменилась с отрицательной на положительную
assert(capitalize('') === '');
assert(capitalize('hello') === 'Hello');
```
В самом простом случае `assert` используется как функция, которая проверяет истинность переданного значения. Другими словами, `assert(true)` означает, что всё хорошо, а `assert(false)` говорит об ошибке. Последний вариант выбрасывает исключение с таким сообщением:
```
AssertionError [ERR_ASSERTION]: false == true
```
Расшифровка сообщения: "Ожидалось, что значением выражения будет истина, но оказалось, что это ложь". Кроме сообщения, выводится бектрейс, по которому можно найти сработавшее утверждение:
```
// В данном случае assert сработал на 15 строчке файла capitalize.js
at first (file:///src/capitalize.js:15:19)
at default (file:///src/capitalize.js:11:3)
at file:///test.js:5:13
```
Функция `assert()` сделала наш код короче и проще для восприятия. Положительная проверка смотрится естественнее, так как это то, что мы ожидаем.

С другой стороны, вывод сообщения об ошибке крайне неинформативный. Единственный способ понять, что произошло — открывать код с упавшим утверждением (ещё есть вариант передать сообщение об ошибке последним параметром, но так не делают, потому что это слишком "ручной" способ, требующий больших усилий). Это пытаются исправить с помощью специализированных утверждений, заточенных под конкретные ситуации. Например, при сравнении двух значений подходит функция `assert.strictEqual(actual, expected)`. Перепишем код выше:
```
import { strict as assert } from 'assert';
// при использовании strict-режима
// проверка equal равносильна strictEqual

import capitalize from '../src/capitalize.js';

// Проверка сменилась с отрицательной на положительную
assert.equal(capitalize(''), '');
// Первый параметр actual – то, что пришло
// Второй параметр expected – то, что ожидает тест
// Правильный порядок аргументов имеет большое значение при анализе ошибки
assert.equal(capitalize('hello'), 'Hello');
```
Вывод таких утверждений значительно понятнее:
```
Thrown:
AssertionError [ERR_ASSERTION]: 'hello' == 'Hello'
generatedMessage: true,
code: 'ERR_ASSERTION',
actual: 'hello',
expected: 'Hello',
operator: '=='
```
https://repl.it/@hexlet/js-testing-asserts-capitalize#tests/capitalize.test.js

В этом выводе есть не только информация об ошибке, но и данные, которые передавались в утверждение. Такой формат упрощает анализ проблемы и ускоряет отладку.

Однако, будьте осторожны. Функция `strictEqual(actual, expected)` проверяет равенство по ссылке. То есть два разных объекта, имеющих одинаковое содержание, рассматриваются как не эквивалентные:
```
AssertionError [ERR_ASSERTION]: Values have same structure but are not reference-equal:

{
key: 'value'
}

    at repl:1:8
    at Script.runInThisContext (vm.js:131:20)
    at REPLServer.defaultEval (repl.js:436:29)
    at bound (domain.js:429:14)
    at REPLServer.runBound [as eval] (domain.js:442:12)
    at REPLServer.onLine (repl.js:763:10)
    at REPLServer.emit (events.js:327:22)
    at REPLServer.EventEmitter.emit (domain.js:485:12)
    at REPLServer.Interface._onLine (readline.js:337:10)
    at REPLServer.Interface._line (readline.js:666:8) {
generatedMessage: true,
code: 'ERR_ASSERTION',
actual: [Object],
expected: [Object],
operator: 'strictEqual'
}
```
Для сравнения по значению используется ещё одно утверждение: `assert.deepEqual(actual, expected)`. Оно опирается только на содержимое:
```
assert.deepEqual({}, {}); // всё ок
assert.deepEqual({ key: 'value' }, { key: 'value' }); // всё ок
assert.deepEqual({ key: 'value' }, { key: 'another value' }); // Boom!
```
На самом деле правила проверки этой функции достаточно сложны. Подробнее об этом можно прочитать в [документации](https://nodejs.org/api/assert.html#assert_assert_deepstrictequal_actual_expected_message)

Для тестирования негативных сценариев предназначены функции `assert.notStrictEqual(actual, expected)` и `assert.notDeepStrictEqual(actual, expected)`. Они тестируют то, что значения не равны. Эти утверждения используются крайне редко, но знать о них всё равно полезно:
```
assert.notDeepEqual({ a: 1 }, { a: '1' }); // OK!
```
[https://repl.it/@hexlet/js-testing-asserts-methods#index.test.js](https://repl.it/@hexlet/js-testing-asserts-methods#index.test.js)

##Самостоятельная работа
1. Посмотрите в конце урока ссылки на документацию на библиотеки утверждений
2. Замените в вашем репозитории ручные утверждения на использование модуля assert
3. Запустите тесты, убедитесь что они работают. Попробуйте их сломать
4. Добавьте код на гитхаб

##Дополнительные материалы
- [Asserts](https://nodejs.org/api/assert.html)
- [Chai](https://www.chaijs.com/)