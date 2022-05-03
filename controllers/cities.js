const express = require("express");
const cities_models = require("./../models/cities");

exports.post_data = async (req, res) => {
  try {
    const { city_name, city_array } = req.body;
    const data = new cities_models({
      city_name: city_name,
      city_hotels: city_array,
    });
    await data.save();
    return res.json({
      success: true,
      message: "hotel added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(201).json({
      status: "failure",
      message: error,
    });
  }
};

exports.get_cities_data = async (req, res) => {
  const { city_name } = req.body;
  const data = await cities_models.find({ city_name: city_name });
  res.json({ data });
};
