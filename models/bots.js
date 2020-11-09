/**
 * @author Wai
 * @module mongoose_model
 */

const mongoose = require("mongoose");
const botdataSchema = mongoose.Schema({
  _id: Number,
  name: String,
  discordID: String,
  inInteract: Boolean,
  invite: String,
  invite_Server: String,
  footer: String,
  art: String,
  mainColor: String,
  secondaryColor: String,
  status: String,
  type: String,
  activity: String,
  eventID: String,
  description: String,
  prefix: String
});
module.exports = mongoose.model("botdatas", botdataSchema);
