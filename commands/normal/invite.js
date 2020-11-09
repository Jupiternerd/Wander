/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");

const Menu = require('../../utilities/menus.js');

class invite extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite', 'inv'],
            category: 'standard',
            ratelimit: 1,
            description: "Sure! Invite me or join me..",


        })
    }
 
    async exec(message) {

        const mainColor = this.client.mainColor;
        const secondaryColor = this.client.secondaryColor;
        const footer = this.client.footer;

        const invitelinkBot = `🔗 [Help me get lost in Discord!](${this.client.invite}) (click)`;
    
        const invitelinkServ = `🔗 [I don\'t always invite people to my home, come in if you need help.](${this.client.invite_Server}) (click)`;



        const inviteMe = new MessageEmbed({
            title: `💜 Take me on an adventure?`,
            description: invitelinkBot,
            color: mainColor,
            footer: footer
        });
        const inviteYou = new MessageEmbed({
            title: `🏠 Back to my place?`,
            description: invitelinkServ,
            color: secondaryColor,
            footer: footer
        });
  
        

        let invite = new Menu(message.channel, message.author.id, [
            {
                name: "inviteMe",
                content: inviteMe,

                reactions: {
                    '💜' : 'inviteMe',
                    '🏠' : 'inviteYou'
                }


            
            }, {
                name: "inviteYou",
                content: inviteYou,

                reactions: {
                    '💜' : 'inviteMe',
                    '🏠' : 'inviteYou'
                }

            }
    ], this.client.menuTime);

        invite.start()

    }     


}

module.exports = invite;