const app = require("./app.js");

const port = process.env.PORT || 3300;
app.listen(port, () => {
    console.log("server listening on port: ", port);
});