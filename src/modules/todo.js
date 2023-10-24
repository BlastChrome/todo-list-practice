export default class Todo {
    constructor(text) {
        this.text = text;
        this.isComplete = false;
        this.timeStamp = new Date();
        this.id = this.generateId();
    }

    updateTodo = (newText) => {
        this.text = newText;
    }

    toggleCompletion = () => {
        this.isComplete = !this.isComplete;
    }

    generateId = () => {
        return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

}