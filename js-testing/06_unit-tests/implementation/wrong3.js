// @ts-check

export default () => ({
    checks: [],

    addCheck(fn) {
        this.checks.push(fn);
    },

    isValid() {
        return true;
    },
});
