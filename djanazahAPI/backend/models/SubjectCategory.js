const mongoose = require("mongoose");

const SubjectCategory = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    content: {
      langAra: { type: String, required: true },
      langTranslit: { type: String, required: true },
      langEng: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubjectCategory", SubjectCategory);
