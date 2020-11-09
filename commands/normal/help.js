/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");

const Menu = require('../../utilities/menus.js');

class help extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            category: 'standard',
            ratelimit: 1,
            description: "need something?",


        })
    }
 
    async exec(message) {
        /*
        let i = 0;
        console.log(this.handler.categories);

        this.handler.categories.forEach(async hm => {

            
          
            console.log(`HM ` + hm)
              i++
              helpString += `\n${i} • **${hm.id}** • \`\`${hm.description}\`\`` 
          })
        */


        let pageOne = new MessageEmbed();
        pageOne.setTitle("Help Page One!")
        let pageTwo = new MessageEmbed();
        pageTwo.setTitle("Help Page Two!")
        

        const menus = [{

            /**@TODO STUFF HERE*/
            
        }]



 
        

 
        let helpInfo = new Menu(message.channel, message.author.id, menus, this.client.menuTime);

        helpInfo.start()



       
    } 

    

    


}

module.exports = help;