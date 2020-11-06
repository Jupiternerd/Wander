const orioClient = require('./akairo.js');
const connectToServer = require('./utilities/dbUtils.js'); 
require('dotenv').config();
/**
 * startup : Makes an "orio" client using args from enviromental variables. 
 * Then, logins both the bot and the MongoDB.
 */
async function startUp() {
    console.log("Starting Bot...");
    console.time("Bot_Total_Load_Time");

    orio = new orioClient(process.env.OWNERID); //create new instance of orioClient with ownerID from dotenv.
    await connectToServer.login(process.env.URI);
    await orio.login(process.env.TOKEN); 
    
    console.timeEnd("Bot_Total_Load_Time");
}


startUp();



