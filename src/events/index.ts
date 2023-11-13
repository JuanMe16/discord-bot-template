import { join } from 'path';
import { Client } from 'discord.js';
import { EventSocket } from 'src/classes';

// Class to manage events and it's supported events invoking them and setting the sockets.
export class EventHandler {
    private client: Client;
    private supportedEvents: string[] = ['ready', 'interactionCreate'];

    // Method constructor-like
    createBotHandler(client: Client) {
        this.client = client;
        this.loadEvents();
    }

    // Load supported events and their directories.
    loadEvents() {
        for (const event of this.supportedEvents) {
            const dirUrl = join(__dirname, event);
            const eventModule = require(dirUrl);
            new eventModule.default(this.client, event) as EventSocket;
        }
    }

}