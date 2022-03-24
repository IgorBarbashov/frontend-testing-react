// @ts-check

const slice = (coll, start = 0, end = coll.length) => {
    const collLength = coll.length;

    if (start < 0) {
        if (-start > collLength) {
            return [];
        }
    }

    return coll.slice(start, end);
};

export default slice;
