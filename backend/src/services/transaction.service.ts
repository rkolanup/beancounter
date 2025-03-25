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

    // async getTotalByCategories(): Promise<any[]> {
    //     const result = await this.transactionRepo
    //         .createQueryBuilder('transaction')
    //         .leftJoin('transaction.category', 'category')
    //         .select('category.name', 'categoryName')
    //         .addSelect('SUM(transaction.amount)', 'total')
    //         .addSelect('STRING_AGG(transaction.description, \', \')', 'descriptions')
    //         .groupBy('category.name')
    //         .getRawMany();

    //     return result;
    // }

    async getTotalByCategoriesWithDateRange(startDate: string, endDate: string): Promise<any[]> {
        const result = await this.transactionRepo
            .createQueryBuilder('transaction')
            .leftJoin('transaction.category', 'category')
            .select('category.name', 'categoryName')
            .addSelect('SUM(transaction.amount)', 'total')
            .addSelect('STRING_AGG(transaction.description, \', \')', 'descriptions')
            .where('transaction.date BETWEEN :startDate AND :endDate', { startDate, endDate })
            .groupBy('category.name')
            .getRawMany();

        return result;
    }

}
