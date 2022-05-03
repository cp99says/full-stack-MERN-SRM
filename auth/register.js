const express = require("express");
const app = express();
const { customAlphabet } = require("nanoid");
const bcrypt = require("bcryptjs");
var config = require("./../config");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const user_model = require("./../models/user");

exports.register = async (req, res) => {
  try {
    const { full_name, username, email, contact_number, gender } = req.body;
    let user_id = customAlphabet("1234567890abcdef", 10)();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new user_model({
      full_name: full_name,
      user_id: user_id,
      username: username,
      email: email,
      contact_number: contact_number,
      password: hashedPassword,
      gender: gender,
      registered_on: moment()
        .utcOffset("+05:30")
        .format("MMMM Do YYYY, h:mm:ss a"),
    });
    await user.save();
    return res.json({
      status: "success",
      message: "account registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      status: "failure",
      message: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.json({
        status: "failure",
        message: `please enter email`,
      });
    }
    const pswd = req.body.password;
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
    var correct_password = await bcrypt.compare(pswd, data[0].password);
    if (correct_password) {
      var token = jwt.sign(
        {
          username: data[0].username,
          email: data[0].email,
          user_id: data[0].user_id,
          contact_number: data[0].contact_number,
          role: data[0].role,
          status: data[0].status,
        },
        `${config.jwt_secret}`,
        { expiresIn: "14d" }
      );

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
