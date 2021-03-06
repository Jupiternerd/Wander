const { Inhibitor } = require('discord-gyro');
const error = require('../utilities/errors.js');

class cRouter extends Inhibitor {
    constructor() {
        super('cRouter', {
            reason: 'Doesn\'t have enough perms!',
            type: 'post',
            priority: 5
        })
    }
async exec(message, command) {
    const auth = message.author;
    const guildMember = await message.guild.members.fetch(auth.id);


switch(command.categoryID) {

  case "wai":

  if (auth.id !== this.client.ownerID) {
    error.send(message.channel, 'You need to be the bot owner to use this!', this.client);
    return command.categoryID; 
  }
  break;

  case "serverOwner":

  if (auth.id !== message.guild.ownerID) {
    error.send(message.channel, 'You need to be the guild owner to use this command!', this.client);
    return command.categoryID; 

  }
  break;

  case "admin":


  if (!guildMember.hasPermission("ADMINISTRATOR"))  { 
      error.send(message.channel, 'You need to be an admin of this server to use this command.', this.client);
      return command.categoryID; 

    }

  break;

  case "settings": 


  if (!guildMember.hasPermission("ADMINISTRATOR"))  { 
      error.send(message.channel, 'You need to be an admin of this server to use this command.', this.client);
      return command.categoryID; 

    }

  break;

  default:
      /**@TODO Finish writing this, make a way for servers to add blacklisted users. */
  

  break;

}





    }
}

module.exports = cRouter;