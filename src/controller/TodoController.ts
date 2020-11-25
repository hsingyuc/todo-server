import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Todo } from "../entity/Todo";

export class TodoController {

    private todoRepository = getRepository(Todo);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.todoRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const foundOne = await this.todoRepository.findOne(request.params.id);

        if (!foundOne) {
            response.status(404);
            return { message: 'Todo not found.' };
        }
        return foundOne;
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const { task, startTime, endTime } = request.body
        if (!task || !startTime || !endTime) {
            response.status(422);
            return { message: "Please fill out the task name, start date, and end date." }
        }

        const todoCreated = await this.todoRepository.save({ ...request.body });
        if (!todoCreated) {
            response.status(500);
            return { message: 'Todo could not be created.' };
        }
        return todoCreated;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const todoToRemove = await this.todoRepository.findOne(request.params.id);

        if (!todoToRemove) {
            response.status(404);
            return { message: 'Todo not found.' };
        }
        await this.todoRepository.remove(todoToRemove);
        return { message: 'Deleted.' };
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const foundOne = await this.todoRepository.findOne(request.params.id);

        if (!foundOne) {
            response.status(404);
            return { message: 'Todo not found.' };
        } else {
            try {
                await this.todoRepository.update(request.params.id, request.body);
                return this.todoRepository.findOne(request.params.id);
            } catch {
                response.status(400);
                return { message: 'Invalid parameters.' };
            }
        }
    }

}