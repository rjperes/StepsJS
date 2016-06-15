/**
 * Created by rferrolho on 06/06/2016.
 */

export default class Context {
    constructor() {
        this._savedData = [];
    }

    saveData(dataKey, dataValue) {
        this._savedData[dataKey] = dataValue;
    }

    getSavedData(dataKey) {
        return this._savedData[dataKey];
    }

    getContextData() {
        return this._savedData;
    }
}