class webhooks {
    /**
     * 
     * @param {*} options options for helpers, leave empty for default helper. 
     */

    constructor(channel, options) {
        this.channel = channel;
        this.name = options.name;
        this.avatar = options.avatar;
        this.id; 


    }

    createHelper(channel, name) {

 

    }

    deleteHelper() {


    }

    async checkHelper(channel, name) {
        try {

            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.find(w => w.name == name);
            return (webhook ? true : false);
    
            } catch (e) {
    
                console.error("(webhooks) Cannot verify webhook's existance.");
    
            } 
    }
    
}