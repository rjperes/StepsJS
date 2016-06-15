import Step from './step';

export default class Wait extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let webdriver = engine.webdriver;
        let selector = args.selector;
        let timeout = args.timeout || 10 * 1000;
        let By = webdriver.By;

        if (selector) {
            return driver.wait(() => {
                return driver.isElementPresent(By.css(selector));
            }, timeout);
        } else {
            return this.cancel(`Unmet condition`);
        }
    }
}