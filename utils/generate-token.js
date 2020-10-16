const jwt = require("jsonwebtoken");

module.exports = function(user) {
    payload = {
        subject: user.id,
        username: user.username
    }

    const secret = process.env.SECRET || "plastic luigi pipe";

    const options = {
        expiresIn: "1h"
    }

    const token = jwt.sign(payload, secret, options);

    return token;
}

