// @ts-check
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import usersFill from '../fill';

const functions = {
    userVersion: usersFill,
    right: _.fill,
    wrong1: (coll, value, start = 1, end = coll.length) => _.fill(coll, value, start, end),
    wrong2: (coll, value, start = 0, end = coll.length) => {
        if (start >= coll.length) {
            coll[start] = value;
        } else {
            _.fill(coll, value, start, end);
        }
        return coll;
    },
    wrong3: (coll, value, start = 0, end = coll.length) => {
        if (start >= end) {
            coll[end] = value;
        } else {
            _.fill(coll, value, start, end);
        }
        return coll;
    },
};

export default () => {
    const name = process.env.FUNCTION_VERSION || 'userVersion';
    return functions[name];
};
