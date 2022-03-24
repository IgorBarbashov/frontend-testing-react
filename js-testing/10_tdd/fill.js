// @ts-check
/* eslint-disable no-param-reassign */

// BEGIN (write your solution here)
export default (coll, value, start = 0, end = coll.length) => {
    if (coll.length === 0 || start < 0 || end < 0 || start >= coll.lenght) {
        return coll;
    }
    coll.forEach((el, i) => {
        coll[i] = i >= start && i < end ? value : el;
    });
    return coll;
};
// END
