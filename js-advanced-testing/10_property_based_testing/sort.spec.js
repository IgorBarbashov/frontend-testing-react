// @ts-check

import fc from 'fast-check';
import getFunction from '../functions.js';

const sort = getFunction();

// BEGIN (write your solution here)
describe('Function sort', () => {
    it('should correctly sort given array of the numbers', () => {
        fc.assert(
            fc.property(
                fc.int32Array(),
                (a) => expect(sort(a)).toBeSorted(),
            ),
        );
    });
});
// END
