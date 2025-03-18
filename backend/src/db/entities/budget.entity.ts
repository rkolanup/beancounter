import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('budget')
export class Budget {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    category: string;

    @Column({ type: 'decimal' })
    limit: number;

    @Column({ type: 'decimal' })
    spent: number;

    @ManyToOne(() => User, (user) => user.budgets, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;
}
