import express from 'express';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import { verifyToken } from '../middlewares/auth.middleware';
import transactionRoutes from './transaction.routes';
import loanRoutes from './loan.routes';
import budgetRoutes from './budget.routes';

const router = express.Router();

router.use('/', authRoutes);
router.use('/', budgetRoutes);
router.use('/', categoryRoutes);
router.use('/', transactionRoutes);
router.use('/', loanRoutes);
//router.use('/', verifyToken, categoryRoutes);

export default router;