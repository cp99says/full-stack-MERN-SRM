const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
require("dotenv/config");

mongoose.connect(`${process.env.mongo_string}`).then(
  () => {
    console.log(`connected to mongoDB compass`);
    app.listen(port, () => {
      console.log(`server started at port: ${port}`);
    });
  },
  (err) => {
    console.log(err);
  }
);
app.use(express.json());
app.use(cors());

app.use("*", cors());
app.get("/", (req, res) => {
  res.send("all good, AWS is up");
});
app.use("/api", routes);

const port = process.env.port || 3000;
