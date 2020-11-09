class webhooks {
    /**
     * 
     * @param {*} options options for helpers, leave empty for default helper. 
     */

    constructor(channel, options) {
        this.channel = channel;
        this.name = options.name;
        this.avatar = options.avatar || undefined;
        this.id; 


    }
    /**
     * Checks webhook js and see if there is any.
     * @param {*} channel 
     * @param {*} name 
     */
    async checkHelper(channel = this.channel, name = this.name) {
        try {

            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.find(w => w.name == name);
            return (webhook ? webhook : null);
            } catch (e) {
    
                console.error("(webhooks) Cannot verify webhook's existance.");
            } 
    }
    /**
     * Creates a helper after checking in with checkHelper
     * @param {Object} channel, Discord channel object
     * @param {String} name, String name
     * @returns {Object} Webhook Object.
     */

    async createHelper(channel = this.channel, name = this.name) {
        let helper = await this.checkHelper()
        if (helper == null) {
            return channel.createWebhook(name, this.avatar);
        } else {
            return;
        }
    
  
        

    }

    deleteHelper() {



    }
    
}

module.exports = webhooks;