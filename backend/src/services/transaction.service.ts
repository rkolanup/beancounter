import { AppDataSource } from '../db/data-source';
import { Transaction } from '../db/entities/transaction.entity';
import { Repository } from 'typeorm';

export class TransactionService {
    private transactionRepo: Repository<Transaction>;

    constructor() {
        this.transactionRepo = AppDataSource.getRepository(Transaction);
    }

    async createTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
        const transaction = this.transactionRepo.create(transactionData);
        return await this.transactionRepo.save(transaction);
    }

    async getTransactionsSummaryByMonth(month: string, year: string) {
        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(0);

        const rawSummary = this.transactionRepo
            .createQueryBuilder('transactions')
            .leftJoin('transactions.category', 'categories')
            .select('categories.name', 'category')
            .addSelect('SUM(transactions.amount)', 'totalAmount')
            .addSelect("STRING_AGG(transactions.description, ', ')", 'description')
            .where('transactions.date BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy('categories.name')
            .getRawMany();

        return (await rawSummary).map(row => ({
            ...row,
            description: row.description
                ?.split(',')
                .map((desc: string) => desc.trim())
                .filter((desc: string) => desc !== '')
                .join(', ')
        }));
    }

    async getTransactionsSummaryForMonth(month: string, year: string) {
        // const startDate = new Date(`${year}-${month}-01`);
        // const endDate = new Date(startDate);
        // endDate.setMonth(startDate.getMonth() + 1);
        // endDate.setDate(0);

        const rawSummary = this.transactionRepo
            .createQueryBuilder('transactions')
            .leftJoin('transactions.category', 'categories')
            .select('categories.name', 'category')
            .addSelect('SUM(transactions.amount)', 'totalAmount')
            .addSelect("STRING_AGG(transactions.description, ', ')", 'description')
            .where('transactions.month = :month AND transactions.year = :year', { month, year })
            .groupBy('categories.name')
            .getRawMany();

        return (await rawSummary).map(row => ({
            ...row,
            description: row.description
                ?.split(',')
                .map((desc: string) => desc.trim())
                .filter((desc: string) => desc !== '')
                .join(', ')
        }));
    }



}
