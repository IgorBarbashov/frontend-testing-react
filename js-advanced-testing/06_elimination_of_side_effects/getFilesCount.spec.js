// @ts-check

import path from 'path';
import getFunction from '../functions.js';

const getFilesCount = getFunction();

const getFixturePath = (name) => path.join('__fixtures__', name);

// BEGIN (write your solution here)
describe('Function getFilesCount', () => {
    it('should correctly count number of files in the flat directory', () => {
        const path = getFixturePath('flat');
        const actualCount = getFilesCount(path, () => {});
        expect(actualCount).toBe(3);
    });

    it('should correctly count number of files in the directory with subdirectories', () => {
        const path = getFixturePath('nested');
        const actualCount = getFilesCount(path, () => {});
        expect(actualCount).toBe(4);
    });
});
// END
