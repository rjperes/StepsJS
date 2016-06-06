import Step from './step';

const SCREENSHOTS_DIR = './screenshots/';

export default class TakeScreenshot extends Step {
    run(engine, args) {
        let fs = require('fs');
        let filename = args.filename;
        let driver = engine.driver;

        return driver
            .takeScreenshot()
            .then(function (base64Image) {
                let currentDate = new Date();
                let currentDateAndTime = '';
                currentDateAndTime += currentDate.getFullYear();
                currentDateAndTime += getTwoDigitsDatePart(currentDate.getMonth() + 1);
                currentDateAndTime += getTwoDigitsDatePart(currentDate.getDate());
                currentDateAndTime += '-' + getTwoDigitsDatePart(currentDate.getHours());
                currentDateAndTime += getTwoDigitsDatePart(currentDate.getMinutes());
                currentDateAndTime += getTwoDigitsDatePart(currentDate.getSeconds());

                let decodedImage = new Buffer(base64Image, 'base64');
                let filenameToSave = SCREENSHOTS_DIR + currentDateAndTime + '_' + filename + '.jpg';

                fs.writeFile(filenameToSave, decodedImage, function (err) {
                    if (err) {
                        throw err;
                    }
                });
            });
    }
}

function getTwoDigitsDatePart(datePart) {
    if (datePart < 10) {
        return '0' + datePart;
    }
    return datePart;
}