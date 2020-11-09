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
        const Jaiyu = await JaiyuHelper.checkHelper();

        if (!Jaiyu) JaiyuHelper.createHelper();
        if (introduce == true) return Jaiyu.send("Hello.");
        
        try {
            Jaiyu.send(`Error **>** *${msg}*`);

        } catch (e) {

            console.log(e);
    
     }
}
    
}

module.exports = Error;