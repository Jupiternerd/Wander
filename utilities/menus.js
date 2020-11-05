const utils = require('bot-utils');
const emojiNumbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]
const { MessageEmbed } = require("discord.js");

class Page {
    /**
      * Creates a menu page.
      * @param {String} title, title
      * @param {MessageEmbed} description, description
      * @param {Number} index, count
       */
    constructor (title, description, index) {
      this.title = title;
      this.description = description;
      this.index = index;
    }
  }


class menuModule {

    constructor(message, menus) {
        this.chan = message.channel;
        this.auth = message.author.id;
        this.menus = menus;
    }
    

    /**
     * Creates a menu depending on the arguments it's either 1-9 or some other emojis.
     * @param {Array} emojis, emojis
     * @param {Object} c, message
     * 
     */

    static reactTo(emojis, msg) {

        for (emjs in emojis) {

            msg.react(emjs)

        }

    }


    /**
     * Creates a menu depending on the arguments it's either 1-9 or some other emojis.
     * @returns embed.
     */
     startMenu() { 

        this.menus.forEach((x) => {
            console.log(x); //THIS IS DEBUG CODE
            this.chan.send(x.body)
        }) 

        /**
         * TODO: make numerous embeds based on how much there were in menus.
         */
    
    }


    static async next() {

    }

    static async back() {

    }


    
}



module.exports = menuModule;