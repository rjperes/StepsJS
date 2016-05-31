'use strict';

var Engine = function (driver, webdriver) {
    var self = this;

    self.driver = driver;
    self.webdriver = webdriver;
    self.steps = [];
    self.onerror = null;
    self.executionSteps = {
        currentIndex: null,
        steps: []
    };
};

Engine.prototype.executeStep = function (step, index) {
    console.log("executeStep: " + index);

    var self = this;
    var command = step.command;
    var func = require('./' + command);

    if (!func) {
        throw new Error('Command ' + command + ' not found');
    }

    var args = {index: index};
    var id = step.id || '';

    for (var p in step) {
        if (p !== 'command') {
            args[p] = step[p];
        }
    }

    // Most be a promise
    return func.run(self, args);
};

Engine.prototype.runStep = function () {
    var self = this;

    console.log("runStep: " + self.currentStepIndex);

    self.executeStep(self.executionSteps.steps[self.currentStepIndex], self.currentStepIndex).then(function (res) {
        console.log("executeStep " + self.currentStepIndex + " finished");
        
        ++self.currentStepIndex;
        self.runStep();
    });
};


Engine.prototype.run = function (steps) {
    var self = this;

    self.steps = steps;

    self.executionSteps.steps = steps;
    self.currentStepIndex = 0;

    // Run first step
    self.runStep();
};

exports.Engine = Engine;