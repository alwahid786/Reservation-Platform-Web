const { SubjectServices } = require("../../services/subject");

const subjectController = {
  getSubjectList: async (req, res, next) => {
    try {
      const udid = req.params.udid;

      const subjects = await SubjectServices.GetList(udid);
      res.status(200).json(subjects);
    } catch (error) {
      next(error);
    }
  },
  createSubject: async (req, res, next) => {
    try {
      const subjects = await SubjectServices.Create();
      res.status(200).json(subjects);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = subjectController;
