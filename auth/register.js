const express = require("express");
const app = express();
const { customAlphabet } = require("nanoid");
const bcrypt = require("bcryptjs");
var config = require("./../config");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.register = async (req, res) => {
  try {
    const { full_name, username, email, contact_number, gender, role } =
      req.body;

    let user_id = customAlphabet("1234567890abcdef", 10)();

    const salt = await bcrypt.genSalt(13);
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new user_model({
      full_name: full_name,
      user_id: user_id,
      username: username,
      email: email,
      contact_number: contact_number,
      password: hashedPassword,
      gender,
      creation_source: creation_source,
      registered_on: moment()
        .utcOffset("+05:30")
        .format("MMMM Do YYYY, h:mm:ss a"),
      role: "user",
    });

    var token = jwt.sign(
      {
        username: data.username,
        email: data.email,
        user_id: data.user_id,
        contact_number: data.contact_number,
        role: data.role,
        status: data.status,
      },
      `${config.jwt_secret}`,
      { expiresIn: "1h" }
    );

    res.json({
      status: "success",
      message: "account registered successfully",
      token,
      decoded_values,
    });
  } catch (error) {
    res.status(201).json({
      status: "failure",
      message: error,
    });
  }
};
