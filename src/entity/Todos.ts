import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Todos {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: null })
	filename: string;

	@Column({ type: 'date' })
	created: Date;

	@Column("longtext")
	content: string;

	@ManyToOne(type => User, user => user.todos)
	user: User;

}
