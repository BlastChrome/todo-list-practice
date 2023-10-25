import TodoList from "./todo-list.js";
import Todo from "./todo.js";
import { pubsub } from "../../js/pubsub.js";

export default class TodoManager {
    constructor() {
        this.list = new TodoList();
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("inputValidated", this.addTodoToList)
    }

    addTodoToList = (newTodoText) => {
        const newTodo = new Todo(newTodoText);
        this.list.addTodo(newTodo);
        pubsub.publish("todoAdded", newTodo);
        console.log(this.list);
    }
}