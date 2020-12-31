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
    mainChannel: Array,
    logChannel: String,
  },
  metrics: {
    members: Number,
    region: String,
    large: Boolean
  },
  webhooksLeftToday: Number,
  ownerID: String,
  premium: Boolean,
  main: Boolean,

});
module.exports = mongoose.model("servers", serverSchema);