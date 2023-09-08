const { validationResult } = require("express-validator");
const { ContactServices } = require("../../services/contact");

const contactController = {
  getContact: async (req, res, next) => {
    try {
      const result = await ContactServices.GetContactList();

      if (result.status) {
        return res.status(result.code).json({ contact: result.body });
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
      const { info } = req.body;
      const result = await ContactServices.UpdateContact(info);

      if (result.status) {
        return res.status(result.code).json({ contact: result.body });
      }
      return res.status(result.code).json({ message: result.message });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = contactController;
