/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-akairo");
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
        let secretPage = new MessageEmbed();
         secretPage.setTitle("Secret!")

         let x = [
            {
                name: "pageUno",
                content: pageOne,

                reactions: {
                    '⏮️' : 'backward',
                    '🛑' : 'delete',
                    '▶️' : 'forward'
                }


            
            }, {
                name: "pageDos",
                content: pageTwo,

                reactions: {
                    '⏮️' : 'backward',
                    '🛑' : 'delete',
                    '▶️' : 'forward',
                    
                    '775017641847947275' : 'secret'
                }

            }, {
                name: "secret",
                content: secretPage,

                reactions: {
                    '⏮️' : 'first',
                    '🛑' : 'delete',
                }
            }
    ]

 
        

 
        let helpInfo = new Menu(message.channel, message.author.id, x, this.client.menuTime);

        helpInfo.start()



       
    } 

    

    


}

module.exports = help;