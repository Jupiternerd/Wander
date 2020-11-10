const Discord = require("discord.js")
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
            const webhook = await webhooks.find(w => w.name == name);
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
       // const guild = channel.guild;
        let helper = await this.checkHelper()
        if (helper == null) {

            return channel.createWebhook(name, this.avatar);
           /* const data = {
                id: name,
                type: "webhook"
            }
            const newIntegration = await guild.createIntegration(data, "Create character webhooks for error delivery and logging purposes.")
            console.log(newIntegration)
            */
            
        } else {
            return helper;
        }
    
  
        

    }
    /**
     * Delete Helper 
     */

    deleteHelper() {



    }
    
}

module.exports = webhooks;