class PubSub {
    constructor() {
        this.events = {};
    }
    // Publish event with data to subscribers
    publish(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => {
            if (typeof callback === 'function') {
                callback(data);
            } else {
                console.error('Callback is not a function', callback);
            }
        });
    }

    // Subscribe to an event with a callback
    subscribe(event, callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
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
