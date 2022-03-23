import { strict as assert } from 'assert';
import getFunction from '../functions.js';

const take = getFunction();

// BEGIN (write your solution here)
assert.deepEqual(take([], 0), []);
assert.deepEqual(take([], 2), []);
assert.deepEqual(take([1, 2, 3]), [1]);
assert.deepEqual(take([1, 2, 3], 2), [1, 2]);
assert.deepEqual(take([4, 3], 9), [4, 3]);
assert.deepEqual(take([4, 3], -1), []);
// END
