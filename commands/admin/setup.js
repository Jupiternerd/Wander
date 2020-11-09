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

        setTimeout(function() {message.delete()}, menuTime); 

        let embedOne = new MessageEmbed({
            title: "🕐 This won\'t take long. I only need to let you know something.",
            description: "Ready? Click the thing below..",
            color: mainColor,
            footer: footer
        })

        let embedTwo = new MessageEmbed({
            title: "1. The bot uses **2** webhooks!",
            description: "I don\'t travel alone, I have two companions.\nJaiyu-chan **>** sends errors.\nLisa-chan **>>** logs errors.",
            color: mainColor,
            footer: footer
        })
        let embedThree = new MessageEmbed({
            title: "2. TEST!",
            description: "TEST",
            color: mainColor,
            footer: footer
        })
        let embedFour = new MessageEmbed({
            title: "3. TEST!",
            description: "TEST",
            color: mainColor,
            footer: footer
        })

        const pages = [
           {
               name: "start",
               content: embedOne,

               reactions: {
                   '[1]' : 'one',
                   '[2]' : 'two',
                   '[3]' : 'three'
               }
        }, {

               name: "one",
               content: embedTwo,

               reactions: {
                   '[1]' : 'one',
                   '[2]' : 'two',
                   '[3]' : 'three'
               }

        }, {

               name: "two",
               content: embedThree,

               reactions: {
                   '[1]' : 'one',
                   '[2]' : 'two',
                   '[3]' : 'three'
               }
        }, {
               name: "two",
               content: embedFour,

               reactions: {
                   '[1]' : 'one',
                   '[2]' : 'two',
                   '[3]' : 'three'
               }
            
        }]
        let menu = new Menu(message.channel, message.author.id, pages, menuTime);

        menu.start();

        menu.on('pageChange', paged => {
            if (paged.name === "one") {
                let Lisa = new Log(message.channel, {
                    logContent: "Sniff.."
                })

                Lisa.send(true)
                Jaiyu.send(message.channel, "Hello!", true);

            }
            
        })

        






    } 
};

module.exports = setUp;