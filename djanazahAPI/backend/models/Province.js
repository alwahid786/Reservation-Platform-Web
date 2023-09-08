const mongoose = require("mongoose");

const Province = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Province", Province);
