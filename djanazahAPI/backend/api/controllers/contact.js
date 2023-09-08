const { ContactServices } = require("../../services/contact");

const contactController = {
  getContact: async (req, res, next) => {
    try {
      const result = await ContactServices.GetContact();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
module.exports = contactController;
