// @ts-check

const functions = {
    right1: (data) => data.slice().sort((a, b) => a - b),
    wrong1: (data) => data.slice().sort((a, b) => b - a),
    wrong2: (data) => data.slice().reverse(),
};

export default () => {
    const name = process.env.FUNCTION_VERSION || 'right1';
    return functions[name];
};
