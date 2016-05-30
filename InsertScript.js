exports.run = function(engine, args) {
    var driver = engine.driver;
    var url = args.url;
    var script = args.script;
    
    var html = 'var head =  document.getElementsByTagName("head")[0]; var script = document.createElement("script"); script.type = "text/javascript"; ';
    
    if (url) {
        html += 'script.src = "' + url + '";';
    } else if (script) {
        html += 'script.innerHTML = "' + script + '";';
    }

    html += ' head.appendChild(script);';
    
    driver
        .executeScript(html)
        .then(function() {
            driver.switchTo().alert().accept();
            console.log('InsertScript: success'); 
        });
};