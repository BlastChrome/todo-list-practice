export default class Todo {
    constructor() {
        this.text = "";
        this.isComplete = false;
        this.timeStamp = new Date();
    }

    changeText = (newText) => {
        this.text = newText;
    }

    toggleCompletion = () => {
        this.timeStamp = !this.timeStamp;
    }

}