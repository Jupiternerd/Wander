/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const Error  = require("../../utilities/errors.js")

class test extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
            category: 'testing',
            ownerOnly: true,
            ratelimit: 1,
            description: "pong!",


        })
    }
 
    async exec(message) {

        Error.send(message.channel, "yhes")



       
    } 

    

    


}

module.exports = test;