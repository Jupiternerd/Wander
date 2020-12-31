/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");
const utils = "../../utilities/";
const {getArt} = require(utils + 'dbUtils.js')
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
            start: message => `${message.author}, what command was it? [Retry or type \`\`cancel\`\` to stop]`,
            retry: message => `♻️ ${message.author}, I don\'t think I can find that command..\nTry typing it again here.. • \`\`cancel\`\` to cancel.`,
            retries: 3,
            optional: true
        }
        });
  
        return {secondA};
  
  }
 
    async exec(message, args) {

        const mainColor = this.client.mainColor;
        const image = await getArt()

        const ciD = args.secondA;
        var data = [];
        var menu;
        
        
        //This one is for specific help page.
        if (ciD) {
            var helpS = new MessageEmbed({
                footer: this.client.footer,
                color: mainColor
            })
            .setTimestamp()
            .setTitle(`${ciD.id.toUpperCase()}\'s Information :`)
            /*
            .addField("🔖 Aliases", `• *${ciD.aliases}*`, true)
            .addField("🏷️ Description", `• *${ciD.description}*`, true)
            .addField("👑 Permission Tier", `• ${ciD.categoryID}`, true)
            .addField("⌛ Ratelimit", `• **${ciD.ratelimit}** ${ciD.ratelimit > 1 ? `*commands` : `*command`}  per*  **${this.handler.defaultCooldown/1000}** *minutes*`, true)
            .addField("✏️ Editable", `• *${ciD.editable.toString().toUpperCase()}*`, true)
            .addField("Owner only? ", `• *${ciD.ownerOnly.toString().toUpperCase()}*`, true);
*/
            
            .setDescription(`🔖 Aliases • \`\`${ciD.aliases}\`\`\n🏷️ Description • \`\`${ciD.description}\`\`\n👑 Permission Tier • \`\`${ciD.categoryID}\`\`\n⌛ Ratelimit • \`\`${ciD.ratelimit}\`\` command${ciD.ratelimit > 1 ? 's' : ''} per \`\`${this.handler.defaultCooldown/1000}\`\` minutes\n✏️ Editable • \`\`${ciD.editable}\`\` (Can use edits to run this command?) \nBot Owner only? • \`\`${ciD.ownerOnly} \`\`\n`)
            

            data = [
                {
                    name : "helpFinal",
                    content: helpS
                    
            }]
           
            } else {

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
                 //Sets up for the handler.modules property.

                let helpString = `**__[List of Commands]__**\n**🔮 Core •**${fill('core')}\n**🤖 Normal •** ${fill('standard')}\n**💴 Economy •** ${fill('economy')}\n**🎉 Fun •**${fill('fun')}`
                let helpStringTwo = `**__[Admin Commands]__**\n**👑 Administrator •** ${fill('admin')}\n**⚙️ Settings •** ${fill('settings')}`;
                const foot = `\n• *${handler.prefix}help [**command id/alias**] for more information.*`;

                

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



        } catch(e) {
            console.log(e);
        }
        
        message.channel.send(image.helpArt);
    }

        menu = new Menu(message.channel, message.author.id, data, this.client.menuTime);

        

        menu.start();
    } 

    

    

    


}

module.exports = help;