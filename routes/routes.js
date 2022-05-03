const express = require("express");
const app = express();
const auth = require("./../auth/register");
const city = require("./../controllers/cities");

app.route("/register").post(auth.register);
app.route("/login").post(auth.login);
app.route("/add_city").post(city.post_data);
app.route("/get_hotels_in_cities").get(city.get_cities_data);
module.exports = app;
