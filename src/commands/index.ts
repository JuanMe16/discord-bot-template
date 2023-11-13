import { ApplicationCommandManager, Client } from "discord.js";
import { CommandAction } from "src/classes";
import { readdirSync } from "fs";
import { join } from "path";

// Command Handler that updates application commands as well that provides localCommands executions.
export class CommandHandler {
    private commandDirectories: string[] = [];
    private appCommandManager: ApplicationCommandManager;
    private commandsActions: CommandAction[] = [];

    // Constructor that requires useCase to work depending on a expected behaviour.
    constructor(private client: Client, useCase: string ) {
        if (useCase === 'ready') {
            this.updateBotCommands();
        } else {
            this.loadCommandDirs();
            this.loadCommandActions();
        }
    }

    // Method to return the command actions created.
    getCommandActions() {
        return this.commandsActions;
    }

    async updateBotCommands() {
        // Loads local and app commands to it's attributes.
        this.loadCommandDirs();
        this.loadCommandActions();
        this.loadAppCommands();

        // Logic to update - delete and create local commands to app commands.
        const activeCommands = this.commandsActions.filter(v => v.enabled);
        const loadResult = await this.appCommandManager.set(activeCommands);
        console.log(`🤖 ${loadResult.size} commands has been loaded.`);
    }

    // Method to load command actions inside of each command module.
    loadCommandActions() {
        this.commandsActions = this.commandDirectories.map((v) => {
            try {
                const commandModule = require(join(__dirname, v)).default;
                const commandInstance: CommandAction = new commandModule();
                return commandInstance;
            } catch (error) {
                console.log(`⚠️ The ${v} command couldn't be loaded. ⚠️`);
            }
        })
    }

    // Method to load command directories.
    loadCommandDirs() {
        this.commandDirectories = readdirSync(__dirname, { withFileTypes: true })
            .filter(dir => dir.isDirectory())
            .map(dir => dir.name);
    }

    // Method to load Application Command Manager.
    loadAppCommands() {
        this.appCommandManager = this.client.application.commands;
    }
}