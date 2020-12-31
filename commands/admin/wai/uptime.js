/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { upTime } = require("bot-utils");


class uptime extends Command {
    constructor() {
        super('uptime', {
            aliases: ['uptime', 'time', 'usage', 'cpu'],
            category: 'wai',
            ratelimit: 1,
            cooldown: 1800000,
            description: "::)) y u here",
        })
    }

    async exec(message) {
        const channel = message.channel;
        await channel.send(`I have been up for : ` + upTime())
        channel.send(`Currently using : ` + cpuUsage())




    } 
};

module.exports = uptime;