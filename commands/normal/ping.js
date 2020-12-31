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
        

        const serverPing = `🛰️ **Server** **>** *${pingingmsg.createdAt - message.createdAt}* ms. \n🗄️ **Discord-API** **>** *${Math.round(this.client.ws.ping)}* ms.`;
        const pongEmbed = new MessageEmbed({
            title: "What does this all mean?",
            description: "🛰️ • Your Ping. (This Message *minus* from your initial command) \n🗄️ • Bot to Discord Servers.",
            color: this.client.mainColor,
            footer: this.client.footer
        }).setTimestamp();

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

        pingInfo.once("pageDelete", () => {
            pingingmsg.delete()

        })
       
    } 

}

module.exports = ping