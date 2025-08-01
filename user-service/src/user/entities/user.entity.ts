import { Exclude } from "class-transformer";
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

    @Column({select:false})
    password : string

    @Column({nullable: true})
    phone : string

    @CreateDateColumn()
    createdAt : Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column({default:true})
    isActive: boolean



    
    
}
