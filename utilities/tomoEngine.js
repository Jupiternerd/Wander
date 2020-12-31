/**
 * @author | me
 */


const { EventEmitter } = require("events");
const {createCanvas, loadImage} = require("canvas");
const {MessageAttachment} = require("discord.js");
const dbUtils = require("./dbUtils");
class tomoEngine extends EventEmitter {
    /**
     * 
     * @param {*} characterObj | JSON FILE
     * @param {*} options | Obj
     * @param {*} channel | channel obj
     * @param {*} user | user obj
     * @param {*} client | client obj
     */
    constructor(characterJson, options, channel, user, client) {
        super();
        this.client = client || null;
        this.file = characterJson; //JSON FILE
        this.characterName = this.file.name || null;
        this.timeout = options.timeout || this.client.menuTime;
        this.channel = channel;
        this.user = user;

        


        this.author = this.file.author || "N/A";
        this.artist = this.file.artist || "N/A";

        this.foot = { text: "Orio Tomo Engine" + (this.author == this.artist ? `| [author & artist • ${this.artist}]`: `| [author • ${this.author}]/ [artist • ${this.artist}]`), 
        iconURL: client.user.avatarURL(),
        proxyIconURL: client.user.avatarURL() 
    }
        
        this.load();

    }
    
    async load() {
        this.emit("loading", [this.characterName, this.user.id]); //emit when we start loading so the cmd can handle on in its own;

        try {
            //Load character art?
            this.userObject = await dbUtils.getUser("id", this.user.id);
            /**@here Just finish the thing for UI elements like loading images etc.. */


        } catch(e) {
            return this.emit("error", e);

        } finally {
            return this.emit("ready", [this.characterName, this.userObject])
        }
    }
    

    async start() {
      this.channel.send("works");
      const canvas = createCanvas(200, 200);
      const ctx = canvas.getContext('2d');
      // Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)
 
// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()
loadImage('https://preview.redd.it/58bi512n8e021.jpg?width=811&format=pjpg&auto=webp&s=6426703852fc595f51a73c5470bd8b7e3362920b').then((img) => {
    ctx.drawImage(img, 50, 0, 70, 70)
})
//console.log(canvas.toDataURL())
const attachmentT = new MessageAttachment(canvas.toBuffer(), `xd.png`);
this.channel.send(attachmentT);




    }
}

module.exports = tomoEngine;