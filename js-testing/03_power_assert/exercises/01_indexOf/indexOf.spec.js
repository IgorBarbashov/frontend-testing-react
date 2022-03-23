// @ts-check

import assert from 'power-assert';
import getFunction from '../functions.js';

const indexOf = getFunction();

// BEGIN (write your solution here)
assert(indexOf([1, 2, 1, 2], 2) === 1);
assert(indexOf([1, 2, 1, 2], 1) === 0);
assert(indexOf([1, 2, 1, 2], 2, 2) === 3);
assert(indexOf([2, 'one', 'cat', false], 8) === -1);
assert(indexOf([2, 'one', 'cat', false], 'cat', -3) === 2);
// END