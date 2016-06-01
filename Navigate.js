var Step = require('./Step');

function Navigate() {    
}

Navigate.prototype = new Step();
Navigate.prototype.constructor = Navigate;
Navigate.prototype.super = Step.prototype;
Navigate.prototype.run = function(engine, args) {
    var driver = engine.driver;
    var url = args.url;

    if (url) {
        return driver
            .get(url)
            .then(function () {
                console.log('Navigate: success');
            });
    } else {
        return this.cancel();
    }
}

module.exports = Navigate;