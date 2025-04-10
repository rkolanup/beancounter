import { Request, Response } from "express";
import { BudgetService } from "../services/budget.service";

const budgetService = new BudgetService();

export class BudgetController {
    async create(req: Request, res: Response) {
        try {
            const budget = await budgetService.createBudget(req.body);
            res.status(201).json(budget);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    async getAll(req: Request, res: Response) {
        const budgets = await budgetService.getAllBudgets();
        res.json(budgets);
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updated = await budgetService.updateBudget(id, req.body);
            res.json(updated);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    }

    // async delete(req: Request, res: Response) {
    //     try {
    //         const id = Number(req.params.id);
    //         await budgetService.deleteBudget(id);
    //         res.status(204).send();
    //     } catch (err) {
    //         res.status(400).json({ message: err.message });
    //     }
    // }
}
