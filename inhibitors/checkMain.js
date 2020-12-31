const { Inhibitor } = require('discord-gyro');


const {checkGuildMain} = require('../utilities/dbUtils');

class checkMain extends Inhibitor {
    constructor() {
        super('checkMain', {
            reason: 'Is not in main!',
            type: 'post',
            priority: 3
        })
    }
async exec(message, command) {

    if (command.categoryID == "settings") return;
    if (!await checkGuildMain(message.guild.id, message.channel.id)) return command.id;


}

}


module.exports = checkMain;