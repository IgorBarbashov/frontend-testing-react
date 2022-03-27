// @ts-check

import fs from 'fs/promises';
import prettier from 'prettier';

const { format: beautify } = prettier;

const options = {
    parser: 'html',
    tabWidth: 4,
};

const functions = {
    right1: async (filepath) => {
        const data = await fs.readFile(filepath, 'utf-8');
        await fs.writeFile(filepath, beautify(data, options));
    },
    wrong1: async (filepath) => {
        const data = await fs.readFile(filepath, 'utf-8');
        await fs.writeFile(filepath, data);
    },
};

export default () => {
    const name = process.env.FUNCTION_VERSION || 'right1';
    return functions[name];
};
