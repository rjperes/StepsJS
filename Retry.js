exports.run = function (engine, args) {
    var retries = args.retries || 2;
    var step = args.step;
    var timeout = args.timeout || 500;
    var retry = 0;

    while (retry < retries) {
        try {
            engine.runStep(step, -1);
        } catch (ex) {
            if (retry == retries - 1) {
                throw ex;
            }

            return driver
                .sleep(timeout)
                .then(function () {
                    console.log('Retry: woke up');
                });
        }
        retry++;
    }
};