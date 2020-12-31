const { Inhibitor } = require('discord-gyro');

const Menu = require('../utilities/menus');
const {checkGuildInit} = require('../utilities/dbUtils');
const {MessageEmbed} = require('discord.js');

class checkInit extends Inhibitor {
    constructor() {
        super('checkInit', {
            reason: 'Doesn\'t have enough perms!',
            type: 'post',
            priority: 2
        })
    }
async exec(message, command) {

const footer = this.client.footer;

const notInitEmbed = new MessageEmbed({
    title: "Something feels wrong...",
    description: "😔 Server not setup yet, click the reaction to start. (Or -setup) [needs to be admin]\nYou will have only access to basic commands and not the fun ones.",
    footer: footer,
    color: "#facd49"
}).setTimestamp()
if (command.categoryID == "settings" || "wai") return;
if (await checkGuildInit(message.guild.id) == false) { 
   const data = [
        {
            name : "notInit",
            content: notInitEmbed,
        }];

        let menu = new Menu(message.channel, message.author.id, data, this.client.menuTime);

        menu.start();

        menu.on('pageDelete', async paged => {
            if (paged.name == "notInit") {
                const setUp = this.client.commandHandler.modules.find(commandName => commandName.id == "setUp");
                const commandRouter = await this.client.inhibitorHandler.test('post', message, setUp);
                if (commandRouter == null) this.client.commandHandler.runCommand(message, setUp);
            }
            
        })

    return command.categoryID; 

    
}
}

}


module.exports = checkInit;