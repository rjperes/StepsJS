'use strict';

var webdriver = require('selenium-webdriver');

var Browser = { PhantomJS: "phantomjs", Firefox: "firefox" };

var driver = new webdriver.Builder()
    .forBrowser(Browser.Firefox)
    .build();

var Engine = require('./Engine').Engine;

var steps = require('./steps');

var engine = new Engine(driver, webdriver);
/*engine.onerror = function(ex, step, data) {
    console.log('An error occurred: ' + ex);
};*/
engine.run(steps.steps);

