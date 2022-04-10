const express = require("express");
const app = express();
const user_model = require("./../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./../config");

exports.login = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.json({
        status: "failure",
        message: `please enter email`,
      });
    }
    const pswd = req.query.password;
    if (!pswd) {
      return res.json({
        status: "failure",
        message: `please enter password`,
      });
    }

    var data = await user_model.find({ email: email });
    if (data.length == 0) {
      return res.json({
        status: "failure",
        message: `${email} not found, please register`,
      });
    }
    var correct_password = await bcryptjs.compare(pswd, data[0].password);
    if (correct_password) {
      var token = jwt.sign(
        {
          username: data[0].username,
          email: data[0].email,
          user_id: data[0].user_id,
          contact_number: data[0].contact_number,
          role: data[0].role,
        },
        `${config.jwt_secret}`,
        { expiresIn: "14d" }
      );

      if (`${config.jwt_secret}` === "undefined") {
        return res.json({
          status: "development failure",
          message:
            "being a nodejs developer, you should be very well aware of the procedure to setup an enviornment",
        });
      }
      var decoded_values = jwt.decode(token, `${config.jwt_secret}`);

      return res.json({
        status: "success",
        message: "login successful",
        token,
        decoded_values,
      });
    } else {
      return res.json({
        status: "failure",
        message: `invalid password, please try again`,
      });
    }
  } catch (error) {
    res.json({
      status: "failure",
      error,
    });
  }
};
