import Step from './step';

export default class Log extends Step {
    run(engine, args) {
        let message = args.message;
        let variable = args.variable;

        if (message) {
            console.log(`Log: ${message}.`);
        } else if (variable && engine.context.getSavedData(variable)) {
            console.log(`Log: ${engine.context.getSavedData(variable)}`);
        }

        return this.proceed();
    }
}