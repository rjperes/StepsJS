import Step from './step';

export default class Log extends Step {
    run(engine, args) {
        let message = args.message;
        let variable = args.variable;
        let driver = engine.driver;

        if (message) {
            console.log('Log: ' + message);
        } else if (variable && driver.variables && driver.variables[variable]) {
            console.log('Log: ' + driver.variables[variable]);
        }

        return this.proceed();
    }
}