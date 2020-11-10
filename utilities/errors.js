/**
 * @Author Wai
 * @TODO Convert this into an akairo module.
 */

const helper = require("./webhooks.js");

class Error {

    static async send(chan, msg, introduce = false) {
        
        const options = {
            name: "(Orio) Jaiyu",
        }
        const JaiyuHelper = new helper(chan, options);
 

        const Jaiyu = await JaiyuHelper.createHelper();
        if (introduce == true) { 
             chan.startTyping();
             setTimeout(function() {chan.stopTyping(); Jaiyu.send(msg);}, Math.floor(Math.random() * Math.floor(3000)));
             return;

        }
        
        try {
            Jaiyu.send(`Err **>** *${msg}*`);

        } catch (e) {

            console.log(e);
    
     }
}
    
}

module.exports = Error;