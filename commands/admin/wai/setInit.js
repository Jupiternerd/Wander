/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");

const util = require("../../../utilities/dbUtils.js")


class setReady extends Command {
    constructor() {
        super('setReady', {
            aliases: ['ready', 'setReady', 'setinit',],
            category: 'wai',
            ratelimit: 1,
            cooldown: 1800000,
            description: "::)) y u here",
        })
    }

    async exec(message) {
        const guild = message.guild;
        //console.log(guild.channels.cache)

        try {
            const dbGuild = await util.getGuild(guild.id);
            dbGuild.initialized = true;
            dbGuild.save();

        } catch (e) {
            console.log(e);

        } finally {
            message.channel.send("Set this guild as initizlied. Hav fun.");
        }



    } 
};

module.exports = setReady;