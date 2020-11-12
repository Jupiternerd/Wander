/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");

const Jaiyu = require('../../utilities/errors.js')
const Lisa = require("../../utilities/log.js")



class unHook extends Command {
    constructor() {
        super('unhook', {
            aliases: ['unhook'],
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
                        Lisa.delete(channels);
                    }
                } catch (e) {
                    console.log('(dehook.js) Cannot delete hook!');
                }

            })
        
            
        } catch (e) {
            console.log(e);

        } finally {
            message.channel.send("Successfully unhooked Jaiyu and Lisa hooks! Feel free to remove me or change the server settings!");
        }



    } 
};

module.exports = unHook;