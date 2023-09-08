const SubjectModel = require("../models/Subject");

exports.subjectSeeding = async (categories) => {
  await SubjectModel.create([
    {
      title: "Pain / Sickness / Holy",
      categoryId: [categories[0]._id, categories[1]._id],
    },
    {
      title: "Pain / Sickness",
      categoryId: [categories[0]._id, categories[1]._id],
    },
  ]);
};
