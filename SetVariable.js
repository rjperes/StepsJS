var Step = require('./Step');

function SetVariable() {    
}

SetVariable.prototype = new Step();
SetVariable.prototype.constructor = SetVariable;
SetVariable.prototype.super = Step.prototype;
SetVariable.prototype.run = function(engine, args) {
    var driver = engine.driver;
    var name = args.name;
    var value = args.value;
    
    if (!driver.variables) {
        driver.variables = {};
    }
    
    driver.variables[name] = value;
    
    return this.proceed();
}

module.exports = SetVariable;