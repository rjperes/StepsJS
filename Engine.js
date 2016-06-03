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
    var func = require('./commands/' + command);

    if (!func) {
        throw new Error('Command ' + command + ' not found');
    }

    var args = { index: index };

    for (var p in step) {
        if (p !== 'command') {
            args[p] = step[p];
        }
    }

    var s = new func();
    
    return s.execute(self, args);
};

Engine.prototype.runStep = function () {
    var self = this;

    console.log("runStep: " + self.currentStepIndex);

    self.executeStep(self.executionSteps.steps[self.currentStepIndex], self.currentStepIndex).then(function (res) {
        console.log("executeStep " + self.currentStepIndex + " finished");
        
        self.currentStepIndex++;
        
        if (self.currentStepIndex < self.executionSteps.steps.length) {
            self.runStep();
        }
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