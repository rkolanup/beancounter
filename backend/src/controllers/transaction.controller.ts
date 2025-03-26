import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

const transactionService = new TransactionService();

export class TransactionController {
    // Create a new transaction
    async create(req: Request, res: Response) {
        try {
            const createdTransaction = await transactionService.createTransaction(req.body);

            // After creating, fetch the updated summary for the month/year of this transaction
            const { month, year } = req.body;

            const summary = await transactionService.getTransactionsSummaryByMonth(month, year);

            res.status(201).json(summary);  // Respond with the updated summary
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getSummaryByMonth(req: Request, res: Response) {
        try {
            const { month, year } = req.query;
            if (!month || !year) {
                return res.status(400).json({ message: 'Month and year are required' });
            }
            const summary = await transactionService.getTransactionsSummaryByMonth(
                String(month),
                String(year)
            );
            res.status(200).json(summary);
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }



}
