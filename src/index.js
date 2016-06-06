import webdriver from 'selenium-webdriver';
import Engine from './Engine';

import steps from './steps';

function App(){
}

App.prototype.start = function() {
    const Browser = {PhantomJS: "phantomjs", Firefox: "firefox"};

    let driver = new webdriver.Builder()
        .forBrowser(Browser.Firefox)
        .build();

    let engine = new Engine(driver, webdriver);
    engine.onerror = function (ex, step, data) {
        console.log('Error: ' + ex);
    };
    engine.run(steps.steps);
};

module.exports = App;