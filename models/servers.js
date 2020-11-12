const mongoose = require("mongoose");
const serverSchema = mongoose.Schema({
  _id: Number,
  name: String,
  initialized: Boolean,
  settings: {
    useCharacters: Boolean,
    userHeyOrio: Boolean,
    language: String,
    userblacklist: Array,
    mainChannel: String,
    logChannel: String,
  },
  ownerID: String,
  premium: Boolean,
  main: Boolean,
  members: Number,
  region: String,
  large: Boolean
});
module.exports = mongoose.model("servers", serverSchema);