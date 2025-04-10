import { AppDataSource } from '../db/data-source';
import { Budget } from "../db/entities/budget.entity";

export class BudgetService {
    private budgetRepo = AppDataSource.getRepository(Budget);

    // Create Budget (POST)
    async createBudget(budgetData: Partial<Budget>): Promise<Budget> {
        const budget = this.budgetRepo.create(budgetData);
        return await this.budgetRepo.save(budget);
    }

    // Get All Budgets (GET)
    async getAllBudgets(): Promise<Budget[]> {
        return await this.budgetRepo.find({
            relations: ['category'], // 👈 join category relation
            order: {
                category: {
                    name: 'ASC', // 👈 safe ordering by related category name
                },
            },
        });
    }

    // Get One Budget by ID (GET)
    async getBudgetById(id: number): Promise<Budget | null> {
        return await this.budgetRepo.findOne({
            where: { id },
            relations: ['category'],
        });
    }

    // Update Budget (PUT)
    async updateBudget(id: number, updateData: Partial<Budget>): Promise<Budget> {
        await this.budgetRepo.update(id, updateData);
        return this.budgetRepo.findOneOrFail({
            where: { id },
            relations: ['category'],
        });
    }
}
