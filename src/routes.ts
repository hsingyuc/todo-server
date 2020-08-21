import { UserController } from "./controller/UserController";
import { TodoController } from "./controller/TodoController";

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
    action: "create"
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