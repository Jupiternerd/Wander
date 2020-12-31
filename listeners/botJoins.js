const { Listener } = require('discord-gyro');


const serverdb = require('./../models/servers.js');
const NovelEngine = require('../utilities/novelEngine.js');

const novelJSON = require('../assets/novels/beginning.json');
class guildCreate extends Listener {
    constructor() {
        super('guildCreate', {
          emitter: 'client',
          event: 'guildCreate'
        });
    }

    async exec(guild) {
        const reg = /gen/;
        const guildChan = await guild.channels.cache.find(channel => channel.name.match(reg));
        const chan = await ( guildChan ? guildChan : guild.channels.cache.find(channel => channel.id === guild.rulesChannelID));
        /**
         * try {
         * send visual novel of them landing in a field
         * } catch (e) {
         * } finally {
         * THE CODE BELOW V V
         * }
         */

        try {
            const requiredPerms = ["ADMINISTRATOR", "MANAGE_SERVER"];
            const yesNo = ['yes', 'no', 'stop'];
            const listOfBotArr = [/bot/, /comm/, /cmd/, /cmmd/];
            let control;
            

            await chan.send(`\>\>\> [ If you want to skip (not recommended if you are familiar with the bot) type **stop**]`)



            await chan.send(`A new ${guild.large ? 'city!' : 'small village!'} Do you run this place?`);
            control = await chan.send(`\>\>\> [yes] or [no]`);
            
            const collector = chan.createMessageCollector((message) => {
                let auth = message.author;
                let uObj = guild.members.cache.get(auth.id);

               //console.log(uObj.hasPermission(requiredPerms) && yesNo.includes(message.content))
               return uObj.hasPermission(requiredPerms) && yesNo.includes(message.content) && !auth.bot, { time: this.client.menuTime }
            });

            collector.on('collect', (message) => {
                if (message.content.toLowerCase() == 'stop') {
                    chan.send("Heard you loud, stopping formalities. Good luck!");


                    return stopCollector.stop()

                }
            })
            
            collector.once('collect', (message) => {
                let novel = new NovelEngine(novelJSON, {}, chan, message.author, this.client);
                let str;
                str = `${message.content.includes('y') ? 'Great! Lets start.' : 'Damn, its fine, lets start anyways.'} Heres a novel scroll, it should be opening up.. now?`
    
                chan.send(str);
                control.delete();

                novel.once('ready', () => {
                    novel.start();

                })

                novel.once('end', async () => {
                    //magic here
  

                })

                
            })
            
 
            
        } catch (e) {
            console.log(e);
            
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
                        mainChannel: ['', ''],
                        logChannel: '',
                        language: "en",
                        userblacklist: []
                      },
                    metrics: {
                      members: guild.memberCount,
                      region: guild.region,
                      large: guild.large
                    },
                    webhooksLeftToday: 2,
                    ownerID: guild.ownerID,
                    premium: (guild.id == "792643998485446697"  ? true : false), // proj x orio is only premium one
                    main: (guild.id == "758356626615959572" || "792643998485446697" ? true : false)

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