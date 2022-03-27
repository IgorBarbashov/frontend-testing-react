// @ts-check

// BEGIN (write your solution here)
export default class OctokitFake {
    noUserData = { data: [] };

    constructor(data) {
        this.data = data;
    }

    repos = {
        listForUser: ({ username }) => {
            return Promise.resolve(this.data[username] ?? this.noUserData);
        }
    }
}
// END
