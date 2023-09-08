const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
  {
    udid: { type: String, required: true },
    content: { type: String, required: true },
    announcementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Announcement",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
