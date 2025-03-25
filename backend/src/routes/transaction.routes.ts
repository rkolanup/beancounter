import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

const router = Router();
const transactionController = new TransactionController();

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               expensetype:
 *                 type: string
 *                 enum: [fixed, variable]
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               description:
 *                 type: string
 *               month:
 *                 type: string
 *               year:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               category:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */
router.post('/transactions', transactionController.create.bind(transactionController));

export default router;
