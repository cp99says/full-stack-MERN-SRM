const express = require("express");
const app = express();
const { customAlphabet } = require("nanoid");
const bcrypt = require("bcryptjs");
var config = require("./../config");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.register = async (req, res) => {
  try {
    const {
      full_name,
      username,
      email,
      whatsapp_number,
      contact_number,
      creation_source,
      gender,
      preferred_city,
      role,
      experience,
      request_platform,
    } = req.body;

    let user_id = customAlphabet("1234567890abcdef", 10)();

    const salt = await bcrypt.genSalt(13);
    const password = customAlphabet("abcdefghijklmnop#.@,1234567890", 16)();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new user_model({
      full_name: full_name,
      user_id: user_id,
      whatsapp_number: whatsapp_number,
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
    const data = await user.save();
    const otp_template_data = {
      contact_number: whatsapp_number,
      templateId: "welcomenew",
      name: full_name,
    };
    console.log(otp_template_data);
    send_otp_template(otp_template_data, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    });

    var url = `${config.mongo_string}`;
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;

      if (config.NODE_ENV === "development") {
        db_name = "StartLadder";
      }
      if (config.NODE_ENV === "test") {
        db_name = "StartLadderDev";
      } else {
        db_name = "StartLadder";
      }
      var dbo = db.db(`${db_name}`);
      var myobj = {
        current_city: "",
        preferred_city_to_work: preferred_city,
        last_qualification: "",
        graduation_year: "",
        experience: experience,
        role,
        last_CTC: " ",
        resume_url: " ",
        emailId: email,
        userId: user_id,
      };
      dbo.collection("fastjobs_profiles").insertOne(myobj, function (err, res) {
        if (err) return res.json({ error: err });
        if (res) {
          // console.log(res);
        }
        // db.close();
      });
    });

    // console.log(data);
    // console.log(config.jwt_secret);
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
    let decoded_values = jwt.decode(token, `${config.jwt_secret}`);
    if (decoded_values) {
      let email = data.email;

      if (request_platform == "FASTJOBS_SL") {
        LINK_BASE_URL = config.base_url_fastjobs;
      } else {
        LINK_BASE_URL = config.base_url;
      }
      let templateData = {
        link: LINK_BASE_URL,
      };
      let templateName = "password_changed";
      if (request_platform == "FASTJOBS_SL") {
        templateName = "welcome_user_template_FJ";
      }

      const emailStatus = await sendEmail(
        email,
        templateData,
        templateName,
        request_platform
      );
    }
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
