var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/wormv1")
var Schema = mongoose.Schema

var User = new Schema({
    fullName: {
        required: true,
        type: String
    },
    backupPlaylist: {
        required: false,
        type: [Schema.Types.ObjectId]
    },
    likedPlaylist: {
        required: false,
        type: [Schema.Types.ObjectId]
    }
})

module.exports = mongoose.model("User", User)
