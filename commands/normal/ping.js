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
            category: 'standard',
            ratelimit: 1,
            description: "pong!",


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
            body: "ayo",
            reactions: {

                '1': 'backward', //1 [Page Number] OR //forwards, backwards
                '2': 'delete',
                '3': 'forward'

        }
            
        }, {
            body: "ayo2",
            reactions: {

                '1': 'backward', //1 [Page Number] OR //forwards, backwards
                '2': 'delete',
                '3': 'forward'

        }
            
        }, {
            body: "ayo3",
            reactions: {

                '1': 'backward', //1 [Page Number] OR //forwards, backwards
                '2': 'delete',
                '3': 'forward'

        }
            
        }, {
            body: "ayo4",
            reactions: {

                '1': 'backward', //1 [Page Number] OR //forwards, backwards
                '2': 'delete',
                '3': 'forward'

        }
            
        }
        
    ], message.author ,18000);

    ping.startMenu();
       
    } 

    

    


}

module.exports = ping