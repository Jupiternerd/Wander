//@author: Wai
const {AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler} = require('discord-akairo');


class customClient extends AkairoClient {
    constructor (ownerID) {
        super({
            ownerID: ownerID,
            blockBots: true
        }, {
            disableEveryone: true
        });
    this.commandHandler = new CommandHandler(this, {
          directory: './commands/',
          prefix: '-',
          handleEdits: false,
          commandUtil: false, 
          defaultCooldown: 5000, //5 seconds
          argumentDefaults: {
            prompt: {
                timeout: 'TIMED OUT',
                ended: 'PROMPT ENDED',
                cancel: 'PROMPT CANCELLED',
                retries: 4,
                time: 10000
            }
        }
            });
    

    this.inhibitorHandler = new InhibitorHandler(this, {
        directory: './inhibitors/'
    });
    
    this.listenerHandler = new ListenerHandler(this, {
        directory: './listeners/'
    });

    this.listenerHandler.setEmitters({
        commandHandler: this.commandHandler,
        inhibitorHandler: this.inhibitorHandler,
        listenerHandler: this.listenerHandler,
    }).loadAll();
    
    this.commandHandler.loadAll()
    .useInhibitorHandler(this.inhibitorHandler)
    .useListenerHandler(this.listenerHandler);
    this.inhibitorHandler.loadAll();
    

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

