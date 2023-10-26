import { pubsub } from '../../js/pubsub.js'; // Import your PubSub class or module

export default class SettingsManager {
    constructor() {
        this.themeList = ['light', 'dark'];
        this.currentTheme = this.getCurrentTheme();
        this.subscribe();
    }

    subscribe = () => {
        pubsub.subscribe("themeBtnClicked", this.toggleCurrentTheme);
    }

    toggleCurrentTheme = () => {
    }

    toggleCurrentTheme = () => {
        this.themeList.reverse();
        this.currentTheme = this.getCurrentTheme()
    }

    getCurrentTheme = () => {
        return this.themeList[0];
    }
}
