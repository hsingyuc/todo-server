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

    async save(request: Request, response: Response, next: NextFunction) {
        return this.todosRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let todoToRemove = await this.todosRepository.findOne(request.params.id);
        await this.todosRepository.remove(todoToRemove);
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