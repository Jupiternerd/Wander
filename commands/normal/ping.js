const { Command } = require("discord-akairo");
const botSchema = require('../../models/bots.js')
class ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            group: 'normal',
            memberName: 'ping',
            description: 'Ping Pong.',
            v: 0.1

        })
    }
    run(message) {
        console.log(botSchema.findOne({_id: 2}));
    }


}

module.exports = ping