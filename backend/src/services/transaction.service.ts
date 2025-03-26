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
        return this.transactionRepo
            .createQueryBuilder('transaction')
            .leftJoin('transaction.category', 'category')
            .select('category.name', 'category')
            .addSelect('SUM(transaction.amount)', 'totalAmount')
            .addSelect("STRING_AGG(transaction.description, ', ')", 'description')
            .where('transaction.month = :month', { month })
            .andWhere('transaction.year = :year', { year })
            .groupBy('category.name')
            .getRawMany();
    }

}
