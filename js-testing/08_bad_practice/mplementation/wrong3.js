// @ts-check

import _ from 'lodash';

export default () => ({
    items: [],
    addItem(good, count) {
        this.items.push({ good, count });
    },
    getItems() {
        return this.items;
    },
    getCount() {
        return this.items.length;
    },
    getCost() {
        return _.sumBy(this.items, (item) => item.good.price * item.count);
    },
});
