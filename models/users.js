const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  _id: Number,
  name: String,
  identifier: Number,
  settings: {
      mode: String,
      fastRead: String,
      themeID: Number
  },
  metrics: {
      premium: Boolean,
      currency: Number,
      level: Number,
      inventory: {
        packs: Array
    },
      exp: Number,
      milestones: Array,
      badges: Array
      
  },
  content: {
      novels: Array,
      characters: Array,

  }
});
module.exports = mongoose.model("users", userSchema);