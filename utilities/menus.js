const emojiNumbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]


class page {
    
    constructor(unoPage, index) {
        this.embed = unoPage.body;
        /**@TODO 
         * 
         * Try to parse the reactions's functions in here so no weird things like 'd3lete' gets by. Only numbers 0 - 9, delete and some other helper functions.
         */
        
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
    }
    

    /**
     * Reacts emojis.
     * @param {Array} emojis, emojis.
     * @param {Object} msg, message.
     * 
     */

    reactTo(msg, emojis) {
        for (var emjs in emojis) {

            //console.log(typeof Number.parseInt(emjs) == "number");
            
            typeof Number.parseInt(emjs) == "number" ? emjs = emojiNumbers[emjs] : emjs = emjs;

            msg.react(emjs);


        };

    };

    static setPage(msg) {
        try {

        msg.edit();

        } catch (e) {

            console.log(e);

        } finally {

            /**
             * @TODO : 
             */

        }

    };


    /**
     * Creates a menu depending on the arguments it's either 1-9 or some other emojis.
     * 
     */
    async startMenu() { 

        //console.log(this.pages)
        const embedMessage = await this.chan.send(this.pages[0]);
       // embedMessage.react(emojiNumbers[0])
        this.reactTo(embedMessage, this.pages[0].reactions);

        


       // const thisPage = new page(this.menus);

        
        //const embedMessage = await this.chan.send(thisPage.embed);

        
    };

    static awaitReactions() {
       
       this.reactionCollector = this.menus.createReactionCollector((reactions, user) => user.id === this.user.id, { time: this.ms })

    }





    
}



module.exports = menuModule;