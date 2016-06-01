var Step = require('./Step');

function ExecuteScript() {    
}

ExecuteScript.prototype = new Step();
ExecuteScript.prototype.constructor = ExecuteScript;
ExecuteScript.prototype.super = Step.prototype;
ExecuteScript.prototype.run = function(engine, args) {
    var driver = engine.driver;
    var webdriver = engine.webdriver;
    var script = args.script;
    var args = args.args.unshift(script);

    return driver
        .executeScript
        .call(driver, args);
}

module.exports = ExecuteScript;