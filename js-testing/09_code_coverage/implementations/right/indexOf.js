// @ts-check

const indexOf = (coll, value, fromIndex = 0) => {
    const collLength = coll.length;

    if (collLength === 0) {
        return -1;
    }
    let index = fromIndex;

    if (index < 0) {
        if (-index > collLength) {
            index = 0;
        } else {
            index += collLength;
        }
    }

    return coll.indexOf(value, index);
};

export default indexOf;
