import { Client, GatewayIntentBits } from 'discord.js';
import { EventHandler } from './events';
import { config } from 'dotenv';

// Bot class to extend from Client.
class Bot extends Client {
    private botToken: string;

    // Loads config files and init the bot.
    constructor(
        private eventHandler: EventHandler
    ) {
        config();
        super({ intents: [GatewayIntentBits.Guilds] });
        this.botToken = process.env.TOKEN;

        // Starts the bot.
        this.init();
    }

    // Method to stand up the bot.
    init() {
        // Activates the event handler.
        this.eventHandler.createBotHandler(this);

        // Log In the bot client.
        this.login(this.botToken);
    }
}

// Instantiate the Bot.
new Bot(new EventHandler());