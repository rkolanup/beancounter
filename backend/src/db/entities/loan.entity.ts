import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lender: string;

    @Column('decimal', { precision: 12, scale: 2 })
    originalAmount: number;

    @Column('decimal', { precision: 12, scale: 2 })
    balance: number;

    @Column('decimal', { precision: 5, scale: 2 })
    interestRate: number;

    @Column()
    startDate: Date;

    @Column('decimal', { precision: 12, scale: 2 })
    monthlyPayment: number;

    @Column({ nullable: true })
    notes: string;
}
