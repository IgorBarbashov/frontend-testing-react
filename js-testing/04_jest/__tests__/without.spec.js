// @ts-check

import getFunction from '../functions.js';

const without = getFunction();

// BEGIN (write your solution here)
describe('Function without', () => {
    it('should return an array with one element', () => {
        expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
    });

    it('should return an empty array', () => {
        expect(without([2, 1, 2, 3], 1, 2, 3)).toEqual([]);
    });

    it('should return an original array', () => {
        expect(without([2, 1, 2, 3], 9)).toEqual([2, 1, 2, 3]);
    });

    it('should return a new array', () => {
        const givenAray = [2, 1, 2, 3];
        expect(without(givenAray, 9)).not.toBe(givenAray);
    });
});
// END
