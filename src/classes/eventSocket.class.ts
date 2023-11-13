import { Client } from 'discord.js';

// EventSocket father class to be inherited to each Event specific Socket.
export class EventSocket {

    // Constructor inmediately invoke eventSocket method.
    constructor(protected client: Client, protected eventName: string) {
        this.eventSocket();
    };

    eventSocket() {
        this.client.on(this.eventName, () => { });
    };
}