import DBConnector from './DBConnector';

const dbConnector = new DBConnector();

const GetStockById = async (stockid) => {
    return await dbConnector.query(`select * from stock where stockid = ?`, stockid);
};

const AddStocks = async (stocks, stockType) => {
    const preparedStockString = stocks.reduce((finalString, stock, index) => {
        let stockString = `('${stock.ID}', '${stock.name}', '${stockType}')`;
        if (index != stocks.length - 1) stockString += ',';
        finalString += stockString;
        return finalString;
    }, '');
    return await dbConnector.query(`insert ignore into stock (stockid, name, type) values ${preparedStockString}`);
};

export default {
    GetStockById,
    AddStocks
}