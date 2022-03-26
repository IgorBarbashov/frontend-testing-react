// @ts-check

import getFunction from '../functions.js';

const read = getFunction();

// BEGIN (write your solution here)
describe('Function read', () => {
    it('should throw error if file not found', () => {
        expect(() => read('123')).toThrow();
    });

    it('should throw error if given path is empty string', () => {
        expect(() => read('')).toThrow();
    });

    it('should throw error if given path to dir', () => {
        expect(() => read('./__tests__')).toThrow();
    });
});
// END
