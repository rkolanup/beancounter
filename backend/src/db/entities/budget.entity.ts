import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../entities/categorie.entity"; // Adjust the path as necessary

@Entity('budget')
export class Budget {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column({ type: 'decimal' })
    limit: number;
}
