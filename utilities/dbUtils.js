/**
 * @author Wai
 * @module Utility_Module
 */

const mongoose = require('mongoose');
const serverdb = require(".././models/servers.js");
const botdb = require(".././models/bots.js");
const backgrounds = require('../models/backgrounds.js');
const chars = require('../models/chars.js');
const users = require('../models/users.js');
class dbUtils {

    /**
     * login - Logins the bot to MongoDB using the arguments called from app.js
     * @arg uri - Super Secret connection information.
     */
    static async login(uri) {
        let serverRetries = 0; //Variable to count the retries.
    
        async function connect(){
            await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}) //Connects to a MongoDB Database running on the cloud.
            
        }
        
        try { //Run function of connect.
            console.time("Database_Connection_Time"); //Starts Timer.
            await connect();
            
        } catch (e) { //If error, retry the function and add 1 to the retries.
            console.error('Database login failed... retrying.');
            serverRetries++; 
    
            await connect();
    
        } finally { //Finally log the results.
            console.log(`DB connection successful after ${serverRetries > 0 ? serverRetries : "no"} ${serverRetries == 1 ? "retry" : "retries"}, time elasped:`); //Logs the retries and the time elasped.
            console.timeEnd("Database_Connection_Time"); //Stops timer.
        }
    
    }
    /**
     *checkCharacterUse - gets the database and see if the server uses a certain setting
     */
    static async checkCharacterUse(id) {
        try {
            const server = await serverdb.findOne({_id: id});
            return server.settings.useCharacters;

            
        }catch (e) {
            console.log("(dbUtils : CheckCharacterUse()) Are you sure we are in a db?")
        }

    }
    static async getGuild(id) {
        try {
            const server = await serverdb.findOne({_id: id});
            return server;
            
        }catch (e) {
            console.log("(dbUtils : getGuild()) Are you sure we are in a db?")
        }

    }
    /**
     * @notice will be deprecated
     * @param {} id 
     */
    static async checkGuildInit(id) {
        try {
            const server = await serverdb.findOne({_id: id});
            return server.initialized;
            
        }catch (e) {
            console.log("(dbUtils : checkGuidInit()) Are you sure we are in a db?")
        }

    }
        /**
     * @notice will be deprecated
     * @param {} id 
     */

    static async checkGuildMain(id, channelid) {
        try {
            const server = await serverdb.findOne({_id: id});
            const mainChans = server.settings.mainChannel;
            if (!mainChans.includes(channelid)) return false;
            return true;
            
        }catch (e) {
            console.log("(dbUtils : checkGuidMain()) Are you sure we are in a db?")
        }

    }

    static async checkGuildLog(id, channelid) {
        try {
            const server = await serverdb.findOne({_id: id});
            const logChan = server.settings.logChannel;
            if (!logChan == channelid) return false;
            return true;
            
        }catch (e) {
            console.log("(dbUtils : checkGuidLog()) Are you sure we are in a db?")
        }
    }

    static async getArt() {
        try {
            const bot = await botdb.findOne({_id: 2})
            return bot.art; 

        } catch (e) {
            console.log("(dbUtils : getArt()) Are you sure we are in a db?")
        }

    }
    static async getAsset(type, id) {
        console.log(type + " : " + id)
  
        try {
            if (type == "bg") {
                //console.log(await backgrounds.findOne({_id: id}) + " ---------------------------------BBB");
                const retValue = await backgrounds.findOne({name: id});
                if (!retValue)  {
                    console.log("wtf")
                }
               // console.log(retValue)

                return retValue.link;
                
            } else {
               // return await chars.findOne({_id: id});
            }


        } catch (e) {
            console.log(e);
            console.log("(dbUtils : getAssets()) Are you sure we are in a db?")
        }

    }
    static async getUser(type, id) {
        
  
        try {
            return (type == "id" ? await users.findOne({_id: id}) : users.findOne({name: id}));


        } catch (e) {
            console.log(e);
            console.log("(dbUtils : getUser()) Are you sure we are in a db?")
        }

    }
    static async newUser(uObj) {

        try {
            const db = new users({
                _id: uObj.id || null,
                name: uObj.user.username || null,
                identifier: uObj.discriminator,
                settings: {
                    mode: null,
                    fastRead: false,
                    themeID: 0
                },
                metrics: {
                    premium: false,
                    currency: 0,
                    level: 0,
                    inventory: {
                      packs: 0
                  },
                    exp: 0,
                    milestones: [],
                    badges: []
                    
                },
                content: {
                    novels: [],
                    characters: [{
                        id: 0,
                        nickname: null,
                        suffix: null,
                        relationship: 0,
                        metrics: {
                            love: 5,
                            friendly: 10,
                            hate: 0,
                            themeID: 0,
                            level: 0,
                            xp: 0
                        },
                        
                        badges: []

                    }, ],
              
                }
              })

            return db.save();
            


        } catch (e) {
            console.log(e);
            console.log("(dbUtils : newUser()) Are you sure we are in a db?")
        }

    }



}
module.exports = dbUtils;


