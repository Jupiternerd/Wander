/**
 * @Author Wai
 * @TODO Convert this into an akairo module.
 */

const helper = require("./webhooks.js");

class Log {
    constructor(chan, options) {
        this.options = options;
        this.chan = chan;
        this.emj = options.emj || "📚";
        this.logType = options.logType || "Unknown LogType.. (You shouldn\'t see this..)";
        this.logContent = options.logContent || "Unknown Content of Log! (You shouldn\'t see this..)";

    }
 
     async send(introduce = false) {
        const options = {
            name: "(Orio) Lisa",
        }
        const LisaHelper = new helper(this.chan, options);
        const Lisa = await LisaHelper.createHelper();

        if (introduce == true)  { 

            this.chan.startTyping();
            setTimeout(function() {this.chan.stopTyping(); Lisa.send(this.logcontent);}, Math.floor(Math.random() * Math.floor(7000)));
            return;

        }
                
        try {
            Lisa.send(`${this.emj} ${this.logType} **>>** *${this.logContent}*`);


        } catch (e) {

            console.log(e);
    
     }
}
    
}

module.exports = Log;