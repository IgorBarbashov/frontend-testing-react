// @ts-check

import getImpelementation from '../implementations/index.js';

const { get, slice, indexOf } = getImpelementation();

test('testing function get()', () => {
    const actual1 = get([1, 2, 3], 1, 'a');
    expect(actual1).toBe(2);
    const actual2 = get([1, 2, 3], 4, 'a');
    expect(actual2).toBe('a');
    const actual3 = get([1, 2, 3], 4);
    expect(actual3).toBeNull();

    // BEGIN (write your solution here)
    // END
});

test('testing function slice()', () => {
    const actual1 = slice([1, 2, 3, 4, 5, 6], 1, 4);
    expect(actual1).toEqual([2, 3, 4]);

    // BEGIN (write your solution here)
    const actual2 = slice([1, 2, 3, 4, 5]);
    expect(actual2).toEqual([1, 2, 3, 4, 5]);
    const actual3 = slice([1, 2, 3, 4, 5], 1, 4);
    expect(actual3).toEqual([2, 3, 4]);
    const actual4 = slice([1, 2, 3, 4, 5], -4, -2);
    expect(actual4).toEqual([2, 3]);
    const actual5 = slice([1, 2, 3, 4, 5], 7);
    expect(actual5).toEqual([]);
    const actual6 = slice([1, 2, 3, 4, 5], -8, 8);
    expect(actual6).toEqual([1, 2, 3, 4, 5]);
    const actual7 = slice([], 0, 5);
    expect(actual7).toEqual([]);
    // END
});

test('testing function indexOf()', () => {
    const actual1 = indexOf([2, 7, 3, 2, 4], 2);
    expect(actual1).toBe(0);

    // BEGIN (write your solution here)
    const actual2 = indexOf([1, 2, 3, 2, 5], 2);
    expect(actual2).toBe(1);
    const actual3 = indexOf([1, 2, 3, 2, 5], 7);
    expect(actual3).toBe(-1);
    const actual4 = indexOf([1, 2, 3, 2, 5], 2, -3);
    expect(actual4).toBe(3);
    const actual5 = indexOf([1, 2, 3, 2, 5], 2, -10);
    expect(actual5).toBe(1);
    const actual6 = indexOf([], 2, -10);
    expect(actual6).toBe(-1);
    // END
});
