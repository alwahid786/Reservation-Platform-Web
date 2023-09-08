const mongoose = require("mongoose");

const ShareText = new mongoose.Schema(
  {
    name: { type: String, required: true },
    text: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ShareText", ShareText);
