/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");
const utils = "../../utilities/";
const {checkGuildInit} = require(utils + 'dbUtils.js')
const Menu = require(utils + 'menus.js');

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
        const guild = message.guild;
        const footer = this.client.footer;

        const notInitEmbed = new MessageEmbed({
            title: "Something feels wrong...",
            description: "😔 Server not setup yet, click the reaction to start. (Or -setup)",
            footer: footer,
            color: "#facd49"
        })
        const helpOne = new MessageEmbed({
            title: "YES",
            description: "TES",
            footer: footer,
            color: "#facd49"
        })

        var data = [];
        
        
        try {
            if (await checkGuildInit(guild.id)) {
                data = [
                    {
                        name : "helpOne",
                        content: helpOne
                }]


            } else {

                data = [
                    {
                        name : "notInit",
                        content: notInitEmbed,
                    }]
                

            }

        } catch(e) {
            console.log(e);
        }

        let menu = new Menu(message.channel, message.author.id, data, this.client.menuTime);

        menu.start();

        menu.on('pageDelete', async paged => {
            if (paged.name == "notInit") {
                const setUp = this.client.commandHandler.modules.find(commandName => commandName.id == "setUp");
                const commandRouter = await this.client.inhibitorHandler.test('post', message, setUp);
                if (commandRouter == null) this.client.commandHandler.runCommand(message, setUp);

            }
            
        })
        
    } 

    

    


}

module.exports = help;