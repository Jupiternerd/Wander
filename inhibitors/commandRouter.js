const { Inhibitor } = require('discord-gyro');

class cRouter extends Inhibitor {
    constructor() {
        super('cRouter', {
            reason: 'Doesn\'t have enough perms!',
            type: 'post',
            priority: 1
        })
    }
async exec(message, command) {
    if (message.guild === null) return;
    console.log('matching : ' + command.categoryID)
    const auth = message.author;

switch(command.categoryID) {

  case "botOwner":

  if (auth.id !== this.client.ownerID) return command.categoryID;
  break;

  case "serverOwner":

  if (auth.id !== message.guild.ownerID) return command.categoryID;
  break;

  case "admin":
  const guildMember = await message.guild.members.fetch(auth.id);

  if (!guildMember.hasPermission("ADMINISTRATOR")) return command.categoryID;

  break;

  default:
      /**@TODO Finish writing this, make a way for servers to add blacklisted users. */
  

  break;

}





    }
}

module.exports = cRouter;