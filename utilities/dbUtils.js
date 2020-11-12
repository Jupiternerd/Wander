/**
 * @author Wai
 * @module Utility_Module
 */

const mongoose = require('mongoose');
const serverdb = require(".././models/servers.js");
const botdb = require(".././models/bots.js");
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
    static async checkGuildInit(id) {
        try {
            const server = await serverdb.findOne({_id: id});
            return server.initialized;
            
        }catch (e) {
            console.log("(dbUtils : checkGuidInit()) Are you sure we are in a db?")
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



}
module.exports = dbUtils;


