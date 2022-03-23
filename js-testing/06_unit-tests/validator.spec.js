// @ts-check

import getImplementation from '../implementations/index.js';

const makeValidator = getImplementation();

// BEGIN (write your solution here)
describe('Validator', () => {
    let validator = null;

    beforeEach(() => {
        validator = makeValidator();
    });

    it('should return true if value passed two checks and false if don\'t passed at least one of them', () => {
        validator.addCheck((v) => v >= 10);
        validator.addCheck((v) => v <= 100);
        expect(validator.isValid(15)).toBe(true);
        expect(validator.isValid(5)).toBe(false);
    });

    it('should return true if no checks', () => {
        expect(validator.isValid(15)).toBe(true);
    });

    it('should return true and then false', () => {
        validator.addCheck((v) => v >= 10);
        expect(validator.isValid(150)).toBe(true);
        validator.addCheck((v) => v <= 100);
        expect(validator.isValid(150)).toBe(false);
    });
});
// END
