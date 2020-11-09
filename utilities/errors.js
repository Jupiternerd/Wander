const { createHelper, checkHelper } = require("./webhooks.js");

class Error {

    send(chan, msg) {

        if (checkHelper(chan)) {

            console.log("exists?")

        } else {
            console.log(" no")
        }

        

    }
    
}

module.exports = Error;