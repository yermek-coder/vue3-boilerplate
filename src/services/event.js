// @ts-check
// Event service
export class EventService {
    constructor() {
        // Init
        this.id = 0;
        this.listeners = [];
    }

    async connect() {
        // Disconnect
        this.disconnect();

        // Start subscriptions
        this.startListeners();
    }

    disconnect() {
        this.cancelListeners();
    }

    on(channel, action) {
        // Create subscriptions
        const listener = { id: ++this.id, channel, action, matcher: new RegExp(channel.replace(/\$/g, "\\$").replace(/\*/g, ".*"), "i") };
        this.listeners.push(listener);

        // Start subscriptions
        this.startListeners();

        // Return subscription cancel
        return () => this.off(listener.id);
    }

    off(id) {
        const listener = this.listeners.find(item => item.id == id);
        if (listener && listener.subscription) {
            listener.subscription.cancel();
            delete listener.subscription;
        }

        this.listeners = this.listeners.filter(item => item !== listener);
    }

    publish(channel, payload) {
        this.listeners.filter(listener => channel.match(listener.matcher)).forEach(listener => this.fire(listener, channel, payload, true));
    }

    cancelListeners() {
        this.listeners.forEach(listener => {
            if (listener.subscription) {
                listener.subscription.cancel();
                delete listener.subscription;
            }
        });

        this.listeners = [];
    }

    startListeners() {
        for (const listener of this.listeners) {
            if (!listener.subscription && listener.channel) {
                listener.subscription = { cancel: () => { } };
            }
        }
    }

    fire(listener, channel, payload, local = false) {
        // Dispatch message
        listener.action({ channel, payload, local });
    }
}

export default new EventService();
