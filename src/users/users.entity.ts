import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity{
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    email: string;
    
}