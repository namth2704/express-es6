import express from 'express';
import api from './api';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});

router.use('/api', api);

export default router;
