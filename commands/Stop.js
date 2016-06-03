var Step = require('./Step');

function Stop() {    
}

Stop.prototype = new Step();
Stop.prototype.constructor = Stop;
Stop.prototype.super = Step.prototype;
Stop.prototype.run = function(engine, args) {
    var message = args.message;
    var driver = engine.driver;

    if (message) {
        console.log('Stop: ' + message);
    }
    
    return driver
        .quit()
        .then(function () {
            console.log('Stop: stopped');
            process.exit();
        });
}

module.exports = Stop;