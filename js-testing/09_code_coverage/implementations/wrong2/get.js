// @ts-check

const get = (arr, index, defaultValue) => {
    if (index >= arr.length || index < 0) {
        if (defaultValue) {
            return defaultValue;
        }
        return false;
    }
    return arr[index];
};

export default get;
