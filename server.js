const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
require("dotenv/config");
// var string =
//   "mongodb+srv://cp99says:cp99says@cluster0.ethe1.mongodb.net/hotel_booking?retryWrites=true&w=majority";
mongoose.connect(`mongodb://localhost:27017/hotel-booking`).then(
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
