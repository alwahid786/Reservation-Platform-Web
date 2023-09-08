const mongoose = require("mongoose");

const FixedTime = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FixedTime", FixedTime);
