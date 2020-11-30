import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";
import * as cors from 'cors';

const dbConnection = process.env.CLEARDB_DATABASE_URL
    ? {
        "url": process.env.CLEARDB_DATABASE_URL,
    }
    : {
        "host": "localhost",
        "username": "root",
        "password": "g^e5Lr5%wqzLvu2t",
        "database": "todo-server",
        "port": 3306,
    };
createConnection({
    "type": "mysql",
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/**/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    },
    ...dbConnection
}).then(async connection => {
    // create express app
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static('public'));

    // register express routes from defined application routes
    Routes.forEach(route => {
        const { action, controller, method, middleware } = route;
        (app as any)[method](route.route, middleware ? middleware : (res, req, next) => next(), (req: Request, res: Response, next: Function) => {
            const result = (new (controller as any))[action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(process.env.PORT || 3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
