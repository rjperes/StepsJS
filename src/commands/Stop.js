import Step from './step';

const STOP_MESSAGE_KEY = "stopMessage";

export default class Stop extends Step {
    run(engine, args) {
        let message = args.message;
        let driver = engine.driver;

        if (message) {
            console.log(`Stop: ${message}.`);
        }

        return driver
            .quit()
            .then(() => {
                console.log(`Stop: stopped`);
                let stopMessage = message || `Stop called.`;
                
                // Set the execution index as the last step so the engine stops without breaking
                engine.executionSteps.currentIndex = (engine.executionSteps.steps.length - 1);
                engine.context.saveData(STOP_MESSAGE_KEY, stopMessage);

                return this.proceed();
            });
    }
}