/**
 * @Author Wai
 * @TODO Convert this into an akairo module.
 */

const helper = require("./webhooks.js");
const serverdb = require(".././models/servers.js");
const help = require("../commands/normal/help.js");
class Error { 

    static async send(chan, msg, client, introduce = false) {

        try {
        const server = await serverdb.findOne({_id: chan.guild.id});
        if (server.settings.useCharacters) {
            const options = {
                name: "(Orio) Jaiyu",
                avatar: client.errorArt
            }
            const JaiyuHelper = new helper(chan, options);
     
            const Jaiyu = await JaiyuHelper.createHelper();
            if (introduce == true) { 
                try {
                 chan.startTyping();
                 setTimeout(function() {chan.stopTyping(); Jaiyu.send(msg);}, Math.floor(Math.random() * Math.floor(3000)));
                 return;
                } catch (e) { console.log(e) }
    
            }
            
            try {
                Jaiyu.send(`Err **>** *${msg}*`);
    
            } catch (e) {
    
                console.log(e);
        
         }
         /**
          * If the db sees that 
          */
        } else {
            chan.send(`Err **>** *${msg}*`);
        }
    } catch (e) {
        console.log("(error.js) Either I cannot find db or something went wrong sending message.")
        console.log(e);
    }
}
    static async delete(chan) {
        const options = {
            name: "(Orio) Jaiyu",
        }
        const JaiyuHelper = new helper(chan, options);
        try {
            JaiyuHelper.delete();
        } catch (e) {
            console.log(e);
            console.log("(errors.js) Something went wrong deleting Jaiyu.")
        }



}
}//end class

module.exports = Error;