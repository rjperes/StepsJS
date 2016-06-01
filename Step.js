function Step() {
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

Step.prototype.proceed = function() {
    return new Promise(function(resolve, reject) {
        resolve(true);
    });  
};

Step.prototype.cancel = function() {
    return new Promise(function(resolve, reject) {
        reject();
    });      
}

module.exports = Step;