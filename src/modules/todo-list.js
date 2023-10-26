import { pubsub } from '../../js/pubsub.js'; // Import your PubSub class or module

export default class TodoList {
    constructor() {
        this.list = [];
        this.subscribe();
    }

    // subscriptions 
    subscribe = () => {
        pubsub.subscribe('removeTodo', this.removeTodo);
        pubsub.subscribe('updateTodo', this.updateTodo);
    }

    addTodo = (newTodo) => {
        this.list.push(newTodo);
        pubsub.publish('listChanged', this.list);
    }

    removeTodo = (todoId) => {
        const index = this.list.findIndex(todo => todo.id === todoId);
        if (index > -1) {
            const removedTodo = this.list.splice(index, 1);
            pubsub.publish('todoRemoved', removedTodo[0]);
            pubsub.publish('listChanged', this.list);
        }
    }

    updateTodo = (todoId, newText) => {
        const todoToUpdate = this.list.find(todo => todo.id === todoId);
        if (todoToUpdate) {
            todoToUpdate.text = newText;
            pubsub.publish("todoUpdated", todoToUpdate);
            pubsub.publish('listChanged', this.list);
        }
    }
}
