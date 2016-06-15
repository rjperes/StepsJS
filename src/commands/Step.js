export default class Step {
    constructor() {
        this.error = null;
    }

    beforeExecute(engine, args) {
    }

    execute(engine, args) {
        this.beforeExecute(engine, args);
        return this.run(engine, args);
    }

    run() {
        throw new Error(`Abstract method called`);
    }

    proceed(result) {
        result = result || true;
        return new Promise((resolve, reject) => {
            resolve(result);
        });
    }

    cancel(message) {
        message = message || '';
        return Promise.reject(new Error(message));
    }
}