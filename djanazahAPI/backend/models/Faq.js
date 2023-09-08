const mongoose = require("mongoose");
const FaqContent = require("./FaqContent");

const Faq = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    faqContents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FaqContent",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

Faq.pre("deleteOne", { document: true, query: false }, async function (next) {
  try {
    const deleteMany = await FaqContent.deleteMany({
      _id: { $in: this.faqContents },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Faq", Faq);
