class PubSub {
    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    publish(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                callback(data);
            });
        }
    }
}

// Create a single instance of the PubSub class to use throughout your application
const pubsub = new PubSub();

// Export the pubsub instance for use in other modules
export default pubsub;
