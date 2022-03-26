// @ts-check

import fs from 'fs/promises';
import path from 'path';
import getFunction from '../functions.js';

const toHtmlList = getFunction();

// BEGIN (write your solution here)
describe('Function toHtmlList should corect parse ', () => {
    const fileExtensions = ['csv', 'json', 'yml'];
    const getPath = (fileName) => path.join('__fixtures__', fileName);
    let expected = '';

    beforeAll(async () => {
        expected = await fs.readFile(getPath('result.html'), 'utf-8');
    });

    it.each(fileExtensions)('%s file', async (ext) => {
        const path = getPath(`list.${ext}`);
        const actual = await toHtmlList(path);
        expect(actual.trim()).toBe(expected.trim());
    });
});
// END
