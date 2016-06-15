import Step from './step';

export default class Navigate extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let variable = args.variable;
        let url = args.url || engine.context.getSavedData(variable);

        if (url) {
            return driver
                .get(url)
                .then(() => {
                    console.log(`Navigate: success`);
                });
        } else {
            return this.cancel(`No URL supplied`);
        }
    }
}
