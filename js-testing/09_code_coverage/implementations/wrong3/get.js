// @ts-check

const get = (arr, index, defaultValue = null) => {
    if (defaultValue) {
        return defaultValue;
    }
    if (index >= arr.length || index < 0) {
        return defaultValue;
    }
    return arr[index];
};

export default get;
