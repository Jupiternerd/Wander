/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");

const Jaiyu = require('../../utilities/errors.js')
const Lisa = require("../../utilities/log.js")

class botinfo extends Command {
    constructor() {
        super('botinfo', {
            aliases: ['botinfo', 'info', 'credits'],
            category: 'standard',
            ratelimit: 1,
            description: "Information about Orio.",
        })
    }

    async exec(message) {

        if (message.author.id = this.client.ownerID) {
            
        }

        

        

    };
        

     
}

module.exports = botinfo;