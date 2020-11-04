const orioClient = require('./akairo.js');
const connectToServer = require('./utilities/mongoDB.js'); 
require('dotenv').config();
/**
 * startup : Makes an "orio" client using args from enviromental variables. 
 * Then, logins both the bot and the MongoDB.
 */
async function startUp() {
    console.log("Starting Bot..");
    console.time("Bot_Load_Time");
    orio = new orioClient(process.env.ownerID); //create new instance of orioClient with ownerID from dotenv.
    await orio.login(process.env.token); 
    await connectToServer.login(process.env.uri);
    console.timeEnd("Bot_Load_Time");
}


startUp();



