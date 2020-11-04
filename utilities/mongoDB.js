const mongoose = require('mongoose');
    /**
     * login - Logins the bot to MongoDB using the arguments called from app.js
     * @arg uri - Super Secret connection information.
     */
module.exports.login = async function login(uri) {
    let serverRetries = 0; //Variable to count the retries.

    function connect(){
         mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}) //Connects to a MongoDB Database running on the cloud.
        }
    
    try { //Run function of connect.
        console.time("Database_Connection_Time"); //Starts Timer.
        await connect();
        
    } catch (e) { //If error, retry the function and add 1 to the retries.
        console.log('Database login failed... retrying.');
        serverRetries++; 

        await connect();

    } finally { //Finally log the results.
        console.log(`DB connection successful after [${serverRetries}] retries, time elasped:`); //Logs the retries and the time elasped.
        console.timeEnd("Database_Connection_Time"); //Stops timer.
    }

}

