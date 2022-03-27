// @ts-check

import path from 'path';
import { jest } from '@jest/globals';
import getFunction from '../functions.js';

const getFilesCount = getFunction();

const getFixturePath = (name) => path.join('__fixtures__', name);

// BEGIN (write your solution here)
describe('Function getFilesCount', () => {
    it('should have been called once with "Go!" message', () => {
        const log = jest.fn();
        const path = getFixturePath('nested');
        getFilesCount(path, log);
        expect(log).toHaveBeenCalledTimes(1);
        expect(log).toHaveBeenCalledWith('Go!');
    });
});
// END
