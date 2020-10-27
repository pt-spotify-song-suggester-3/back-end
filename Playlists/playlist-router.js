const router = require("express").Router();
const Playlist = require("./playlist-model");

router.put("/:id", (req, res, next) => {
    const {id} = req.params;

    Playlist.findById(id)
    .then(playlist => {
        if(playlist){
            Playlist.updatePlaylist(id, req.body)
            .then(playlist => {
                res.status(200).json(playlist)
            })
            .catch(err => {
                next({apiCode: 500, apiMessage: "error updating playlist", ...err});
            });
        } else {
            next({apiCode: 404, apiMessage: "playlist not found"});
        }
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error retrieving playlist"});
    });
});

router.delete("/:id", (req, res, next) => {
    const {id} = req.params;

    Playlist.removePlaylist(id)
    .then(playlist => {
        res.status(200).json(playlist);
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error deleting playlist", ...err});
    });
});

router.post("/:id", (req, res, next) => {
    const {id} = req.params;

    req.body.playlist_id = id;
    Playlist.findById(id)
    .then(playlist => {
        if(playlist){
            Playlist.addSongToPlaylist(req.body)
            .then(playlist => {
                res.status(201).json(playlist);
            })
            .catch(err => {
                next({apiCode: 500, apiMessage: "error creating song entry for playlist", ...err});
            })
        } else {
            next({apiCode: 404, apiMessage: "playlist not found"});
        }
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error retrieving playlist"});
    });
});

router.get("/:id", (req, res, next) => {
    const {id} = req.params;

    Playlist.getSongsByPlaylist(id)
    .then(playlist => {
        res.status(200).json(playlist);
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error retrieving song list from playlist", ...err});
    });
});

module.exports = router;