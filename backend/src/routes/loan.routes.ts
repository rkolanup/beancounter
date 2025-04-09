import express from 'express';
import { LoanController } from '../controllers/loan.controller';

const router = express.Router();
const loanController = new LoanController();

/**
 * @swagger
 * /loans:
 *   post:
 *     summary: Create a new loan
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lender:
 *                 type: string
 *               originalAmount:
 *                 type: string
 *               balance:
 *                 type: string
 *               interestRate:
 *                 type: string
 *               startDate:
 *                 type: string
 *               monthlyPayment:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Loan created
 */
router.post('/loans', (req, res) => loanController.createLoan(req, res));

/**
 * @swagger
 * /loans:
 *   get:
 *     summary: Get all loans
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of loans
 */
router.get('/loans', (req, res) => loanController.getAll(req, res));

/**
 * @swagger
 * /loans/{id}:
 *   put:
 *     summary: Update a loan by ID
 *     tags: [Loans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updateData:
 *                 type: object
 *     responses:
 *       200:
 *         description: Loan updated
 */
router.put('/loans/:id', (req, res) => loanController.updateLoan(req, res));

export default router;
