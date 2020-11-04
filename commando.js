const {CommandoClient} = require('discord.js-commando');



class customClient extends CommandoClient {
    constructor(ownerID) {
        super({
            commandPrefix: '-',
            invite: 'https://discord.com/api/oauth2/authorize?client_id=771256644092297216&permissions=536345328&scope=bot',
            ownerID: ownerID
        })
    }

login(token) {
    super.login(token);
}
}




module.exports = customClient;

