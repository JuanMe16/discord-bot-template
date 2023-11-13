import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from "discord.js";

// Command Action father class to be inherited to each one of the bot commands.
export class CommandAction extends SlashCommandBuilder {
    enabled: boolean;

    constructor() {
        super();
    }

    // Method to execute bot logic.
    async execute(client: Client, interaction: ChatInputCommandInteraction): Promise<any> { }

    // Method to configurate if command is available or not.
    protected setEnable(enable: boolean) {
        this.enabled = enable;
    }
}