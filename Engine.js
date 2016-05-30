'use strict';

var Engine = function(driver, webdriver) {
    this.driver = driver;
    this.webdriver = webdriver;
    this.steps = [];
    this.onerror = null;
};

Engine.prototype.runStep = function(step, index) {
    var command = step.command;
    var func = require('./' + command);
    
    if (!func) {
        throw new Error('Command ' + command + ' not found');
    }
    
    var args = { index: index };
    var id = step.id || '';

    for (var p in step) {
        if (p !== 'command') {
            args[p] = step[p];
        }
    }

    try {
        func.run(this, args);
    }
    catch (ex) {
        if (typeof this.onerror === 'function') {
            this.onerror.call(this, ex, step, args);
        } else {
            throw ex;
        }
    }
};

Engine.prototype.buildSteps = function(index) {        
    var num = index;
    var self = this;

    var promise = new Promise(function (resolve, reject) {
        console.log('Engine: starting');
        resolve();
    }); 

    for (var i = index; i < this.steps.length; ++i) {        
        promise
            .then(function() {
                self.runStep(self.steps[num], num);            
                num++;
            })
            .catch(function(ex) {
                if (typeof self.onerror === 'function') {
                    self.onerror.call(self, ex, self.steps[num]);
                } else {
                    throw ex;
                }
            });
    }

    promise.then(function () {
        console.log('Engine: finished');
    });
}

Engine.prototype.run = function(steps) {
    this.steps = steps;
    this.buildSteps(0);    
};

exports.Engine = Engine;