const mongoose = require("mongoose");

const Advertisement = new mongoose.Schema(
  {
    name: { type: String },
    ios: { type: String },
    android: { type: String },
    image: { type: String },
    isActive: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advertisement", Advertisement);
