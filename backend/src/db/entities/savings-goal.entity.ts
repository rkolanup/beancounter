import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('saving-goals')
export class SavingsGoal {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: "goal_name" })
    goalName: string;

    @Column({ name: "target_amount", type: 'decimal' })
    targetAmount: number;

    @Column({ name: "saved_amount", type: 'decimal' })
    savedAmount: number;

    @Column({ name: "deadline", type: "date" })
    deadline: Date;
}
