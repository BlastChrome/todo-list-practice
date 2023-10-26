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
        pubsub.subscribe("listChanged", this.renderList);
    }

    handleAddClick = () => {
        const inputValue = this.todoInput.value.trim();
        if (inputValue) {
            pubsub.publish("validateInput", inputValue);
            this.todoInput.value = '';
        } else {

        }
    }

    handleKeyPress = (e) => {
        if (e.key == "Enter") {
            this.handleAddClick();
        }
    }

    handleTodoClick = (e) => {
        const clickedElement = e.target;
        const todoItem = clickedElement.closest('.todo-item');
        const todoId = todoItem.dataset.id;

        const parentButton = clickedElement.closest('.todo-item__button--delete') || clickedElement.closest('.todo-item__button--edit') || clickedElement.closest('.todo-item__checkbox');

        switch (true) {
            case parentButton && parentButton.classList.contains("todo-item__button--delete"):
                pubsub.publish("deleteTodo", todoId);
                break;

            case parentButton && parentButton.classList.contains("todo-item__button--edit"):
                pubsub.publish("editTodo", todoId);
                break;

            case parentButton && parentButton.classList.contains("todo-item__checkbox"):
                pubsub.publish("completeTodo", todoId);
                break;
        }
    }

    renderList = (todoList) => {
        // clear the dom list initially 
        while (this.domList.firstChild) { this.domList.removeChild(this.domList.lastChild) }
        todoList.forEach(todo => {
            this.domList.appendChild(this.createTodoElement(todo)); 21
        });
        console.log(todoList);
    }

    createTodoElement = (newTodo) => {
        const todoElement = document.createElement("li");
        todoElement.classList.add('todo-item');
        todoElement.dataset.id = newTodo.id;

        todoElement.innerHTML = `
        <div class="check-text-wrapper">
            <button class="todo-item__button todo-item__button--checkbox" ><input type="checkbox" class="todo-item__checkbox" /></button>
            <span class="todo-item__text">${newTodo.text}</span>
        </div>
        <div class="delete-edit-wrapper">
        <button class="todo-item__button todo-item__button--delete"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
        <button class="todo-item__button todo-item__button--edit"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
        </div>`;
        return todoElement;
    }
}