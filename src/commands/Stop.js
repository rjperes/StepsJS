import Step from './step';

export default class Stop extends Step {
    run(engine, args) {
        let message = args.message;
        let driver = engine.driver;

        if (message) {
            console.log(`Stop: ${message}.`);
        }

        return driver
            .quit()
            .then(function () {
                console.log(`Stop: stopped`);
                process.exit();
            });
    }
}