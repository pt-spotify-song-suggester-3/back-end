const jwt = require("jsonwebtoken");
const secret = process.env.SECRET || "plastic luigi pipe";

//auth header should follow OAuth Bearer Token flow
module.exports = (req, res, next) => {
    //removes "Bearer" from the token if exists, otherwise sets to undefined
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined;

    //validates token has been successfully been created/header appropriately set
    if(token){
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                res.status(401).json({message: "Invalid Credentials"});
            } else {
                req.decodedToken = decodedToken
                next();
            }
        })
    } else {
        res.status(401).json({message: "Invalid Credentials"});
    }
}