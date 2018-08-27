let instance = null;

const DataType = {
    HNX: 'HNX',
    HOSE: 'HOSE',
    UPCOM: 'UPCOM'
}

class GlobalData {
    constructor() {
        if (!instance) {
            instance = this;
        }

        this._stockData = {
            HNX: [],
            HOSE: [],
            UPCOM: []
        };

        return instance;
    }

    getStockData() {
        return this._stockData;
    }

    getHNX() {
        return this._stockData.HNX;
    }

    getHOSE() {
        return this._stockData.HOSE;
    }

    getUPCOM() {
        return this._stockData.UPCOM;
    }

    setData(data, dataType) {
        if (data & dataType) {
            switch (dataType) {
                case DataType.HNX: this._stockData.HNX = data; break;
                case DataType.HOSE: this._stockData.HOSE = data; break;
                case DataType.UPCOM: this._stockData.UPCOM = data; break;
            }
        }
    }
}

export default GlobalData;

export { DataType };