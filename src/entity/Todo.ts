import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: null })
	category: string;

	@Column({ default: null })
	priority: string;

	@Column()
	startTime: string;

	@Column()
	endTime: string;

	@Column({ default: null })
	attachment: string;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@Column("longtext")
	task: string;

	@ManyToOne(type => User, user => user.todos, { onDelete: 'CASCADE' })
	user: User;

}