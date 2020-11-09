/**
 * @Author Wai
 * @TODO Convert this into an akairo module.
 */

const helper = require("./webhooks.js");

class Error {

    static async send(chan, msg) {
        
        try {
            const options = {
                name: "(Orio) Jaiyu",
            }
            const JaiyuHelper = new helper(chan, options);
            const Jaiyu = await JaiyuHelper.checkHelper();

            if (!Jaiyu) JaiyuHelper.createHelper();
            Jaiyu.send(`Error **>** *${msg}*`);

            

            /*
            if (await JaiyuHelper.checkHelper()) {
                JaiyuHelper.send(`Error **>** *${msg}*`);
    
            } else {
                JaiyuHelper.createHelper();
            
            }
        */


        } catch (e) {
    
     }
}
    
}

module.exports = Error;