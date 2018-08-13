import { Router } from 'express';
import fetch from '../../lib/fetch';
import { getStockPricesFromString } from '../../services/parseStockData';

const router = Router();

router.get('/', (req, res) => {
    fetch('http://price2.tvsi.com.vn/DataForLoad.ashx?FloorCode=02', (err, content) => {
        const stocks = getStockPricesFromString(content.toString());
        res.json(stocks);
    });
});

export default router;