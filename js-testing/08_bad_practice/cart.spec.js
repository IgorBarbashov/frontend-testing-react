// @ts-check

import getImpelementation from '../implementations/index.js';

const makeCart = getImpelementation();

// BEGIN (write your solution here)
describe('Test cart functinality', () => {
    let cart = null;

    beforeEach(() => {
        cart = makeCart();
    });

    it('makeCart should create new empty cart', () => {
        expect(cart.getItems()).toHaveLength(0);
        expect(cart.getCount()).toBe(0);
        expect(cart.getCost()).toBe(0);
    });

    it('addItem should add three positions to the empty cart', () => {
        cart.addItem({ name: 'car', price: 3 }, 5);
        cart.addItem({ name: 'whell', price: 1 }, 20);
        cart.addItem({ name: 'spoiler', price: 1 }, 1);
        expect(cart.getItems()).toHaveLength(3);
    });

    it('getItems should return number of position', () => {
        cart.addItem({ name: 'car', price: 3 }, 5);
        expect(cart.getItems()).toHaveLength(1);
        cart.addItem({ name: 'whell', price: 1 }, 20);
        expect(cart.getItems()).toHaveLength(2);
        expect(cart.getItems()).toEqual(expect.arrayContaining([{ good: { name: 'whell', price: 1 }, count: 20 }]));
        cart.addItem({ name: 'spoiler', price: 1 }, 1);
        expect(cart.getItems()).toHaveLength(3);
        expect(cart.getItems()).toEqual(expect.arrayContaining([{ good: { name: 'spoiler', price: 1 }, count: 1 }, { good: { name: 'whell', price: 1 }, count: 20 }]));
    });

    it('getCost should return summary cost of all cart', () => {
        cart.addItem({ name: 'car', price: 3 }, 5);
        cart.addItem({ name: 'whell', price: 1 }, 20);
        expect(cart.getCost()).toBe(35);
    });

    it('getCount should return number of all items in the cart', () => {
        cart.addItem({ name: 'car', price: 3 }, 2);
        cart.addItem({ name: 'whell', price: 1 }, 10);
        cart.addItem({ name: 'spoiler', price: 1 }, 3);
        expect(cart.getCount()).toBe(15);
    });
});
// END
