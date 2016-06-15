import Step from './step';

export default class ExecuteScriptAsync extends Step {
    run(engine, args) {
        let script = args.script;
        let driver = engine.driver;
        let timeout = engine.timeout || 10 * 1000;

        driver.manage().timeouts().setScriptTimeout(timeout);

        return driver.executeAsyncScript((script, timeout, callback) => {
                setTimeout(function() { callback.call() }, timeout);
                return eval(script);
            }, script, timeout);
    }
}