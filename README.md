# StepsJS
This project was forked from  *https://github.com/rjperes/StepsJS* on 07/06/2016,
which is under the MIT license.


## Description
A JavaScript framework for Selenium WebDriver automation.

## Development

### Requirements
```
npm install
```

### Compile
```
npm run build
```

### Run
```
node app.js
```

## Example usage
```
var WebdriverEngine = require('./build/index');

var stepsFile = require('./config/example.json');

let appConfig = {
    browser: "PhantomJS",
    steps: stepsFile.steps
};

var app = new WebdriverEngine(appConfig);
app.start();
```

## Example steps configuration file
Look under "config/example.json"