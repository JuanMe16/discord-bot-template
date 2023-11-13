import { Client, ChatInputCommandInteraction } from 'discord.js';
import { CommandAction, EventSocket } from '../../classes';
import { CommandHandler } from '../../commands';

export default class InteractionCreateSocket extends EventSocket {
    private commands: CommandAction[] = [];

    constructor(protected client: Client, protected eventName: string) {
        super(client, eventName);

        // create CommandHandler and get available commands.
        const interactionCommands = new CommandHandler(this.client, 'interaction');
        this.commands = interactionCommands.getCommandActions();
    };

    eventSocket() {
        this.client.on(this.eventName, async (interaction: ChatInputCommandInteraction) => {
            if (!interaction.isChatInputCommand()) return;

            const interactionCommand = this.commands.find((v) => {
                if (v.name === interaction.commandName) {
                    return v;
                }
            });
            if (interactionCommand) return await interactionCommand.execute(this.client, interaction);
            await interaction.reply({ content: 'Este commando no existe', ephemeral: true });
        });
    }

}