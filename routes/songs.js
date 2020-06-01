var express = require('express');
var router = express.Router();
var Song = require('./../db/Song')


var multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.split('.')
        ext = ext[ext.length - 1]
        cb(null, file.fieldname + '-' + Date.now() + '.' + ext)
    }
})



var upload = multer({ storage: storage })

router.post("/", upload.single("song"), (req, res) => {
    var file = req.file
    console.log("File path: " + req.file)
    //storing it in db
    console.log(req.body.songDetails)
    let songDetails = JSON.parse(req.body.songDetails)
    songDetails.url = file.filename
    Song.create(songDetails, function (err, data) {
        if (err) {
            console.error(err)
            res.json({
                err
            })
        } else {
            console.log("Song successfully added")
            res.json({
                song: data
            })
        }
    })
})

router.get("/:query", async (req, res) => {
    let query = req.params.query
    if (query == "") {
        res.json({
            err: new Error("Search string cannot be empty")
        })
    } else {
        let pattern = "\w*"+query+"\w*"
        Song.find({ title: new RegExp(pattern) }, (err, data) => {
            if (err) {
                res.json({
                    err
                })
            } else {
                res.json({
                    songs: data
                })
            }
        })
    }
})
router.get("/", (req, res) => {

    Song.find({}, (err, data) => {
        if (err) {
            res.json({
                err
            })
        } else {
            res.json({
                songs: data
            })
        }
    })
})

router.get("/song/:songId", (req, res) => {
    let songId = req.params.songId
    Song.findById(songId, (err, data) => {
        if (err) {
            res.json({
                err
            })
        } else if (data == null) {
            res.json({
                err: new Error("Song not found")
            })
        } else {
            res.json({
                song: data
            })
        }
    })
})


router.delete("/:songId", (req, res) => {
    let songId = req.params.songId
    Song.findByIdAndRemove(songId, (err, data) => {
        if(err){
            res.json({
                err
            })
        }else{
            res.json({
                success: {
                    message: "Song deleted succesfully"
                }
            })
        }
    })
})

module.exports = router;
