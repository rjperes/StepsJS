import Step from './step';

export default class GoTo extends Step {
    run(engine, args) {
        let stepId = args.stepId;
        let stepIndex = args.stepIndex;

        if (stepId) {
            for (let i = 0; i < engine.executionSteps.steps.length; i++) {
                let step = engine.executionSteps.steps[i];

                if ((step.id) && (step.id == stepId)) {
                    stepIndex = i;
                    break;
                }
            }
        }

        if ((parseInt(stepIndex) == stepIndex) && (stepIndex < engine.executionSteps.steps.length)) {
            let stepReference = stepId || stepIndex;
            console.log(`Goto: change to ${stepReference}.`);
            engine.executionSteps.currentIndex = (stepIndex - 1 );
            return this.proceed();
        } else {
            return this.cancel(`Step not found`);
        }
    }
}