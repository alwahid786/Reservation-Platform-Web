const mongoose = require("mongoose");

const Gender = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gender", Gender);
