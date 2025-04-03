import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

const transactionService = new TransactionService();

const monthMap: Record<string, number> = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
};

export class TransactionController {
    async create(req: Request, res: Response) {
        try {
            const createdTransaction = await transactionService.createTransaction(req.body);
            res.status(201).json(createdTransaction);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getSummaryForMonth(req: Request, res: Response): Promise<void> {
        try {
            const { month, year } = req.query;

            if (!month || !year) {
                res.status(400).json({ message: 'Month and year are required' });
                return;
            }

            const summary = await transactionService.getTransactionsSummaryForMonth(month as string, year as string);
            res.status(200).json(summary);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getSummaryByMonth(req: Request, res: Response): Promise<void> {
        try {
            const { month, year } = req.query;

            if (!month || !year) {
                res.status(400).json({ message: 'Month and year are required' });
                return;
            }

            const summary = await transactionService.getTransactionsSummaryByMonth(month as string, year as string);
            res.status(200).json(summary);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }





}
