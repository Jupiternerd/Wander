const mongoose = require("mongoose");
const characterSchema = mongoose.Schema({
    _id: Number,
    set: Number,
    price: Number,
    name: String,
    description: String,
    likes: Number,
    color: Number,
    link: {
        happy: String,
        sad: String,
        annoyed: String,
        blush: String,
        suprised: String
    },
    details: {
        bloodType: String,
        age: Number,
        sex: String,
    },
    author: String,
    artist: String

});
module.exports = mongoose.model("characters", characterSchema);