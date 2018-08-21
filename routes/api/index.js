import { Router } from 'express';
import GlobalData from '../../lib/globalData';

const router = Router();

router.get('/', (req, res) => {
    try {
        const globalData = new GlobalData();
        res.json(globalData);
    }
    catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.get('/hnx', (req, res) => {
    try {
        const globalData = new GlobalData();
        res.json(globalData.HNX);
    }
    catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.get('/hose', (req, res) => {
    try {
        const globalData = new GlobalData();
        res.json(globalData.HOSE);
    }
    catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

router.get('/upcom', (req, res) => {
    try {
        const globalData = new GlobalData();
        res.json(globalData.UPCOM);
    }
    catch(ex) {
        console.log(ex);
        res.status(500).send(ex);
    }
});

export default router;
