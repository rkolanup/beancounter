import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

const transactionService = new TransactionService();

export class TransactionController {
    // Create a new transaction
    async create(req: Request, res: Response) {
        try {
            const createdTransaction = await transactionService.createTransaction(req.body);
            res.status(201).json(createdTransaction);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }
}
