'use strict';

var webdriver = require('selenium-webdriver');

const Browser = {PhantomJS: "phantomjs", Firefox: "firefox"};

let driver = new webdriver.Builder()
    .forBrowser(Browser.Firefox)
    .build();

let Engine = require('./src/Engine').Engine;

const steps = require('./steps');

let engine = new Engine(driver, webdriver);
engine.onerror = function (ex, step, data) {
    console.log('Error: ' + ex);
};
engine.run(steps.steps);