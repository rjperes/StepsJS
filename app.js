'use strict';

var WebdriverEngine = require('./dist/lib/index');

//for chrome only
var chromedriver = require('chromedriver');
chromedriver.start([]);

var stepsFile = require('./config/example.json');

let appConfig = {
    // browser: "PhantomJS",
    // browser: "Firefox",
    browser: "Chrome",
    steps: stepsFile.steps,
    data: {}
};

var webdriverEngine = new WebdriverEngine(appConfig);
webdriverEngine.processSteps()
    .then(function (context) {
        console.log(`Application finished.`);
    });