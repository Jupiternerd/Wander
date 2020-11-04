const orioClient = require('./commando.js');
const connectToServer = require('./utilities/mongoDB.js'); 
require('dotenv').config();
    /**
     * startup : Makes an "orio" client using args from enviromental variables. 
     * Then, logins both the bot and the MongoDB.
     */

async function startUp() {
    orio = new orioClient(process.env.ownerID, process.env.invite); //create new instance of orioClient with ownerID from dotenv.
    await orio.login(process.env.token); 
    await connectToServer.login(process.env.uri) 
}


startUp();



