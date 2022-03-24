/* eslint-disable quote-props */
// eslint-disable-next-line
import jest from 'jest';
import path from 'path';
import _ from 'lodash';

const setWrongImplementation = (name) => {
    process.env.FUNCTION_VERSION = name;
};

const unsetImplementation = () => _.unset(process.env, 'FUNCTION_VERSION');

const runTests = (options = {}) => {
    const { showOutput } = options;
    const setupFilesAfterEnv = showOutput
        ? null
        : [path.join(process.cwd(), 'jest.setup.inner.js')];
    return jest.runCLI({
        '_': ['functions.test.js'],
        setupFilesAfterEnv,
        testEnvironment: 'node',
    }, [process.cwd()]);
};

const getNumFailedTests = (testsResult) => {
    const { results } = testsResult;
    return results.numFailedTests;
};

beforeEach(() => {
    unsetImplementation();
});

test('check correct implementation', async () => {
    const testsResult = await runTests({ showOutput: true });
    expect(getNumFailedTests(testsResult)).toBe(0);
});

test('check wrong1', async () => {
    setWrongImplementation('wrong1');
    const testsResult = await runTests();
    expect(getNumFailedTests(testsResult)).toBe(3);
});

test('check wrong2', async () => {
    setWrongImplementation('wrong2');
    const testsResult = await runTests();
    expect(getNumFailedTests(testsResult)).toBe(3);
});

test('check wrong3', async () => {
    setWrongImplementation('wrong3');
    const testsResult = await runTests();
    expect(getNumFailedTests(testsResult)).toBe(3);
});
