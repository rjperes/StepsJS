var Step = require('./Step');

function Log() {    
}

Log.prototype = new Step();
Log.prototype.constructor = Log;
Log.prototype.super = Step.prototype;
Log.prototype.run = function(engine, args) {
    var message = args.message;
    var variable = args.variable;
    var driver = engine.driver;
    
    if (message) {
        console.log('Log: ' + message);
    } else if (variable && driver.variables && driver.variables[variable]) {
        console.log('Log: ' + driver.variables[variable]);
    }
    
    return this.proceed();
}

module.exports = Log;