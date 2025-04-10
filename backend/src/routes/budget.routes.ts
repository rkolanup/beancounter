import { Router } from 'express';
import { BudgetController } from '../controllers/budget.controller';

const router = Router();
const budgetController = new BudgetController();

/**
 * @swagger
 * tags:
 *   name: Budgets
 *   description: Budget management
 */

/**
 * @swagger
 * /budgets:
 *   post:
 *     summary: Create a new budget
 *     tags: [Budgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               limit:
 *                 type: number
 *               spent:
 *                 type: number
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *     responses:
 *       201:
 *         description: Budget created
 */
router.post('/budgets', (req, res) => budgetController.create(req, res));

/**
 * @swagger
 * /budgets:
 *   get:
 *     summary: Get all budgets for a user
 *     tags: [Budgets]
 *    
 *     responses:
 *       200:
 *         description: List of budgets
 */
router.get('/budgets', (req, res) => budgetController.getAll(req, res));

/**
 * @swagger
 * /budgets/{id}:
 *   put:
 *     summary: Update a budget by ID
 *     tags: [Budgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Budget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated budget
 */
router.put('/budgets/:id', (req, res) => budgetController.update(req, res));

export default router;
