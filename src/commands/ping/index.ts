import { ChatInputCommandInteraction, Client } from "discord.js";
import { CommandAction } from "../../classes";

export default class PingCommand extends CommandAction {

    constructor() {
        super();
        this.setName("ping");
        this.setDescription("Ping command to check your connection to discord.");
        this.setEnable(true);
    }

    async execute(_: Client, interaction: ChatInputCommandInteraction) {
        return await interaction.reply({ content: 'Pong!', ephemeral: true });
    }

}