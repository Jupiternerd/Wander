/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");

const serverdb = require('../../../models/servers.js');



class setChar extends Command {
    constructor() {
        super('setChar', {
            aliases: ['setcharacter', 'setchar', 'char', 'character'],
            category: 'settings',
            ratelimit: 1,
            description: "Set whether the bot uses characters or not.",
        })
    }

    /**
     * Start of any server, all commands (through inhibitor) will check if the guild is initialized or not.
     * @param {*} message 
     */

 
    *args() {

        const bool = yield ({type: ['yes', 'no'], prompt:
        {
            start: message => `${message.author}, Do you want to use character webhooks? \`\`yes\`\` or \`\`no\`\``,
            retry: message => `${message.author}, Do you want to use character webhooks? \`\`yes\`\` or \`\`no\`\` • \`\`cancel\`\` to cancel.`,
            retries: 3,

        }, 
        
        
        });
        
  
        return {bool};
  
  }
 
    async exec(message, args) {
        const gradient = {
            yes: true,
            no: false
        }


        try {
            const sdb = await serverdb.findOne({_id: message.guild.id});
           /**@TODO make a new array of [0] and [1] and merge it with settings.mainChannel instead of this hack 
            * DONE
           */
            
            
            sdb.settings.useCharacters = gradient[args.bool];
            sdb.save();

        } catch (e) {
            console.log("(setUseCharacter) Something went wrong while saving the data into db.")

        } finally {
           return message.channel.send("All Good!")

        }

        





    } 
};

module.exports = setChar;