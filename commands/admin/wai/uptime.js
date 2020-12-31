/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { uptime} = require("bot-utils");


class upTime extends Command {
    constructor() {
        super('uptime', {
            aliases: ['uptime', 'time'],
            category: 'wai',
            ratelimit: 1,
            cooldown: 1800000,
            description: "::)) y u here",
        })
    }

    async exec(message) {
        const channel = message.channel;
        await channel.send(`I have been up for : ` + uptime())




    } 
};

module.exports = upTime;