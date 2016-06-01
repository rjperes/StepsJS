var Step = require('./Step');

function Ajax() {    
}

Ajax.prototype = new Step();
Ajax.prototype.constructor = Ajax;
Ajax.prototype.super = Step.prototype;
Ajax.prototype.run = function(engine, args) {
    var driver = engine.driver;
    var url = args.url;
    var useFetch = args.useFetch;
    var method = args.method || 'GET';
    var payload = args.payload || '';
    var mode = args.mode || 'cors';
    var redirect = args.redirect || 'follow';
    var headers = {};

    if (args.headers) {
        headers = JSON.parse(args.headers);
    }

    if (url) {
        var script = '';

        if (useFetch == true) {
            script = 'var headers = new Headers(); ';

            for (var h in headers) {
                script += 'headers.append("' + h + '", "' + headers[h] + '"); ';
            }

            script += 'fetch("' + url + '", { method: "' + method + '", headers: headers, mode: "' + mode + '", redirect: "' + redirect + '"';

            if ((payload) && ((method.toUpperCase() === 'POST') || (method.toUpperCase() === 'PUT'))) {
                script += ', body: "' + payload + '"';
            }

            script += ' }).then(function(result) { console.log(result); })';
        } else {
            script = 'var xhr = new XMLHttpRequest(); xhr.onreadystatechange = function(res) { console.log(res.statusText); }; ';

            for (var h in headers) {
                script += 'xhr.setRequestHeader("' + h + '", "' + headers[h] + '"); ';
            }

            script += 'xhr.open("' + method + '", "' + url + '"); ';

            if ((payload) && ((method.toUpperCase() === 'POST') || (method.toUpperCase() === 'PUT'))) {
                script += 'xhr.send("' + payload + '")';
            } else {
                script += 'xhr.send();';
            }
        }

        return driver
            .executeScript(script)
            .then(function () {
                console.log('Ajax: complete');
            })
            .then(function () {
                var logs = driver
                    .manage()
                    .logs()
                    .get('browser')
                    .then(function (logs) {
                        logs.toString();
                    });
            });
    } else {
        return this.cancel();
    }
}

module.exports = Ajax;