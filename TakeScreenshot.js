var Step = require('./Step');

function TakeScreenshot() {    
}

TakeScreenshot.prototype = new Step();
TakeScreenshot.prototype.constructor = TakeScreenshot;
TakeScreenshot.prototype.super = Step.prototype;
TakeScreenshot.prototype.run = function(engine, args) {
    var fs = require('fs');
    var filename = args.filename;
    var driver = engine.driver;
        
    return driver
        .takeScreenshot()
        .then(function(data) {
            fs.writeFile(filename, data.replace(/^data:image\/png;base64,/, ''), 'base64', function(err) {
                if (err) {
                    throw err;
                }
            });
        });
}

module.exports = TakeScreenshot;