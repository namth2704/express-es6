import { Router } from 'express';
import fetch from '../../lib/fetch';

const router = Router();

router.get('/', (req, res) => {
    fetch('http://price2.tvsi.com.vn/DataForLoad.ashx?FloorCode=02', (err, content) => {
        res.send(content);
    });
});

export default router;