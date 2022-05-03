const mongoose = require("mongoose");
const schema = mongoose.Schema({
  city_name: {
    type: String,
  },
  city_hotels: [
    {
      name: { type: String },
      hotel_image: { type: String },
      location: { type: String },
      room_available: [
        {
          room_type: { type: String },
          quantity: { type: Number },
          price: { type: Number },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("hotels data", schema);
