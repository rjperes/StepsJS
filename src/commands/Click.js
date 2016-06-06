import Step from './step';

export default class Click extends Step {
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
                .findElement(condition)
                .then((elm) => {
                    elm
                        .click()
                        .then(() => {
                            console.log(`Click: clicked`);
                        });
                });
        } else {
            return this.cancel(`Element not found`);
        }
    }
}