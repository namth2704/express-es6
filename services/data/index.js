import config from 'exp-config';
import GlobalData, { DataType } from '../../lib/globalData';
import fetch from '../../lib/fetch';
import { getStockPricesFromString, getCompanyNamesFromString } from './parseStockData';
import logger from '../../lib/logger';

const INTERVAL_TIME = config.refetchingTime;
let timeInterval = false;
const globalData = new GlobalData();

const getStockData = async (stockType) => {
    try {
        if (!stockType) return null;

        const stockPriceString = await fetch(stockType.prices);
        const companyNameString = await fetch(stockType.names);

        if (stockPriceString && stockPriceString.length > 0 && companyNameString && companyNameString.length > 0) {
            const stocks = getStockPricesFromString(stockPriceString.toString());
            const companyNames = getCompanyNamesFromString(companyNameString.toString());

            if (stocks && companyNames) {
                return stocks.map((item, index) => {
                    if (companyNames[index] && companyNames[index].name) {
                        if (companyNames[index].ID == item.ID) item.name = companyNames[index].name;
                    }
                    return item;
                });
            }
            return null;
        }
        return null;
    }
    catch (ex) {
        logger.error(`API error: ${ex}`);
        return null;
    }
};

const storeStockDataToGlobal = () => {
    if (timeInterval) clearInterval(timeInterval);

    const fetchEachStockDataType = async (endpoint, dataType) => {
        globalData.setData(await getStockData(endpoint), dataType);
    };

    const fetchDataPerMinute = async () => {
        const tvsiEndpoints = config.tvsiPriceEndpoint;
        fetchEachStockDataType(tvsiEndpoints.HNX, DataType.HNX);
        fetchEachStockDataType(tvsiEndpoints.HOSE, DataType.HOSE);
        fetchEachStockDataType(tvsiEndpoints.UPCOM, DataType.UPCOM);
    };

    fetchDataPerMinute();
    timeInterval = setInterval(fetchDataPerMinute, INTERVAL_TIME);
};

export default (app) => {
    storeStockDataToGlobal();
};
