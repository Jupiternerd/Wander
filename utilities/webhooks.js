const guilddb = require("../models/servers.js");
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
        
            if (webhooks.size > 2) return null;
        
            if (webhook == undefined) {return null} else { return webhook;

            }
            
            
            
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
        const guild = await guilddb.findOne({_id: channel.guild.id});
        let numberOfHooksLeft = guild.webhooksLeftToday;
        if (numberOfHooksLeft <= 0) return channel;
       // const guild = channel.guild;
        let helper = await this.checkHelper()

        if (helper == null) {
            try {
                guild.webhooksLeftToday = numberOfHooksLeft - 1;
                guild.save();
                 return channel.createWebhook(name, { avatar: this.avatar });
            
            } catch (e) {
                channel.send("ERR! Jaiyu won\'t fit! [Try deleting some webhooks! Or change your server settings to not use webhooks!]")
            }
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
     * Delete
     */

    async delete() {
        
        try {
            const helper = await this.checkHelper()
            if (helper) {

                helper.delete("User Requested Deletion.")
            }
        } catch (e) {
            console.log("(webhook.js) Probably no cause of concern but webhook cannot be deleted.");
        }



    }
    
}

module.exports = webhooks;