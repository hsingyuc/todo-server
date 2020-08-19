import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Todos } from "./Todos";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;

    @Column()
    password: string;

    @OneToMany(type => Todos, todo => todo.user)
    todos: Todos[];

}
