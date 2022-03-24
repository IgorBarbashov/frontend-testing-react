// @ts-check

import getImpelementation from '../implementations/functions.js';

const fill = getImpelementation();

// BEGIN (write your solution here)
describe('Function fill', () => {
    let array = null;

    beforeEach(() => {
        array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    });

    it('should change given array', () => {
        expect(fill(array, '*', 0, 10)).toBe(array);
    });

    it('should fill given array from start to end positions', () => {
        const expected = [1, '*', '*', 4, 5, 6, 7, 8, 9, 0];
        expect(fill(array, '*', 1, 3)).toEqual(expected);
    });

    it('should fill all given array if no start and no end positions given', () => {
        const expected = ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'];
        expect(fill(array, '*')).toEqual(expected);
    });

    it('should fill given array from given start position to end', () => {
        const expected = [1, 2, 3, 4, '*', '*', '*', '*', '*', '*'];
        expect(fill(array, '*', 4)).toEqual(expected);
    });

    it('should fill all given array if end postion greater than array lenght', () => {
        const expected = ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*'];
        expect(fill(array, '*', 0, 10)).toEqual(expected);
    });

    it('should return original array if start position > than array.length', () => {
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        expect(fill(array, '*', 15)).toEqual(expected);
    });
});
// END
