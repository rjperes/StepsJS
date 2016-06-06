export default class Step {
    constructor(methods) {
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
        return new Promise(function (resolve, reject) {
            resolve(result);
        });
    }

    cancel(message) {
        message = message || '';
        return Promise.reject(new Error(message));
    }
}