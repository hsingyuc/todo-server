import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async one(request: Request, response: Response, next: NextFunction) {
        const foundOne = await this.userRepository.findOne(request.params.id);

        if (!foundOne) {
            response.status(404);
            return { message: 'User not found.' };
        }
        return foundOne;
    }

    async create(request: Request, response: Response, next: NextFunction) {
        if (!request.body.username || !request.body.password) {
            response.status(422);
            return { message: "Username and password are required." };
        }

        const userObject = this.userRepository.create(request.body);
        const user = await this.userRepository.save(userObject);

        if (!user) {
            response.status(500);
            return { message: 'User could not be created.' };
        }

        return { data: { user } };
    }
}