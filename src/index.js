import webdriver from 'selenium-webdriver';
import Engine from './Engine';

const BROWSER = {
    PhantomJS: "phantomjs",
    Firefox: "firefox",
    Chrome: "chrome"
};

function WebdriverEngine(appSetup) {
    this._steps = [];
    this._browser = appSetup.browser;
    this._initalData = [];

    if (!appSetup) {
        throw new Error(`No setup specified.`);
    }

    if (!appSetup.steps) {
        throw new Error(`No steps specified.`);
    }

    // TODO: Validate steps
    this._steps = appSetup.steps;

    if (appSetup.browser) {
        let selectedBrowser = BROWSER[appSetup.browser];

        if (!selectedBrowser) {
            let validBrowsers = Object.keys(BROWSER);

            throw new Error(`Invalid browser. Valid options are: ${validBrowsers}.`);
        }

        this._browser = selectedBrowser;
    }

    if (appSetup.data) {
        this._initalData = appSetup.data;
    }

}

WebdriverEngine.prototype.processSteps = function () {
    let driver = new webdriver.Builder()
        .forBrowser(this._browser)
        .build();

    let engine = new Engine(driver, webdriver);

    Object.keys(this._initalData).forEach(key =>{
        engine.context.saveData(key, this._initalData[key]);
    });

    engine.onerror = function (ex, step, data) {
        console.log(`Error: ${ex}.`);
    };
    return engine.run(this._steps)
        .then((res)=> {
            console.log(`Webdriver engine finished.`);
            return res;
        });
};

module.exports = WebdriverEngine;