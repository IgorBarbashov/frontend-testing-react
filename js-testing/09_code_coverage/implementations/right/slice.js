// @ts-check

const slice = (coll, start = 0, end = coll.length) => {
    const collLength = coll.length;
    if (collLength === 0) {
        return [];
    }
    let normalizedStart = start;

    if (normalizedStart < 0) {
        if (-normalizedStart > collLength) {
            normalizedStart = 0;
        } else {
            normalizedStart += collLength;
        }
    }

    return coll.slice(normalizedStart, end);
};

export default slice;
