import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Reservation {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({ default: 'pending' })
    status: string;

    @Column({ nullable: true })
    notes: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
