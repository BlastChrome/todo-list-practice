import TodoForm from "./modules/todo-form.js";
import TodoManager from "./modules/todo-manager.js";
import SettingsManager from "./modules/settings-manager.js";
import UI from "../src/modules/ui.js"



const App = (() => {
    const ui = new UI();
    const form = new TodoForm();
    const settings = new SettingsManager();
    const manager = new TodoManager();
})();