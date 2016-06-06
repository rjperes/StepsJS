import Step from './step';

export default class Navigate extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let url = args.url;

        if (url) {
            return driver
                .get(url)
                .then(function () {
                    console.log(`Navigate: success`);
                });
        } else {
            return this.cancel(`No URL supplied`);
        }
    }
}
