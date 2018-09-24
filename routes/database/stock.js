import { Router } from 'express';
import { StockFunctions } from '../../lib/database';

const router = Router();

router.get('/get/:id', async (req, res) => {
    const params = req.params;
    const id = params ? params.id : null;

    try {
        res.json(await StockFunctions.GetStockById(id));
    }
    catch (ex) {
        res.send(`Error while getting stock by id=${id}: ${ex}`);
    }
});

export default router;
