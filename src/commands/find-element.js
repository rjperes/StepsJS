import Step from './step';

export default class FindElement extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let webdriver = engine.webdriver;
        let selector = args.selector;
        let By = webdriver.By;

        let condition = null;

        if (selector) {
            condition = By.css(selector);
        }

        if (condition) {
            return driver
                .findElements(condition)
                .then((elms) => {
                    console.log(`FindElement: found ${elms.length}.`);
                });
        } else {
            return this.cancel(`Unmet condition`);
        }
    }
}