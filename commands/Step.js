function Step() {
    this.error = null;
}

Step.prototype.beforeExecute = function(engine, args) {
};

Step.prototype.execute = function(engine, args) {
    this.beforeExecute(engine, args);
    return this.run(engine, args);
};

Step.prototype.run = function(engine, args) {
    throw new Error('Abstract method called');
};

Step.prototype.proceed = function(result) {
    result = result || true;
    return new Promise(function(resolve, reject) {
        resolve(result);
    });
};

Step.prototype.cancel = function(message) {
    message = message || '';
    return Promise.reject(new Error(message));
}

module.exports = Step;