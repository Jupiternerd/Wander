const emojiNumbers = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]


class page {
    
    constructor(unoPage, index) {
        //this.index = index || 0;
        this.embed = unoPage.body;
        /**@TODO 
         * 
         * Try to parse the reactions's functions in here so no weird things like 'd3lete' gets by. Only numbers 0 - 9, delete and some other helper functions.
         */
        this.reactions = unoPage.reactions || {'🆗': { point: 'delete' }};

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

        /**@type {userObj} */
        this.user = user || message.author;

        /**@type {Number} */
        this.ms = ms || 60000; /**@DEFAULT is 1 mins! (60000 ms = 1 mins) */
    }
    

    /**
     * Reascts emojis
     * @param {Array} emojis, emojis
     * @param {Object} msg, message
     * 
     */

    static reactTo(emojis, msg) {

        try {

            for (emjs in emojis) {

                msg.react(emjs)
            };

        } catch (e) {

            console.log(e);
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
    startMenu() { 
        //console.log(this.menus)

        this.pages = [];

        this.menus.forEach( (menuItem) => {

            this.pages.push(new page(menuItem));
        })


       // const thisPage = new page(this.menus);

        console.log(this.pages);
        //const embedMessage = await this.chan.send(thisPage.embed);

        

        
    };

    awaitReactions() {

       // this.reactionCollector = this.menus.createReactionCollector((reaction, user) => user.id === this.userID, { time: this.ms })

    }





    
}



module.exports = menuModule;