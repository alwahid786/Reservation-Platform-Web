const { validationResult } = require("express-validator");
const { FaqServices } = require("../../services/faq");

const faqController = {
  getFaqList: async (req, res, next) => {
    try {
      const result = await FaqServices.GetFaqList();

      if (result.status) {
        return res.status(result.code).json({ faqs: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  // getSubjectCategory: async (req, res, next) => {
  //     try {
  //         const { id } = req.params;
  //         const result = await SubjectServices.GetSubjectCategory(id);

  //         if (result.status) {
  //             return res.status(result.code).json({ subjects: result.body });
  //         }
  //         return res.status(result.code).json({ message: result.message });
  //     } catch (error) {
  //         next(error);
  //     }
  // },
  create: async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ message: "Invalid Input" });
      }

      const { title, faqContents } = req.body;
      const result = await FaqServices.CreateFaq(title, faqContents);

      if (result.status) {
        return res.status(result.code).json({ faqs: result.body });
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
        return res.status(422).json({ message: "Invalid Input" });
      }

      const { title, faqContents } = req.body;
      const result = await FaqServices.UpdateFaq(title, faqContents);

      if (result.status) {
        return res.status(result.code).json({ faqs: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await FaqServices.RemoveFaq(id);

      if (result.status) {
        return res.status(result.code).json({ faqs: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = faqController;
