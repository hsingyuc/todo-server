import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Todo } from "./Todo";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    username: String;

    @Column()
    password: String;

    //decorator
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    @OneToMany(type => Todo, todo => todo.user)
    todos: Todo[];

}
