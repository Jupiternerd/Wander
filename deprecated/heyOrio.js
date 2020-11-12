const { Listener } = require('discord-gyro');
const Jaiyu = require('../utilities/errors.js')
const events = require('events');
/*
class listenEvent {
    constructor(options) {

        this.channel = options.channel,
        this.userToListen = options.author,
        
    }
}
*/
class heyOrio extends Listener {
    constructor() {
        super('heyOrio', {
          emitter: 'client',
          event: 'message'
        });
    }

    listen(message, listenFor = 'both') {
        if (listenFor == 'both') message.channel.send("cannot find both")
        console.log(`cannot find ${listenFor}`)
        
    }

    async exec(message) {
        
        const content = message.content;
        if (content.match(/hey (ori)/gi)) {
            const parsed = content.replace(/hey (orio)|(ori)/gi).split(" ")
            parsed.shift();
            console.log(parsed);

            
            

            const handler = this.client.commandHandler;

            

            parsed.forEach(async (each) => {
                //console.log(handler.modules)
                console.log(each)
                
                    const hm = handler.modules.find((comName) => comName.aliases == each);
                    //console.log(hm)
                    if (!hm) return this.listen(message, 'command');
                    handler.handleDirectCommand(message, content.replace(each, ""), hm)


                    //parsed.argumentGenerator()
                    //const commandRouter = await this.client.inhibitorHandler.test('post', message, hm);

                    //if (commandRouter == null) return handler.runCommand(message, hm);       
                           
            })
            



        }
     
        

}
}
module.exports = heyOrio;