const { Inhibitor } = require('discord-gyro');


const {getUser, newUser} = require('../utilities/dbUtils');

class checkUser extends Inhibitor {
    constructor() {
        super('checkUser', {
            reason: 'Try Again!',
            type: 'post',
            priority: 4
        })
    }
async exec(message, command) {
    if (message.author.bot) return;
    if (command.categoryID == "settings") return;
    const auth = message.author;
    const guildMember = await message.guild.members.fetch(auth.id);
    //console.log(guildMember)
   // console.log(await  getUser("id", auth.id))
    if (await getUser("id", auth.id) == null) return newUser(guildMember);

}
}

module.exports = checkUser;