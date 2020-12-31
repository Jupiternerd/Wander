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
            client.user.setPresence({ activity: { name: savedData.name,type: savedData.type}, status: savedData.status });
            //client.user.setAvatar(savedData.art.botArt);

          }
        async function logItems (client, savedData) {
            client.mainColor = savedData.mainColor;
            client.secondaryColor = savedData.secondaryColor;

            client.invite = savedData.invite;
            client.invite_Server = savedData.invite_Server;

            client.helpArt = savedData.art.helpArt;

            client.errorArt = savedData.art.errorArt;
            client.logArt = savedData.art.logArt;

            client.footer = {
                text: savedData.footer,
                iconURL: client.user.avatarURL(),
                proxyIconURL: client.user.avatarURL()
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
                            art: {
                                botArt: "https://i.pinimg.com/originals/79/ec/9e/79ec9e31573a0d3c7e02c81cf1b5f4e7.jpg",
                                helpArt: null,
                                logArt: "https://preview.redd.it/8oooephio8i51.jpg?auto=webp&s=622cd7836e3272f285aafa5b4daf91a30cd440a4",
                                errorArt: "https://static.wikia.nocookie.net/gensin-impact/images/1/1e/Character_Razor_Portrait.png/revision/latest?cb=20200916151017"


                            },
                            invite: "https://discord.com/api/oauth2/authorize?client_id=771256644092297216&permissions=8&scope=bot",
                            invite_Server: "https://discord.gg/SkfMJjuK",
                            prefix: this.client.commandHandler.prefix,
                            mainColor: "8f71ff",
                            secondaryColor: "82acff"
                        });
                        const savedData = await Db.save();
                        setPresence(this.client, savedData);
                        logItems(this.client, savedData);

                        
                    } else {


                    setPresence(this.client, res);
                    logItems(this.client, res);
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
