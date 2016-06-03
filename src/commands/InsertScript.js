var Step = require('./Step');

function InsertScript() {    
}

InsertScript.prototype = new Step();
InsertScript.prototype.constructor = InsertScript;
InsertScript.prototype.super = Step.prototype;
InsertScript.prototype.run = function(engine, args) {
    var driver = engine.driver;
    var url = args.url;
    var script = args.script;

    var html = 'var head =  document.getElementsByTagName("head")[0]; var script = document.createElement("script"); script.type = "text/javascript"; ';

    if (url) {
        html += 'script.src = "' + url + '";';
    } else if (script) {
        html += 'script.innerHTML = "' + script + '";';
    } else {
        return this.cancel('No script supplied');
    }

    html += ' head.appendChild(script);';

    return driver
        .executeScript(html)
        .then(function () {
            driver.switchTo().alert().accept();
            console.log('InsertScript: success');
        });
};

module.exports = InsertScript;