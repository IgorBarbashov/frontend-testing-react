// @ts-check

const indexOf = (coll, value, fromIndex = 0) => {
    if (fromIndex < 0) {
        if (-fromIndex > coll.length) {
            return [];
        }
    }
    return coll.indexOf(value, fromIndex);
};

export default indexOf;
