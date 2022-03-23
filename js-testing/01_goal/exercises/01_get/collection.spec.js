// @ts-check
import getFunction from '../functions.js';

const get = getFunction();

// BEGIN (write your solution here)
let result = get({ validKey: 'value' }, 'validKey');
let expected = 'value';
if (result !== expected) {
    throw new Error('Test 1 - Функция работает неверно!');
}

result = get({ validKey: 'value' }, 'invalidKey', 'defaultValue');
expected = 'defaultValue';
if (result !== expected) {
    throw new Error('Test 2 - Функция работает неверно!');
}

result = get({ validKey: 'value' }, 'validKey', 'defaultValue');
expected = 'value';
if (result !== expected) {
    throw new Error('Test 3 - Функция работает неверно!');
}
// END
