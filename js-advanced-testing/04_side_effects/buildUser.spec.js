// @ts-check

import getFunction from '../functions.js';

const buildUser = getFunction();

// BEGIN (write your solution here)
describe('Function buildUser', () => {
    const userFields = ['email', 'firstName', 'lastName'];
    const userFieldsLength = userFields.length;
    let wasCreated = {
        email: [],
        firstName: [],
        lastName: []
    };

    it('should create user object with correct structure - variant-1', () => {
        const actual = buildUser();
        const actualFields = Object.keys(actual);
        expect(actualFields).toHaveLength(userFieldsLength);
        expect(actualFields).toEqual(userFields);

        wasCreated.email.push(actual.email);
        wasCreated.firstName.push(actual.firstName);
        wasCreated.lastName.push(actual.lastName);
    });

    it('should create user object with correct structure - variant-2', () => {
        const user1 = buildUser();
        expect(user1).toEqual(expect.objectContaining({
            email: expect.any(String),
            firstName: expect.any(String),
            lastName: expect.any(String),
        }));
    });

    it('should create user object with new data - variant-1', () => {
        const { email, firstName, lastName } = buildUser();
        expect(wasCreated.email).not.toContain(email);
        expect(wasCreated.firstName).not.toContain(firstName);
        expect(wasCreated.lastName).not.toContain(lastName);

        wasCreated.email.push(email);
        wasCreated.firstName.push(firstName);
        wasCreated.lastName.push(lastName);
    });

    it('should create user object with new data - variant-2', () => {
        const user1 = buildUser();
        const user2 = buildUser();
        expect(user1).not.toEqual(user2);
    });

    it('should create user object with given params', () => {
        const expectedWithEmail = { email: 'givenEmail' };
        const actualWithEmail = buildUser(expectedWithEmail);
        const expectedWithFirstName = { firstName: 'givenfirstName' };
        const actualWithFirstName = buildUser(expectedWithFirstName);
        const expectedWithLastName = { lastName: 'givenlastName' };
        const actualWithLastName = buildUser(expectedWithLastName);
        const expectedWithEmailAndFirstName = { email: 'givenEmail', firstName: 'givenfirstName' };
        const actualWithEmailAndFirstName = buildUser(expectedWithEmailAndFirstName);
        const expectedWithEmailAndLastName = { email: 'givenEmail', lastName: 'givenlastName' };
        const actualWithEmailAndLastName = buildUser(expectedWithEmailAndLastName);
        const expectedWithFullName = { firstName: 'givenfirstName', lastName: 'givenlastName' };
        const actualWithFullName = buildUser(expectedWithFullName);

        expect(actualWithEmail).toMatchObject(expectedWithEmail);
        expect(actualWithFirstName).toMatchObject(expectedWithFirstName);
        expect(actualWithLastName).toMatchObject(expectedWithLastName);
        expect(actualWithEmailAndFirstName).toMatchObject(expectedWithEmailAndFirstName);
        expect(actualWithEmailAndLastName).toMatchObject(expectedWithEmailAndLastName);
        expect(actualWithFullName).toMatchObject(expectedWithFullName);
    });
});
// END
