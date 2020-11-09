const { Listener } = require('discord-gyro');
const botdb = require('./../models/bots.js');
class ready extends Listener {
    constructor() {
        super('ready', {
          emitter: 'client',
          event: 'ready'
        });
    }

    async exec() {
        async function setPresence (client, savedData) {
            client.user.setPresence({ activity: { name: savedData.name,type: savedData.type}, status: savedData.status })

          }
        async function logItems (client, savedData) {
            client.mainColor = savedData.mainColor;
            client.secondaryColor = savedData.secondaryColor;

            client.invite = savedData.invite;
            client.invite_Server = savedData.invite_Server;

            client.footer = {
                text: savedData.footer,
                iconURL: client.user.avatarURL,
                proxyIconURL: client.user.avatarURL
            }
        }
        try {
            botdb.findOne({
                _id: 2 // 2 is Orio. #1 is my other bot.
              }, async (err, res) => {

                if (err) console.log(err);
                try {

                    if(!res) {
                        const Db = new botdb({
                            _id: 2,
                            name: "Orio",
                            discordID: this.client.user.id,
                            pause: false,
                            inInteract: false,
                            status: "dnd",
                            type: "LISTENING",
                            activity: "music.",
                            eventID: null,
                            description: "Ayaa",
                            footer: "Test Footer",
                            invite: "https://discord.com/api/oauth2/authorize?client_id=771256644092297216&permissions=267911120&scope=bot",
                            invite_Server: "https://discord.gg/jcs96PTKkw",
                            prefix: this.client.commandHandler.prefix,
                            mainColor: "8f71ff",
                            secondaryColor: "82acff"
                        });
                        const savedData = await Db.save()
                        setPresence(this.client, savedData)
                        logItems(this.client, savedData)

                        
                    } else {


                    setPresence(this.client, res)
                    logItems(this.client, res)
                    }
                } catch (e) {

                    console.log(e);

                }


              })
            
            

        } catch (e) {
            console.error("Somthing went wrong grabbing data from mongoDB.. [initBotSettings]");
            
        } finally {

            console.log("Got Data from DB and stored it in bot!")
            
        }
    }
}

module.exports = ready;
