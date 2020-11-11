/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");

const Jaiyu = require('../../utilities/errors.js');
const Lisa = require('../../utilities/log.js')


class say extends Command {
    constructor() {
        super('say', {
            aliases: ['say'],
            category: 'botOwner',
            ratelimit: 1,
            ownerOnly: true,

            description: "say",


        })
    }
    *args() {
        const type = yield { type: ["Orio", "Jaiyu", "Lisa"], default: "Orio" };
        const msg = yield { type: String, match: 'content',prompt: {
            start: "What do you want me to say? This shouldn\'t even have to appear. Are you even the bot owner? Weak. also use quotes",
            retry: "Braaah, restart!"
        }}
       
        return {type, msg};

    }
 
    async exec(message, args) {
        try {
        const quoted = args.msg.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");
        switch(args.type) {
            case "Jaiyu":
                Jaiyu.send(message.channel, quoted, this.client, true)
            break;
            case "Lisa":
                const LisaL = new Lisa(message.channel, {
                    logContent: quoted
                })
                LisaL.send(this.client, true);

            break;
            default:
                message.channel.send(quoted);

            break;

        }
    } catch (e) {
        Error.send(message.channel, "No good. Try again.");
    }

         
 
       
    } 

}

module.exports = say;