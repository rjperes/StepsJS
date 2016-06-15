import Step from './step';

const SUPPORTED_TYPES = ["innerHTML", "text"];

export default class GetContent extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let webdriver = engine.webdriver;
        let selector = args.selector;
        let By = webdriver.By;
        let saveAs = args.saveAs || null;
        let type = args.type;
        let multiple = args.multiple || false;


        if (SUPPORTED_TYPES.indexOf(type) < 0) {
            let validTypes = SUPPORTED_TYPES.join(", ");
            throw new Error(`Unsupported type. Must be ${validTypes}.`);
        }

        let condition = null;

        if (selector) {
            condition = By.css(selector);
        }

        if (condition) {
            if (!multiple) {
                return getSingleContent(engine, condition, type, saveAs);
            } else {
                return getMultipleContent(engine, condition, type, saveAs);
            }
        } else {
            return this.cancel(`Element not found`);
        }
    }
}

function getSingleContent(engine, condition, type, saveAs) {
    return engine.driver
        .findElement(condition)
        .then((elm) => {
            if (type === "innerHTML") {
                return elm.getAttribute(type)
                    .then((content) => {
                        console.log(`GetContent: got ${content}.`);

                        if (saveAs) {
                            engine.context.saveData(saveAs, content);
                        }

                        return content;
                    });
            } else if (type === "text") {
                return elm.getText()
                    .then((content) => {
                        console.log(`GetContent: got ${content}.`);

                        if (saveAs) {
                            engine.context.saveData(saveAs, content);
                        }

                        return content;
                    });
            }
        });
}

function getMultipleContent(engine, condition, type, saveAs) {
    return engine.driver
        .findElements(condition)
        .then((elms) => {
            let allContent = [];
            return engine.webdriver.promise.filter(elms, (elm) => {
                if (type === "innerHTML") {
                    return elm.getAttribute(type)
                        .then((content) => {
                            console.log(`GetContent: got ${content}.`);
                            allContent.push(content);
                        });
                } else if (type === "text") {
                    return elm.getText()
                        .then((content) => {
                            console.log(`GetContent: got ${content}.`);
                            allContent.push(content);
                        });
                }
            }).then(()=> {
                if (saveAs && allContent.length > 0) {
                    engine.context.saveData(saveAs, allContent);
                }
                return allContent;
            });
        });
}