const orioClient = require('./commando.js');
const connectToServer = require('./utilities/mongoConnect.js');
require('dotenv').config();

orio = new orioClient(process.env.ownerID);
orio.login(process.env.token);



