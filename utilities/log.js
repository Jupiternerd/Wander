/**
 * @Author Wai
 * @TODO Convert this into an akairo module.
 */

const helper = require("./webhooks.js");
const serverdb = require(".././models/servers.js")
class Log {
    constructor(chan, options) {
        this.options = options;
        this.chan = chan;
        this.emj = options.emj || "📚";
        this.logType = options.logType || "Unknown LogType.. (You shouldn\'t see this..)";
        this.logContent = options.logContent || "Unknown Content of Log! (You shouldn\'t see this..)";

    }
 
     async send(client, introduce = false) {
        const server = await serverdb.findOne({_id: this.chan.guild.id});
        if(server.settings.userCharacters) {
            const options = {
                name: "(Orio) Lisa",
                avatar: client.logArt
            }
            const LisaHelper = new helper(this.chan, options);
            const Lisa = await LisaHelper.createHelper();
    
            if (introduce == true)  { 
                let chan = this.chan;
                let logcontent = this.logContent;
    
                this.chan.startTyping();
                setTimeout(function() {chan.stopTyping(); Lisa.send(logcontent);}, Math.floor(Math.random() * Math.floor(7000)));
                return;
    
            }
                    
            try {
                Lisa.send(`${this.emj} ${this.logType} **>>** *${this.logContent}*`);
    
    
            } catch (e) {
    
                console.log(e);
        
         }
        } else {
            this.chan.send(`${this.emj} ${this.logType} **>>** *${this.logContent}*`);
        }
     }//end Send method

     static async delete() {
        const options = {
            name: "(Orio) Lisa",
        }
        const LisaHelper = new helper(this.chan, options);
        try {
            LisaHelper.delete();
        } catch (e) {
            console.log(e);
            console.log("(errors.js) Something went wrong deleting Lisa.")
        }

}
}//end class

module.exports = Log;