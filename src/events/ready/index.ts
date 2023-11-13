import { EventSocket } from '../../classes';
import { CommandHandler } from '../../commands';

export default class ReadySocket extends EventSocket {

    eventSocket() {
        this.client.on(this.eventName, () => {
            console.log(`${this.client.user.tag} is Connected.`);
            new CommandHandler(this.client, 'ready');
        });
    }

}