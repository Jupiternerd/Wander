/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");

const menuModule = require('../../utilities/menus2.js');

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

        


       
    } 

    

    


}

module.exports = ping