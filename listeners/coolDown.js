const { Listener } = require('discord-gyro');

class cooldown extends Listener {
    constructor() {
        super('cooldown', {
          emitter: 'commandHandler',
          event: 'cooldown'
        });
    }

    async exec(message) {
        return message.channel.send(`${message.author}, slow down!`)
    }
}

module.exports = cooldown;