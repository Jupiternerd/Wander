const mongoose = require("mongoose");
const storiesSchema = mongoose.Schema({
    _id: Number,
    set: Number,
    price: Number,
    name: String,
    description: String,
    likes: Number,
    multiples: Array,
    author: String,
    artist: String
});
module.exports = mongoose.model("stories", storiesSchema);