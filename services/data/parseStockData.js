import logger from '../../lib/logger';

const getStockPricesFromString = (stockString) => {
    const stockDataStringList = getStockDetailStringList(stockString);
    return stockDataStringList.reduce((accumulator, stockString) => {
        const columnValues = stockString.split('|').map((item) => {
            return item.split(':')[0];
        });
        const data = parseStockDataFromOriginalCharacters(columnValues);
        if (data) accumulator.push(data);
        return accumulator;
    }, []);
};

const getStockDetailStringList = (originalDataString) => {
    return originalDataString && originalDataString.length > 0 ? originalDataString.split('\'')[1].split('#') : [];
};

const parseStockDataFromOriginalCharacters = (characters) => {
    try {
        return characters && characters.length > 1 ? {
            ID: characters[0],
            ceil: parseFloat(characters[2]),
            floor: parseFloat(characters[3]),
            reference: parseFloat(characters[4]),
            priceBid3: parseFloat(characters[6]),
            volumeBid3: parseInt(characters[7].replace(',', '')),
            priceBid2: parseFloat(characters[8]),
            volumeBid2: parseInt(characters[9].replace(',', '')),
            priceBid1: parseFloat(characters[10]),
            volumeBid1: parseInt(characters[11].replace(',', '')),
            priceMatched: parseFloat(characters[12]),
            volumeMatched: parseInt(characters[14].replace(',', '')),
            offsetMatched: parseFloat(characters[13]),
            totalVolume: parseInt(characters[15].replace(',', '')),
            priceAsk1: parseFloat(characters[16]),
            volumeAsk1: parseInt(characters[17].replace(',', '')),
            priceAsk2: parseFloat(characters[18]),
            volumeAsk2: parseInt(characters[19].replace(',', '')),
            priceAsk3: parseFloat(characters[20]),
            volumeAsk3: parseInt(characters[21].replace(',', '')),
            averagePrices: parseFloat(characters[23]),
            openPrices: parseFloat(characters[24]),
            highPrices: parseFloat(characters[25]),
            lowPrices: parseFloat(characters[26]),
            boughtForeign: parseInt(characters[27].replace(',', '')),
            soldForeign: parseInt(characters[28].replace(',', '')),
            roomForeign: parseInt(characters[29].replace(',', ''))
        } : null;
    }
    catch (ex) {
        logger.error(`Error when parsing stock data prices: ${ex}`);
        return {
            ID: characters[0]
        }
    }
};

const getCompanyNamesFromString = (companyNameString) => {
    const companyNameStringList = getCompanyNameStringList(companyNameString);
    return companyNameStringList.map(item => parseCompanyNameToObject(item));
};

const getCompanyNameStringList = (originalDataString) => {
    return originalDataString && originalDataString.length > 0 ? originalDataString.match(/\[\"(.*)\"\]/).pop().split('","') : [];
};

const parseCompanyNameToObject = (companyNameStringList) => {
    try {
        const companyNameArray = companyNameStringList && companyNameStringList.length > 0 ? companyNameStringList.split('-') : [];
        return companyNameArray && companyNameArray.length > 0 ? {
            ID: companyNameArray[0],
            name: companyNameArray[1]
        } : {};
    }
    catch (ex) {
        logger.error(`Error when parsing company name: ${ex}`);
        return {};
    }
};

export {
    getStockPricesFromString,
    getCompanyNamesFromString
};
