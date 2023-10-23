class PubSub {
    constructor() {
        this.events = {};
    }
    // Publish event with data to subscribers
    publish(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    }

    // Subscribe to an event with a callback
    subscribe(event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    // Unsubscribe from an event
    unsubscribe(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(fn => fn !== callback);
    }
}
const pubsub = new PubSub();
export { pubsub };
