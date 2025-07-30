import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName : string

    @Column()
    lastName : string

    @Column()
    email : string

    @Column()
    password : string

    @Column()
    phone : number

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({default:true})
    isActive: boolean



    
    
}
