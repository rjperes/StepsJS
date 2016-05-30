exports.run = function(engine, args) {
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
    
    if (parseInt(stepIndex) == stepIndex) {
        console.log('Goto: change to ' + stepIndex);
        engine.buildSteps(stepIndex);
        throw new Error('aborted');                
    }    
};