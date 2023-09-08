const mongoose = require("mongoose");

const Contact = new mongoose.Schema(
  {
    name: { type: String, required: true },
    info: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", Contact);
