/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");

const serverdb = require("../../../models/servers");

const Jaiyu = require('../../../utilities/errors.js')


class setLog extends Command {
    constructor() {
        super('setLog', {
            aliases: ['setLogchannel', 'setLog', 'log'],
            category: 'settings',
            ratelimit: 1,
            description: "Set up a log channels.",
        })
    }

    /**
     * Start of any server, all commands (through inhibitor) will check if the guild is initialized or not.
     * @param {*} message 
     */
    *args() {

        const channel = yield ({type: 'channelMention', prompt:
        {
            start: message => `${message.author}, Mention a channel to set as log.`,
            retry: message => `${message.author}, Mention a channel to set as log • \`\`cancel\`\` to cancel.`,
            retries: 3,
            

        }
        });
  
        return {channel};
  
  }
 
    async exec(message, args) {

        const chan = message.channel;
        if (!args.channel) return Jaiyu.send(chan, "Cannot get the channel!, rerun please.", this.client);

        try {
            const sdb = await serverdb.findOne({_id: message.guild.id});

            sdb.settings.logChannel = args.channel.id;
            sdb.save();

        } catch (e) {
            console.log("(setLogChannel) Something went wrong while saving the data into db.")

        } finally {
            return message.channel.send("All Good! It should be set to " + args.channel.name +" now.")

        }


    } 
};

module.exports = setLog;