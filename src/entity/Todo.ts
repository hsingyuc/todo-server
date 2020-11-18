import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {

	@PrimaryGeneratedColumn()
	id: Number;

	@Column({ default: null })
	priority: String;

	@Column()
	startTime: String;

	@Column()
	endTime: String;

	@Column({ default: null })
	attachment: String;

	@CreateDateColumn()
	public createdAt: Date;

	@UpdateDateColumn()
	public updatedAt: Date;

	@Column("longtext")
	task: String;

	@ManyToOne(type => User, user => user.todos, { onDelete: 'CASCADE' })
	user: User;

}