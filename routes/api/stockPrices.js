import { Router } from 'express';
import GlobalData from '../../lib/globalData';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const globalData = new GlobalData();
        res.json(globalData.getStockData());
    }
    catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.get('/hnx', (req, res) => {
    try {
        const globalData = new GlobalData();
        res.json(globalData.getHNX());
    }
    catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.get('/hose', (req, res) => {
    try {
        const globalData = new GlobalData();
        res.json(globalData.getHOSE());
    }
    catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.get('/upcom', (req, res) => {
    try {
        const globalData = new GlobalData();
        res.json(globalData.getUPCOM());
    }
    catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export default router;
