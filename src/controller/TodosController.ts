import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Todos } from "../entity/Todos";

export class TodosController {

    private todosRepository = getRepository(Todos);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.todosRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.todosRepository.findOne(request.params.id);
    }

    async create(request: Request, response: Response, next: NextFunction) {
        if (!request.body.filename || !request.body.content) {
            response.status(422);
            return { message: "Empty form won't be created." }
        }

        const todoCreated = await this.todosRepository.save(request.body);
        if (!todoCreated) {
            response.status(500);
            return { message: 'Todo could not be created.' };
        }
        return todoCreated;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const todoToRemove = await this.todosRepository.findOne(request.params.id);

        if (!todoToRemove) {
            response.status(404);
            return { message: 'Post not found.' };
        }
        await this.todosRepository.remove(todoToRemove);
        return { message: 'Deleted.' };
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const foundOne = await this.todosRepository.findOne(request.params.id);

        if (!foundOne) {
            response.status(404);
            return { message: 'Post not found.' };
        } else {
            try {
                await this.todosRepository.update(request.params.id, request.body);
                return this.todosRepository.findOne(request.params.id);
            } catch {
                response.status(400);
                return { message: 'Invalid parameters.' };
            }
        }
    }

}