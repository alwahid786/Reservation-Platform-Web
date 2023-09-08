const { validationResult } = require('express-validator');
const { SubjectServices } = require('../../services/subject');

const subjectController = {
    getSubjectList: async (req, res, next) => {
        try {
            const result = await SubjectServices.GetSubjectList();

            if (result.status) {
                return res.status(result.code).json({ subjects: result.body });
            }
            return res.status(result.code).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    },
    getSubjectCategory: async (req, res, next) => {      
        try {
            const { id } = req.params;
            const result = await SubjectServices.GetSubjectCategory(id);

            if (result.status) {
                return res.status(result.code).json({ subjects: result.body });
            }
            return res.status(result.code).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    },
    create: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ message: 'Invalid Input' });
            }

            const { title, category } = req.body;
            const result = await SubjectServices.CreateSubject(title, category);

            if (result.status) {
                return res.status(result.code).json({ subjects: result.body });
            }
            return res.status(result.code).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ message: 'Invalid Input' });
            }

            const { title, category } = req.body;
            const result = await SubjectServices.UpdateSubject(title, category);

            if (result.status) {
                return res.status(result.code).json({ subjects: result.body });
            }
            return res.status(result.code).json({ message: result.message });
        } catch (error) {
            next(error);
        }
    },
    delete: async(req, res, next) => {
      try {
          const { id } = req.params;
          const result = await SubjectServices.RemoveSubject(id);

          if (result.status) {
              return res.status(result.code).json({ subjects: result.body });
          }
          return res.status(result.code).json({ message: result.message });
      } catch (error) {
          next(error);
      }
    }
};
module.exports = subjectController;
