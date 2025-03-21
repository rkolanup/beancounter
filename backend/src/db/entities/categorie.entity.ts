import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'text', nullable: true, default: null })
    description: string | null;


    @OneToMany(() => Transaction, (transaction) => transaction.category)
    transactions: Transaction[];
}
