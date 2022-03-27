// @ts-check

import nock from 'nock';
import getFunction from '../functions.js';

const getUserMainLanguage = getFunction();

nock.disableNetConnect();

// BEGIN (write your solution here)
describe('Function getUserMainLanguage', () => {
    const expectedResults = {
        igor: 'javascript',
        mickel: 'java',
        roman: null,
        irina: null,
    };

    const response = [
        {
            name: 'igor',
            data: [
                { language: 'javascript' },
                { language: 'javascript' },
                { language: 'javascript' },
                { language: 'java' },
            ],
        },
        {
            name: 'mickel',
            data: [
                { language: 'java' },
                { language: 'java' },
                { language: 'java' },
                { language: 'python' },
            ],
        },
        {
            name: 'roman',
            data: [],
        },
        {
            name: 'irina',
        },
    ];

    let nockInstanse = null;

    beforeAll(() => {
        nockInstanse = nock('https://api.github.com').get(/^(\/users\/)[a-zA-z]+(\/repos)$/);
    });

    it.each(response)('should return the most used language or null for $name', async ({ name, data }) => {
        nockInstanse.reply(200, data);
        const actual = await getUserMainLanguage(name);
        expect(actual).toBe(expectedResults[name]);
    });
});
// END
