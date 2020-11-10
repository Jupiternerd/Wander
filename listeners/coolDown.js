const { Listener } = require('discord-gyro');
const Jaiyu = require('./../utilities/errors.js')
class coolDown extends Listener {
    constructor() {
        super('coolDown', {
          emitter: 'commandHandler',
          event: 'cooldown'
        });
    }

    async exec(message) {
      Jaiyu.send(message.channel, `Too fast! Let us catch up, ${message.author}.`)
        

}
}
module.exports = coolDown;
