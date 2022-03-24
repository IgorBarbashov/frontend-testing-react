// @ts-check

const slice = (coll, start = 0, end = coll.length) => {
    if (coll.length === 0) {
        return null;
    }
    return coll.slice(start, end);
};

export default slice;
