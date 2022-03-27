// @ts-check

import OctokitFake from '../support/OctokitFake.js';
import getFunction from '../functions.js';

const getUserMainLanguage = getFunction();

// BEGIN (write your solution here)
describe('Function getUserMainLanguage', () => {
    const data = {
        igor: {
            data: [
                { language: 'javascript' },
                { language: 'javascript' },
                { language: 'javascript' },
                { language: 'java' }
            ]
        },
        mickel: {
            data: [
                { language: 'java' },
                { language: 'java' },
                { language: 'java' },
                { language: 'python' }
            ]
        },
        roman: {
            data: []
        }
    };
    let octokitFake = null;

    beforeAll(() => {
        octokitFake = new OctokitFake(data);
    });

    it('should return the most used language', async () => {
        const actualIgor = await getUserMainLanguage('igor', octokitFake);
        expect(actualIgor).toBe('javascript');

        const actualMickel = await getUserMainLanguage('mickel', octokitFake);
        expect(actualMickel).toBe('java');
    });

    it('should return null if repos list is empty', async () => {
        const actualRoman = await getUserMainLanguage('roman', octokitFake);
        expect(actualRoman).toBeNull();
    });

    it('should return null if unknown user', async () => {
        const actualIra = await getUserMainLanguage('ira', octokitFake);
        expect(actualIra).toBeNull();
    });
});
// END
