import Step from './step';

export default class Ajax extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let url = args.url;
        let useFetch = args.useFetch;
        let method = args.method || 'GET';
        let payload = args.payload || '';
        let mode = args.mode || 'cors';
        let redirect = args.redirect || 'follow';
        let headers = {};

        if (args.headers) {
            headers = JSON.parse(args.headers);
        }

        if (url) {
            let script = '';

            if (useFetch == true) {
                script = 'var headers = new Headers(); ';

                for (let h in headers) {
                    script += 'headers.append("' + h + '", "' + headers[h] + '"); ';
                }

                script += 'fetch("' + url + '", { method: "' + method + '", headers: headers, mode: "' + mode + '", redirect: "' + redirect + '"';

                if ((payload) && ((method.toUpperCase() === 'POST') || (method.toUpperCase() === 'PUT'))) {
                    script += ', body: "' + payload + '"';
                }

                script += ' }).then(function(result) { console.log(result); })';
            } else {
                script = 'var xhr = new XMLHttpRequest(); xhr.onreadystatechange = function(res) { console.log(res.statusText); }; ';

                for (let h in headers) {
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
                    let logs = driver
                        .manage()
                        .logs()
                        .get('browser')
                        .then(function (logs) {
                            logs.toString();
                        });
                });
        } else {
            return this.cancel('No URL specified');
        }
    }
}