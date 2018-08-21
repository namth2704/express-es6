let instance = null;

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

    get stockData() {
        return this._stockData;
    }

    get HNX() {
        return this._stockData.HNX;
    }

    get HOSE() {
        return this._stockData.HOSE;
    }

    get UPCOM() {
        return this._stockData.UPCOM;
    }

    set HNX(hnxData) {
        this._stockData.HNX = hnxData;
    }

    set HOSE(hoseData) {
        this._stockData.HOSE = hoseData;
    }

    set UPCOM(upcomData) {
        this._stockData.UPCOM = upcomData;
    }
}

export default GlobalData;