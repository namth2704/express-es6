import config from 'exp-config';
import fetch from '../../lib/fetch';
import logger from '../../lib/logger';
import events from '../../lib/events';
import GlobalData, { StockType } from '../../lib/globalData';
import { StockFunctions } from '../../lib/database';
import StockParsing from './stockParsing';

const INTERVAL_TIME = config.refetchingTime;
const globalData = new GlobalData();
let timeInterval = false;

const getStockDataFromServerEndpoint = async (stockType) => {
    try {
        if (!stockType) return null;

        const stockPriceString = await fetch(stockType.prices);
        const companyNameString = await fetch(stockType.names);

        if (stockPriceString && stockPriceString.length > 0 && companyNameString && companyNameString.length > 0) {
            const stocks = StockParsing.ParseStockPricesFromString(stockPriceString.toString());
            const companyNames = StockParsing.ParseCompanyNamesFromString(companyNameString.toString());

            if (stocks && companyNames) {
                return {
                    prices: stocks,
                    names: companyNames
                };
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

    const fetchEachStockDataType = async (endpoint, stockType) => {
        globalData.setData(await getStockDataFromServerEndpoint(endpoint), stockType);
    };

    const fetchDataPerMinute = () => {
        const tvsiEndpoints = config.tvsiPriceEndpoint;
        fetchEachStockDataType(tvsiEndpoints.HNX, StockType.HNX);
        fetchEachStockDataType(tvsiEndpoints.HOSE, StockType.HOSE);
        fetchEachStockDataType(tvsiEndpoints.UPCOM, StockType.UPCOM);
    };

    fetchDataPerMinute();
    timeInterval = setInterval(fetchDataPerMinute, INTERVAL_TIME);
};

const storeStockDataToDatabase = () => {
    try {
        events.once('globalDataReady', async () => {
            console.log(await StockFunctions.AddStocks(globalData.getHNX().names, StockType.HNX));
            console.log(await StockFunctions.AddStocks(globalData.getHOSE().names, StockType.HOSE));
            console.log(await StockFunctions.AddStocks(globalData.getUPCOM().names, StockType.UPCOM));
        });
    }
    catch (ex) {
        console.log(ex);
    }
};

export default (app) => {
    storeStockDataToGlobal();
    storeStockDataToDatabase();
};
