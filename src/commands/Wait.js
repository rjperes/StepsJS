import Step from './step';

export default class Wait extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let webdriver = engine.webdriver;
        let title = args.title;
        let contains = args.contains || false;
        let selector = args.selector;
        let timeout = args.timeout || 20 * 1000;
        let until = webdriver.until;
        let By = webdriver.By;

        let condition = null;

        if (title) {
            if (contains) {
                condition = until.titleContains(title, timeout);
            } else {
                condition = until.titleIs(title, timeout);
            }
        } else if (selector) {
            condition = until.elementLocated(By.css(selector), timeout);
        }

        if (condition) {
            return driver
                .wait(condition)
                .then(function () {
                    console.log('Wait: found');
                });
        } else {
            return this.cancel('Unmet condition');
        }
    }
}