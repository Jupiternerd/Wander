const { Listener } = require('discord-gyro');

const serverdb = require('./../models/servers.js');

class guildCreate extends Listener {
    constructor() {
        super('guildCreate', {
          emitter: 'client',
          event: 'guildCreate'
        });
    }

    async exec(guild) {
        const guildChan = guild.channels.cache.find(channel => channel.name === "general");
        const chan = ( guildChan ? guildChan : guild.channels.cache.find(channel => channel.id === guild.rulesChannelID));


        try {
            const message = await chan.send("Thank you for inviting me! Lets start...");
            const setUp = this.client.commandHandler.modules.find(commandName => commandName.id == "setUp");
            this.client.commandHandler.runCommand(message, setUp);
            
        } catch (e) {
            console.log("(bot Joins) Cannot send a message! Now will list this server as not initialized.");
            
        };

        try {
            const serverData = await serverdb.findOne({_id: guild.id})

            if (!serverData) {
                const db = new serverdb({
                    _id: guild.id,
                    name: guild.name,
                    initialized: false,
                    settings: {
                        useCharacters: true,
                        useHeyOrio: false,
                        mainChannel: '',
                        logChannel: '',
                        language: "en",
                        userblacklist: []
                      },
                    ownerID: guild.ownerID,
                    premium: (guild.id == 758356626615959572 || 407610772060110860 ? true : false), 
                    main: (guild.id == 758356626615959572 ? true : false),
                    members: guild.memberCount,
                    region: guild.region,
                    large: guild.large
                })
                await db.save();     

            } else {
                return console.error("(bot Joins) DB Error: ");

            }
            } catch (e) {
                console.error("(bot Joins) DB Error: ")

            }


}
}
module.exports = guildCreate;