exports.run = function (engine, args) {
    var driver = engine.driver;
    var url = args.url;

    return driver
        .get(url)
        .then(function () {
            console.log('Navigate: success');
        });
};