const mongoose = require("mongoose");

const Admob = new mongoose.Schema(
  {
    adId: {
      ios: { type: String, required: true },
      android: { type: String, required: true },
    },
    isActive: { type: Boolean, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admob", Admob);
