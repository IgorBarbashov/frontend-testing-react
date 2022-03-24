// @ts-check

const indexOf = (coll, value, fromIndex = 0) => {
    const collLength = coll.length;

    if (collLength === 0) {
        return null;
    }

    return coll.indexOf(value, fromIndex);
};

export default indexOf;
