const express = require("express");
const app = express();
const auth = require("./../auth/register");

app.route("/register").post(auth.register);
app.route("/login").post(auth.login);
module.exports = app;
