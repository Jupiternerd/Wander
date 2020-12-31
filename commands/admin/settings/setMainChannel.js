/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");

const serverdb = require('../../../models/servers.js');



class setMain extends Command {
    constructor() {
        super('setMain', {
            aliases: ['setmainchannel', 'setmain', 'main'],
            category: 'settings',
            ratelimit: 1,
            description: "Set up some main channels.",
        })
    }

    /**
     * Start of any server, all commands (through inhibitor) will check if the guild is initialized or not.
     * @param {*} message 
     */

 
    *args() {

        const channel1 = yield ({type: 'channelMention', prompt:
        {
            start: message => `${message.author}, Mention a channel to set as one of the main channels.`,
            retry: message => `${message.author}, Mention a channel to set as one of the main channels. • \`\`cancel\`\` to cancel.`,
            retries: 3,

        }, 
        
        
        });
        const channel2 = yield ({type: 'channelMention', prompt:
        {
            start: message => `${message.author}, Mention another channel to set as main channels.`,
            retry: message => `${message.author}, Mention a channel to set as log • \`\`cancel\`\` to cancel.`,
            retries: 3,

        }, 
        
        
        });
        
  
        return {channel1, channel2};
  
  }
 
    async exec(message, args) {


        try {
            const sdb = await serverdb.findOne({_id: message.guild.id});
           /**@TODO make a new array of [0] and [1] and merge it with settings.mainChannel instead of this hack 
            * DONE
           */
            
            let replaceArray = [args.channel1.id, args.channel2.id];
            sdb.settings.mainChannel = replaceArray;
            sdb.save();

        } catch (e) {
            console.log("(setMainChannel) Something went wrong while saving the data into db.")

        } finally {
            return message.channel.send("All Good! They should be setup now.");

        }

        





    } 
};

module.exports = setMain;