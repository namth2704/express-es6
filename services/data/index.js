import config from 'exp-config';
import GlobalData from '../../lib/globalData';
import fetch from '../../lib/fetch';
import { getStockPricesFromString, getCompanyNamesFromString } from './parseStockData';
import logger from '../../lib/logger';

const INTERVAL_TIME = config.refetchingTime;
let timeInterval = false;

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

    const fetchDataPerMinute = async () => {
        const tvsiEndpoints = config.tvsiPriceEndpoint;
        const globalData = new GlobalData();
        globalData.HNX = await getStockData(tvsiEndpoints.HNX);
        globalData.HOSE = await getStockData(tvsiEndpoints.HOSE);
        globalData.UPCOM = await getStockData(tvsiEndpoints.UPCOM);
    };

    fetchDataPerMinute();
    timeInterval = setInterval(fetchDataPerMinute, INTERVAL_TIME);
};

export default (app) => {
    storeStockDataToGlobal();
};
