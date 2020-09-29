import { UserController } from "./controller/UserController";
import { TodoController } from "./controller/TodoController";
import * as multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let customFileName = Math.random().toString(36).substring(7),
            parts = file.originalname.split('.'),
            fileExtension = parts[parts.length - 1] // get file extension from original file name
        cb(null, customFileName + '.' + fileExtension)
    }
})
const upload = multer({ storage: storage })

export const Routes = [{
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "create"
}, {
    method: "get",
    route: "/todos",
    controller: TodoController,
    action: "all"
}, {
    method: "get",
    route: "/todos/:id",
    controller: TodoController,
    action: "one"
}, {
    method: "post",
    route: "/todos",
    controller: TodoController,
    action: "create",
    middleware: upload.single('attachment'),
}, {
    method: "delete",
    route: "/todos/:id",
    controller: TodoController,
    action: "remove"
}, {
    method: "put",
    route: "/todos/:id",
    controller: TodoController,
    action: "update"
}];
