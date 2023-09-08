const mongoose = require("mongoose");

const Honorific = new mongoose.Schema(
  {
    index: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Honorific", Honorific);
