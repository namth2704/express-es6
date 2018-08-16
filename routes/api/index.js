import { Router } from 'express';
import fetch from '../../lib/fetch';
import { getStockPricesFromString, getCompanyNamesFromString } from '../../services/parseStockData';
import logger from '../../lib/logger';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const stockString = await fetch('http://price2.tvsi.com.vn/DataForLoad.ashx?FloorCode=02');
        const companyNameString = await fetch('http://price.tvsi.com.vn/HNXSecuritiesName.ashx?FloorCode=02');
        if (stockString && stockString.length > 0 && companyNameString && companyNameString.length > 0) {
            const stocks = getStockPricesFromString(stockString.toString());
            const companyNames = getCompanyNamesFromString(companyNameString.toString());
            if (stocks && companyNames) {
                const all = stocks.map((item, index) => {
                    if (companyNames[index] && companyNames[index].name) {
                        if (companyNames[index].ID == item.ID) item.name = companyNames[index].name;
                    }
                    return item;
                });
                res.json(all);
            }
        } else {
            res.json([]);
        }
    }
    catch (ex) {
        logger.error(`API error: ${ex}`);
        res.status(500).send('Internal Error Exception');
    }
});

export default router;