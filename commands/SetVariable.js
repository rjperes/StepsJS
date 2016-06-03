var Step = require('./Step');

function SetVariable() {    
}

SetVariable.prototype = new Step();
SetVariable.prototype.constructor = SetVariable;
SetVariable.prototype.super = Step.prototype;
SetVariable.prototype.run = function(engine, args) {
    var driver = engine.driver;
    var webdriver = engine.webdriver;
    var variable = args.variable;
    var value = args.value || '';
    var selector = args.selector;
    var source = args.source || 'value';
    var By = webdriver.By;
    var self = this;

    if (!driver.variables) {
        driver.variables = {};
    }
    
    if (selector) {
        return driver
            .findElements(By.css(selector))
            .then(function (elms) {
                if (elms.length > 0) {
                    var elm = elms[0];
                    
                    if (source === 'value' || source === 'text') {
                        elm
                            .getText()
                            .then(function(value) {
                                driver.variables[variable] = value;
                            });
                    } else if (source === 'innerHTML' || source === 'html') {
                        elm
                            .getInnerHtml()
                            .then(function(html) {
                                driver.variables[variable] = html;
                            });
                    } else if (source === 'tag') {
                        elm
                            .getTagName()
                            .then(function(tag) {
                                driver.variables[variable] = tag;
                            });                        
                    } else if (source === 'class') {
                        elm
                            .getAttribute('class')
                            .then(function(value) {
                                driver.variables[variable] = value;
                            });                        
                    } else if (source.indexOf('attr(') === 0) {
                        var attr = source.split('(')[1].split(')')[0];
                        elm
                            .getAttribute(attr)
                            .then(function(value) {
                                driver.variables[variable] = value;
                            });
                    } else if (source.indexOf('css(') === 0) {
                        var css = source.split('(')[1].split(')')[0];
                        elm
                            .getCssValue(css)
                            .then(function(value) {
                                driver.variables[variable] = value;
                            });
                    } else {
                        return self.cancel('Unknown source');
                    }
                }
            });
    } else if (value) {
        driver.variables[variable] = value;
        return this.proceed();
    }
    
    return this.cancel('Missing source value');
}

module.exports = SetVariable;