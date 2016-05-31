exports.run = function (engine, args) {
    var driver = engine.driver;
    var webdriver = engine.webdriver;
    var script = args.script;
    var args = args.args.unshift(script);

    return driver
        .executeScript
        .call(driver, args);
};