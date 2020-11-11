/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");
const Log = require('../../utilities/log.js');
const Jaiyu = require('../../utilities/errors.js')

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

    /**
     * Start of any server, all commands (through inhibitor) will check if the guild is initialized or not.
     * @param {*} message 
     */
 
    async exec(message) {
        const menuTime = this.client.menuTime;
        const mainColor = this.client.mainColor;
        const secondaryColor = this.client.secondaryColor;
        const footer = this.client.footer;

        



        
       /* let menu = new Menu(message.channel, message.author.id, pages, menuTime);

        menu.start();

        menu.on('pageChange', paged => {
            if (paged.name === "one") {
                let Lisa = new Log(message.channel, {
                    logContent: "Sniff.."
                })

                Lisa.send("t")
                Jaiyu.send(message.channel, "Hello!", true);

            }
            
        })
        */








    } 
};

module.exports = setUp;