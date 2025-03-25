import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SavingsGoal } from "./savings-goal.entity";
import { Budget } from "./budget.entity";
import { Transaction } from "./transaction.entity";  // ✅ Fixed import
import { Bill } from "./bill.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'email', unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Budget, (budget) => budget.user)
    budgets: Budget[];

    @OneToMany(() => SavingsGoal, (goal) => goal.user)
    savingsGoals: SavingsGoal[];

    @OneToMany(() => Bill, (bill) => bill.user)
    bills: Bill[];

}
