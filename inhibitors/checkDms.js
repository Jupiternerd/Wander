const { Inhibitor } = require('discord-gyro');
const {MessageEmbed} = require('discord.js');
class checkDMs extends Inhibitor {
    constructor() {
        super('checkDMs', {
            reason: 'Doesn\'t have enough perms!',
            type: 'pre',
            priority: 1
        })
    }
async exec(message) {
if( message.channel.type == "dm" && (!message.author.bot)) {
    console.log(message.channel.type)
const footer = this.client.footer;

const notInGuild = new MessageEmbed({
    title: "Something feels... wrong",
    description: "You know, yet you tried... I will leave my invite link here though just in case.",
    footer: footer,
    color: "#facd49"
}).setTimestamp()
message.channel.send(this.client.invite);

return message.channel.send(notInGuild); 

} 

}


}


module.exports = checkDMs;