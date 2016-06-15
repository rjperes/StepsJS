import Step from './step';

export default class InsertScript extends Step {
    run(engine, args) {
        let driver = engine.driver;
        let url = args.url;
        let script = args.script;

        let html = 'var head =  document.getElementsByTagName("head")[0]; var script = document.createElement("script"); script.type = "text/javascript"; ';

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
            .then(() => {
                driver.switchTo().alert().accept();
                console.log(`InsertScript: success`);
            });
    }
}