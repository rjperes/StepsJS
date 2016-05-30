exports.run = function(engine, args) {
    var message = args.message;

    if (message) {
        console.log('Log: ' + message);
    }
};