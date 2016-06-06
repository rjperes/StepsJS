import Step from './step';

export default class GetContent extends Step {
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
                    elm.getAttribute('innerHTML')
                        .then((text) => {
                            console.log(`GetText: got ${text}.`);

                            if (args.saveAs) {
                                engine.saveData(args.saveAs, text);
                            }

                            return text;
                        });
                });
        } else {
            return this.cancel(`Element not found`);
        }
    }
}