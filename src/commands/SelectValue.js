/**
 * Created by rferrolho on 08/06/2016.
 */

import Step from './step';

const SUPPORTED_TYPES = ["text", "textStartsWith", "value"];

export default class SelectValue extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let webdriver = engine.webdriver;
        let selector = args.selector;
        let type = args.type;
        let text = args.text;
        let variable = args.variable;
        let value = args.value;
        if (text === undefined && variable) {
            text = engine.context.getSavedData(variable);
        }
        if (value === undefined && variable) {
            value = engine.context.getSavedData(variable);
        }

        if (SUPPORTED_TYPES.indexOf(type) < 0) {
            let validTypes = SUPPORTED_TYPES.join(", ");
            throw new Error(`Unsupported type. Must be ${validTypes}.`);
        }

        let By = webdriver.By;

        let condition = null;

        if (selector) {
            condition = By.css(selector);
        }

        if (condition) {
            return driver
                .findElement(condition)
                .then((elm) => {
                    if (type === "value") {
                        return selectOptionByValue(By, elm, value);
                    }
                    else {
                        return selectOptionByText(By, type, elm, text);
                    }
                });
        } else {
            return this.cancel(`Unmet condition`);
        }
    }
}

function selectOptionByText(By, type, selectElement, text) {
    text = getSpacelessLowercaseText(text);

    return selectElement.findElements(By.css('option'))
        .then(options => {
            options.some((option) => {
                option.getAttribute('innerHTML').then((optionText) => {
                    optionText = getSpacelessLowercaseText(optionText);
                    let optionMatches = false;

                    if (type === "text") {
                        if (optionText === text) {
                            optionMatches = true;
                        }
                    }
                    if (type === "textStartsWith") {
                        if (optionText.indexOf(text) === 0) {
                            optionMatches = true;
                        }
                    }

                    if (optionMatches === true) {
                        option.click();
                        console.log(`SelectValue: selected option by text with success.`);
                    }

                    return optionMatches;
                });
            });
        });
}

function selectOptionByValue(By, selectElement, value) {
    let cssSelector = `option[value="${value}"]`;
    return selectElement.findElement(By.css(cssSelector)).then(option => {
        option.click();
        console.log(`SelectValue: selected option by value with success.`);
    });
}

function getSpacelessLowercaseText(originalText) {
    return originalText.replace(/[^a-zA-Z0-9,]+/g, '').toLowerCase();
}