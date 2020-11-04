//@author: Wai
const {CommandoClient} = require('discord.js-commando');
const path = require('path');

class customClient extends CommandoClient {
    constructor(ownerID, invite) { //Uses OwnerID argument called from app.js
        super({
            commandPrefix: '-',
            invite: invite,
            ownerID: ownerID
        })
        this.registry
           .registerDefaultTypes()
           .registerGroups([ 
               ['special', 'Bot owner, etc..'], //Reserved for bot admins.
               ['admin', 'Server owners, Admins'], //Reserved for server admins.
               ['vip', 'VIP commands'], //Reserved for $$$.
               ['normal', 'Regular commands.']]) //Normal.
           .registerDefaultGroups()
	       .registerDefaultCommands({ // Disabling the built in commands so I can build on a 'clean' plate.
               help: false,
               ping: false,
               prefix: false,
               eval: false
             //enable: false, @TODO: REMOVE Later
             //disable: false, @TODO: REMOVE Later 
            })
	        .registerCommandsIn(path.join(__dirname, 'commands'));
    }

    /**
     * login - Logins the bot using the arguments called from app.js
     * @arg token - Super Secret Bot Token.
     */

    async login(token) {
        await super.login(token); 
    }


}

module.exports = customClient;

