/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");
const utils = "../../utilities/";
const {checkGuildInit, getArt} = require(utils + 'dbUtils.js')
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
    *args() {

        const secondA = yield ({type: 'commandAlias', prompt:
        {
            start: message => `${message.author}, what command was it? [Retry or type \`\`cancel\`\` to stop.]`,
            retry: message => `♻️ ${message.author}, I don\'t think I can find that command..\nTry typing it again here. • \`\`cancel\`\` to cancel.`,
            retries: 3,
            optional: true
        }
        });
  
        return {secondA};
  
  }
 
    async exec(message, args) {
        const guild = message.guild;
        const footer = this.client.footer;
        const mainColor = this.client.mainColor;
        const guildInit = await checkGuildInit(guild.id);
        const image = await getArt()

        const ciD = args.secondA;
        var data = [];
        
        const notInitEmbed = new MessageEmbed({
            title: "Something feels wrong...",
            description: "😔 Server not setup yet, click the reaction to start. (Or -setup)",
            footer: footer,
            color: "#facd49"
        }).setTimestamp()
        
        //This one is for specific help page.
        if (ciD) {
            var helpS = new MessageEmbed()
            .setColor(mainColor) //Setting color for the information.
            .setTimestamp()
            .setTitle(`${ciD.id.toUpperCase()}\'s Information.`)
            .setDescription(`🔖 Aliases • \`\`${ciD.aliases}\`\`\n🏷️ Description • \`\`${ciD.description}\`\`\n👑 Permission Tier • \`\`${ciD.categoryID}\`\`\n⌛ Ratelimit • \`\`${ciD.ratelimit}\`\`\n✏️ Editable • \`\`${ciD.editable}\`\`\nOwner only? • \`\`${ciD.ownerOnly}\`\`\n`)
            .setFooter(`💬 Default Cooldown • ${this.handler.defaultCooldown/1000}s`);
             return message.channel.send(helpS);
            }

        try {
            const handler = this.handler;
            /**
             * Fills in a string of commands.
             * @param {*} typeOfCommand 
             * @returns string of commands
             */
            function fill(typeOfCommand) {
                let string = '';
               // console.log(handler)
               const hm = handler.categories.find((catName) => catName == typeOfCommand)
               if (!hm) return string;
 
                hm.forEach((commands) => {
                    string += ` \`\`${commands.id}\`\`, `
                    
                
                })

                
                return string;

            }
            if (guildInit) {
                 //Sets up for the handler.modules property.

                let helpString = `**__[List of Commands]__**\n**🔮 Core •**${fill('core')}\n**🤖 Normal •** ${fill('standard')}\n**💴 Economy •** ${fill('economy')}\n**🎉 Fun •**${fill('fun')}`
                let helpStringTwo = `**__[Admin Commands]__**\n**👑 Admin Only •** ${fill('admin')}`;
                const foot = `\n• *${handler.prefix}help [**command**] for more information.*`;

                

                data = [
                    {
                        name : "helpOne",
                        content: helpString.concat(foot),

                        reactions: {
                            '[1]': 'helpOne',
                            '[2]': 'helpTwo'

                        }
                        
                }, {
                    name : "helpTwo",
                    content: helpStringTwo.concat(foot),

                    reactions: {
                        '[1]': 'helpOne',
                        '[2]': 'helpTwo'

                    }
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
        if(guildInit) message.channel.send(image.helpArt);

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