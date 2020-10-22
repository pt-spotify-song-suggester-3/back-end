const express = require("express");
const app = express();
const helmet = require("helmet");

const errorHandler = require("./utils/error-handler.js");
const authenticate = require("./Users/authenticate-middleware.js");
const userRouter = require("./Users/user-router.js");

app.use(helmet());
app.use(express.json());

app.use("/api/user", userRouter);
//app.use("/api/-endpoint name here-", authenticate);

app.use(errorHandler);

module.exports = app;