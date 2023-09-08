const mongoose = require("mongoose");

const TimeSetting = new mongoose.Schema(
  {
    name: { type: String, required: true },
    adsDelay: { type: String, required: true },
    fullAdDelay: { type: String, required: true },
    allowCreateDelay: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeSetting", TimeSetting);
