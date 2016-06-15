import Step from './step';
import fs from 'fs';

const SCREENSHOTS_DIR = './screenshots/';

export default class TakeScreenshot extends Step {
    run(engine, args) {
        let filename = args.filename;
        let driver = engine.driver;

        return driver
            .takeScreenshot()
            .then((base64Image) => {
                let currentDate = new Date();
                let currentDateAndTime = '';
                currentDateAndTime += currentDate.getFullYear();
                currentDateAndTime += getTwoDigitsDatePart(currentDate.getMonth() + 1);
                currentDateAndTime += getTwoDigitsDatePart(currentDate.getDate());
                currentDateAndTime += '-' + getTwoDigitsDatePart(currentDate.getHours());
                currentDateAndTime += getTwoDigitsDatePart(currentDate.getMinutes());
                currentDateAndTime += getTwoDigitsDatePart(currentDate.getSeconds());

                let decodedImage = new Buffer(base64Image, 'base64');
                let filenameToSave = `${SCREENSHOTS_DIR}${currentDateAndTime}_${filename}.jpg`;

                fs.writeFile(filenameToSave, decodedImage, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            });
    }
}

function getTwoDigitsDatePart(datePart) {
    return (datePart < 10) ? `0${datePart}` : datePart;
}