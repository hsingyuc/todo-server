import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        const foundAll = await this.userRepository.find();

        if (!foundAll) {
            response.status(404);
            return { message: 'Users not found.' };
        }
        return foundAll;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const userObject = this.userRepository.create(request.body);
        const user = await this.userRepository.save(userObject);
        return { data: { user } };
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        return await this.userRepository.remove(userToRemove);
    }

}