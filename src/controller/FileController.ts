import { NextFunction, Request, Response } from "express";

export class FileController {
    async create(request: Request, response: Response, next: NextFunction) {
        // Multer adds the file property to the original request.
        return request.file;
    }
}