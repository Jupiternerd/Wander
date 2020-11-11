/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");

const Jaiyu = require('../../utilities/errors.js')
const Lisa = require("../../utilities/log.js")



class deHook extends Command {
    constructor() {
        super('dehook', {
            aliases: ['dehook'],
            category: 'admin',
            ratelimit: 1,
            description: "Run me to \'dehook\' all webhooks from your channels. (Admin Privilege needed to see all channels)",
        })
    }

    async exec(message) {
        const guild = message.guild;
        //console.log(guild.channels.cache)

        try {
            guild.channels.cache.forEach((channels) =>{
  
                try {
                    
                    if (channels.type == 'text') {
                        
                        Jaiyu.delete(channels);
                        //const LisaH = new Lisa(channels)
                        Lisa.delete(channels);
                    }
                } catch (e) {
                    console.log('(dehook.js) Cannot delete hook!');
                }

            })
        
            
        } catch (e) {
            console.log(e);

        } finally {
            message.channel.send("Successfully dehooked Jaiyu and Lisa hooks! Feel free to remove me or change the server settings!");
        }



    } 
};

module.exports = deHook;