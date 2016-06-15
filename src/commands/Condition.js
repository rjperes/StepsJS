import Step from './step';

export default class Condition extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let webdriver = engine.webdriver;
        let selector = args.selector;
        let By = webdriver.By;
        let trueBranch = args["true"];
        let falseBranch = args["false"];
        let condition = null;

        if (selector) {
            condition = By.css(selector);
        }

        if (condition) {
            return driver
                .findElements(condition)
                .then((elms) => {
                    console.log(`Condition: found ${elms.length}.`);

                    if (elms.length > 0) {
                        console.log("Executing trueBranch");
                        engine.executeStep(trueBranch, -1);
                    } else if (falseBranch) {
                        console.log("Executing falseBranch");
                        engine.executeStep(falseBranch, -1);
                    }
                });
        } else {
            console.log("Unmet condition");
            return this.cancel(`Unmet condition`);
        }
    }
}