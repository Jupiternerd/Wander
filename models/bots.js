const mongoose = require("mongoose");
const botdataSchema = mongoose.Schema({
  _id: Number,
  name: String,
  discordID: String,
  inInteract: Boolean,
  status: String,
  type: String,
  activity: String,
  eventID: String,
  description: String,
  prefix: String
});
module.exports = mongoose.model("botdatas", botdataSchema);
