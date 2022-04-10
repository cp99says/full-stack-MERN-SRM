const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});
// console.log(path.resolve(__dirname, `${process.env.NODE_ENV}.env`));
// console.log(process.env.rzp_key_id);
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  mongo_string: process.env.mongo_string,
  jwt_secret: process.env.jwt_secret,
  cms_jwt_secret: process.env.cms_jwt_secret,
};
