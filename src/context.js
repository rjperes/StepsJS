/**
 * Created by rferrolho on 06/06/2016.
 */

export default class Context {
    constructor(){
        this._savedData = [];
    }

    saveData(dataKey, dataValue) {
        this._savedData[dataKey] = dataValue.toString();
    }

    getSavedData(dataKey) {
        if (this._savedData[dataKey] === undefined) {
            throw new Error(`${dataKey} does not exist in saved data.`);
        }

        return this._savedData[dataKey];
    }
}