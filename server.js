const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(
  process.env.mongoURILocal,
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to db");
  }
);
app.use(express.json());
app.use(cors());
app.use("*", cors());
app.get("/", (req, res) => {
  res.send("all good, AWS is up");
});
//       register and get data of all rooms
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`server started at port: ${port}`);
});
