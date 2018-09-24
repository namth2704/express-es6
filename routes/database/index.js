import { Router } from 'express';
import user from './user';
import stock from './stock';

const router = Router();

router.use('/user', user);
router.use('/stock', stock);

export default router;
