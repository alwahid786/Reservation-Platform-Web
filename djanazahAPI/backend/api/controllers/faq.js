const { FaqServices } = require("../../services/faq");

const faqController = {
  getFaq: async (req, res, next) => {
    try {
      const result = await FaqServices.GetFaq();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = faqController;
