import { UserController } from "./controller/UserController";
import { TodosController } from "./controller/TodosController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
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
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update"
}, {
    method: "get",
    route: "/todos",
    controller: TodosController,
    action: "all"
}, {
    method: "get",
    route: "/todos/:id",
    controller: TodosController,
    action: "one"
}, {
    method: "post",
    route: "/todos",
    controller: TodosController,
    action: "create"
}, {
    method: "delete",
    route: "/todos/:id",
    controller: TodosController,
    action: "remove"
}, {
    method: "put",
    route: "/todos/:id",
    controller: TodosController,
    action: "update"
}];