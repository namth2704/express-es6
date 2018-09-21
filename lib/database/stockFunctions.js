import DBConnector from './DBConnector';

const dbConnector = new DBConnector();

const GetAllStocks = async (userid) => {
    return await dbConnector.query(`select * from user where userid = ?`, [userid]);
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
    GetAllStocks,
    AddStocks
}