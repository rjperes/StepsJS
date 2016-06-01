var Step = require('./Step');

function FindElement() {    
}

FindElement.prototype = new Step();
FindElement.prototype.constructor = FindElement;
FindElement.prototype.super = Step.prototype;
FindElement.prototype.run = function(engine, args) {
    var driver = engine.driver;
    var webdriver = engine.webdriver;
    var selector = args.selector;
    var By = webdriver.By;

    var condition = null;

    if (selector) {
        condition = By.css(selector);
    }

    if (condition) {
        return driver
            .findElements(condition)
            .then(function (elms) {
                console.log('FindElement: found ' + elms.length);
            });
    } else {
        return this.cancel();
    }
}

module.exports = FindElement;