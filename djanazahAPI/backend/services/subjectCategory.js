const SubjectCategoryModel = require("../models/SubjectCategory");

exports.SubjectCategoryServices = {
  Create: async (subjectCategory) => {
    const newSubject = new SubjectCategoryModel(subjectCategory);
    const result = await newSubject.save();
    return result;
  },
};
