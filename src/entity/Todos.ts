import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Todos {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: null })
	filename: string;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@Column("longtext")
	content: string;

	@ManyToOne(type => User, user => user.todos, { onDelete: 'CASCADE' })
	user: User;

}