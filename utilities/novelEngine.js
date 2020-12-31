/**
 * Uses things I learned from Jowsey's menus.js to make this. thx bb girl muah.
 */

/**
 * @TODO | This is very very basic early ver, only coding this much so I can push this bot out with the scope I had initially planned for
 * release. I will add notes to where I need to refactor and why when I start adding more functions.
 */

const { MessageEmbed } = require("discord.js");
const { EventEmitter } = require("events");
const {getAsset} = require("./dbUtils");

class slide {
    constructor(single) {
        this.lock = single.content.lock || false;
        this.destination = single.destination;
        this.type = single.type;
        this.color = single.content.color;

        switch (single.type) {
            case 0:
                this.bg = single.content.bg;
                this.messageContent = single.content.msg_content || null;
               //this.characterArt = null;
            break;

            case 'g_end':
                this.bg = single.content.bg;
                this.messageContent = single.content.msg_content || null;
                /**lol */
                

            break;

            case 'b_end':
                this.bg = single.content.bg;
                this.messageContent = single.content.msg_content || null;
                 /**lol */

            break;
            /**
             * @todo | add more
             */
        }

    }
}


class NovelEngine extends EventEmitter{
    /**
     * 
     * @param {*} jsonFileParsed | json file 
     * @param {*} options | options
     * @param {*} channel |channel class
     * @param {*} userid |userid
     * @param {*} client |client class
     */

    constructor (jsonFileParsed, options, channel, user, client) {
        super();
        if (!jsonFileParsed) return console.error("No multiples found");
        this.client = client;
        this.file = jsonFileParsed;
        this.timeout = options.timeout || this.client.menuTime;
        this.channel = channel;
        this.user = user;
        this.userid = this.user.id;

        this.author = this.file.author || "N/A";
        this.artist = this.file.artist || "N/A";

        this.foot = { text: "Orio Novel Engine " + (this.author == this.artist ? `| [author & artist • ${this.artist}]`: `| [author • ${this.author}]/ [artist • ${this.artist}]`), 
        iconURL: client.user.avatarURL(),
        proxyIconURL: client.user.avatarURL() 
    }


        this.slides = [];
        let i = 0;

        
        this.file.multiples.forEach(async (singles) => {
            singles.content.bg = await getAsset("bg", singles.content.bg);
            this.slides.push(new slide(singles));
       
            i++;
            if (i == this.file.multiples.length) this.emit("ready", i);
            
        
    
        })
       // console.log("First?")
        
        
    }

    async react() {
        this.emit("react", this.curSlide);
        switch(this.curSlide.type) {

            case 0: //ONLY Pictures and words so you can go forward and backwards only. no more. 
                await this.frameTwo.react("⏮️");
                await this.frameTwo.react("⏹️");
                this.frameTwo.react("⏭️");

            /**
             * @todo: add more than one type. 
             */

        }
   
        
    }

    async setSlide(setN = 0) {
        this.emit("change", this.curSlide);
        this.index = (setN < 0 ? 0 : setN);
        
        this.curSlide = this.slides[this.index];

        //let foot = `${this.client.footer + (this.author == this.artist ? `[author/artist] • ${this.artist}`: `[author • ${this.author}]/ [artist • ${this.artist}]`)}`;

        let msgToSend = `\>\>\> [ ${this.curSlide.messageContent} ]`;
        let embed = new MessageEmbed({
            image: { url: this.curSlide.bg },
            color: this.curSlide.color,
            author: {
                name: `[${this.user.username}\'s window]`,
                icon_url: this.user.avatarURL()
    
            },
            footer: this.foot
        })
        
        if(!this.frameOne) this.frameOne = await this.channel.send(embed);
            
        
        if(!this.frameTwo) {
            this.frameTwo = await this.channel.send(msgToSend);
            await this.react(); 
        }

        this.frameOne.edit(embed) 
        this.frameTwo.edit(msgToSend) 
        


        if (this.curSlide.type == ("g_end" || "b_end") ) this.end();
        

    }
    end() {
        this.emit("end", this.curSlide);
        if (this.reactionCollector) {
            this.reactionCollector.stop();
            this.frameTwo.reactions.removeAll()
          }
        this.channel.send(this.curSlide.type + "_END");       

    }

    awaitReactions () {

        this.reactionCollector = this.frameTwo.createReactionCollector((reaction, user) => user.id === this.userid, { time: this.timeout })
        //let sameReactions;
        
        this.reactionCollector.on('collect', (reaction, user) => {
            reaction.users.remove(user);

           // console.log(reaction)


            switch(reaction._emoji.name) {
                           /**
            * @TODO | This is bad. very bad, if its any other type other than 0 (only can move forward, backwards) then when a person 
            * adds reaction onto the message then it will actually activate. massive risk if we use this in final.
            */
                case "⏮️":

                    this.setSlide(this.index - 1); 

                break;

                case "⏹️":
                    this.end(); 

                break;

                case "⏭️":
                    this.setSlide(this.index + 1);

                break;

                default:

                break;


            }


        })
      }


    async start() {

        /*
        this.index = 0;
        this.curSlide = this.slides[this.index];
     
    
    
      let embed = new MessageEmbed({
        image: { url: this.curSlide.bg },
        color: this.curSlide.color,
        author: {
            name: `[${this.user.username}\'s window]`,
            icon_url: this.user.avatarURL()

        },
        footer: this.foot
    })
    
      let startingString = `\>\>\> [ ${this.curSlide.messageContent} ]`;
       
        this.frameOne = await this.channel.send(embed);
        this.frameTwo = await this.channel.send(startingString);
        await this.react();
        this.awaitReactions();
        */
       await this.setSlide();
       this.awaitReactions();


  
        
    }
    
    /**
     * @todo | almost the same as the menus, addReactions, etc.
     */



}

module.exports = NovelEngine;