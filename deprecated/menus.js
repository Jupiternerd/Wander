/**
 * Original Author : Jowsey, forked and edited for my use.
 */

const emojiNumbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]


class page {
    
    constructor(unoPage, index) {
        this.embed = unoPage.body;
        /**@TODO 
         * 
         * Try to parse the reactions's functions in here so no weird things like 'd3lete' gets by. Only numbers 0 - 9, delete and some other helper functions.
         */
        for (const aReaction in unoPage.reactions) { //Iterates through reactions.
            if (!isNaN(aReaction)) { //sees a number, in string or without string. 
              if(parseInt(aReaction) > 9) console.error("Only 0-9 reactions allowed."); //if the number is over 9 then we throw err.
              unoPage.reactions[emojiNumbers[aReaction]] = unoPage.reactions[aReaction]; //replaces old key with the new one from emojiNumbers[aReactions].
              delete unoPage.reactions[aReaction]; //deletes the old key.
            }
          } 
        this.reactions = unoPage.reactions || {'🆗': 'delete' };

        this.index = index;

    };

};


class menuModule {
    
    constructor(message, menus, user, ms) {

        /** @type {object} */
        this.chan = message.channel;
        
        /**@type {object} */
        this.auth = message.author.id;

        /**@type {menu obj} */
        this.menus = menus;

        /**@type {Discord UserObj} */
        this.user = user || message.author;

        /**@type {Number} */
        this.ms = ms || 60000; /**@DEFAULT is 1 mins! (60000 ms = 1 mins) */

        let index = 0;

        this.pages = [];
   
        this.menus.forEach( (menuItem) => {
            this.pages.push(new page(menuItem, index));
            index++;

        })

        //console.log(this.pages);

        this.currentPage = this.pages[0]
    }
    

    /**
     * Reacts emojis.
     * @param {Array} emojis, emojis.
     * @param {Object} msg, message.
     * 
     */

    reactTo() {
        for (const emjs in this.currentPage.reactions) {

            this.menu.react(emjs);


        };

    };
    delete () {
        if (this.reactionCollector) this.reactionCollector.stop()
       // console.log(this.menu)
        if (this.menu) this.menu.delete()
      }

    clearReactions () {
        if (this.menu) {
          this.menu.reactions.removeAll().catch(e => {
              console.log(e);
          })
        }
      }

    stop () {
        if (this.reactionCollector) {
          this.reactionCollector.stop();
          this.clearReactions();
        }
    }
      

    setPage(page = 0) {

        try {
            console.log(page);
            
            this.pageIndex = page
            this.currentPage = this.pages[this.pageIndex]
            //console.log(this.currentPage)
            this.menu.edit(this.currentPage.embed)
        
            this.clearReactions()
            this.reactionCollector.stop()
            this.reactTo()
            this.awaitReactions()

        } catch (e) {

            console.log(e);

        } finally {

            /**
             * @TODO : 
             */

        }

    };
   /** 
     * Original @author jowsey
     * Re edited it for custom use.
    */
    

   async awaitReactions() {
    this.reactionCollector = this.menu.createReactionCollector((reaction, user) => user.id === this.user.id, { time: this.ms })
    this.reactionCollector.on('collect', reaction => {
       //console.log(reaction.emoji.name)
      
      const reactionName = Object.prototype.hasOwnProperty.call(this.currentPage.reactions, reaction.emoji.name) ? reaction.emoji.name
        : Object.prototype.hasOwnProperty.call(this.currentPage.reactions, reaction.emoji.id) ? reaction.emoji.id : null
        console.log(this.currentPage.reactions[reactionName])
        if (reactionName) {
        switch (this.currentPage.reactions[reactionName]) {
          case 'first':
            this.setPage(0)
            break
          case 'last':
            this.setPage(this.pages.length - 1)
            break
          case 'backward':
            if (this.pageIndex > 0) {
              this.setPage(this.pageIndex - 1)
            }
            break
          case 'forward':
              
            if (this.pageIndex < this.pages.length - 1) {
                
              this.setPage(this.pageIndex + 1)
            }
            break
          case 'stop':
            this.stop()
            break
          case 'delete':
         
            this.delete()
            break
          default:
       
            this.setPage(this.pages.findIndex(p => p.index === this.currentPage.reactions[reactionName]))
            break
        }
      }
    })
    this.reactionCollector.on('end', () => {
    this.clearReactions();
     
    })
}

    /**
     * Creates a menu depending on the arguments it's either 1-9 or some other emojis.
     * 
     */
    async startMenu() { 

        //console.log(this.pages)
        try {
            let fMsg = await this.chan.send(this.currentPage.embed);
            this.pageIndex = 0;

            this.menu = fMsg;
            this.reactTo();
            this.awaitReactions();
        } catch (e) {
            console.log(e);
        }

       // embedMessage.react(emojiNumbers[0])
        

        

        


       // const thisPage = new page(this.menus);

        
        //const embedMessage = await this.chan.send(thisPage.embed);

        
    };





 


    
}



module.exports = menuModule;