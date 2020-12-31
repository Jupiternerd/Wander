const { Listener } = require('discord-gyro');

class commandDone extends Listener {
    constructor() {
        super('commandDone', {
          emitter: 'commandHandler',
          event: 'commandFinished'
        });
    }

    async exec(message, command, args, returnValue) {
        if (command.categoryID == "settings" && (command.id !== "setUp")) { 
            try {
                message.delete(); 
                returnValue.delete();

            } catch(e) {
                //console.log("(commandDone.js) Cannot delete message or returnValue.");
                console.log(e);

            }
        }
    
    return;
        

}
}
module.exports = commandDone;