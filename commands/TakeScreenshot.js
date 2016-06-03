var Step = require('./Step');
var SCREENSHOTS_DIR = './screenshots/';

function TakeScreenshot() {
}

TakeScreenshot.prototype = new Step();
TakeScreenshot.prototype.constructor = TakeScreenshot;
TakeScreenshot.prototype.super = Step.prototype;
TakeScreenshot.prototype.run = function (engine, args) {
    var fs = require('fs');
    var filename = args.filename;
    var driver = engine.driver;

    return driver
        .takeScreenshot()
        .then(function (base64Image) {
            var currentDate = new Date();
            var currentDateAndTime = '';
            currentDateAndTime += currentDate.getFullYear();
            currentDateAndTime += getTwoDigitsDatePart(currentDate.getMonth() + 1);
            currentDateAndTime += getTwoDigitsDatePart(currentDate.getDate());
            currentDateAndTime += '-' + getTwoDigitsDatePart(currentDate.getHours());
            currentDateAndTime += getTwoDigitsDatePart(currentDate.getMinutes());
            currentDateAndTime += getTwoDigitsDatePart(currentDate.getSeconds());

            var decodedImage = new Buffer(base64Image, 'base64');
            var filenameToSave = SCREENSHOTS_DIR + currentDateAndTime + '_' + filename + '.jpg';

            fs.writeFile(filenameToSave, decodedImage, function (err) {
                if (err) {
                    throw err;
                }
            });
        });
};

module.exports = TakeScreenshot;

function getTwoDigitsDatePart(datePart) {
    if (datePart < 10) {
        return '0' + datePart;
    }
    return datePart;
}