/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const Error  = require("../../utilities/errors.js")
const Helper = require('../../utilities/webhooks.js')
const Log = require("../../utilities/log.js")
class test extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
            category: 'testing',
            ownerOnly: false,
            ratelimit: 1,
            description: "pong!",
        })
    }
 
    async exec(message) {
        //const checker = Helper.checkHelper(message.channel, '(Orio) Jaiyu');

        Error.send(message.channel, "yes", this.client, true)
        
        let Lisa = new Log(message.channel, {
            logContent: "Sniff.."
        })

        Lisa.send(this.client, true)

       
    } 

    

    


}

module.exports = test;