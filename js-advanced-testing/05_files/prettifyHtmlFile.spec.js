// @ts-check

import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import getFunction from '../functions.js';

const prettifyHTMLFile = getFunction();

// BEGIN (write your solution here)
describe('Function prettifyHTMLFile', () => {
    const getPath = (fileName) => path.join('__fixtures__', fileName);
    const getTmpPath = (fileName) => path.join(os.tmpdir(), fileName);

    const srcPath = getPath('before.html');
    const destPath = getPath('after.html');
    const testPath = getTmpPath('test.html');
    let expectedString = '';

    beforeAll(async () => {
        expectedString = (await fs.readFile(destPath, 'utf-8')).trim();
    });

    beforeEach(async () => {
        await fs.unlink(testPath).catch(() => { });
        await fs.copyFile(srcPath, testPath);
    });

    it('should correctly format string in file', async () => {
        await prettifyHTMLFile(testPath);
        const actualString = await fs.readFile(testPath, 'utf-8');
        expect(actualString.trim()).toBe(expectedString);
    });
});
// END
