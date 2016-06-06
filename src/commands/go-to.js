import Step from './step';

export default class Goto extends Step {
    run(engine, args) {
        let stepId = args.stepId;
        let stepIndex = args.stepIndex;

        if (stepId) {
            for (let i = 0; i < engine.steps.length; i++) {
                let step = engine.steps[i];

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
    }
}