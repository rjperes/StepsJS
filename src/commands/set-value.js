import Step from './step';

export default class SetValue extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let webdriver = engine.webdriver;
        let selector = args.selector;
        let property = args.property;
        let variable = args.variable;
        let value = args.value || driver.variables[variable];
        let until = webdriver.until;
        let By = webdriver.By;
        let timeout = args.timeout || 5 * 1000;

        let setValue = function (elm) {
            if (value) {
                driver
                    .executeScript('return arguments[0].' + property + '="' + value + '"', elm)
                    .then(function (res) {
                        console.log(`SetValue: value "${res}" set.`);
                    });
            }
        };

        let condition = null;

        if (selector) {
            condition = until.elementLocated(By.css(selector), timeout);
        }

        if (condition) {
            return driver
                .wait(condition)
                .then(setValue)
        } else {
            return this.cancel(`Unmet condition`);
        }
    }
}