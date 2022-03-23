// @ts-check

import getFunction from '../functions.js';

const gt = getFunction();

// BEGIN (write your solution here)
describe('Function gt', () => {
    it('should return true if value greater than other', () => {
        expect(gt(3, 1)).toBe(true);
    });

    it('should return false if value equal to other', () => {
        expect(gt(3, 3)).toBe(false);
    });

    it('should return false if value less than other', () => {
        expect(gt(1, 3)).toBe(false);
    });
});
// END