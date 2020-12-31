const { Listener } = require('discord-gyro');

class commandInPrompt extends Listener {
    constructor() {
        super('commandInPrompt', {
          emitter: 'commandHandler',
          event: 'inPrompt'
        });
    }

    async exec(message) {
       return true;
    

}
}
module.exports = commandInPrompt;