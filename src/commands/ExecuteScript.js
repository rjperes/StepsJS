import Step from './step';

export default class ExecuteScript extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let script = args.script;
        let innerArgs = args.unshift(script);

        return driver
            .executeScript
            .call(driver, innerArgs);
    }
}