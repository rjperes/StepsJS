exports.run = function(engine, args) {
    var driver = engine.driver;
    var webdriver = engine.webdriver;
    var title = args.title;
    var contains = args.contains || false;
    var selector = args.selector;
    var timeout = args.timeout || 20 * 1000;
    var until = webdriver.until;
    var By = webdriver.By;
    
    var condition = null;
    
    if (title) {
        if (contains) {
            condition = until.titleContains(title, timeout);            
        } else {
            condition = until.titleIs(title, timeout);
        }
    } else if (selector) {
        condition = until.elementLocated(By.css(selector), timeout);
    }
    
    if (condition) {
        driver
            .wait(condition)
            .then(function() {
                console.log('Wait: found');
            });
    }
};