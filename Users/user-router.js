const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("./user-model");
const generateToken = require("../utils/generate-token");
const playlistRouter = require("../Playlists/playlist-router");

router.post("/register", (req, res, next) => {
    let user = req.body;

    if(user.username && user.password){
        //using bcrypt to hash the password with a complexity of 10
        const hash = bcryptjs.hashSync(user.password, 10)
        user.password = hash;

        User.add(user)
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                //passes error code and message to universal error-handler helper function located in ../utils
                next({apiCode: 500, apiMessage: "error registering", ...err});
            });
    } else {
        next({apiCode: 500, apiMessage: "error registering"});
    }
});

router.post("/login", (req, res, next) => {
    let {username, password} = req.body;

    User.findBy({username})
        .then(user => {
            if(user && bcryptjs.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(200).json({
                    message: `Logged in as ${user.username}`,
                    token: token
                });
            } else {
                next({apiCode: 401, apiMessage: "Invalid Credentials"});
            }
        })
        .catch(err => {
            next({apiCode: 500, apiMessage: "error logging in", ...err});
        });
});

router.put("/:id", (req, res, next) => {
    const {id} = req.params;

    User.findById(id)
    .then(user => {
        if(user){
            User.update(req.body, id)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                next({apiCode: 500, apiMessage: "error updating user", ...err});
            });
        } else {
            next({apiCode: 404, apiMessage: "user not found"});
        }
    })
    .catch(err => {
        next({apiCode: 404, apiMessage: "user not found", ...err});
    });
})

router.delete("/:id", (req, res, next) => {
    const {id} = req.params;

    User.remove(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error deleting user", ...err});
    })
})

router.get("/:id/playlists", (req, res, next) => {
    const {id} = req.params;

    User.findUserPlaylistsById(id)
    .then(playlists => {
        res.status(200).json(playlists);
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error retrieving playlist list for user", ...err});
    })
});

router.post("/:id/playlists", (req, res, next) => {
    req.body.user_id = req.params.id;

    User.createPlaylist(req.body)
    .then(playlist => {
        res.status(201).json(playlist);
    })
    .catch(err => {
        next({apiCode: 500, apiMessage: "error creating playlist", ...err});
    });
});

router.use("/:id/playlists", playlistRouter);

module.exports = router;