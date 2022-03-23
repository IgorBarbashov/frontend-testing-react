// @ts-check

export default () => ({
    checks: [],

    addCheck(fn) {
        this.checks = [fn];
    },

    isValid(data) {
        return this.checks.every((fn) => fn(data));
    },
});
