// @ts-check

import getFunction from '../functions.js';

const set = getFunction();

// BEGIN (write your solution here)
describe('Function set', () => {
    let obj = null;

    beforeEach(() => {
        obj = { a: [{ b: { c: 3 } }] };
    });

    it('should mutate exists properties in object', () => {
        const expected = { a: [{ b: { c: 33 } }] };
        expect(set(obj, 'a[0].b.c', 33)).toEqual(expected);
    });

    it('should add new property to object', () => {
        const expected = { a: [{ b: { c: 3 } }], d: 'newProp' };
        expect(set(obj, 'd', 'newProp')).toEqual(expected);
    });

    it('should add new element to exists array in object', () => {
        const expected = { a: [{ b: { c: 3 } }, 'aaa'] };
        expect(set(obj, 'a[1]', 'aaa')).toEqual(expected);
    });
});

// END