import Step from './step';


export default class SetVariable extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let webdriver = engine.webdriver;
        let variable = args.variable;
        let value = args.value || '';
        let selector = args.selector;
        let source = args.source || 'value';
        let By = webdriver.By;
        let self = this;

        if (!driver.variables) {
            driver.variables = {};
        }

        if (selector) {
            return driver
                .findElements(By.css(selector))
                .then((elms) => {
                    if (elms.length > 0) {
                        let elm = elms[0];

                        if (source === 'value' || source === 'text') {
                            elm
                                .getText()
                                .then((value) => {
                                    driver.variables[variable] = value;
                                });
                        } else if (source === 'innerHTML' || source === 'html') {
                            elm
                                .getInnerHtml()
                                .then((html) => {
                                    driver.variables[variable] = html;
                                });
                        } else if (source === 'tag') {
                            elm
                                .getTagName()
                                .then((tag)=> {
                                    driver.variables[variable] = tag;
                                });
                        } else if (source === 'class') {
                            elm
                                .getAttribute('class')
                                .then((value) => {
                                    driver.variables[variable] = value;
                                });
                        } else if (source.indexOf('attr(') === 0) {
                            let attr = source.split('(')[1].split(')')[0];
                            elm
                                .getAttribute(attr)
                                .then((value) => {
                                    driver.variables[variable] = value;
                                });
                        } else if (source.indexOf('css(') === 0) {
                            let css = source.split('(')[1].split(')')[0];
                            elm
                                .getCssValue(css)
                                .then((value) => {
                                    driver.variables[variable] = value;
                                });
                        } else {
                            return self.cancel(`Unknown source`);
                        }
                    }
                });
        } else if (value) {
            driver.variables[variable] = value;
            return this.proceed();
        }

        return this.cancel(`Missing source value`);
    }
}