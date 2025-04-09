import { AppDataSource } from '../db/data-source';
import { Loan } from '../db/entities/loan.entity';

export class LoanService {
    private loanRepo = AppDataSource.getRepository(Loan);

    // Create Loan (POST)
    async createLoan(loanData: Partial<Loan>): Promise<Loan> {
        const loan = this.loanRepo.create(loanData);
        return await this.loanRepo.save(loan);
    }

    // Get All Loans (GET)
    async getAllLoans(): Promise<Loan[]> {
        return await this.loanRepo.find({
            order: {
                startDate: 'DESC',
            },
        });
    }

    // Get One Loan by ID (GET)
    async getLoanById(id: number): Promise<Loan | null> {
        return await this.loanRepo.findOneBy({ id });
    }

    // Update Loan (PUT)
    async updateLoan(id: number, updateData: Partial<Loan>): Promise<Loan> {
        await this.loanRepo.update(id, updateData);
        return this.loanRepo.findOneByOrFail({ id });
    }
}
