export default class Todo {
    constructor(text) {
        this.text = text;
        this.isComplete = false;
        this.timeStamp = new Date();
    }

    updateTodo = (newText) => {
        this.text = newText;
    }

    toggleCompletion = () => {
        this.isComplete = !this.isComplete;
    }

}