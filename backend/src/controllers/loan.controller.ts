import { Request, Response } from 'express';
import { LoanService } from '../services/loan.service';

const loanService = new LoanService();

export class LoanController {
    async createLoan(req: Request, res: Response) {
        try {
            const createdTransaction = await loanService.createLoan(req.body);
            res.status(201).json(createdTransaction);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAll(req: Request, res: Response) {
        const loans = await loanService.getAllLoans();
        res.json(loans);
    }

    async updateLoan(req: Request, res: Response) {
        try {
            const { updateData } = req.body;
            const updated = await loanService.updateLoan(
                Number(req.params.id),
                updateData
            );
            res.json(updated);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getId(id: number) {
        const loan = await loanService.getLoanById(id);
        if (!loan)
            throw new Error('loan not found');
        return loan;
    }

}
