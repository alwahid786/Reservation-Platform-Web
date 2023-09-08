const mongoose = require("mongoose");

const Setting = new mongoose.Schema(
  {
    udid: { type: String, required: true },
    app: {
      reset: {
        name: { type: String, required: true },
      },
      title: { type: String, required: true },
      version: {
        copyright: { type: String, required: true },
        name: { type: String, required: true },
      },
    },
    arabicFont: {
      text: { type: String, required: true },
      title: { type: String, required: true },
      value: { type: Number, required: true },
      max: { type: Number, required: true },
      min: { type: Number, required: true },
    },
    subject: {
      options: [
        {
          isCheck: { type: Boolean, required: true },
          name: { type: String, required: true },
        },
      ],
      title: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", Setting);
