const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const User = require("./auth-model");
const generateToken = require("../utils/generate-token");

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
        next({apiCode: 500, apiMessage: "Error Registering"});
    }
});

router.post("/login", (req, res, next) => {
    let {username, password} = req.body;

    User.findBy(username)
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
            next({apiCode: 500, apiMessage: "Error Logging in", ...err});
        });
});

module.exports = router;