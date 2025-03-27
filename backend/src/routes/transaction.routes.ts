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

/**
 * @swagger
 * /transactions/summary:
 *   get:
 *     summary: Get transaction summary by month and year (sum by category)
 *     tags: [Transactions]
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         required: true
 *         description: Month of the transactions (e.g., "3")
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         required: true
 *         description: Year of the transactions (e.g., "2025")
 *     responses:
 *       200:
 *         description: Successfully retrieved transaction summary
 *       400:
 *         description: Month and year are required
 *       500:
 *         description: Internal server error
 */
router.get('/transactions/summary', transactionController.getSummaryByMonth.bind(transactionController));

export default router;
