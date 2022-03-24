// @ts-check

import _ from 'lodash';

const get = (arr, index, defaultValue) => {
    if (index >= arr.length || index < 0) {
        if (_.isNil(defaultValue)) {
            return null;
        }
        return defaultValue;
    }
    return arr[index];
};

export default get;
