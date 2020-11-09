/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");

const Menu = require('../../utilities/menus.js');

class ping extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'standard',
            ratelimit: 1,
            description: "pong!",


        })
    }
 
    async exec(message) {
        
        const menuTime = this.client.menuTime;

        const pingingmsg = await message.channel.send(`📡 Boing...`);
        setTimeout(function(){pingingmsg.delete()}, menuTime);

        const serverPing = `🛰️ **Server** **>** *${pingingmsg.createdAt - message.createdAt}* miliseconds. \n🗄️ **Discord-API** **>** *${Math.round(this.client.ws.ping)}* miliseconds.`;
        const pongEmbed = new MessageEmbed({
            title: "What does this all mean?",
            description: "Server **>** Your Ping. (This Message *minus* from your Command time) \n Discord-API **>** Bot *to* Discord Servers.",
            color: this.client.mainColor,
            footer: this.client.footer
        });

        let pingInfo = new Menu(message.channel, message.author.id, [
            {
                name: "serverPing",
                content: serverPing,

                reactions: {
                    '❓' : 'pogPing'
                }


            
            }, {
                name: "pogPing",
                content: pongEmbed

            }
    ], menuTime);

        pingInfo.start()

        

        




       
    } 

    

    


}

module.exports = ping