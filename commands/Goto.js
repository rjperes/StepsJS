var Step = require('./Step');

function Goto() {    
}

Goto.prototype = new Step();
Goto.prototype.constructor = Goto;
Goto.prototype.super = Step.prototype;
Goto.prototype.run = function(engine, args) {
    var stepId = args.stepId;
    var stepIndex = args.stepIndex;

    if (stepId) {
        for (var i = 0; i < engine.steps.length; i++) {
            var step = engine.steps[i];

            if ((step.id) && (step.id == stepId)) {
                stepIndex = i;
                break;
            }
        }
    }

    if ((parseInt(stepIndex) == stepIndex) && (stepIndex < engine.executionSteps.steps.length)) {
        console.log('Goto: change to ' + stepIndex);
        engine.currentStepIndex = (stepIndex - 1 );
        return this.proceed();
    } else {
        return this.cancel('Step not found');
    }
};

module.exports = Goto;