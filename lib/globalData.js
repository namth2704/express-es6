import events from './events';

let instance = null;

const StockType = {
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

        this._amountOfDataReady = 0;

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

    setData(data, stockType) {
        if (data && stockType) {
            switch (stockType) {
                case StockType.HNX: this._stockData.HNX = data; break;
                case StockType.HOSE: this._stockData.HOSE = data; break;
                case StockType.UPCOM: this._stockData.UPCOM = data; break;
            }
            this._amountOfDataReady += 1;
            if (this._amountOfDataReady == 3) {
                this._amountOfDataReady = 0;
                events.emit('globalDataReady');
            }
        }
    }
}

export default GlobalData;

export { StockType };