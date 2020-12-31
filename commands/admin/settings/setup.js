/**
 * @author : Wai
 * @module Command
 */

const { Command } = require("discord-gyro");
const { MessageEmbed } = require("discord.js");
const Log = require('../../../utilities/log.js');
const Jaiyu = require('../../../utilities/errors.js')
const EventEmitter = require('events');
const Menu = require('../../../utilities/menus.js');


class setUp extends Command {
    constructor() {
        super('setUp', {
            aliases: ['setup', 'start', 'init', 'initialize'],
            category: 'settings',
            ratelimit: 1,
            coolDown: 600000,
            description: "I run first! You can re-run me anytime to fix errors, etc..",
        })
    }

    /**
     * Start of any server, all commands (through inhibitor) will check if the guild is initialized or not.
     * @param {*} message 
     */
 
    async exec(message) {
        const menuTime = this.client.menuTime;
        const mainColor = this.client.mainColor;
        const secondaryColor = this.client.secondaryColor;
        const footer = this.client.footer;
        const chan = message.channel;
        const handler = this.handler;

        const setLog = handler.modules.find(commandName => commandName.id == "setMain");
        const setMain = handler.modules.find(commandName => commandName.id == "setLog");
        const setChar = handler.modules.find(commandName => commandName.id == "setChar");

        const commandRouter = await this.client.inhibitorHandler.test('post', message, setLog);
        const cEmbed = new MessageEmbed();


        

    } 
};

module.exports = setUp;