const mongoose = require("mongoose");

const Announcement = new mongoose.Schema(
  {
    udid: { type: String, required: true },
    deceasedDetails: {
      gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gender",
        required: true,
      },
      noName: { type: Boolean, required: true },
      firstname: { type: String },
      lastname: { type: String },
      knownAs: { type: String },
    },
    janazahDetails: {
      country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        required: true,
      },
      province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
        required: true,
      },
      city: { type: String, required: true },
      name: { type: String },
      date: { type: Date },
      time: { type: String },
      address: { type: String },
    },
    burialDetails: {
      toggle: { type: Boolean, required: true },
      city: { type: String },
      name: { type: String },
      date: { type: String },
      time: { type: String },
      address: { type: String },
      note: { type: String },
    },
    lastUdid: { type: String },
    isPushNoti: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", Announcement);
