const mongoose = require("mongoose");
const backgroundsSchema = mongoose.Schema({
    _id: Number,
    set: Number,
    price: Number,
    name: String,
    description: String,
    likes: Number,
    link: String,
    artist: String

});
module.exports = mongoose.model("backgrounds", backgroundsSchema);