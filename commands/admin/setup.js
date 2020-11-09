/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");

const Menu = require('../../utilities/menus.js');

class setUp extends Command {
    constructor() {
        super('setUp', {
            aliases: ['setup', 'start', 'init', 'initialize'],
            category: 'admin',
            ratelimit: 1,
            description: "I run first! You can re-run me anytime to fix errors, etc..",
        })
    }
 
    async exec(message) {
        let chan = message.channel;
        let auth = message.author;

        chan.createWebhook('Helper One');
        const webhook = await chan.fetchWebhooks().find(w => w.name == "Helper One");
    
        console.log(webhook)
        webhook.send('test')
       
    } 

    

    


}

module.exports = setUp;