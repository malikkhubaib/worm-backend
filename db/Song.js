var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/wormv1")
var Schema = mongoose.Schema

var Song = new Schema({
    url: {
        required: true,
        type: String
    },
    title: {
        require: true,
        type: String,
    },
    artists: {
        require: true,
        type: String,
    },
    albums: {
        require: true,
        type: String,
    }
})

module.exports = mongoose.model("Song", Song)
