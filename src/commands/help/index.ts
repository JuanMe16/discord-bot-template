import { ChatInputCommandInteraction, Client } from "discord.js";
import { CommandAction } from "../../classes";

export default class HelpCommand extends CommandAction {

    constructor() {
        super();
        this.setName("help");
        this.setDescription("Help command to list all available bot commands.");
        this.setEnable(true);
    }

    async execute(_: Client, interaction: ChatInputCommandInteraction) {
        return await interaction.reply({ content: 'Hi!', ephemeral: true });
    }

}