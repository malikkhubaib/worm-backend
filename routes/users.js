var express = require('express');
var router = express.Router();
var Song = require('./../db/Song')
var User = require("./../db/User")

router.get("/:userId/backupPlaylist", (req, res) => {
    let userId = req.params.userId
    User.findById(userId, (err, data) => {
        console.log(data)
        if (err) {
            res.json({
                err
            })
        } else if (data == null) {
            res.json({
                err: new Error("User not found")
            })
        } else {
            let ids = []
            for (i of data.backupPlaylist) {
                ids.push(i._id)
            }

            Song.find({
                _id: {
                    $in: ids
                }
            }, function (err, data) {
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
})

router.post("/:userId/backupPlaylist", (req, res) => {
    let userId = req.params.userId
    let songId = req.body.songId
    User.findById(userId, (err, data) => {
        console.log(data)
        if (err) {
            res.json({
                err
            })
        } else if (data == null) {
            res.json({
                err: new Error("User not found")
            })
        } else {
            let ids = []
            for (i of data.backupPlaylist) {
                ids.push(i._id+"")
            }
            console.log(ids.indexOf(songId))
            if (ids.indexOf(songId) >= 0) {
                res.json({
                    err: {
                        message: "Song is already in backup playlist"
                    },
                })
            } else {
                ids.push(songId)
                data.backupPlaylist = ids
                data.save(function (err, data) {
                    res.json({
                        success: {
                            message: "Song added"
                        }
                    })
                })
            }
        }
    })
})

router.delete("/:userId/backupPlaylist", (req, res) => {
    let userId = req.params.userId
    let songId = req.body.songId
    User.findById(userId, (err, data) => {
        console.log(data)
        if (err) {
            res.json({
                err
            })
        } else if (data == null) {
            res.json({
                err: new Error("User not found")
            })
        } else {
            let ids = []
            for (i of data.backupPlaylist) {
                ids.push(i._id+"")
            }
            console.log(ids.indexOf(songId))
            if (ids.indexOf(songId) >= 0) {
                ids.splice(ids.indexOf(songId), 1)
                data.backupPlaylist = ids
                data.save()
                res.json({
                    success: {
                        message: "Song removed"
                    }
                })
            } else {
                res.json({
                    err:{
                        message: "Does not exist in the backup playlist"
                    }
                })
            }
        }
    })
})















router.get("/:userId/likedPlaylist", (req, res) => {
    let userId = req.params.userId
    User.findById(userId, (err, data) => {
        console.log(data)
        if (err) {
            res.json({
                err
            })
        } else if (data == null) {
            res.json({
                err: new Error("User not found")
            })
        } else {
            let ids = []
            for (i of data.likedPlaylist) {
                ids.push(i._id)
            }

            Song.find({
                _id: {
                    $in: ids
                }
            }, function (err, data) {
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
})





router.post("/:userId/likedPlaylist", (req, res) => {
    let userId = req.params.userId
    let songId = req.body.songId
    User.findById(userId, (err, data) => {
        console.log(data)
        if (err) {
            res.json({
                err
            })
        } else if (data == null) {
            res.json({
                err: new Error("User not found")
            })
        } else {
            let ids = []
            for (i of data.likedPlaylist) {
                ids.push(i._id+"")
            }
            console.log(ids.indexOf(songId))
            if (ids.indexOf(songId) >= 0) {
                res.json({
                    err: {
                        message: "Song is already in liked playlist"
                    },
                })
            } else {
                ids.push(songId)
                data.likedPlaylist = ids
                data.save(function (err, data) {
                    res.json({
                        success: {
                            message: "Song added"
                        }
                    })
                })
            }
        }
    })
})

router.delete("/:userId/likedPlaylist", (req, res) => {
    let userId = req.params.userId
    let songId = req.body.songId
    User.findById(userId, (err, data) => {
        console.log(data)
        if (err) {
            res.json({
                err
            })
        } else if (data == null) {
            res.json({
                err: new Error("User not found")
            })
        } else {
            let ids = []
            for (i of data.likedPlaylist) {
                ids.push(i._id+"")
            }
            console.log(ids.indexOf(songId))
            if (ids.indexOf(songId) >= 0) {
                ids.splice(ids.indexOf(songId), 1)
                data.likedPlaylist = ids
                data.save()
                res.json({
                    success: {
                        message: "Song removed"
                    }
                })
            } else {
                res.json({
                    err:{
                        message: "Does not exist in the liked playlist"
                    }
                })
            }
        }
    })
})





module.exports = router;
