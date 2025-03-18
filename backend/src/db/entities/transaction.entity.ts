import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./categorie.entity";

@Entity('transactions')
export class Transaction {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'decimal' })
    amount: number;

    // @Column({name : ""})
    // category: string;

    @Column({ name: 'type' })
    type: 'income' | 'expense';

    @Column()
    description: string;

    @Column()
    date: Date;

    @ManyToOne(() => User, (user) => user.transactions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Category, (category) => category.transactions, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'category_id' })
    category: Category;
}

