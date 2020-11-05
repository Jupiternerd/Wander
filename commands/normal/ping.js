/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const menuModule = require('../../utilities/menus.js');
class ping extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            category: 'normal',
            ratelimit: 1,
            description: "pong!",
            version: 1.0

        })
    }
 
    exec(message) {
        console.log('Pong!');
        message.channel.send('Pong!');

        let pingEmbeduno = new MessageEmbed()
        .setTitle("baby21")
        .addField("yes1", "no1", true)
        .setColor("#FFFFF")
        
        let pingEmbeddos = new MessageEmbed()
        .setTitle("baby2")
        .addField("yes2", "no2", true)
        
        let pingEmbedthres = new MessageEmbed()
        .setTitle("baby3")
        .addField("yes3", "no3", true)

        

        let ping = new menuModule(message, [
            {
        
            body: pingEmbeduno,
            reactions: {
                '❤️': { point: 1}, //1 [Page Number] OR //forwards, backwards
                '💡': { point: 2},
                '🍎': { point: 3}   

        }
            
        }, {

            body: pingEmbeddos

        }, {

            body: pingEmbedthres,
            reactions: {
                '🍎' : { delete: true }
            }

        }
    ]);

    ping.startMenu();
       
    } 

    

    


}

module.exports = ping