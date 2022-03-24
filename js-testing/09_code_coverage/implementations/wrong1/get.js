// @ts-check

const get = (arr, index, defaultValue) => {
    if (index >= arr.length || index < 0) {
        if (defaultValue) {
            return false;
        }
        return null;
    }
    return arr[index];
};

export default get;
