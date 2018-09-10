import { Router } from 'express';
import stockPrices from './stockPrices';
import data from './data';

const router = Router();

router.use('/stockprices', stockPrices);
router.use('/data', data);

export default router;
