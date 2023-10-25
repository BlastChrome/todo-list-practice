import { pubsub } from '../../js/pubsub.js'; // Import your PubSub class or module

export default class UI {
    constructor() {
        this.addTodo = document.getElementById("addTodo");
        this.todoInput = document.getElementById("todoInput");
        this.domList = document.getElementById("todoList");
        this.subscribe();

        this.domList.addEventListener('click', this.handleTodoClick);
        this.addTodo.addEventListener('click', this.handleAddClick);
        this.todoInput.addEventListener('keypress', this.handleKeyPress);
    }

    subscribe = () => {
        pubsub.subscribe("todoAdded", this.createTodoElement);
    }

    handleAddClick = () => {
        const inputValue = this.todoInput.value.trim();
        if (inputValue) {
            pubsub.publish("validateInput", inputValue);
            this.todoInput.value = '';
        } else {
            // Handle empty input (e.g., show error message to user)
        }
    }

    handleKeyPress = (e) => {
        if (e.key == "Enter") {
            this.handleAddClick();
        }
    }

    createTodoElement = (newTodo) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add('todo-item');
        todoItem.dataset.id = newTodo.id;  // Store the id as a data attribute

        todoItem.innerHTML = `
        <input type="checkbox" class="todo-item__checkbox" />
        <span class="todo-item__text">${newTodo.text}</span>
        <button class="todo-item__button todo-item__button--delete">Delete</button>`;
        this.domList.appendChild(todoItem);
    }

    handleTodoClick = (e) => {
        if (e.target.classList.contains("todo-item__button--delete")) {
            const todoId = e.target.closest('.todo-item').dataset.id;  // Retrieve the id from the data attribute
            pubsub.publish("deleteTodo", todoId);
        }
    }
}