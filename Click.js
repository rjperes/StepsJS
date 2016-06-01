var Step = require('./Step');

function Click() {    
}

Click.prototype = new Step();
Click.prototype.constructor = Click;
Click.prototype.super = Step.prototype;
Click.prototype.run = function(engine, args) {
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
            .findElement(condition)
            .then(function (elm) {
                elm
                    .click()
                    .then(function () {
                        console.log('Click: clicked');
                    });
            });
    } else {
        return this.cancel();
    }
}

module.exports = Click;