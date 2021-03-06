const mongoose = require("mongoose");
const moment = require("moment");

const schema = mongoose.Schema({
  full_name: {
    type: String,
  },
  user_id: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  contact_number: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
  registered_on: {
    type: String,
  },
  gender: { type: String },
});

module.exports = mongoose.model("User", schema);
