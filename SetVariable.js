exports.run = function(engine, args) {
    var driver = engine.driver;
    var name = args.name;
    var value = args.value;
    
    if (!driver.variables) {
        driver.variables = {};
    }
    
    driver.variables[name] = value;
};