const { Listener } = require('discord-gyro');
const serverdb = require('./../models/servers.js');

class guildDelete extends Listener {
    constructor() {
        super('guildDelete', {
          emitter: 'client',
          event: 'guildDelete'
        });
    }

    async exec(guild) {
            try {
            await serverdb.findByIdAndDelete({_id: guild.id});

            } catch (e) {
                console.log ("DB Error: Could not delete data from server..")

            }
        


}
}
module.exports = guildDelete;