import { pubsub } from '../../js/pubsub.js'; // Import your PubSub class or module

export default class TodoForm {
    constructor() {
        this.todoInput = "";
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("validateInput", this.handleTodoInput)
    }
    handleTodoInput = (text) => {
        if (text.length <= 0) return;
        this.todoInput = text;
        pubsub.publish("inputValidated", this.todoInput);
    }
}