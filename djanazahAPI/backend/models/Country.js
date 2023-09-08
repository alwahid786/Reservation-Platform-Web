const mongoose = require("mongoose");
const Province = require("./Province");

const Country = new mongoose.Schema(
  {
    name: { type: String, required: true },
    provinces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

Country.pre("deleteOne", { document: true, query: false }, async function (
  next
) {
  try {
    const deleteMany = await Province.deleteMany({
      _id: { $in: this.provinces },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Country", Country);
