import express from 'express';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import { verifyToken } from '../middlewares/auth.middleware';
import transactionRoutes from './transaction.routes';

const router = express.Router();

router.use('/', authRoutes);
router.use('/', categoryRoutes);
router.use('/', transactionRoutes);
//router.use('/', verifyToken, categoryRoutes);

export default router;