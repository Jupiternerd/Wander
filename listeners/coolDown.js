const { Listener } = require('discord-gyro');

class coolDown extends Listener {
    constructor() {
        super('coolDown', {
          emitter: 'commandHandler',
          event: 'cooldown'
        });
    }

    async exec(message) {
        message.channel.send("Cool DOwn!")

}
}
module.exports = coolDown;
