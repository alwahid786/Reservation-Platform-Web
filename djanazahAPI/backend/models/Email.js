const mongoose = require("mongoose");

const Email = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    isDefault: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", Email);
